import { NextRequest, NextResponse } from 'next/server';
import { YieldOptimizer } from '@/lib/yield/yield-optimizer';
import { ethers } from 'ethers';

// Mock contract addresses for development
const MOCK_AGGREGATOR_ADDRESS = '0x1234567890123456789012345678901234567890';
const MOCK_FACTORY_ADDRESS = '0x0987654321098765432109876543210987654321';

/**
 * GET /api/yield/opportunities
 * Retrieve all available yield opportunities
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const assetAddress = searchParams.get('assetAddress');
    const minApy = searchParams.get('minApy');
    const maxRisk = searchParams.get('maxRisk');
    const strategyType = searchParams.get('strategyType');
    
    // Create a provider and optimizer
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_POLKADOT_RPC_URL
    );
    
    const optimizer = new YieldOptimizer(
      provider,
      MOCK_AGGREGATOR_ADDRESS,
      MOCK_FACTORY_ADDRESS
    );
    
    // Get all opportunities
    let opportunities = await optimizer.discoverOpportunities();
    
    // Apply filters if provided
    if (assetAddress) {
      opportunities = opportunities.filter(
        opp => opp.assetAddress.toLowerCase() === assetAddress.toLowerCase()
      );
    }
    
    if (minApy) {
      const minApyValue = parseInt(minApy, 10);
      opportunities = opportunities.filter(opp => opp.apy >= minApyValue);
    }
    
    if (maxRisk) {
      const maxRiskValue = parseInt(maxRisk, 10);
      opportunities = opportunities.filter(opp => opp.risk <= maxRiskValue);
    }
    
    if (strategyType) {
      opportunities = opportunities.filter(opp => opp.strategyType === strategyType);
    }
    
    return NextResponse.json({
      success: true,
      data: opportunities
    });
  } catch (error) {
    console.error('Error retrieving yield opportunities:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve yield opportunities'
      },
      { status: 500 }
    );
  }
}
