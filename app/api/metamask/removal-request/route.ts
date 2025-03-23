import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb/connect';
import { MetaMaskConnectionSchema, UserSchema } from '@/lib/mongodb/schemas';
import mongoose from 'mongoose';

/**
 * POST /api/metamask/removal-request
 * Creates a request to remove a MetaMask connection
 */
export async function POST(request: NextRequest) {
  try {
    // Get request body
    const body = await request.json();
    const { 
      walletAddress, 
      connectionId, 
      email, 
      reason 
    } = body;
    
    // Validate required fields
    if (!walletAddress && !connectionId) {
      return NextResponse.json(
        { error: 'Either walletAddress or connectionId is required' },
        { status: 400 }
      );
    }
    
    // Email is required for contact purposes
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required for removal requests' },
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
    
    let connection;
    
    // Find connection by ID or wallet address
    if (connectionId && mongoose.Types.ObjectId.isValid(connectionId)) {
      connection = await MetaMaskConnection.findById(connectionId);
    } else if (walletAddress) {
      // Look up the user first
      const user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });
      
      if (!user) {
        return NextResponse.json(
          { error: 'User not found with this wallet address' },
          { status: 404 }
        );
      }
      
      // Find the most recent active connection
      connection = await MetaMaskConnection.findOne({
        userId: user._id,
        walletAddress: walletAddress.toLowerCase(),
        isActive: true
      }).sort({ lastUsed: -1 });
    }
    
    if (!connection) {
      return NextResponse.json(
        { error: 'MetaMask connection not found' },
        { status: 404 }
      );
    }
    
    // Check if there's already a pending removal request
    if (connection.removalRequest && connection.removalRequest.status === 'pending') {
      return NextResponse.json(
        { 
          message: 'A removal request is already pending for this connection',
          data: connection
        },
        { status: 409 }
      );
    }
    
    // Create the removal request
    connection.removalRequest = {
      requestedAt: new Date(),
      status: 'pending',
      reason: reason || 'User requested disconnection',
      email: email
    };
    
    // Mark the connection as inactive
    connection.isActive = false;
    
    // Save the updated connection
    await connection.save();
    
    // TODO: Send email notification to admins about the new removal request
    
    return NextResponse.json({
      success: true,
      message: 'Removal request submitted successfully. An administrator will review your request.',
      data: connection
    });
  } catch (error) {
    console.error('Error creating MetaMask removal request:', error);
    return NextResponse.json(
      { error: 'Failed to create removal request' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/metamask/removal-request
 * Gets all pending removal requests
 * Note: This would typically be an admin-only endpoint in production
 */
export async function GET(request: NextRequest) {
  try {
    // Connect to database
    await connectDB();
    
    // Get the model (server-side only)
    const MetaMaskConnection = mongoose.models.MetaMaskConnection || 
      mongoose.model('MetaMaskConnection', MetaMaskConnectionSchema);
    
    // Find all connections with pending removal requests
    const pendingRequests = await MetaMaskConnection.find({
      'removalRequest.status': 'pending'
    }).sort({ 'removalRequest.requestedAt': -1 });
    
    return NextResponse.json({
      success: true,
      data: pendingRequests,
      count: pendingRequests.length
    });
  } catch (error) {
    console.error('Error fetching removal requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch removal requests' },
      { status: 500 }
    );
  }
}
