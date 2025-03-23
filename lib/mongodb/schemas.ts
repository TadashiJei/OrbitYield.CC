import mongoose, { Schema } from 'mongoose';

// YieldOpportunity schema
export const YieldOpportunitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    protocol: {
      type: String,
      required: true,
      index: true,
    },
    chain: {
      type: String,
      required: true,
      index: true,
    },
    asset: {
      type: String,
      required: true,
      index: true,
    },
    apy: {
      type: Number,
      required: true,
    },
    tvl: {
      type: Number,
      required: true,
      default: 0,
    },
    riskLevel: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true,
    },
    strategyType: {
      type: String,
      enum: ['staking', 'lending', 'farming', 'liquidity'],
      required: true,
      index: true,
    },
    contractAddress: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    url: String,
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: Date,
    rewardTokens: {
      type: [String],
      default: [],
    },
    minimumDeposit: Number,
    withdrawalFee: Number,
    lockupPeriod: Number,
  },
  {
    timestamps: true,
  }
);

// User schema
export const UserSchema = new Schema(
  {
    walletAddress: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    username: {
      type: String,
      sparse: true,
      index: true,
    },
    email: {
      type: String,
      sparse: true,
      index: true,
    },
    profilePicture: String,
    lastLogin: Date,
    preferences: {
      riskTolerance: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
      },
      notificationEnabled: {
        type: Boolean,
        default: true,
      },
      emailNotifications: {
        type: Boolean,
        default: false,
      },
      darkMode: {
        type: Boolean,
        default: false,
      },
      favoriteChains: {
        type: [String],
        default: [],
      },
    },
  },
  {
    timestamps: true,
  }
);

// Transaction schema
export const TransactionSchema = new Schema(
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
  {
    timestamps: true,
  }
);

// Create indexes for efficient querying
TransactionSchema.index({ txHash: 1 });
TransactionSchema.index({ createdAt: -1 });
TransactionSchema.index({ walletAddress: 1, type: 1 });
TransactionSchema.index({ walletAddress: 1, status: 1 });

// UserInvestment schema
export const UserInvestmentSchema = new Schema(
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
      enum: ['pending', 'active', 'withdrawn', 'failed'],
      default: 'pending',
      index: true,
    },
    depositTxHash: {
      type: String,
      required: true,
    },
    withdrawTxHash: String,
    startDate: {
      type: Date,
      required: true,
    },
    endDate: Date,
    earnings: {
      type: Number,
      default: 0,
    },
    currentValue: {
      type: Number,
      required: true,
    },
    autoCompound: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// MetaMaskConnection schema
export const MetaMaskConnectionSchema = new Schema(
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
    connectedAt: {
      type: Date,
      default: Date.now,
    },
    lastUsed: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    userAgent: String,
    ipAddress: String,
    removalRequest: {
      requestedAt: Date,
      status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
      },
      reason: String,
      email: String,
      processedAt: Date,
      processedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for MetaMaskConnection
MetaMaskConnectionSchema.index({ userId: 1, walletAddress: 1 }, { unique: true });
MetaMaskConnectionSchema.index({ 'removalRequest.status': 1, isActive: 1 });
