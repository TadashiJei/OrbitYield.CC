import { YieldOpportunity } from '@/lib/yield/yield-optimizer';
import { Asset } from '@/components/yield/PortfolioRebalancer';

/**
 * Risk category classifications
 */
export enum RiskCategory {
  VERY_LOW = 'Very Low',
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  VERY_HIGH = 'Very High'
}

/**
 * Risk factors used in assessment
 */
export interface RiskFactors {
  protocolRisk: number; // 0-10
  contractAuditStatus: number; // 0-10 (10 = multiple audits)
  impermanentLossRisk: number; // 0-10
  liquidityDepth: number; // 0-10 (10 = very deep liquidity)
  volatilityRisk: number; // 0-10
  composabilityRisk: number; // 0-10 (risk due to dependencies)
  regulatoryRisk: number; // 0-10
  counterpartyRisk: number; // 0-10
}

/**
 * Impermanent loss calculation result
 */
export interface ImpermanentLossResult {
  lossPercentage: number;
  initialValue: number;
  currentValue: number;
  holdValue: number;
  priceDifference: number;
}

/**
 * Advanced risk assessment result
 */
export interface RiskAssessment {
  opportunity: YieldOpportunity;
  overallRiskScore: number; // 0-10
  riskCategory: RiskCategory;
  riskFactors: RiskFactors;
  impermanentLossEstimates?: ImpermanentLossResult[];
  recommendation: string;
  valueAtRisk: number; // Dollar amount at risk
  maximumDrawdown: number; // Maximum historical percent drawdown
  stressTestResults: {
    marketCrash: number; // Expected loss % in market crash
    protocolHack: number; // Expected loss % in protocol hack
    liquidityCrisis: number; // Expected loss % in liquidity crisis
  };
}

/**
 * Service for advanced risk modeling and assessment
 */
export class RiskModelingService {
  
  /**
   * Calculate a detailed risk assessment for a yield opportunity
   * @param opportunity Yield opportunity to assess
   * @param investmentAmount Optional investment amount for calculating value at risk
   * @returns Detailed risk assessment
   */
  assessOpportunityRisk(opportunity: YieldOpportunity, investmentAmount: number = 10000): RiskAssessment {
    // Initialize risk factors based on opportunity properties
    const riskFactors = this.calculateRiskFactors(opportunity);
    
    // Calculate overall risk score (weighted average of risk factors)
    const overallRiskScore = this.calculateOverallRiskScore(riskFactors);
    
    // Determine risk category based on overall score
    const riskCategory = this.determineRiskCategory(overallRiskScore);
    
    // Calculate impermanent loss estimates if this is an LP opportunity
    const impermanentLossEstimates = opportunity.strategyType === 'liquidity' 
      ? this.calculateImpermanentLossEstimates(opportunity)
      : undefined;
    
    // Calculate value at risk
    const valueAtRisk = this.calculateValueAtRisk(opportunity, overallRiskScore, investmentAmount);
    
    // Calculate maximum drawdown
    const maximumDrawdown = this.estimateMaximumDrawdown(opportunity, overallRiskScore);
    
    // Stress test the opportunity
    const stressTestResults = this.performStressTests(opportunity, riskFactors);
    
    // Generate recommendation
    const recommendation = this.generateRecommendation(opportunity, overallRiskScore, riskCategory);
    
    return {
      opportunity,
      overallRiskScore,
      riskCategory,
      riskFactors,
      impermanentLossEstimates,
      recommendation,
      valueAtRisk,
      maximumDrawdown,
      stressTestResults
    };
  }
  
  /**
   * Calculate risk factors for a yield opportunity
   * @param opportunity Yield opportunity to analyze
   * @returns Risk factors
   */
  private calculateRiskFactors(opportunity: YieldOpportunity): RiskFactors {
    // Protocol risk assessment based on TVL, history, and protocol reputation
    // In a real implementation, would fetch on-chain protocol data and audit status
    const protocolRisk = 10 - Math.min(10, Math.log10(opportunity.tvl || 1000000) / 2);
    
    // In a real implementation, would fetch actual audit status from a database
    const contractAuditStatus = this.getProtocolAuditStatus(opportunity.protocol);
    
    // Impermanent loss risk is highest for liquidity strategies with volatile assets
    const impermanentLossRisk = opportunity.strategyType === 'liquidity' ? 7 : 0;
    
    // Liquidity depth is based on TVL and availability of exit liquidity
    const liquidityDepth = Math.min(10, Math.log10(opportunity.tvl || 100000) / 2);
    
    // Volatility risk is higher for non-stablecoins and yield farming
    const volatilityRisk = this.calculateVolatilityRisk(opportunity);
    
    // Composability risk is higher for strategies that depend on multiple protocols
    const composabilityRisk = opportunity.strategyType === 'farming' ? 6 : 
                             opportunity.strategyType === 'liquidity' ? 5 : 3;
    
    // Regulatory risk is higher for certain protocol types
    const regulatoryRisk = this.calculateRegulatoryRisk(opportunity);
    
    // Counterparty risk is higher for lending and certain types of staking
    const counterpartyRisk = opportunity.strategyType === 'lending' ? 6 : 4;
    
    return {
      protocolRisk,
      contractAuditStatus,
      impermanentLossRisk,
      liquidityDepth,
      volatilityRisk,
      composabilityRisk,
      regulatoryRisk,
      counterpartyRisk
    };
  }
  
