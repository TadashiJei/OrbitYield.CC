import { NextRequest, NextResponse } from 'next/server';
import { ethers } from 'ethers';
import { Asset, RebalancingAction, PortfolioRebalanceReport } from '@/components/yield/PortfolioRebalancer';

/**
 * API route to fetch portfolio rebalancing recommendations
 * 
 * @param request NextRequest object containing query parameters
 * @returns JSON response with rebalancing recommendations
 */
export async function GET(request: NextRequest) {
  // Get query parameters
  const searchParams = request.nextUrl.searchParams;
  const walletAddress = searchParams.get('walletAddress');

  if (!walletAddress || !ethers.utils.isAddress(walletAddress)) {
    return NextResponse.json({
      success: false,
      error: 'Invalid wallet address'
    }, { status: 400 });
  }

  try {
    // In a real implementation, we would fetch the user's portfolio data from a database
    // or blockchain and analyze it for rebalancing opportunities
    
    // For demonstration purposes, we'll create a simulated portfolio rebalance report
    const rebalanceReport = generateSimulatedRebalanceReport(walletAddress);

    return NextResponse.json({
      success: true,
      data: rebalanceReport
    });
  } catch (error: any) {
    console.error('Error generating portfolio rebalance report:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to generate portfolio rebalance report'
    }, { status: 500 });
  }
}

/**
 * Generates a simulated portfolio rebalance report for demonstration purposes
 * 
 * @param walletAddress The user's wallet address
 * @returns A portfolio rebalance report
 */
function generateSimulatedRebalanceReport(walletAddress: string): PortfolioRebalanceReport {
  // Simulated current portfolio
  const currentAssets: Asset[] = [
    {
      symbol: 'DOT',
      amount: 150,
      valueUSD: 1500,
      chain: 'Polkadot',
      protocol: 'Acala',
      apy: 7.5,
      risk: 4
    },
    {
      symbol: 'USDT',
      amount: 2000,
      valueUSD: 2000,
      chain: 'Polkadot',
      protocol: 'Parallel',
      apy: 4.2,
      risk: 2
    },
    {
      symbol: 'KSM',
      amount: 25,
      valueUSD: 750,
      chain: 'Kusama',
      protocol: 'Karura',
      apy: 9.8,
      risk: 6
    },
    {
      symbol: 'ACA',
      amount: 1500,
      valueUSD: 450,
      chain: 'Polkadot',
      protocol: 'Acala',
      apy: 5.5,
      risk: 5
    }
  ];

  // Calculate current portfolio metrics
  const currentTotalValue = currentAssets.reduce((total, asset) => total + asset.valueUSD, 0);
  const currentWeightedAPY = currentAssets.reduce((total, asset) => 
    total + (asset.apy! * (asset.valueUSD / currentTotalValue)), 0);
  const currentWeightedRisk = currentAssets.reduce((total, asset) => 
    total + (asset.risk! * (asset.valueUSD / currentTotalValue)), 0);
  const currentDiversificationScore = calculateDiversificationScore(currentAssets);

  // Simulated recommended portfolio
  const recommendedAssets: Asset[] = [
    {
      symbol: 'DOT',
      amount: 120,
      valueUSD: 1200,
      chain: 'Polkadot',
      protocol: 'Acala',
      apy: 7.5,
      risk: 4
    },
    {
      symbol: 'USDT',
      amount: 1800,
      valueUSD: 1800,
      chain: 'Polkadot',
      protocol: 'Parallel',
      apy: 4.2,
      risk: 2
    },
    {
      symbol: 'KSM',
      amount: 35,
      valueUSD: 1050,
      chain: 'Kusama',
      protocol: 'Karura',
      apy: 9.8,
      risk: 6
    },
    {
      symbol: 'ACA',
      amount: 1500,
      valueUSD: 450,
      chain: 'Polkadot',
      protocol: 'Acala',
      apy: 5.5,
      risk: 5
    },
    {
      symbol: 'USDT',
      amount: 200,
      valueUSD: 200,
      chain: 'Moonbeam',
      protocol: 'Moonwell',
      apy: 5.8,
      risk: 3
    },
    {
      symbol: 'GLMR',
      amount: 500,
      valueUSD: 400,
      chain: 'Moonbeam',
      protocol: 'Moonwell',
      apy: 12.5,
      risk: 7
    }
  ];

  // Calculate recommended portfolio metrics
  const recommendedTotalValue = recommendedAssets.reduce((total, asset) => total + asset.valueUSD, 0);
  const recommendedWeightedAPY = recommendedAssets.reduce((total, asset) => 
    total + (asset.apy! * (asset.valueUSD / recommendedTotalValue)), 0);
  const recommendedWeightedRisk = recommendedAssets.reduce((total, asset) => 
    total + (asset.risk! * (asset.valueUSD / recommendedTotalValue)), 0);
  const recommendedDiversificationScore = calculateDiversificationScore(recommendedAssets);

  // Generate rebalancing actions
  const actions: RebalancingAction[] = [
    {
      fromAsset: currentAssets[0], // DOT from Acala
      toAsset: recommendedAssets[2], // KSM on Karura
      amountToMove: 30,
      valueToMove: 300,
      reason: "Higher APY on Karura while maintaining reasonable risk profile",
      expectedAPYIncrease: 2.3,
      riskChange: 'increased'
    },
    {
      fromAsset: currentAssets[1], // USDT on Parallel
      toAsset: recommendedAssets[5], // GLMR on Moonwell
      amountToMove: 400,
      valueToMove: 400,
      reason: "Diversify into Moonbeam ecosystem with higher yield potential",
      expectedAPYIncrease: 8.3,
      riskChange: 'increased'
    },
    {
      fromAsset: currentAssets[1], // USDT on Parallel
      toAsset: recommendedAssets[4], // USDT on Moonwell
      amountToMove: 200,
      valueToMove: 200,
      reason: "Same asset with higher APY on Moonwell",
      expectedAPYIncrease: 1.6,
      riskChange: 'increased'
    }
  ];

  // Calculate potential improvements
  const potentialAPYIncrease = recommendedWeightedAPY - currentWeightedAPY;
  const potentialRiskChange = recommendedWeightedRisk - currentWeightedRisk;
  const estimatedAnnualYieldDifference = (recommendedWeightedAPY / 100 * recommendedTotalValue) - 
                                         (currentWeightedAPY / 100 * currentTotalValue);

  return {
    currentPortfolio: {
      assets: currentAssets,
      totalValue: currentTotalValue,
      weightedAPY: currentWeightedAPY,
      weightedRisk: currentWeightedRisk,
      diversificationScore: currentDiversificationScore
    },
    recommendedPortfolio: {
      assets: recommendedAssets,
      totalValue: recommendedTotalValue,
      weightedAPY: recommendedWeightedAPY,
      weightedRisk: recommendedWeightedRisk,
      diversificationScore: recommendedDiversificationScore
    },
    actions,
    potentialAPYIncrease,
    potentialRiskChange,
    estimatedAnnualYieldDifference
  };
}

