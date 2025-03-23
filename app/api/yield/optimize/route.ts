import { NextRequest, NextResponse } from 'next/server';
import { YieldOptimizer, YieldPreferences } from '@/lib/yield/yield-optimizer';
import { ethers } from 'ethers';

// Mock contract addresses for development
const MOCK_AGGREGATOR_ADDRESS = '0x1234567890123456789012345678901234567890';
const MOCK_FACTORY_ADDRESS = '0x0987654321098765432109876543210987654321';

/**
 * POST /api/yield/optimize
 * Generate an optimized yield portfolio based on user preferences
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { totalAmount, preferences, assetAllocations } = body;
    
    if (!totalAmount || !preferences) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required parameters'
        },
        { status: 400 }
      );
    }
    
    // Validate input
    if (!ethers.utils.isHexString(totalAmount) && isNaN(Number(totalAmount))) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid totalAmount format'
        },
        { status: 400 }
      );
    }
    
    // Create a provider and optimizer
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_POLKADOT_RPC_URL
    );
    
    const optimizer = new YieldOptimizer(
      provider,
      MOCK_AGGREGATOR_ADDRESS,
      MOCK_FACTORY_ADDRESS
    );
    
    // Validate and prepare preferences
    const validatedPreferences: YieldPreferences = {
      riskTolerance: preferences.riskTolerance || 5, // Default to medium risk
      minAPY: preferences.minAPY,
      maxAPY: preferences.maxAPY,
      preferredAssets: preferences.preferredAssets,
      preferredProtocols: preferences.preferredProtocols,
      lockupTolerance: preferences.lockupTolerance,
      prioritizeAPY: preferences.prioritizeAPY || false,
      excludedProtocols: preferences.excludedProtocols,
      excludedAssets: preferences.excludedAssets,
      prioritizeCompounding: preferences.prioritizeCompounding || false
    };
    
    // Convert totalAmount to proper format if needed
    const formattedAmount = ethers.utils.isHexString(totalAmount)
      ? totalAmount
      : ethers.utils.parseEther(totalAmount.toString()).toString();
    
    // Generate optimized portfolio
    const optimizedPortfolio = await optimizer.generateOptimizedPortfolio(
      formattedAmount,
      validatedPreferences,
      assetAllocations
    );
    
    return NextResponse.json({
      success: true,
      data: {
        totalAPY: optimizedPortfolio.totalAPY,
        totalRisk: optimizedPortfolio.totalRisk,
        allocations: optimizedPortfolio.allocations.map(allocation => ({
          opportunity: allocation.opportunity,
          amount: allocation.amount,
          percentage: allocation.percentage,
          expectedAnnualYield: ethers.utils.formatEther(
            ethers.BigNumber.from(allocation.amount)
              .mul(allocation.opportunity.apy)
              .div(10000)
          )
        }))
      }
    });
  } catch (error) {
    console.error('Error optimizing yield portfolio:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to optimize yield portfolio'
      },
      { status: 500 }
    );
  }
}
