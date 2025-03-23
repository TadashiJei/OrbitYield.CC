import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb/connection';
import MetaMaskConnection from '@/lib/mongodb/models/MetaMaskConnection';
import Transaction from '@/lib/mongodb/models/Transaction';
import UserInvestment from '@/lib/mongodb/models/UserInvestment';

// Define Activity interface for type safety
interface Activity {
  _id: string;
  type: 'connect' | 'removalRequest' | 'transaction' | 'investment';
  walletAddress: string;
  timestamp: Date;
  details: string;
  [key: string]: any; // For additional properties specific to each activity type
}

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
      query.walletAddress = walletAddress;
    } else if (userId) {
      // If only userId is provided
      query.userId = userId;
    }
    
    // Prepare activities array
    let activities: Activity[] = [];
    
    // Get connection history
    const connections = await MetaMaskConnection.find({ walletAddress })
      .sort({ createdAt: -1 })
      .lean();
    
    // Create activities from connections
    const connectionActivities = connections.map(conn => ({
      _id: conn._id,
      type: 'connect',
      walletAddress: conn.walletAddress,
      timestamp: conn.createdAt,
      details: 'Wallet connected to OrbitYield platform',
      ip: conn.ip || 'Unknown'
    }));
    
    activities = [...activities, ...connectionActivities];
    
    // Get removal requests if any
    const removalRequests = connections
      .filter(conn => conn.removalRequest)
      .map(conn => ({
        _id: `${conn._id}_removal`,
        type: 'removalRequest',
        walletAddress: conn.walletAddress,
        timestamp: conn.removalRequest.requestDate,
        details: `Wallet removal request: ${conn.removalRequest.status}`,
        status: conn.removalRequest.status,
        reason: conn.removalRequest.reason
      }));
    
    activities = [...activities, ...removalRequests];
    
    // Get recent transactions
    const recentTransactions = await Transaction.find(query)
      .sort({ timestamp: -1 })
      .limit(10)
      .lean();
    
    // Create activities from transactions
    const transactionActivities = recentTransactions.map(tx => ({
      _id: tx._id,
      type: 'transaction',
      walletAddress: tx.walletAddress,
      timestamp: tx.timestamp,
      details: `Transaction: ${tx.type} - ${tx.amount} ${tx.tokenSymbol}`,
      transactionHash: tx.transactionHash,
      chain: tx.chain
    }));
    
    activities = [...activities, ...transactionActivities];
    
    // Get investment activities
    const investments = await UserInvestment.find(query)
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();
    
    // Create activities from investments
    const investmentActivities = investments.map(inv => ({
      _id: inv._id,
      type: 'investment',
      walletAddress: inv.walletAddress,
      timestamp: inv.createdAt,
      details: `Investment: ${inv.amount} ${inv.tokenSymbol} in ${inv.opportunityName || 'Unknown opportunity'}`,
      investmentId: inv._id,
      amount: `${inv.amount} ${inv.tokenSymbol}`
    }));
    
    activities = [...activities, ...investmentActivities];
    
    // Sort all activities by timestamp, most recent first
    activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    // Limit to 20 most recent activities
    activities = activities.slice(0, 20);
    
    return NextResponse.json({ 
      success: true, 
      data: activities 
    });
  } catch (error) {
    console.error('Error getting MetaMask activities:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get MetaMask activities' },
      { status: 500 }
    );
  }
}
