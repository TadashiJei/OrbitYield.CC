import { ethers } from 'ethers';

// Types for yield opportunities
export interface YieldOpportunity {
  id: string;
  strategyAddress?: string;
  strategyType: 'lending' | 'farming' | 'liquidity' | 'staking';
  protocolName: string;
  assetAddress?: string;
  assetSymbol: string;
  apy: number; // APY in basis points (e.g., 500 = 5%)
  tvl: string; // Total Value Locked in wei
  minDeposit?: string;
  risk: number; // Risk score from 1 (lowest) to 10 (highest)
  rewardTokens?: string[];
  poolAddress?: string;
  lpTokenAddress?: string;
  pairAssetAddress?: string;
  lockupPeriod?: number;
  isActive?: boolean;
  lastUpdated?: number;
  chainId?: number;
  chain?: string;
}

// Interface for strategy contracts
export interface IYieldStrategy {
  getName(): Promise<string>;
  getProtocol(): Promise<string>;
  getAPY(assetAddress: string): Promise<ethers.BigNumber>;
  getTVL(assetAddress: string): Promise<ethers.BigNumber>;
  supportsAsset(assetAddress: string): Promise<boolean>;
  harvestYield(assetAddress: string): Promise<ethers.BigNumber>;
  getPendingYield(assetAddress: string): Promise<ethers.BigNumber>;
}

// User preferences for yield optimization
export interface YieldPreferences {
  riskTolerance: number; // 1 (low risk) to 10 (high risk)
  minAPY?: number; // Minimum APY in basis points
  maxAPY?: number; // Maximum APY in basis points
  preferredAssets?: string[]; // Preferred asset addresses
  preferredProtocols?: string[]; // Preferred protocol names
  lockupTolerance?: number; // Maximum acceptable lockup period in seconds
  prioritizeAPY?: boolean; // Prioritize APY over risk
  excludedProtocols?: string[]; // Protocols to exclude
  excludedAssets?: string[]; // Assets to exclude
  prioritizeCompounding?: boolean; // Prioritize auto-compounding strategies
}

/**
 * Main class for yield optimization
 */
export class YieldOptimizer {
  private provider: ethers.providers.Provider;
  private aggregatorAddress: string;
  private strategyFactoryAddress: string;
  private cachedOpportunities: YieldOpportunity[] = [];
  private lastFetchTimestamp: number = 0;
  private readonly CACHE_TTL: number = 5 * 60 * 1000; // 5 minutes

  constructor(
    provider: ethers.providers.Provider,
    aggregatorAddress: string,
    strategyFactoryAddress: string
  ) {
    this.provider = provider;
    this.aggregatorAddress = aggregatorAddress;
    this.strategyFactoryAddress = strategyFactoryAddress;
  }

  /**
   * Discover yield opportunities across all strategies
   */
  async discoverOpportunities(): Promise<YieldOpportunity[]> {
    const currentTime = Date.now();
    
    // Return cached opportunities if still valid
    if (currentTime - this.lastFetchTimestamp < this.CACHE_TTL && this.cachedOpportunities.length > 0) {
      return this.cachedOpportunities;
    }
    
    try {
      // In a real implementation, this would:
      // 1. Get all strategies from the factory
      // 2. For each strategy, get all supported assets
      // 3. For each asset in each strategy, get APY, TVL, etc.
      // 4. Compile into YieldOpportunity objects
      
      // For now, we'll return mock data
      const mockOpportunities = this.getMockOpportunities();
      
      this.cachedOpportunities = mockOpportunities;
      this.lastFetchTimestamp = currentTime;
      
      return mockOpportunities;
    } catch (error) {
      console.error('Error discovering yield opportunities:', error);
      throw error;
    }
  }