  /**
   * Calculate the overall risk score based on weighted risk factors
   * @param riskFactors Risk factors to evaluate
   * @returns Overall risk score (0-10)
   */
  private calculateOverallRiskScore(riskFactors: RiskFactors): number {
    // Weights for each risk factor (sum to 1)
    const weights = {
      protocolRisk: 0.2,
      contractAuditStatus: 0.15,
      impermanentLossRisk: 0.15,
      liquidityDepth: 0.1,
      volatilityRisk: 0.15,
      composabilityRisk: 0.1,
      regulatoryRisk: 0.05,
      counterpartyRisk: 0.1
    };
    
    // Calculate weighted sum
    const weightedSum = 
      weights.protocolRisk * riskFactors.protocolRisk +
      weights.contractAuditStatus * (10 - riskFactors.contractAuditStatus) + // Invert because higher audit status = lower risk
      weights.impermanentLossRisk * riskFactors.impermanentLossRisk +
      weights.liquidityDepth * (10 - riskFactors.liquidityDepth) + // Invert because higher liquidity = lower risk
      weights.volatilityRisk * riskFactors.volatilityRisk +
      weights.composabilityRisk * riskFactors.composabilityRisk +
      weights.regulatoryRisk * riskFactors.regulatoryRisk +
      weights.counterpartyRisk * riskFactors.counterpartyRisk;
    
    // Round to 1 decimal place
    return Math.round(weightedSum * 10) / 10;
  }
  
  /**
   * Determine the risk category based on overall risk score
   * @param riskScore Overall risk score
   * @returns Risk category
   */
  private determineRiskCategory(riskScore: number): RiskCategory {
    if (riskScore < 2) return RiskCategory.VERY_LOW;
    if (riskScore < 4) return RiskCategory.LOW;
    if (riskScore < 6) return RiskCategory.MEDIUM;
    if (riskScore < 8) return RiskCategory.HIGH;
    return RiskCategory.VERY_HIGH;
  }
  
  /**
   * Calculate impermanent loss estimates for liquidity provision
   * @param opportunity LP opportunity to analyze
   * @returns Array of impermanent loss estimates for various price scenarios
   */
  private calculateImpermanentLossEstimates(opportunity: YieldOpportunity): ImpermanentLossResult[] {
    // For token pairs, simulate various price change scenarios
    const priceDifferences = [0.5, 0.75, 1.25, 1.5, 2.0, 3.0];
    const initialValue = 10000; // Assuming $10,000 investment
    
    return priceDifferences.map(priceDifference => {
      // Calculate impermanent loss for this price difference
      // Using the formula: IL = 2 * sqrt(priceRatio) / (1 + priceRatio) - 1
      const sqrtPriceRatio = Math.sqrt(priceDifference);
      const lossPercentage = 2 * sqrtPriceRatio / (1 + priceDifference) - 1;
      
      // Calculate the value of LP position after impermanent loss
      const currentValue = initialValue * (1 + lossPercentage);
      
      // Calculate the value if just holding the tokens
      const holdValue = initialValue * (1 + priceDifference) / 2;
      
      return {
        priceDifference,
        lossPercentage,
        initialValue,
        currentValue,
        holdValue
      };
    });
  }
  
