import mongoose, { Schema, Document } from 'mongoose';
import { Types } from 'mongoose';

export interface ITransaction extends Document {
  userId: Types.ObjectId;
  walletAddress: string;
  type: 'deposit' | 'withdrawal' | 'reward' | 'fee' | 'transfer';
  amount: number;
  currency: string;
  txHash: string;
  status: 'pending' | 'confirmed' | 'failed';
  opportunityId?: Types.ObjectId;
  fromChain?: string;
  toChain?: string;
  fee?: number;
  feeCurrency?: string;
  blockNumber?: number;
  timestamp: Date;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema: Schema = new Schema(
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
    type: {
      type: String,
      enum: ['deposit', 'withdrawal', 'reward', 'fee', 'transfer'],
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
    txHash: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'failed'],
      default: 'pending',
      index: true,
    },
    opportunityId: {
      type: Schema.Types.ObjectId,
      ref: 'YieldOpportunity',
      index: true,
    },
    fromChain: String,
    toChain: String,
    fee: Number,
    feeCurrency: String,
    blockNumber: Number,
    timestamp: {
      type: Date,
      required: true,
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
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

// More robust model initialization for Next.js
let Transaction;
// Check if mongoose.models is defined before trying to access it
if (mongoose.models && 'Transaction' in mongoose.models) {
  Transaction = mongoose.models.Transaction;
} else {
  Transaction = mongoose.model<ITransaction>('Transaction', TransactionSchema);
}

export default Transaction;
