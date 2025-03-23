import mongoose from 'mongoose';

// This is marked as server-only code to prevent it from being included in client bundles
export const connectDB = async () => {
  // Skip if already connected
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};
