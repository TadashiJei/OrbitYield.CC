import { ethers } from 'ethers';
import { crossChainService, CrossChainAsset } from '../cross-chain/cross-chain-service';

export interface YieldOpportunity {
  id: string;
  name: string;
  asset: string;
  assetSymbol: string;
  protocol: string;
  chain: string;
  chainId: number;
  apy: number;
  tvl: number;
  minDeposit: number;
  maxDeposit: number | null;
  riskLevel: 'Low' | 'Medium' | 'High';
  strategyType: 'Lending' | 'Staking' | 'Liquidity' | 'Farming';
  description: string;
  url: string;
  logoUrl: string;
  verified: boolean;
  created: Date;
  updated: Date;
}

export interface OptimizationCriteria {
  riskTolerance: 'Low' | 'Medium' | 'High';
  prioritizeHighestYield: boolean;
  preferredChains?: number[];
  preferredAssets?: string[];
  preferredProtocols?: string[];
  minLiquidity?: number;
  maxSlippage?: number;
}

export interface YieldRecommendation {
  opportunity: YieldOpportunity;
  score: number;
  reasons: string[];
  estimatedAnnualReturns: number;
  estimatedAnnualRewardsUsd: number;
  potentialOptimizations: string[];
}

export interface OptimizationReport {
  recommendations: YieldRecommendation[];
  totalPotentialYield: number;
  totalCurrentYield: number;
  potentialAdditionalYield: number;
  riskAssessment: {
    averageRisk: number;
    diversificationScore: number;
    protocolRiskScore: number;
    impermanentLossRisk: number;
  };
}

class YieldOptimizationService {
  private defaultCriteria: OptimizationCriteria = {
    riskTolerance: 'Medium',
    prioritizeHighestYield: true,
    minLiquidity: 1000000, // $1M minimum liquidity
    maxSlippage: 1.0, // 1% max slippage
  };

  // Fetch all available yield opportunities across supported chains
  async getAllOpportunities(): Promise<YieldOpportunity[]> {
    try {
      const response = await fetch('/api/opportunities?limit=100');
      const data = await response.json();
      
      if (data.success) {
        return data.data;
      }
      
      return this.getMockedOpportunities();
    } catch (error) {
      console.error('Error fetching opportunities:', error);
      return this.getMockedOpportunities();
    }
  }
  
  // Find optimal yield opportunities based on user's assets and criteria
  async findOptimalYieldOpportunities(
    walletAddress: string,
    criteria: Partial<OptimizationCriteria> = {}
  ): Promise<OptimizationReport> {
    // Merge default criteria with user criteria
    const optimizationCriteria = { ...this.defaultCriteria, ...criteria };
    
    // Get user's assets across all chains
    const userAssets = await crossChainService.getAssetsAcrossChains(walletAddress);
    
    // Get all available yield opportunities
    const opportunities = await this.getAllOpportunities();
    
    // Calculate current yield (if any assets are already in yield positions)
    const totalValue = userAssets.reduce((sum, asset) => sum + asset.balanceUsd, 0);
    const totalCurrentYield = 0; // This would need to be calculated based on current positions
    
    // Score and rank opportunities based on user's assets and criteria
    const scoredOpportunities = opportunities
      .map(opportunity => this.scoreOpportunity(opportunity, userAssets, optimizationCriteria))
      .filter(recommendation => recommendation.score > 0)
      .sort((a, b) => b.score - a.score);
    
    // Calculate potential yield
    const totalPotentialYield = this.calculateTotalPotentialYield(scoredOpportunities, totalValue);
    
    // Generate optimization report
    return {
      recommendations: scoredOpportunities.slice(0, 5), // Top 5 recommendations
      totalPotentialYield: totalPotentialYield,
      totalCurrentYield: totalCurrentYield,
      potentialAdditionalYield: totalPotentialYield - totalCurrentYield,
      riskAssessment: this.calculateRiskMetrics(scoredOpportunities, optimizationCriteria)
    };
  }
  
