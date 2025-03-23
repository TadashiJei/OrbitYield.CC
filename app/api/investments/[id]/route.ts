import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb/connection';
import UserInvestment from '@/lib/mongodb/models/UserInvestment';
import Transaction from '@/lib/mongodb/models/Transaction';
import mongoose from 'mongoose';

/**
 * GET /api/investments/[id]
 * Retrieves a specific investment by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid investment ID format' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Find the investment with populated opportunity details
    const investment = await UserInvestment.findById(id).populate('opportunityId');

    if (!investment) {
      return NextResponse.json(
        { error: 'Investment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: investment,
    });
  } catch (error) {
    console.error('Error fetching investment:', error);
    return NextResponse.json(
      { error: 'Failed to fetch investment' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/investments/[id]
 * Updates a specific investment (e.g., change auto-compound setting)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { autoCompound } = body;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid investment ID format' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Find and update the investment
    const investment = await UserInvestment.findByIdAndUpdate(
      id,
      { $set: { autoCompound } },
      { new: true, runValidators: true }
    );

    if (!investment) {
      return NextResponse.json(
        { error: 'Investment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: investment,
    });
  } catch (error) {
    console.error('Error updating investment:', error);
    return NextResponse.json(
      { error: 'Failed to update investment' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/investments/[id]/withdraw
 * Processes a withdrawal request for an investment
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { withdrawTxHash, amount } = body;
    
    // Check for withdrawal path
    const isWithdrawal = request.nextUrl.pathname.endsWith('/withdraw');
    
    if (!isWithdrawal) {
      return NextResponse.json(
        { error: 'Invalid operation' },
        { status: 400 }
      );
    }

    // Validate inputs
    if (!withdrawTxHash) {
      return NextResponse.json(
        { error: 'Withdraw transaction hash is required' },
        { status: 400 }
      );
    }

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid investment ID format' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Find the investment
    const investment = await UserInvestment.findById(id);

    if (!investment) {
      return NextResponse.json(
        { error: 'Investment not found' },
        { status: 404 }
      );
    }

    if (investment.status === 'withdrawn') {
      return NextResponse.json(
        { error: 'Investment has already been withdrawn' },
        { status: 400 }
      );
    }

    // Determine withdrawal amount (partial or full)
    const withdrawalAmount = amount || investment.currentValue;
    
    // Update the investment
    const updatedInvestment = await UserInvestment.findByIdAndUpdate(
      id,
      { 
        $set: { 
          withdrawTxHash,
          status: withdrawalAmount >= investment.currentValue ? 'withdrawn' : 'active',
          endDate: withdrawalAmount >= investment.currentValue ? new Date() : undefined,
          currentValue: investment.currentValue - withdrawalAmount
        } 
      },
      { new: true }
    );

    // Record the transaction
    await Transaction.create({
      userId: investment.userId,
      walletAddress: investment.walletAddress,
      type: 'withdrawal',
      amount: withdrawalAmount,
      currency: investment.currency,
      txHash: withdrawTxHash,
      status: 'pending', // Will be updated when confirmed on-chain
      opportunityId: investment.opportunityId,
      timestamp: new Date(),
    });

    return NextResponse.json({
      success: true,
      data: updatedInvestment,
      message: withdrawalAmount >= investment.currentValue 
        ? 'Full withdrawal processed successfully' 
        : 'Partial withdrawal processed successfully'
    });
  } catch (error) {
    console.error('Error processing withdrawal:', error);
    return NextResponse.json(
      { error: 'Failed to process withdrawal' },
      { status: 500 }
    );
  }
}
