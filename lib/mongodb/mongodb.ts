import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// Connection state tracking
interface MongoDBConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Create a global MongoDB connection object
let cached: MongoDBConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    );
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}