  // Score an individual opportunity based on user assets and criteria
  private scoreOpportunity(
    opportunity: YieldOpportunity,
    userAssets: CrossChainAsset[],
    criteria: OptimizationCriteria
  ): YieldRecommendation {
    const reasons: string[] = [];
    let score = 0;
    
    // Find if user has the required asset
    const matchingAssets = userAssets.filter(asset => 
      asset.assetSymbol.toLowerCase() === opportunity.assetSymbol.toLowerCase() &&
      asset.chainId === opportunity.chainId
    );
    
    // If no matching assets, score is 0 (but we might still recommend cross-chain transfers later)
    if (matchingAssets.length === 0) {
      // Check if user has the asset on another chain
      const assetOnOtherChains = userAssets.filter(asset => 
        asset.assetSymbol.toLowerCase() === opportunity.assetSymbol.toLowerCase() &&
        asset.chainId !== opportunity.chainId
      );
      
      if (assetOnOtherChains.length > 0) {
        score += 20; // Base score for cross-chain opportunity
        reasons.push(`You have ${opportunity.assetSymbol} on another chain that could be transferred`);
      } else {
        score = 5; // Very low score since user doesn't have the asset at all
        reasons.push(`You don't currently hold ${opportunity.assetSymbol}`);
      }
    } else {
      score += 100; // Base score for matching asset
      reasons.push(`You have ${matchingAssets[0].balanceUsd.toFixed(2)} USD in ${opportunity.assetSymbol} on ${opportunity.chain}`);
    }
    
    // Score based on APY (higher APY = higher score)
    if (criteria.prioritizeHighestYield) {
      score += opportunity.apy * 5;
      if (opportunity.apy > 15) {
        reasons.push(`High APY of ${opportunity.apy.toFixed(2)}%`);
      }
    }
    
    // Risk tolerance matching
    const riskScores = { 'Low': 1, 'Medium': 2, 'High': 3 };
    const userRiskScore = riskScores[criteria.riskTolerance];
    const opportunityRiskScore = riskScores[opportunity.riskLevel];
    
    if (opportunityRiskScore <= userRiskScore) {
      score += 50 - (20 * (userRiskScore - opportunityRiskScore));
      reasons.push(`Risk level (${opportunity.riskLevel}) matches your risk tolerance`);
    } else {
      score -= 50 * (opportunityRiskScore - userRiskScore);
      reasons.push(`Risk level (${opportunity.riskLevel}) is higher than your risk tolerance`);
    }
    
    // Preferred chain bonus
    if (criteria.preferredChains && criteria.preferredChains.includes(opportunity.chainId)) {
      score += 30;
      reasons.push(`${opportunity.chain} is among your preferred chains`);
    }
    
    // Preferred protocol bonus
    if (criteria.preferredProtocols && criteria.preferredProtocols.includes(opportunity.protocol.toLowerCase())) {
      score += 20;
      reasons.push(`${opportunity.protocol} is among your preferred protocols`);
    }
    
    // Liquidity check
    if (opportunity.tvl < (criteria.minLiquidity || 0)) {
      score -= 40;
      reasons.push(`Low liquidity (${opportunity.tvl.toLocaleString()} USD TVL)`);
    }
    
    // Verified protocol bonus
    if (opportunity.verified) {
      score += 25;
      reasons.push('Verified protocol with security audits');
    }
    
    // Calculate estimated returns
    const relevantAsset = matchingAssets[0];
    const estimatedAnnualRewardsUsd = relevantAsset 
      ? relevantAsset.balanceUsd * (opportunity.apy / 100)
      : 0;
    
    // Generate optimization suggestions
    const potentialOptimizations = this.generateOptimizations(opportunity, userAssets);
    
    return {
      opportunity,
      score: Math.max(0, score), // Ensure score is not negative
      reasons,
      estimatedAnnualReturns: opportunity.apy,
      estimatedAnnualRewardsUsd,
      potentialOptimizations
    };
  }
  
