// This file contains type definitions only, for use in client components
// No actual Mongoose imports or implementations here

export interface YieldOpportunityType {
  _id: string;
  name: string;
  protocol: string;
  chain: string;
  asset: string;
  apy: number;
  tvl: number;
  riskLevel: 'low' | 'medium' | 'high';
  strategyType: 'staking' | 'lending' | 'farming' | 'liquidity';
  contractAddress: string;
  description: string;
  url: string;
  isActive: boolean;
  startDate: string; // ISO date string
  endDate?: string; // ISO date string
  rewardTokens: string[];
  minimumDeposit?: number;
  withdrawalFee?: number;
  lockupPeriod?: number; // in days
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface UserType {
  _id: string;
  walletAddress: string;
  username?: string;
  email?: string;
  profilePicture?: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  lastLogin?: string; // ISO date string
  preferences: {
    riskTolerance?: 'low' | 'medium' | 'high';
    notificationEnabled: boolean;
    emailNotifications: boolean;
    darkMode: boolean;
    favoriteChains: string[];
  };
}

export interface TransactionType {
  _id: string;
  userId: string;
  walletAddress: string;
  opportunityId: string;
  txHash: string;
  type: 'deposit' | 'withdrawal' | 'claim_rewards';
  amount: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'failed';
  blockNumber?: number;
  gasUsed?: number;
  timestamp: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface UserInvestmentType {
  _id: string;
  userId: string;
  walletAddress: string;
  opportunityId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'active' | 'withdrawn' | 'failed';
  depositTxHash: string;
  withdrawTxHash?: string;
  startDate: string; // ISO date string
  endDate?: string; // ISO date string
  earnings: number;
  currentValue: number;
  autoCompound: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface MetaMaskConnectionType {
  _id: string;
  userId: string;
  walletAddress: string;
  connectedAt: string; // ISO date string
  lastUsed: string; // ISO date string
  isActive: boolean;
  userAgent?: string;
  ipAddress?: string;
  removalRequest?: {
    requestedAt: string; // ISO date string
    status: 'pending' | 'approved' | 'rejected';
    reason?: string;
    email?: string;
    processedAt?: string; // ISO date string
    processedBy?: string;
  };
}
