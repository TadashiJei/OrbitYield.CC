import { Asset } from '@/components/yield/PortfolioRebalancer';

/**
 * User risk tolerance levels
 */
export enum RiskTolerance {
  CONSERVATIVE = 'conservative',
  MODERATE = 'moderate',
  AGGRESSIVE = 'aggressive',
  CUSTOM = 'custom'
}

/**
 * User yield preferences
 */
export interface YieldPreferences {
  riskTolerance: RiskTolerance;
  maxRiskScore?: number;
  targetAPY?: number;
  preferredChains: string[];
  excludedChains: string[];
  preferredProtocols: string[];
  excludedProtocols: string[];
  preferredAssets: string[];
  excludedAssets: string[];
  maxProtocolExposure?: number; // Percentage (0-100)
  maxChainExposure?: number; // Percentage (0-100)
  rebalancingFrequency?: 'daily' | 'weekly' | 'monthly' | 'manual';
  notificationSettings: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    apyAlerts: boolean;
    riskAlerts: boolean;
    rebalancingAlerts: boolean;
  };
}

/**
 * Default preferences for different risk tolerance levels
 */
const defaultPreferences: Record<RiskTolerance, Partial<YieldPreferences>> = {
  [RiskTolerance.CONSERVATIVE]: {
    maxRiskScore: 4,
    targetAPY: 5,
    maxProtocolExposure: 25,
    maxChainExposure: 40,
    rebalancingFrequency: 'monthly'
  },
  [RiskTolerance.MODERATE]: {
    maxRiskScore: 6,
    targetAPY: 10,
    maxProtocolExposure: 40,
    maxChainExposure: 60,
    rebalancingFrequency: 'weekly'
  },
  [RiskTolerance.AGGRESSIVE]: {
    maxRiskScore: 9,
    targetAPY: 20,
    maxProtocolExposure: 60,
    maxChainExposure: 80,
    rebalancingFrequency: 'daily'
  },
  [RiskTolerance.CUSTOM]: {}
};

/**
 * Service for managing user preferences
 */
export class UserPreferenceService {
  /**
   * Get user yield preferences
   * @param userId User ID or wallet address
   * @returns User's yield preferences
   */
  async getUserPreferences(userId: string): Promise<YieldPreferences> {
    try {
      // In a real implementation, fetch from database
      const storedPreferences = localStorage.getItem(`preferences_${userId}`);
      
      if (storedPreferences) {
        return JSON.parse(storedPreferences);
      }
      
      // Return default preferences if none exist
      return this.getDefaultPreferences();
    } catch (error) {
      console.error('Error fetching user preferences:', error);
      return this.getDefaultPreferences();
    }
  }
  
  /**
   * Save user yield preferences
   * @param userId User ID or wallet address
   * @param preferences User's yield preferences
   * @returns Success status
   */
  async saveUserPreferences(userId: string, preferences: YieldPreferences): Promise<boolean> {
    try {
      // In a real implementation, save to database
      localStorage.setItem(`preferences_${userId}`, JSON.stringify(preferences));
      return true;
    } catch (error) {
      console.error('Error saving user preferences:', error);
      return false;
    }
  }
  
  /**
   * Get default preferences
   * @param riskTolerance Optional risk tolerance level
   * @returns Default preferences
   */
  getDefaultPreferences(riskTolerance: RiskTolerance = RiskTolerance.MODERATE): YieldPreferences {
    return {
      riskTolerance,
      preferredChains: [],
      excludedChains: [],
      preferredProtocols: [],
      excludedProtocols: [],
      preferredAssets: [],
      excludedAssets: [],
      notificationSettings: {
        emailNotifications: true,
        pushNotifications: true,
        apyAlerts: true,
        riskAlerts: true,
        rebalancingAlerts: true
      },
      ...defaultPreferences[riskTolerance]
    };
  }
  
  /**
   * Generate recommended preferences based on user's portfolio
   * @param userId User ID or wallet address
   * @param assets User's current assets
   * @returns Recommended yield preferences
   */
  async generateRecommendedPreferences(
    userId: string, 
    assets: Asset[]
  ): Promise<YieldPreferences> {
    // Get current preferences
    const currentPreferences = await this.getUserPreferences(userId);
    
    // Analyze current portfolio to derive recommendations
    const uniqueChains = [...new Set(assets.map(asset => asset.chain))];
    const uniqueProtocols = [...new Set(assets.map(asset => asset.protocol))];
    const uniqueAssets = [...new Set(assets.map(asset => asset.symbol))];
    
    // Calculate weighted risk based on asset allocation
    const totalValue = assets.reduce((sum, asset) => sum + asset.valueUSD, 0);
    const weightedRisk = assets.reduce((sum, asset) => 
      sum + ((asset.risk || 5) * (asset.valueUSD / totalValue)), 0);
    
    // Determine appropriate risk tolerance
    let recommendedRiskTolerance = currentPreferences.riskTolerance;
    if (weightedRisk <= 3) {
      recommendedRiskTolerance = RiskTolerance.CONSERVATIVE;
    } else if (weightedRisk <= 6) {
      recommendedRiskTolerance = RiskTolerance.MODERATE;
    } else {
      recommendedRiskTolerance = RiskTolerance.AGGRESSIVE;
    }
    
    return {
      ...this.getDefaultPreferences(recommendedRiskTolerance),
      preferredChains: uniqueChains,
      preferredAssets: uniqueAssets,
      preferredProtocols: uniqueProtocols,
      riskTolerance: recommendedRiskTolerance
    };
  }
  
  /**
   * Calculate a risk score for a potential investment based on user preferences
   * @param userId User ID or wallet address
   * @param asset Asset to evaluate
   * @returns Risk score (0-100, lower is better)
   */
  async calculateRiskScoreForUser(userId: string, asset: Asset): Promise<number> {
    const preferences = await this.getUserPreferences(userId);
    
    let riskScore = 0;
    
    // Base risk score from the asset's inherent risk (0-10 scale)
    riskScore += (asset.risk || 5) * 10;
    
    // Adjust based on user preferences
    
    // Chain preferences
    if (preferences.excludedChains.includes(asset.chain)) {
      riskScore += 30;
    } else if (!preferences.preferredChains.includes(asset.chain) && preferences.preferredChains.length > 0) {
      riskScore += 10;
    }
    
    // Protocol preferences
    if (preferences.excludedProtocols.includes(asset.protocol)) {
      riskScore += 30;
    } else if (!preferences.preferredProtocols.includes(asset.protocol) && preferences.preferredProtocols.length > 0) {
      riskScore += 10;
    }
    
    // Asset preferences
    if (preferences.excludedAssets.includes(asset.symbol)) {
      riskScore += 30;
    } else if (!preferences.preferredAssets.includes(asset.symbol) && preferences.preferredAssets.length > 0) {
      riskScore += 10;
    }
    
    // Cap the score at 100
    return Math.min(riskScore, 100);
  }
}

export const userPreferenceService = new UserPreferenceService();
