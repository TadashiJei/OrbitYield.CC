import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb/connection';
import UserInvestment from '@/lib/mongodb/models/UserInvestment';

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
    
    // Only count active investments by default
    if (!searchParams.get('includeAll')) {
      query.status = 'active';
    }
    
    // Count investments
    const count = await UserInvestment.countDocuments(query);
    
    return NextResponse.json({ success: true, count });
  } catch (error) {
    console.error('Error getting investment count:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get investment count' },
      { status: 500 }
    );
  }
}
