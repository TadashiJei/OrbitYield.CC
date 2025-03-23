import mongoose, { Schema, Document, Types } from 'mongoose';
import { connectDB } from './connect';

// Ensure models are only initialized on the server side
// Add 'use server' directive to indicate server-only code
'use server';

// Re-export types for use in API routes
export type { Document, Types };

// YieldOpportunity model
export interface IYieldOpportunity extends Document {
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
  startDate: Date;
  endDate?: Date;
  rewardTokens: string[];
  minimumDeposit?: number;
  withdrawalFee?: number;
  lockupPeriod?: number; // in days
  createdAt: Date;
  updatedAt: Date;
}

// User model
export interface IUser extends Document {
  walletAddress: string;
  username?: string;
  email?: string;
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  preferences: {
    riskTolerance?: 'low' | 'medium' | 'high';
    notificationEnabled: boolean;
    emailNotifications: boolean;
    darkMode: boolean;
    favoriteChains: string[];
  };
}

// Transaction model
export interface ITransaction extends Document {
  userId: Types.ObjectId;
  walletAddress: string;
  opportunityId: Types.ObjectId;
  txHash: string;
  type: 'deposit' | 'withdrawal' | 'claim_rewards';
  amount: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'failed';
  blockNumber?: number;
  gasUsed?: number;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

// UserInvestment model
export interface IUserInvestment extends Document {
  userId: Types.ObjectId;
  walletAddress: string;
  opportunityId: Types.ObjectId;
  amount: number;
  currency: string;
  status: 'pending' | 'active' | 'withdrawn' | 'failed';
  depositTxHash: string;
  withdrawTxHash?: string;
  startDate: Date;
  endDate?: Date;
  earnings: number;
  currentValue: number;
  autoCompound: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// MetaMaskConnection model
export interface IMetaMaskConnection extends Document {
  userId: Types.ObjectId;
  walletAddress: string;
  connectedAt: Date;
  lastUsed: Date;
  isActive: boolean;
  userAgent?: string;
  ipAddress?: string;
  removalRequest?: {
    requestedAt: Date;
    status: 'pending' | 'approved' | 'rejected';
    reason?: string;
    email?: string;
    processedAt?: Date;
    processedBy?: Types.ObjectId;
  };
}

// Database connection function
async function getModels() {
  await connectDB();
  
  // Define schemas
  // YieldOpportunity schema
  const YieldOpportunitySchema = new Schema(
    {
      name: { type: String, required: true, index: true },
      protocol: { type: String, required: true, index: true },
      chain: { type: String, required: true, index: true },
      asset: { type: String, required: true, index: true },
      apy: { type: Number, required: true },
      tvl: { type: Number, required: true, default: 0 },
      riskLevel: { type: String, enum: ['low', 'medium', 'high'], required: true },
      strategyType: {
        type: String,
        enum: ['staking', 'lending', 'farming', 'liquidity'],
        required: true,
        index: true,
      },
      contractAddress: { type: String, required: true },
      description: { type: String, required: true },
      url: String,
      isActive: { type: Boolean, default: true, index: true },
      startDate: { type: Date, required: true },
      endDate: Date,
      rewardTokens: { type: [String], default: [] },
      minimumDeposit: Number,
      withdrawalFee: Number,
      lockupPeriod: Number,
    },
    { timestamps: true }
  );

  // User schema
  const UserSchema = new Schema(
    {
      walletAddress: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
      },
      username: { type: String, sparse: true, index: true },
      email: { type: String, sparse: true, index: true },
      profilePicture: String,
      lastLogin: Date,
      preferences: {
        riskTolerance: {
          type: String,
          enum: ['low', 'medium', 'high'],
          default: 'medium',
        },
        notificationEnabled: { type: Boolean, default: true },
        emailNotifications: { type: Boolean, default: false },
        darkMode: { type: Boolean, default: false },
        favoriteChains: { type: [String], default: [] },
      },
    },
    { timestamps: true }
  );

  // Transaction schema
  const TransactionSchema = new Schema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
      },
      walletAddress: {
        type: String,
        required: true,
        lowercase: true,
        index: true,
      },
      opportunityId: {
        type: Schema.Types.ObjectId,
        ref: 'YieldOpportunity',
        required: true,
      },
      txHash: {
        type: String,
        required: true,
        unique: true,
      },
      type: {
        type: String,
        enum: ['deposit', 'withdrawal', 'claim_rewards'],
        required: true,
        index: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ['pending', 'confirmed', 'failed'],
        default: 'pending',
        index: true,
      },
      blockNumber: Number,
      gasUsed: Number,
      timestamp: {
        type: Date,
        default: Date.now,
        index: true,
      },
    },
    { timestamps: true }
  );

  // UserInvestment schema
  const UserInvestmentSchema = new Schema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
      },
      walletAddress: {
        type: String,
        required: true,
        lowercase: true,
        index: true,
      },
      opportunityId: {
        type: Schema.Types.ObjectId,
        ref: 'YieldOpportunity',
        required: true,
        index: true,
      },
      amount: { type: Number, required: true },
      currency: { type: String, required: true },
      status: {
        type: String,
        enum: ['pending', 'active', 'withdrawn', 'failed'],
        default: 'pending',
        index: true,
      },
      depositTxHash: { type: String, required: true },
      withdrawTxHash: String,
      startDate: { type: Date, required: true },
      endDate: Date,
      earnings: { type: Number, default: 0 },
      currentValue: { type: Number, required: true },
      autoCompound: { type: Boolean, default: false },
    },
    { timestamps: true }
  );

  // MetaMaskConnection schema
  const MetaMaskConnectionSchema = new Schema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
      },
      walletAddress: {
        type: String,
        required: true,
        lowercase: true,
        index: true,
      },
      connectedAt: { type: Date, default: Date.now },
      lastUsed: { type: Date, default: Date.now },
      isActive: { type: Boolean, default: true, index: true },
      userAgent: String,
      ipAddress: String,
      removalRequest: {
        requestedAt: Date,
        status: { type: String, enum: ['pending', 'approved', 'rejected'] },
        reason: String,
        email: String,
        processedAt: Date,
        processedBy: { type: Schema.Types.ObjectId, ref: 'User' },
      },
    },
    { timestamps: true }
  );

  // Create indexes
  // txHash index is already created by the unique: true property in the schema
  TransactionSchema.index({ createdAt: -1 });
  TransactionSchema.index({ walletAddress: 1, type: 1 });
  TransactionSchema.index({ walletAddress: 1, status: 1 });
  MetaMaskConnectionSchema.index({ userId: 1, walletAddress: 1 }, { unique: true });
  MetaMaskConnectionSchema.index({ 'removalRequest.status': 1, isActive: 1 });

  // Initialize models
  const models = {
    YieldOpportunity: mongoose.models.YieldOpportunity || 
      mongoose.model<IYieldOpportunity>('YieldOpportunity', YieldOpportunitySchema),
    User: mongoose.models.User || 
      mongoose.model<IUser>('User', UserSchema),
    Transaction: mongoose.models.Transaction || 
      mongoose.model<ITransaction>('Transaction', TransactionSchema),
    UserInvestment: mongoose.models.UserInvestment || 
      mongoose.model<IUserInvestment>('UserInvestment', UserInvestmentSchema),
    MetaMaskConnection: mongoose.models.MetaMaskConnection || 
      mongoose.model<IMetaMaskConnection>('MetaMaskConnection', MetaMaskConnectionSchema)
  };
  
  return models;
}

// Export getModels function to be used in API routes
export { getModels };
