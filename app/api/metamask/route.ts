import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb/connect';
import { MetaMaskConnectionSchema, UserSchema } from '@/lib/mongodb/schemas';
import mongoose from 'mongoose';

/**
 * GET /api/metamask
 * Retrieves MetaMask connections for a user
 */
export async function GET(request: NextRequest) {
  try {
    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const walletAddress = searchParams.get('walletAddress');
    const userId = searchParams.get('userId');

    // Require either walletAddress or userId
    if (!walletAddress && !userId) {
      return NextResponse.json(
        { error: 'Either walletAddress or userId is required' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Get the model (server-side only)
    const MetaMaskConnection = mongoose.models.MetaMaskConnection || 
      mongoose.model('MetaMaskConnection', MetaMaskConnectionSchema);

    // Build query filters
    const filters: any = {};
    
    if (walletAddress) filters.walletAddress = walletAddress.toLowerCase();
    if (userId && mongoose.Types.ObjectId.isValid(userId)) filters.userId = userId;
    
    // Only return active connections by default
    filters.isActive = true;

    // Execute the query
    const connections = await MetaMaskConnection.find(filters).sort({ connectedAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: connections,
    });
  } catch (error) {
    console.error('Error fetching MetaMask connections:', error);
    return NextResponse.json(
      { error: 'Failed to fetch MetaMask connections' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/metamask
 * Creates a new MetaMask connection
 */
export async function POST(request: NextRequest) {
  try {
    // Get request body and headers
    const body = await request.json();
    const { walletAddress } = body;
    const userAgent = request.headers.get('user-agent') || undefined;
    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') ||
                      undefined;
    
    // Validate required fields
    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }
    
    // Connect to database
    await connectDB();
    
    // Get the models (server-side only)
    const User = mongoose.models.User || 
      mongoose.model('User', UserSchema);
    const MetaMaskConnection = mongoose.models.MetaMaskConnection || 
      mongoose.model('MetaMaskConnection', MetaMaskConnectionSchema);
    
    // Find or create user by wallet address
    let user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });
    
    if (!user) {
      user = await User.create({
        walletAddress: walletAddress.toLowerCase(),
        lastLogin: new Date(),
      });
    } else {
      // Update lastLogin for existing user
      user.lastLogin = new Date();
      await user.save();
    }
    
    // Check if connection already exists
    let connection = await MetaMaskConnection.findOne({
      userId: user._id,
      walletAddress: walletAddress.toLowerCase(),
    });
    
    if (connection) {
      // Update existing connection
      connection.lastUsed = new Date();
      connection.userAgent = userAgent;
      connection.ipAddress = ipAddress;
      
      // If there was a pending removal request, keep it
      if (!connection.isActive && 
          connection.removalRequest && 
          connection.removalRequest.status === 'pending') {
        // Connection remains inactive with pending request
      } else {
        // Otherwise activate the connection
        connection.isActive = true;
        // Clear any previous removal request that wasn't pending
        if (connection.removalRequest && connection.removalRequest.status !== 'pending') {
          connection.removalRequest = undefined;
        }
      }
      
      await connection.save();
    } else {
      // Create new connection
      connection = await MetaMaskConnection.create({
        userId: user._id,
        walletAddress: walletAddress.toLowerCase(),
        connectedAt: new Date(),
        lastUsed: new Date(),
        isActive: true,
        userAgent,
        ipAddress,
      });
    }
    
    return NextResponse.json({
      success: true,
      data: connection,
    }, { status: connection.isNew ? 201 : 200 });
  } catch (error) {
    console.error('Error creating/updating MetaMask connection:', error);
    return NextResponse.json(
      { error: 'Failed to create/update MetaMask connection' },
      { status: 500 }
    );
  }
}
