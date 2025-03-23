import mongoose, { Schema, Document } from 'mongoose';

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

const UserSchema: Schema = new Schema(
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

// More robust model initialization for Next.js
let User;
// Check if mongoose.models is defined before trying to access it
if (mongoose.models && 'User' in mongoose.models) {
  User = mongoose.models.User;
} else {
  User = mongoose.model<IUser>('User', UserSchema);
}

export default User;
