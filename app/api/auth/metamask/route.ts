import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb/connection';
import User from '@/lib/mongodb/models/User';
import { ethers } from 'ethers';

/**
 * Generate a nonce for the user authentication process
 * @param walletAddress The user's wallet address
 * @returns A unique nonce for the authentication request
 */
async function generateNonce(walletAddress: string): Promise<string> {
  // Create a random nonce using ethers utils
  const randomBytes = ethers.utils.randomBytes(32);
  const nonce = ethers.utils.hexlify(randomBytes);
  
  // Combine with timestamp and wallet address for uniqueness
  return `${nonce}-${Date.now()}-${walletAddress.toLowerCase()}`;
}

/**
 * Verify a signed message against the expected nonce and wallet address
 * @param message The message that was signed (nonce)
 * @param signature The signature provided by the wallet
 * @param walletAddress The wallet address claiming to have signed the message
 * @returns Boolean indicating if the signature is valid
 */
function verifySignature(
  message: string,
  signature: string,
  walletAddress: string
): boolean {
  try {
    // Recover the address from the signature
    const signerAddress = ethers.utils.verifyMessage(message, signature);
    
    // Compare lowercase versions of both addresses
    return signerAddress.toLowerCase() === walletAddress.toLowerCase();
  } catch (error) {
    console.error('Error verifying signature:', error);
    return false;
  }
}

/**
 * POST /api/auth/metamask
 * Authenticate a user with their MetaMask wallet
 */
export async function POST(request: NextRequest) {
  try {
    // Get request body
    const body = await request.json();
    const { walletAddress, signature, nonce } = body;

    // Validate input
    if (!walletAddress || !signature) {
      return NextResponse.json(
        { error: 'Wallet address and signature are required' },
        { status: 400 }
      );
    }

    // Verify the signature
    if (!verifySignature(nonce, signature, walletAddress)) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Find or create user
    let user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });

    if (!user) {
      // Create a new user if one doesn't exist
      user = await User.create({
        walletAddress: walletAddress.toLowerCase(),
        lastLogin: new Date(),
      });
    } else {
      // Update lastLogin for existing user
      user.lastLogin = new Date();
      await user.save();
    }

    // Return success with user data (excluding sensitive fields)
    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        walletAddress: user.walletAddress,
        username: user.username,
        profilePicture: user.profilePicture,
        preferences: user.preferences,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Error in auth/metamask:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/auth/metamask
 * Generate a nonce for the authentication process
 */
export async function GET(request: NextRequest) {
  try {
    // Get wallet address from query string
    const walletAddress = request.nextUrl.searchParams.get('walletAddress');

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    // Generate a nonce for this authentication request
    const nonce = await generateNonce(walletAddress);

    return NextResponse.json({ 
      success: true, 
      nonce,
      message: `Sign this message to authenticate with OrbitYield: ${nonce}` 
    });
  } catch (error) {
    console.error('Error generating nonce:', error);
    return NextResponse.json(
      { error: 'Failed to generate authentication nonce' },
      { status: 500 }
    );
  }
}