  /**
   * Calculate Value at Risk (VaR) for a potential investment
   * @param opportunity Yield opportunity
   * @param riskScore Overall risk score
   * @param investmentAmount Amount to invest
   * @returns Dollar amount at risk (95% confidence)
   */
  private calculateValueAtRisk(
    opportunity: YieldOpportunity, 
    riskScore: number, 
    investmentAmount: number
  ): number {
    // This is a simplified VaR calculation
    // In a real implementation, would use historical returns data and proper statistical models
    
    // Base daily volatility estimate based on risk score and strategy type
    const dailyVolatility = (riskScore / 20) * 
      (opportunity.strategyType === 'liquidity' ? 1.5 : 
       opportunity.strategyType === 'farming' ? 1.3 : 1.0);
    
    // 95% confidence level corresponds to ~1.65 standard deviations
    const confidenceFactor = 1.65;
    
    // Daily VaR
    const dailyVaR = investmentAmount * dailyVolatility * confidenceFactor;
    
    // Round to nearest dollar
    return Math.round(dailyVaR);
  }
  
  /**
   * Estimate maximum drawdown based on risk score and opportunity characteristics
   * @param opportunity Yield opportunity
   * @param riskScore Overall risk score
   * @returns Estimated maximum drawdown percentage
   */
  private estimateMaximumDrawdown(opportunity: YieldOpportunity, riskScore: number): number {
    // Base drawdown based on risk score (higher risk = higher potential drawdown)
    let baseDrawdown = riskScore * 3;
    
    // Adjust based on strategy type
    if (opportunity.strategyType === 'liquidity') {
      baseDrawdown *= 1.5; // LP positions can experience higher drawdowns due to IL
    } else if (opportunity.strategyType === 'lending') {
      baseDrawdown *= 0.8; // Lending tends to be more stable
    }
    
    // Cap at 90%
    return Math.min(90, Math.round(baseDrawdown));
  }
  
  /**
   * Perform stress tests on the opportunity
   * @param opportunity Yield opportunity
   * @param riskFactors Risk factors
   * @returns Stress test results
   */
  private performStressTests(
    opportunity: YieldOpportunity, 
    riskFactors: RiskFactors
  ): { marketCrash: number; protocolHack: number; liquidityCrisis: number; } {
    // Market crash scenario (50% drop in underlying assets)
    const marketCrashImpact = opportunity.strategyType === 'liquidity' ? 70 :
                             opportunity.strategyType === 'farming' ? 60 :
                             opportunity.strategyType === 'lending' ? 40 : 50;
    
    // Protocol hack scenario
    const protocolHackImpact = 30 + (10 - riskFactors.contractAuditStatus) * 7;
    
    // Liquidity crisis scenario
    const liquidityCrisisImpact = 20 + (10 - riskFactors.liquidityDepth) * 8;
    
    return {
      marketCrash: marketCrashImpact,
      protocolHack: protocolHackImpact,
      liquidityCrisis: liquidityCrisisImpact
    };
  }
  
  /**
   * Generate a recommendation based on risk assessment
   * @param opportunity Yield opportunity
   * @param riskScore Overall risk score
   * @param riskCategory Risk category
   * @returns Recommendation string
   */
  private generateRecommendation(
    opportunity: YieldOpportunity, 
    riskScore: number, 
    riskCategory: RiskCategory
  ): string {
    if (riskCategory === RiskCategory.VERY_LOW || riskCategory === RiskCategory.LOW) {
      return `This ${opportunity.strategyType} opportunity has a ${riskCategory.toLowerCase()} risk profile (${riskScore}/10) and could be suitable for conservative investors. Consider allocating up to 20% of your portfolio.`;
    } else if (riskCategory === RiskCategory.MEDIUM) {
      return `This ${opportunity.strategyType} opportunity has a medium risk profile (${riskScore}/10). Consider limiting exposure to 10-15% of your portfolio.`;
    } else if (riskCategory === RiskCategory.HIGH) {
      return `This ${opportunity.strategyType} opportunity has a high risk profile (${riskScore}/10). Consider limiting exposure to 5-10% of your portfolio and monitor closely.`;
    } else {
      return `This ${opportunity.strategyType} opportunity has a very high risk profile (${riskScore}/10). Consider limiting exposure to less than 5% of your portfolio, or avoiding unless you have a high risk tolerance.`;
    }
  }
  
  /**
   * Get audit status for a protocol (mock implementation)
   * @param protocol Protocol name
   * @returns Audit score (0-10)
   */
  private getProtocolAuditStatus(protocol: string): number {
    // This would query a database of protocol audits in a real implementation
    const mockAuditData: Record<string, number> = {
      'Acala': 8,
      'Moonwell': 7,
      'Karura': 7,
      'Parallel': 6,
      'Polkadot': 9,
      'Moonbeam': 8,
      'Astar': 7
    };
    
    return mockAuditData[protocol] || 5;
  }
  
