import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb/connection';
import YieldOpportunity from '@/lib/mongodb/models/YieldOpportunity';
import mongoose from 'mongoose';

/**
 * GET /api/opportunities/[id]
 * Retrieves a specific yield opportunity by ID
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
        { error: 'Invalid opportunity ID format' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Find the opportunity
    const opportunity = await YieldOpportunity.findById(id);

    if (!opportunity) {
      return NextResponse.json(
        { error: 'Yield opportunity not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: opportunity,
    });
  } catch (error) {
    console.error('Error fetching opportunity:', error);
    return NextResponse.json(
      { error: 'Failed to fetch yield opportunity' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/opportunities/[id]
 * Updates a specific yield opportunity
 * This endpoint would be protected in production
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid opportunity ID format' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Find and update the opportunity
    const opportunity = await YieldOpportunity.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!opportunity) {
      return NextResponse.json(
        { error: 'Yield opportunity not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: opportunity,
    });
  } catch (error) {
    console.error('Error updating opportunity:', error);
    return NextResponse.json(
      { error: 'Failed to update yield opportunity' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/opportunities/[id]
 * Deletes a specific yield opportunity
 * This endpoint would be protected in production
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid opportunity ID format' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Find and delete the opportunity
    const opportunity = await YieldOpportunity.findByIdAndDelete(id);

    if (!opportunity) {
      return NextResponse.json(
        { error: 'Yield opportunity not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Yield opportunity deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting opportunity:', error);
    return NextResponse.json(
      { error: 'Failed to delete yield opportunity' },
      { status: 500 }
    );
  }
}