  /**
   * Find the best yield opportunity for a specific asset
   * @param assetAddress Asset address
   * @param preferences User preferences for optimization
   */
  async findBestOpportunity(
    assetAddress: string,
    preferences: YieldPreferences
  ): Promise<YieldOpportunity | null> {
    try {
      const opportunities = await this.discoverOpportunities();
      
      // Filter opportunities by asset
      const assetOpportunities = opportunities.filter(
        opp => opp.assetAddress?.toLowerCase() === assetAddress.toLowerCase() && opp.isActive
      );
      
      if (assetOpportunities.length === 0) {
        return null;
      }
      
      // Apply user preferences
      const filteredOpportunities = this.applyPreferenceFilters(assetOpportunities, preferences);
      
      if (filteredOpportunities.length === 0) {
        return null;
      }
      
      // Sort by optimization criteria
      const sortedOpportunities = this.sortOpportunitiesByPreferences(filteredOpportunities, preferences);
      
      return sortedOpportunities[0]; // Return the best match
    } catch (error) {
      console.error('Error finding best opportunity:', error);
      throw error;
    }
  }

  /**
   * Generate optimized portfolio allocation based on user preferences
   * @param totalAmount Total amount to invest (in wei)
   * @param preferences User preferences for optimization
   * @param assetAllocations User-defined allocations per asset (optional)
   */
  async generateOptimizedPortfolio(
    totalAmount: string,
    preferences: YieldPreferences,
    assetAllocations?: Record<string, number> // Asset address => percentage (0-100)
  ): Promise<{
    totalAPY: number;
    totalRisk: number;
    allocations: Array<{
      opportunity: YieldOpportunity;
      amount: string;
      percentage: number;
    }>;
  }> {
    try {
      const opportunities = await this.discoverOpportunities();
      const filteredOpportunities = this.applyPreferenceFilters(opportunities, preferences);
      
      if (filteredOpportunities.length === 0) {
        throw new Error('No opportunities match your preferences');
      }
      
      const totalAmountBN = ethers.BigNumber.from(totalAmount);
      const allocations: Array<{
        opportunity: YieldOpportunity;
        amount: string;
        percentage: number;
      }> = [];
      
      if (assetAllocations) {
        // User-defined allocations
        for (const [assetAddress, percentage] of Object.entries(assetAllocations)) {
          const assetOpportunities = filteredOpportunities.filter(
            opp => opp.assetAddress?.toLowerCase() === assetAddress.toLowerCase()
          );
          
          if (assetOpportunities.length > 0) {
            const bestOpportunity = this.sortOpportunitiesByPreferences(assetOpportunities, preferences)[0];
            const allocationAmount = totalAmountBN.mul(percentage).div(100);
            
            allocations.push({
              opportunity: bestOpportunity,
              amount: allocationAmount.toString(),
              percentage
            });
          }
        }
      } else {
        // Automated allocations based on risk-adjusted returns
        const sortedByRiskAdjusted = this.sortOpportunitiesByRiskAdjustedReturn(filteredOpportunities);
        
        // Simplified allocation: 40% to best opportunity, 30% to second, 20% to third, 10% to fourth
        const allocationPercentages = [40, 30, 20, 10];
        const numAllocations = Math.min(sortedByRiskAdjusted.length, allocationPercentages.length);
        
        for (let i = 0; i < numAllocations; i++) {
          const percentage = allocationPercentages[i];
          const allocationAmount = totalAmountBN.mul(percentage).div(100);
          
          allocations.push({
            opportunity: sortedByRiskAdjusted[i],
            amount: allocationAmount.toString(),
            percentage
          });
        }
      }
      
      // Calculate totals
      const totalAPY = allocations.reduce(
        (sum, item) => sum + (item.opportunity.apy * item.percentage / 100),
        0
      );
      
      const totalRisk = allocations.reduce(
        (sum, item) => sum + (item.opportunity.risk * item.percentage / 100),
        0
      );
      
      return {
        totalAPY,
        totalRisk,
        allocations
      };
    } catch (error) {
      console.error('Error generating optimized portfolio:', error);
      throw error;
    }
  }

