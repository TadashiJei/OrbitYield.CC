import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb/connection';
import MetaMaskConnection from '@/lib/mongodb/models/MetaMaskConnection';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const walletAddress = searchParams.get('walletAddress');
    const userId = searchParams.get('userId');
    
    if (!walletAddress && !userId) {
      return NextResponse.json(
        { success: false, error: 'Either walletAddress or userId is required' },
        { status: 400 }
      );
    }
    
    // Connect to the database
    await connectToDatabase();
    
    // Build query
    const query: any = {};
    
    if (walletAddress) {
      // If wallet address is provided, find all connections for this user
      // This includes the current wallet and any previously connected wallets
      query.userId = { $exists: true }; // Ensure there's a userId
      
      // Try to find the userId for this wallet address
      const connection = await MetaMaskConnection.findOne({ walletAddress });
      if (connection && connection.userId) {
        query.userId = connection.userId;
      } else {
        // If no userId found, just search for this specific wallet
        query.walletAddress = walletAddress;
      }
    } else if (userId) {
      // If only userId is provided, find all connections for this user
      query.userId = userId;
    }
    
    // Get connections
    const connections = await MetaMaskConnection.find(query)
      .sort({ createdAt: -1 })
      .lean();
    
    return NextResponse.json({ 
      success: true, 
      data: connections 
    });
  } catch (error) {
    console.error('Error getting MetaMask connections:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get MetaMask connections' },
      { status: 500 }
    );
  }
}
