import mongoose, { Schema, Document } from 'mongoose';
import { Types } from 'mongoose';

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

const MetaMaskConnectionSchema: Schema = new Schema(
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

// Create indexes for efficient querying
MetaMaskConnectionSchema.index({ userId: 1, walletAddress: 1 }, { unique: true });
MetaMaskConnectionSchema.index({ 'removalRequest.status': 1, isActive: 1 });

// More robust model initialization for Next.js
let MetaMaskConnection;
// Check if mongoose.models is defined before trying to access it
if (mongoose.models && 'MetaMaskConnection' in mongoose.models) {
  MetaMaskConnection = mongoose.models.MetaMaskConnection;
} else {
  MetaMaskConnection = mongoose.model<IMetaMaskConnection>('MetaMaskConnection', MetaMaskConnectionSchema);
}

export default MetaMaskConnection;
