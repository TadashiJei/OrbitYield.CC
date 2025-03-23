import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb/connection';
import Transaction from '@/lib/mongodb/models/Transaction';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const walletAddress = searchParams.get('walletAddress');
    
    if (!walletAddress) {
      return NextResponse.json(
        { success: false, error: 'Wallet address is required' },
        { status: 400 }
      );
    }
    
    // Connect to the database
    await connectToDatabase();
    
    // Build query
    const query: any = { walletAddress };
    
    // Filter by type if provided
    const type = searchParams.get('type');
    if (type) {
      query.type = type;
    }
    
    // Filter by status if provided
    const status = searchParams.get('status');
    if (status) {
      query.status = status;
    }
    
    // Count transactions
    const count = await Transaction.countDocuments(query);
    
    return NextResponse.json({ success: true, count });
  } catch (error) {
    console.error('Error getting transaction count:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get transaction count' },
      { status: 500 }
    );
  }
}
