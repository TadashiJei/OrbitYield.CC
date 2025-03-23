import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/mongodb/connect';
import { TransactionSchema } from '@/lib/mongodb/schemas';

/**
 * GET /api/transactions
 * Retrieves transactions with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const walletAddress = searchParams.get('walletAddress');
    const userId = searchParams.get('userId');
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const chain = searchParams.get('chain');
    const protocol = searchParams.get('protocol');
    const opportunityId = searchParams.get('opportunityId');
    const investmentId = searchParams.get('investmentId');
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const sortField = searchParams.get('sortField') || 'timestamp';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Connect to database
    await connectDB();

    // Get the model (server-side only)
    const Transaction = mongoose.models.Transaction || 
      mongoose.model('Transaction', TransactionSchema);

    // Build query filters
    const filters: any = {};

    if (walletAddress) {
      filters.walletAddress = walletAddress.toLowerCase();
    }

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      filters.userId = userId;
    }

    if (type) {
      filters.type = type;
    }

    if (status) {
      filters.status = status;
    }

    if (chain) {
      filters.chain = chain;
    }

    if (protocol) {
      filters.protocol = protocol;
    }

    if (opportunityId && mongoose.Types.ObjectId.isValid(opportunityId)) {
      filters.opportunityId = opportunityId;
    }

    if (investmentId && mongoose.Types.ObjectId.isValid(investmentId)) {
      filters.investmentId = investmentId;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Sort order
    const sort: any = {};
    sort[sortField] = sortOrder === 'asc' ? 1 : -1;

    // Execute query
    const transactions = await Transaction.find(filters)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const totalCount = await Transaction.countDocuments(filters);

    return NextResponse.json({
      success: true,
      data: transactions,
      pagination: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/transactions
 * Creates a new transaction
 * This endpoint would typically be used internally by other API routes
 * rather than being called directly by clients
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.userId || !body.walletAddress || !body.type) {
      return NextResponse.json(
        { error: 'Missing required fields (userId, walletAddress, type)' },
        { status: 400 }
      );
    }
    
    // Connect to database
    await connectDB();
    
    // Get the model (server-side only)
    const Transaction = mongoose.models.Transaction || 
      mongoose.model('Transaction', TransactionSchema);
    
    // Create transaction
    const transaction = await Transaction.create({
      userId: body.userId,
      walletAddress: body.walletAddress.toLowerCase(),
      type: body.type,
      amount: body.amount,
      amountRaw: body.amountRaw,
      tokenSymbol: body.tokenSymbol,
      chain: body.chain,
      protocol: body.protocol,
      opportunityId: body.opportunityId,
      investmentId: body.investmentId,
      status: body.status || 'completed',
      transactionHash: body.transactionHash,
      error: body.error,
      timestamp: body.timestamp || new Date(),
    });
    
    return NextResponse.json({
      success: true,
      data: transaction,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating transaction:', error);
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    );
  }
}