/**
 * Calculates a diversification score based on asset distribution
 * 
 * @param assets Array of assets in the portfolio
 * @returns A diversification score from 0-100
 */
function calculateDiversificationScore(assets: Asset[]): number {
  if (assets.length === 0) return 0;
  
  const totalValue = assets.reduce((sum, asset) => sum + asset.valueUSD, 0);
  
  // Check asset diversity
  const uniqueAssets = new Set(assets.map(a => a.symbol)).size;
  const assetDiversity = Math.min(uniqueAssets / 5, 1); // Max score at 5+ assets
  
  // Check chain diversity
  const uniqueChains = new Set(assets.map(a => a.chain)).size;
  const chainDiversity = Math.min(uniqueChains / 3, 1); // Max score at 3+ chains
  
  // Check protocol diversity
  const uniqueProtocols = new Set(assets.map(a => a.protocol)).size;
  const protocolDiversity = Math.min(uniqueProtocols / 4, 1); // Max score at 4+ protocols
  
  // Check balance of allocations (Herfindahl-Hirschman Index, inverted)
  const concentrationIndex = assets.reduce((sum, asset) => {
    const percentage = asset.valueUSD / totalValue;
    return sum + percentage * percentage;
  }, 0);
  const balanceScore = 1 - concentrationIndex; // 1 is perfectly balanced, ~0 is concentrated
  
  // Weighted score calculation
  const score = (
    assetDiversity * 0.3 +
    chainDiversity * 0.25 +
    protocolDiversity * 0.25 +
    balanceScore * 0.2
  ) * 100;
  
  return Math.round(score);
}