  /**
   * Apply preference filters to opportunities
   */
  private applyPreferenceFilters(
    opportunities: YieldOpportunity[],
    preferences: YieldPreferences
  ): YieldOpportunity[] {
    return opportunities.filter(opp => {
      // Filter by risk tolerance
      if (opp.risk > preferences.riskTolerance) {
        return false;
      }
      
      // Filter by APY range
      if (preferences.minAPY !== undefined && opp.apy < preferences.minAPY) {
        return false;
      }
      if (preferences.maxAPY !== undefined && opp.apy > preferences.maxAPY) {
        return false;
      }
      
      // Filter by preferred assets
      if (
        preferences.preferredAssets &&
        preferences.preferredAssets.length > 0 &&
        !preferences.preferredAssets.some(
          asset => asset.toLowerCase() === opp.assetAddress?.toLowerCase()
        )
      ) {
        return false;
      }
      
      // Filter by preferred protocols
      if (
        preferences.preferredProtocols &&
        preferences.preferredProtocols.length > 0 &&
        !preferences.preferredProtocols.some(
          protocol => protocol.toLowerCase() === opp.protocolName.toLowerCase()
        )
      ) {
        return false;
      }
      
      // Filter by lockup period
      if (
        preferences.lockupTolerance !== undefined &&
        opp.lockupPeriod !== undefined &&
        opp.lockupPeriod > preferences.lockupTolerance
      ) {
        return false;
      }
      
      // Filter by excluded protocols
      if (
        preferences.excludedProtocols &&
        preferences.excludedProtocols.some(
          protocol => protocol.toLowerCase() === opp.protocolName.toLowerCase()
        )
      ) {
        return false;
      }
      
      // Filter by excluded assets
      if (
        preferences.excludedAssets &&
        preferences.excludedAssets.some(
          asset => asset.toLowerCase() === opp.assetAddress?.toLowerCase()
        )
      ) {
        return false;
      }
      
      return true;
    });
  }

  /**
   * Sort opportunities based on user preferences
   */
  private sortOpportunitiesByPreferences(
    opportunities: YieldOpportunity[],
    preferences: YieldPreferences
  ): YieldOpportunity[] {
    return [...opportunities].sort((a, b) => {
      if (preferences.prioritizeAPY) {
        // Prioritize APY over risk
        return b.apy - a.apy;
      } else {
        // Balance APY and risk (risk-adjusted return)
        const riskAdjustedA = a.apy / a.risk;
        const riskAdjustedB = b.apy / b.risk;
        return riskAdjustedB - riskAdjustedA;
      }
    });
  }

  /**
   * Sort opportunities by risk-adjusted return
   */
  private sortOpportunitiesByRiskAdjustedReturn(
    opportunities: YieldOpportunity[]
  ): YieldOpportunity[] {
    return [...opportunities].sort((a, b) => {
      const riskAdjustedA = a.apy / a.risk;
      const riskAdjustedB = b.apy / b.risk;
      return riskAdjustedB - riskAdjustedA;
    });
  }

