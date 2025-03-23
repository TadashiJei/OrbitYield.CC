import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb/connect';
import mongoose from 'mongoose';
import { YieldOpportunitySchema } from '@/lib/mongodb/schemas';

/**
 * GET /api/opportunities
 * Retrieves yield opportunities with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    // Connect to database
    await connectDB();

    // Get the model (server-side only)
    const YieldOpportunity = mongoose.models.YieldOpportunity || 
      mongoose.model('YieldOpportunity', YieldOpportunitySchema);

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const chain = searchParams.get('chain');
    const asset = searchParams.get('asset');
    const protocol = searchParams.get('protocol');
    const strategyType = searchParams.get('strategyType');
    const riskLevel = searchParams.get('riskLevel');
    const minApy = searchParams.get('minApy');
    const maxApy = searchParams.get('maxApy');
    const isActive = searchParams.get('isActive');
    const sortParam = searchParams.get('sort');
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);

    // Build query filters
    const filters: any = {};
    
    if (chain) filters.chain = chain;
    if (asset) filters.asset = asset;
    if (protocol) filters.protocol = protocol;
    if (strategyType) filters.strategyType = strategyType;
    if (riskLevel) filters.riskLevel = riskLevel;
    if (isActive !== null) filters.isActive = isActive === 'true';
    
    if (minApy) filters.apy = { $gte: parseFloat(minApy) };
    if (maxApy) {
      filters.apy = { ...filters.apy, $lte: parseFloat(maxApy) };
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Build sort options
    const sortOptions: any = {};
    if (sortParam) {
      const [field, order] = sortParam.split(':');
      sortOptions[field] = order === 'asc' ? 1 : -1;
    } else {
      sortOptions['apy'] = -1; // Default sort by APY descending
    }
    
    // Execute the query
    const opportunities = await YieldOpportunity.find(filters)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);
      
    // Get total count for pagination
    const totalCount = await YieldOpportunity.countDocuments(filters);
    
    return NextResponse.json({
      success: true,
      data: opportunities,
      pagination: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch yield opportunities' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/opportunities
 * Creates a new yield opportunity
 * This endpoint would be protected in production
 */
export async function POST(request: NextRequest) {
  try {
    // Get request body
    const body = await request.json();
    
    // TODO: Add validation for required fields
    
    // Connect to database
    await connectDB();
    
    // Get the model (server-side only)
    const YieldOpportunity = mongoose.models.YieldOpportunity || 
      mongoose.model('YieldOpportunity', YieldOpportunitySchema);
    
    // Create new opportunity
    const opportunity = await YieldOpportunity.create({
      ...body,
      startDate: body.startDate || new Date(),
    });
    
    return NextResponse.json({
      success: true,
      data: opportunity,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating opportunity:', error);
    return NextResponse.json(
      { error: 'Failed to create yield opportunity' },
      { status: 500 }
    );
  }
}
