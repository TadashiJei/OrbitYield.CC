import mongoose, { Schema, Document } from 'mongoose';
import { Types } from 'mongoose';

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

const UserInvestmentSchema: Schema = new Schema(
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

// More robust model initialization for Next.js
let UserInvestment;
// Check if mongoose.models is defined before trying to access it
if (mongoose.models && 'UserInvestment' in mongoose.models) {
  UserInvestment = mongoose.models.UserInvestment;
} else {
  UserInvestment = mongoose.model<IUserInvestment>('UserInvestment', UserInvestmentSchema);
}

export default UserInvestment;