  /**
   * Calculate expected returns for a given amount and time period
   * @param opportunity Yield opportunity
   * @param amount Amount to invest (in wei)
   * @param durationInDays Duration in days
   * @param compounding Whether returns are compounded
   */
  calculateExpectedReturns(
    opportunity: YieldOpportunity,
    amount: string,
    durationInDays: number,
    compounding: boolean = false
  ): {
    principalAmount: string;
    expectedYield: string;
    totalValue: string;
    annualAPY: number;
  } {
    const amountBN = ethers.BigNumber.from(amount);
    const apyDecimal = opportunity.apy / 10000; // Convert basis points to decimal (500 bp = 0.05)
    
    let expectedYieldBN: ethers.BigNumber;
    
    if (compounding) {
      // Compound interest formula: A = P(1 + r/n)^(nt)
      // For daily compounding: A = P(1 + r/365)^(365t)
      const principalValue = parseFloat(ethers.utils.formatEther(amountBN));
      const periods = durationInDays; // Daily compounding
      const periodicRate = apyDecimal / 365;
      
      const compoundedValue = principalValue * Math.pow(1 + periodicRate, periods);
      const yieldValue = compoundedValue - principalValue;
      
      expectedYieldBN = ethers.utils.parseEther(yieldValue.toFixed(18));
    } else {
      // Simple interest formula: I = P * r * t
      const dailyRate = apyDecimal / 365;
      const interestFactor = ethers.utils.parseEther(
        (dailyRate * durationInDays).toFixed(18)
      );
      
      expectedYieldBN = amountBN.mul(interestFactor).div(ethers.utils.parseEther('1'));
    }
    
    const totalValueBN = amountBN.add(expectedYieldBN);
    
    return {
      principalAmount: amountBN.toString(),
      expectedYield: expectedYieldBN.toString(),
      totalValue: totalValueBN.toString(),
      annualAPY: opportunity.apy
    };
  }