  // Generate potential optimization suggestions
  private generateOptimizations(
    opportunity: YieldOpportunity,
    userAssets: CrossChainAsset[]
  ): string[] {
    const optimizations: string[] = [];
    
    // Check if user has the asset on another chain
    const assetOnOtherChains = userAssets.filter(asset => 
      asset.assetSymbol.toLowerCase() === opportunity.assetSymbol.toLowerCase() &&
      asset.chainId !== opportunity.chainId
    );
    
    if (assetOnOtherChains.length > 0) {
      assetOnOtherChains.forEach(asset => {
        optimizations.push(
          `Transfer ${asset.assetSymbol} from ${asset.chainName} to ${opportunity.chain} for higher yield`
        );
      });
    }
    
    // Add other optimization strategies
    if (opportunity.strategyType === 'Liquidity' || opportunity.strategyType === 'Farming') {
      optimizations.push('Consider impermanent loss risks with this strategy');
    }
    
    if (opportunity.riskLevel === 'Low' && opportunity.apy > 10) {
      optimizations.push('Good risk-to-reward ratio compared to alternatives');
    }
    
    return optimizations;
  }
  
  // Calculate total potential yield from scored opportunities
  private calculateTotalPotentialYield(
    recommendations: YieldRecommendation[],
    totalPortfolioValue: number
  ): number {
    // Simple model: assume top 3 recommendations with equal allocation
    const topRecommendations = recommendations.slice(0, 3);
    if (topRecommendations.length === 0) return 0;
    
    // Calculate weighted average APY
    const averageApy = topRecommendations.reduce((sum, rec) => sum + rec.opportunity.apy, 0) / 
                       topRecommendations.length;
    
    // Return the weighted average APY
    return averageApy;
  }
  
  // Calculate risk metrics for the optimization report
  private calculateRiskMetrics(
    recommendations: YieldRecommendation[],
    criteria: OptimizationCriteria
  ): {
    averageRisk: number;
    diversificationScore: number;
    protocolRiskScore: number;
    impermanentLossRisk: number;
  } {
    // Map risk levels to numeric scores
    const riskScores = { 'Low': 1, 'Medium': 2, 'High': 3 };
    
    // Calculate average risk score from top recommendations
    const topRecommendations = recommendations.slice(0, 5);
    if (topRecommendations.length === 0) {
      return {
        averageRisk: 0,
        diversificationScore: 0,
        protocolRiskScore: 0,
        impermanentLossRisk: 0
      };
    }
    
    // Average risk
    const averageRisk = topRecommendations.reduce(
      (sum, rec) => sum + riskScores[rec.opportunity.riskLevel], 0
    ) / topRecommendations.length;
    
    // Diversification: higher score is better (more diverse)
    const uniqueChains = new Set(topRecommendations.map(rec => rec.opportunity.chainId)).size;
    const uniqueProtocols = new Set(topRecommendations.map(rec => rec.opportunity.protocol)).size;
    const uniqueStrategyTypes = new Set(topRecommendations.map(rec => rec.opportunity.strategyType)).size;
    
    const diversificationScore = (
      (uniqueChains / Math.min(topRecommendations.length, 3)) * 0.4 +
      (uniqueProtocols / Math.min(topRecommendations.length, 4)) * 0.4 +
      (uniqueStrategyTypes / Math.min(topRecommendations.length, 3)) * 0.2
    ) * 100;
    
    // Protocol risk (lower is better)
    const protocolRiskScore = topRecommendations.reduce(
      (score, rec) => score + (rec.opportunity.verified ? 0 : 2), 0
    ) / topRecommendations.length * 50;
    
    // Impermanent loss risk (percentage of strategies with IL risk)
    const strategiesWithILRisk = topRecommendations.filter(
      rec => rec.opportunity.strategyType === 'Liquidity' || rec.opportunity.strategyType === 'Farming'
    ).length;
    
    const impermanentLossRisk = (strategiesWithILRisk / topRecommendations.length) * 100;
    
    return {
      averageRisk,
      diversificationScore,
      protocolRiskScore,
      impermanentLossRisk
    };
  }
  