  /**
   * Calculate volatility risk for an opportunity
   * @param opportunity Yield opportunity
   * @returns Volatility risk score (0-10)
   */
  private calculateVolatilityRisk(opportunity: YieldOpportunity): number {
    // Stablecoins have lower volatility
    if (opportunity.asset.includes('USD') || opportunity.asset.includes('DAI')) {
      return 2;
    }
    
    // LP tokens have higher volatility, especially if they include volatile assets
    if (opportunity.strategyType === 'liquidity') {
      return 8;
    }
    
    // Native tokens have moderate volatility
    if (opportunity.asset === 'DOT' || opportunity.asset === 'KSM' || 
        opportunity.asset === 'GLMR' || opportunity.asset === 'ASTR') {
      return 6;
    }
    
    // Default moderate-high volatility
    return 5;
  }
  
  /**
   * Calculate regulatory risk for an opportunity
   * @param opportunity Yield opportunity
   * @returns Regulatory risk score (0-10)
   */
  private calculateRegulatoryRisk(opportunity: YieldOpportunity): number {
    // Base risk level
    let regulatoryRisk = 5;
    
    // Adjust based on chain
    if (opportunity.chain === 'Polkadot' || opportunity.chain === 'Kusama') {
      regulatoryRisk -= 1; // Generally well-regarded regulatory-wise
    }
    
    // Adjust based on strategy type
    if (opportunity.strategyType === 'lending') {
      regulatoryRisk += 1; // More regulatory scrutiny on lending
    } else if (opportunity.strategyType === 'staking') {
      regulatoryRisk -= 1; // Less regulatory issues with staking
    }
    
    // Adjust based on asset type
    if (opportunity.asset.includes('USD') || opportunity.asset.includes('DAI')) {
      regulatoryRisk += 2; // Stablecoins face more regulatory scrutiny
    }
    
    return Math.min(10, Math.max(1, regulatoryRisk));
  }
  
  /**
   * Assess the risk of a portfolio based on its components
   * @param assets Portfolio assets
   * @returns Portfolio risk assessment
   */
  assessPortfolioRisk(assets: Asset[]): {
    overallRiskScore: number;
    riskCategory: RiskCategory;
    diversificationScore: number;
    concentrationRisk: number;
    correlationRisk: number;
    valueAtRisk: number;
  } {
    // If portfolio is empty, return default values
    if (!assets.length) {
      return {
        overallRiskScore: 0,
        riskCategory: RiskCategory.VERY_LOW,
        diversificationScore: 0,
        concentrationRisk: 0,
        correlationRisk: 0,
        valueAtRisk: 0
      };
    }
    
    // Calculate total portfolio value
    const totalValue = assets.reduce((sum, asset) => sum + asset.valueUSD, 0);
    
    // Calculate weighted risk score
    const weightedRiskScore = assets.reduce((weighted, asset) => {
      const assetRisk = asset.risk || 5;
      const weight = asset.valueUSD / totalValue;
      return weighted + (assetRisk * weight);
    }, 0);
    
    // Calculate diversification metrics
    const uniqueChains = new Set(assets.map(a => a.chain)).size;
    const uniqueProtocols = new Set(assets.map(a => a.protocol)).size;
    const uniqueAssets = new Set(assets.map(a => a.symbol)).size;
    
    // Calculate diversification score (0-100)
    const diversificationScore = Math.min(100, 
      (uniqueChains * 15) + 
      (uniqueProtocols * 10) + 
      (uniqueAssets * 5)
    );
    
    // Calculate concentration risk
    // Herfindahl-Hirschman Index (HHI) for asset concentration
    const concentrationRisk = assets.reduce((hhi, asset) => {
      const share = asset.valueUSD / totalValue;
      return hhi + (share * share);
    }, 0) * 10; // Scale to 0-10
    
    // Calculate correlation risk (simplified)
    // In a real implementation, would use actual asset correlation data
    const correlationRisk = 5 - Math.min(4, uniqueChains + uniqueProtocols / 4);
    
    // Calculate portfolio VaR (simplified)
    const valueAtRisk = totalValue * (weightedRiskScore / 100);
    
    // Determine risk category
    const riskCategory = this.determineRiskCategory(weightedRiskScore);
    
    return {
      overallRiskScore: parseFloat(weightedRiskScore.toFixed(1)),
      riskCategory,
      diversificationScore: Math.round(diversificationScore),
      concentrationRisk: parseFloat(concentrationRisk.toFixed(1)),
      correlationRisk: parseFloat(correlationRisk.toFixed(1)),
      valueAtRisk: Math.round(valueAtRisk)
    };
  }
}

export const riskModelingService = new RiskModelingService();
