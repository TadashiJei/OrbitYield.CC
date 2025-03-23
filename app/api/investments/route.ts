import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb/connect';
import { UserInvestmentSchema, UserSchema, YieldOpportunitySchema } from '@/lib/mongodb/schemas';
import mongoose from 'mongoose';

/**
 * GET /api/investments
 * Retrieves user investments with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const walletAddress = searchParams.get('walletAddress');
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');
    const opportunityId = searchParams.get('opportunityId');
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);

    // Require either walletAddress or userId
    if (!walletAddress && !userId) {
      return NextResponse.json(
        { error: 'Either walletAddress or userId is required' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Get the models (server-side only)
    const UserInvestment = mongoose.models.UserInvestment || 
      mongoose.model('UserInvestment', UserInvestmentSchema);
    const YieldOpportunity = mongoose.models.YieldOpportunity || 
      mongoose.model('YieldOpportunity', YieldOpportunitySchema);

    // Build query filters
    const filters: any = {};
    
    if (walletAddress) filters.walletAddress = walletAddress.toLowerCase();
    if (userId && mongoose.Types.ObjectId.isValid(userId)) filters.userId = userId;
    if (status) filters.status = status;
    if (opportunityId && mongoose.Types.ObjectId.isValid(opportunityId)) {
      filters.opportunityId = opportunityId;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Execute the query with population of related data
    const investments = await UserInvestment.find(filters)
      .populate('opportunityId')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
      
    // Get total count for pagination
    const totalCount = await UserInvestment.countDocuments(filters);
    
    return NextResponse.json({
      success: true,
      data: investments,
      pagination: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching investments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch investments' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/investments
 * Creates a new user investment
 */
export async function POST(request: NextRequest) {
  try {
    // Get request body
    const body = await request.json();
    const { 
      walletAddress, 
      opportunityId, 
      amount, 
      currency, 
      depositTxHash,
      autoCompound = false
    } = body;
    
    // Validate required fields
    if (!walletAddress || !opportunityId || !amount || !currency || !depositTxHash) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(opportunityId)) {
      return NextResponse.json(
        { error: 'Invalid opportunity ID format' },
        { status: 400 }
      );
    }
    
    // Connect to database
    await connectDB();
    
    // Get the models (server-side only)
    const User = mongoose.models.User || 
      mongoose.model('User', UserSchema);
    const YieldOpportunity = mongoose.models.YieldOpportunity || 
      mongoose.model('YieldOpportunity', YieldOpportunitySchema);
    const UserInvestment = mongoose.models.UserInvestment || 
      mongoose.model('UserInvestment', UserInvestmentSchema);
    
    // Find or create user by wallet address
    let user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });
    
    if (!user) {
      user = await User.create({
        walletAddress: walletAddress.toLowerCase(),
        lastLogin: new Date(),
      });
    }
    
    // Verify opportunity exists
    const opportunity = await YieldOpportunity.findById(opportunityId);
    
    if (!opportunity) {
      return NextResponse.json(
        { error: 'Yield opportunity not found' },
        { status: 404 }
      );
    }
    
    // Create new investment
    const investment = await UserInvestment.create({
      userId: user._id,
      walletAddress: walletAddress.toLowerCase(),
      opportunityId,
      amount,
      currency,
      depositTxHash,
      status: 'pending', // Initially set as pending until confirmed on-chain
      startDate: new Date(),
      currentValue: amount, // Initially set to the deposit amount
      autoCompound,
    });
    
    return NextResponse.json({
      success: true,
      data: investment,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating investment:', error);
    return NextResponse.json(
      { error: 'Failed to create investment' },
      { status: 500 }
    );
  }
}
