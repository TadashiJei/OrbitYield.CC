import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/mongodb/connection';
import Transaction from '@/lib/mongodb/models/Transaction';
import YieldOpportunity from '@/lib/mongodb/models/YieldOpportunity';
import UserInvestment from '@/lib/mongodb/models/UserInvestment';

/**
 * GET /api/transactions/[id]
 * Retrieves a specific transaction by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid transaction ID format' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Find transaction
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    // Fetch related data if available
    let relatedData: any = {};

    // If transaction is related to an opportunity, fetch opportunity details
    if (transaction.opportunityId && mongoose.Types.ObjectId.isValid(transaction.opportunityId)) {
      const opportunity = await YieldOpportunity.findById(transaction.opportunityId);
      if (opportunity) {
        relatedData.opportunity = opportunity;
      }
    }

    // If transaction is related to an investment, fetch investment details
    if (transaction.investmentId && mongoose.Types.ObjectId.isValid(transaction.investmentId)) {
      const investment = await UserInvestment.findById(transaction.investmentId);
      if (investment) {
        relatedData.investment = investment;
      }
    }

    return NextResponse.json({
      success: true,
      data: transaction,
      relatedData: Object.keys(relatedData).length > 0 ? relatedData : undefined,
    });
  } catch (error) {
    console.error('Error fetching transaction:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transaction' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/transactions/[id]
 * Updates a transaction (typically used to update status)
 * This would typically be called by internal processes,
 * such as blockchain callback functions
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid transaction ID format' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Find transaction
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    // Update fields
    if (body.status) transaction.status = body.status;
    if (body.transactionHash) transaction.transactionHash = body.transactionHash;
    if (body.error) transaction.error = body.error;

    // Optional metadata update
    if (body.metadata) {
      transaction.metadata = {
        ...transaction.metadata,
        ...body.metadata,
      };
    }

    await transaction.save();

    // If this is an investment or withdrawal transaction and the status has changed,
    // update the related investment
    if (
      (transaction.type === 'investment' || transaction.type === 'withdrawal') &&
      transaction.investmentId &&
      mongoose.Types.ObjectId.isValid(transaction.investmentId) &&
      body.status
    ) {
      const investment = await UserInvestment.findById(transaction.investmentId);
      
      if (investment) {
        if (transaction.type === 'investment' && body.status === 'completed') {
          // Investment completed
          investment.status = 'active';
        } else if (transaction.type === 'withdrawal' && body.status === 'completed') {
          // Withdrawal completed
          investment.status = 'withdrawn';
          investment.withdrawnAt = new Date();
        }
        
        await investment.save();
      }
    }

    return NextResponse.json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    console.error('Error updating transaction:', error);
    return NextResponse.json(
      { error: 'Failed to update transaction' },
      { status: 500 }
    );
  }
}
