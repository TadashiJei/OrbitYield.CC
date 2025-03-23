import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb/connect';
import { MetaMaskConnectionSchema } from '@/lib/mongodb/schemas';
import mongoose from 'mongoose';

/**
 * GET /api/admin/metamask
 * Admin endpoint to get MetaMask connections with optional filtering
 * This would be protected by admin authentication in production
 */
export async function GET(request: NextRequest) {
  try {
    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const walletAddress = searchParams.get('walletAddress');
    const email = searchParams.get('email');
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);
    
    // Connect to database
    await connectDB();
    
    // Get the model (server-side only)
    const MetaMaskConnection = mongoose.models.MetaMaskConnection || 
      mongoose.model('MetaMaskConnection', MetaMaskConnectionSchema);
    
    // Build query filters
    const filters: any = {};
    
    // Filter by removal request status if provided
    if (status) {
      filters['removalRequest.status'] = status;
    }
    
    // Filter by wallet address if provided
    if (walletAddress) {
      filters.walletAddress = walletAddress.toLowerCase();
    }
    
    // Filter by email if provided
    if (email) {
      filters['removalRequest.email'] = { $regex: email, $options: 'i' };
    }
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Execute the query
    const connections = await MetaMaskConnection.find(filters)
      .sort({ 'removalRequest.requestedAt': -1, lastUsed: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'username email');
      
    // Get total count for pagination
    const totalCount = await MetaMaskConnection.countDocuments(filters);
    
    // Get count of pending removal requests for dashboard stats
    const pendingCount = await MetaMaskConnection.countDocuments({
      'removalRequest.status': 'pending'
    });
    
    return NextResponse.json({
      success: true,
      data: connections,
      stats: {
        pendingRequests: pendingCount
      },
      pagination: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('Error in admin/metamask:', error);
    return NextResponse.json(
      { error: 'Failed to fetch MetaMask connections' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/metamask
 * Admin endpoint to process a removal request (approve/reject)
 * This would be protected by admin authentication in production
 */
export async function PATCH(request: NextRequest) {
  try {
    // Get request body
    const body = await request.json();
    const { 
      connectionId, 
      status, 
      adminId, 
      notifyUser = true 
    } = body;
    
    // Validate input
    if (!connectionId || !mongoose.Types.ObjectId.isValid(connectionId)) {
      return NextResponse.json(
        { error: 'Valid connection ID is required' },
        { status: 400 }
      );
    }
    
    if (!status || !['approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Status must be either "approved" or "rejected"' },
        { status: 400 }
      );
    }
    
    // Connect to database
    await connectDB();
    
    // Get the model (server-side only)
    const MetaMaskConnection = mongoose.models.MetaMaskConnection || 
      mongoose.model('MetaMaskConnection', MetaMaskConnectionSchema);
    
    // Find the connection
    const connection = await MetaMaskConnection.findById(connectionId);
    
    if (!connection) {
      return NextResponse.json(
        { error: 'MetaMask connection not found' },
        { status: 404 }
      );
    }
    
    if (!connection.removalRequest || connection.removalRequest.status !== 'pending') {
      return NextResponse.json(
        { error: 'No pending removal request found for this connection' },
        { status: 400 }
      );
    }
    
    // Update the removal request
    connection.removalRequest.status = status;
    connection.removalRequest.processedAt = new Date();
    
    if (adminId && mongoose.Types.ObjectId.isValid(adminId)) {
      connection.removalRequest.processedBy = adminId;
    }
    
    // If the request is approved, ensure the connection is marked as inactive
    if (status === 'approved') {
      connection.isActive = false;
    } else if (status === 'rejected') {
      // If rejected, reactivate the connection
      connection.isActive = true;
    }
    
    // Save the updated connection
    await connection.save();
    
    // TODO: If notifyUser is true, send an email notification to the user
    if (notifyUser && connection.removalRequest.email) {
      // Implement email notification logic here
      console.log(`Should notify user at ${connection.removalRequest.email} that their request was ${status}`);
    }
    
    return NextResponse.json({
      success: true,
      message: `Removal request ${status} successfully`,
      data: connection
    });
  } catch (error) {
    console.error('Error processing removal request:', error);
    return NextResponse.json(
      { error: 'Failed to process removal request' },
      { status: 500 }
    );
  }
}
