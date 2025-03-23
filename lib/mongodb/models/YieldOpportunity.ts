import mongoose, { Schema, Document } from 'mongoose';

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

const YieldOpportunitySchema: Schema = new Schema(
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

// More robust model initialization for Next.js
let YieldOpportunity;
// Check if mongoose.models is defined before trying to access it
if (mongoose.models && 'YieldOpportunity' in mongoose.models) {
  YieldOpportunity = mongoose.models.YieldOpportunity;
} else {
  YieldOpportunity = mongoose.model<IYieldOpportunity>('YieldOpportunity', YieldOpportunitySchema);
}

export default YieldOpportunity;
