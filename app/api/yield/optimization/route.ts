import { NextRequest, NextResponse } from 'next/server';
import { yieldOptimizationService, OptimizationCriteria } from '@/lib/yield/optimization-service';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const walletAddress = searchParams.get('walletAddress');
    
    // Wallet address is required
    if (!walletAddress) {
      return NextResponse.json({
        success: false,
        error: 'Wallet address is required'
      }, { status: 400 });
    }
    
    // Parse optimization criteria from query parameters
    const criteria: Partial<OptimizationCriteria> = {};
    
    // Risk tolerance
    const riskTolerance = searchParams.get('riskTolerance');
    if (riskTolerance && ['Low', 'Medium', 'High'].includes(riskTolerance as any)) {
      criteria.riskTolerance = riskTolerance as 'Low' | 'Medium' | 'High';
    }
    
    // Priority settings
    const prioritizeHighestYield = searchParams.get('prioritizeHighestYield');
    if (prioritizeHighestYield !== null) {
      criteria.prioritizeHighestYield = prioritizeHighestYield === 'true';
    }
    
    // Preferred chains
    const preferredChainsParam = searchParams.get('preferredChains');
    if (preferredChainsParam) {
      const preferredChains = preferredChainsParam.split(',').map(id => parseInt(id.trim()));
      criteria.preferredChains = preferredChains;
    }
    
    // Preferred assets
    const preferredAssetsParam = searchParams.get('preferredAssets');
    if (preferredAssetsParam) {
      const preferredAssets = preferredAssetsParam.split(',').map(asset => asset.trim());
      criteria.preferredAssets = preferredAssets;
    }
    
    // Preferred protocols
    const preferredProtocolsParam = searchParams.get('preferredProtocols');
    if (preferredProtocolsParam) {
      const preferredProtocols = preferredProtocolsParam.split(',').map(protocol => protocol.trim());
      criteria.preferredProtocols = preferredProtocols;
    }
    
    // Min liquidity
    const minLiquidity = searchParams.get('minLiquidity');
    if (minLiquidity) {
      criteria.minLiquidity = parseInt(minLiquidity);
    }
    
    // Max slippage
    const maxSlippage = searchParams.get('maxSlippage');
    if (maxSlippage) {
      criteria.maxSlippage = parseFloat(maxSlippage);
    }
    
    // Call the optimization service to get personalized recommendations
    const optimizationReport = await yieldOptimizationService.findOptimalYieldOpportunities(
      walletAddress,
      criteria
    );
    
    return NextResponse.json({
      success: true,
      data: optimizationReport
    });
    
  } catch (error) {
    console.error('Error in optimization API:', error);
    return NextResponse.json({
      success: false,
      error: 'An error occurred while processing your request'
    }, { status: 500 });
  }
}