  /**
   * Get mock yield opportunities (for development)
   */
  private getMockOpportunities(): YieldOpportunity[] {
    const mockAddresses = {
      DOT: '0x1111111111111111111111111111111111111111',
      KSM: '0x2222222222222222222222222222222222222222',
      USDT: '0x3333333333333333333333333333333333333333',
      ETH: '0x4444444444444444444444444444444444444444',
      BTC: '0x5555555555555555555555555555555555555555',
      strategies: {
        lending: {
          aave: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          compound: '0xcccccccccccccccccccccccccccccccccccccccc'
        },
        farming: {
          hydraDx: '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
          acala: '0xdddddddddddddddddddddddddddddddddddddddd'
        },
        liquidity: {
          acalaDex: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
          hydraDex: '0xffffffffffffffffffffffffffffffffffffffff'
        }
      }
    };

    return [
      // Lending strategies
      {
        id: '1',
        strategyAddress: mockAddresses.strategies.lending.aave,
        strategyType: 'lending',
        protocolName: 'Aave on Polkadot',
        assetAddress: mockAddresses.DOT,
        assetSymbol: 'DOT',
        apy: 350, // 3.5%
        tvl: ethers.utils.parseEther('100000').toString(),
        minDeposit: ethers.utils.parseEther('10').toString(),
        risk: 3,
        isActive: true,
        lastUpdated: Date.now()
      },
      {
        id: '2',
        strategyAddress: mockAddresses.strategies.lending.compound,
        strategyType: 'lending',
        protocolName: 'Compound on Polkadot',
        assetAddress: mockAddresses.DOT,
        assetSymbol: 'DOT',
        apy: 380, // 3.8%
        tvl: ethers.utils.parseEther('75000').toString(),
        minDeposit: ethers.utils.parseEther('5').toString(),
        risk: 4,
        isActive: true,
        lastUpdated: Date.now()
      },
      {
        id: '3',
        strategyAddress: mockAddresses.strategies.lending.aave,
        strategyType: 'lending',
        protocolName: 'Aave on Polkadot',
        assetAddress: mockAddresses.KSM,
        assetSymbol: 'KSM',
        apy: 420, // 4.2%
        tvl: ethers.utils.parseEther('50000').toString(),
        minDeposit: ethers.utils.parseEther('1').toString(),
        risk: 4,
        isActive: true,
        lastUpdated: Date.now()
      },
      
      // Farming strategies
      {
        id: '4',
        strategyAddress: mockAddresses.strategies.farming.hydraDx,
        strategyType: 'farming',
        protocolName: 'HydraDX on Polkadot',
        assetAddress: mockAddresses.DOT,
        assetSymbol: 'DOT',
        apy: 800, // 8%
        tvl: ethers.utils.parseEther('200000').toString(),
        minDeposit: ethers.utils.parseEther('100').toString(),
        risk: 7,
        rewardTokens: ['0x6666666666666666666666666666666666666666'], // HDX token
        isActive: true,
        lastUpdated: Date.now()
      },
      {
        id: '5',
        strategyAddress: mockAddresses.strategies.farming.acala,
        strategyType: 'farming',
        protocolName: 'Acala on Polkadot',
        assetAddress: mockAddresses.DOT,
        assetSymbol: 'DOT',
        apy: 750, // 7.5%
        tvl: ethers.utils.parseEther('150000').toString(),
        minDeposit: ethers.utils.parseEther('50').toString(),
        risk: 6,
        rewardTokens: ['0x7777777777777777777777777777777777777777'], // ACA token
        isActive: true,
        lastUpdated: Date.now()
      },
      
      // Liquidity strategies
      {
        id: '6',
        strategyAddress: mockAddresses.strategies.liquidity.acalaDex,
        strategyType: 'liquidity',
        protocolName: 'Acala DEX on Polkadot',
        assetAddress: mockAddresses.DOT,
        assetSymbol: 'DOT',
        apy: 1200, // 12%
        tvl: ethers.utils.parseEther('500000').toString(),
        minDeposit: ethers.utils.parseEther('100').toString(),
        risk: 8,
        lpTokenAddress: '0x8888888888888888888888888888888888888888',
        pairAssetAddress: mockAddresses.USDT,
        isActive: true,
        lastUpdated: Date.now()
      },
      {
        id: '7',
        strategyAddress: mockAddresses.strategies.liquidity.hydraDex,
        strategyType: 'liquidity',
        protocolName: 'HydraDX on Polkadot',
        assetAddress: mockAddresses.KSM,
        assetSymbol: 'KSM',
        apy: 1500, // 15%
        tvl: ethers.utils.parseEther('300000').toString(),
        minDeposit: ethers.utils.parseEther('10').toString(),
        risk: 9,
        lpTokenAddress: '0x9999999999999999999999999999999999999999',
        pairAssetAddress: mockAddresses.DOT,
        isActive: true,
        lastUpdated: Date.now()
      },
      
      // More opportunities...
      {
        id: '8',
        strategyAddress: mockAddresses.strategies.lending.aave,
        strategyType: 'lending',
        protocolName: 'Aave on Polkadot',
        assetAddress: mockAddresses.USDT,
        assetSymbol: 'USDT',
        apy: 250, // 2.5%
        tvl: ethers.utils.parseEther('1000000').toString(),
        minDeposit: ethers.utils.parseEther('100').toString(),
        risk: 2,
        isActive: true,
        lastUpdated: Date.now()
      },
      {
        id: '9',
        strategyAddress: mockAddresses.strategies.farming.hydraDx,
        strategyType: 'farming',
        protocolName: 'HydraDX on Polkadot',
        assetAddress: mockAddresses.ETH,
        assetSymbol: 'ETH',
        apy: 650, // 6.5%
        tvl: ethers.utils.parseEther('400000').toString(),
        minDeposit: ethers.utils.parseEther('1').toString(),
        risk: 6,
        rewardTokens: ['0x6666666666666666666666666666666666666666'], // HDX token
        isActive: true,
        lastUpdated: Date.now()
      },
      {
        id: '10',
        strategyAddress: mockAddresses.strategies.liquidity.acalaDex,
        strategyType: 'liquidity',
        protocolName: 'Acala DEX on Polkadot',
        assetAddress: mockAddresses.BTC,
        assetSymbol: 'BTC',
        apy: 900, // 9%
        tvl: ethers.utils.parseEther('2000000').toString(),
        minDeposit: ethers.utils.parseEther('0.1').toString(),
        risk: 7,
        lpTokenAddress: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        pairAssetAddress: mockAddresses.USDT,
        isActive: true,
        lastUpdated: Date.now()
      }
    ];
  }
}