  // Return mock opportunities for development/testing
  private getMockedOpportunities(): YieldOpportunity[] {
    return [
      {
        id: 'op-1',
        name: 'DOT Staking Pool',
        asset: 'DOT',
        assetSymbol: 'DOT',
        protocol: 'Polkadot Native',
        chain: 'Polkadot',
        chainId: 0,
        apy: 14.5,
        tvl: 245000000,
        minDeposit: 5,
        maxDeposit: null,
        riskLevel: 'Low',
        strategyType: 'Staking',
        description: 'Stake DOT tokens to secure the Polkadot network and earn rewards',
        url: 'https://polkadot.network/staking/',
        logoUrl: '/assets/protocols/polkadot.png',
        verified: true,
        created: new Date('2023-01-01'),
        updated: new Date('2023-06-15')
      },
      {
        id: 'op-2',
        name: 'ASTR-USDT LP',
        asset: 'ASTR-USDT',
        assetSymbol: 'ASTR',
        protocol: 'Arthswap',
        chain: 'Astar',
        chainId: 592,
        apy: 24.8,
        tvl: 5200000,
        minDeposit: 10,
        maxDeposit: null,
        riskLevel: 'Medium',
        strategyType: 'Liquidity',
        description: 'Provide liquidity for ASTR-USDT pair on Arthswap and earn trading fees plus ARSW rewards',
        url: 'https://app.arthswap.org/',
        logoUrl: '/assets/protocols/arthswap.png',
        verified: true,
        created: new Date('2023-02-10'),
        updated: new Date('2023-06-20')
      },
      {
        id: 'op-3',
        name: 'GLMR Lending',
        asset: 'GLMR',
        assetSymbol: 'GLMR',
        protocol: 'Moonwell',
        chain: 'Moonbeam',
        chainId: 1284,
        apy: 6.2,
        tvl: 8700000,
        minDeposit: 100,
        maxDeposit: null,
        riskLevel: 'Low',
        strategyType: 'Lending',
        description: 'Lend your GLMR tokens on Moonwell and earn interest',
        url: 'https://moonwell.fi/',
        logoUrl: '/assets/protocols/moonwell.png',
        verified: true,
        created: new Date('2023-03-15'),
        updated: new Date('2023-06-25')
      },
      {
        id: 'op-4',
        name: 'MOVR-ETH Farm',
        asset: 'MOVR-ETH',
        assetSymbol: 'MOVR',
        protocol: 'SolarBeam',
        chain: 'Moonriver',
        chainId: 1285,
        apy: 42.3,
        tvl: 1200000,
        minDeposit: 0.1,
        maxDeposit: null,
        riskLevel: 'High',
        strategyType: 'Farming',
        description: 'Farm SOLAR tokens by providing liquidity to MOVR-ETH pair',
        url: 'https://app.solarbeam.io/farm',
        logoUrl: '/assets/protocols/solarbeam.png',
        verified: true,
        created: new Date('2023-01-20'),
        updated: new Date('2023-06-18')
      },
      {
        id: 'op-5',
        name: 'USDT Lending',
        asset: 'USDT',
        assetSymbol: 'USDT',
        protocol: 'Acala',
        chain: 'Polkadot',
        chainId: 0,
        apy: 4.8,
        tvl: 12500000,
        minDeposit: 50,
        maxDeposit: null,
        riskLevel: 'Low',
        strategyType: 'Lending',
        description: 'Lend USDT on Acala to earn interest',
        url: 'https://apps.acala.network/',
        logoUrl: '/assets/protocols/acala.png',
        verified: true,
        created: new Date('2023-02-05'),
        updated: new Date('2023-06-22')
      },
      {
        id: 'op-6',
        name: 'KSM Staking',
        asset: 'KSM',
        assetSymbol: 'KSM',
        protocol: 'Kusama Native',
        chain: 'Kusama',
        chainId: 1,
        apy: 18.7,
        tvl: 32000000,
        minDeposit: 0.1,
        maxDeposit: null,
        riskLevel: 'Medium',
        strategyType: 'Staking',
        description: 'Stake KSM tokens to secure the Kusama network and earn rewards',
        url: 'https://kusama.network/',
        logoUrl: '/assets/protocols/kusama.png',
        verified: true,
        created: new Date('2023-01-10'),
        updated: new Date('2023-06-17')
      }
    ];
  }
}

// Create singleton instance
export const yieldOptimizationService = new YieldOptimizationService();
export default yieldOptimizationService;
