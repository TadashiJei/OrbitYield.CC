import { NextRequest, NextResponse } from 'next/server';
import { YieldPreferences, userPreferenceService } from '@/lib/user/preference-service';

/**
 * GET /api/user/preferences
 * 
 * Retrieves a user's saved preferences by wallet address
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const walletAddress = searchParams.get('walletAddress');
    
    if (!walletAddress) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Wallet address is required' 
        }, 
        { status: 400 }
      );
    }
    
    const preferences = await userPreferenceService.getUserPreferences(walletAddress);
    
    return NextResponse.json(
      { 
        success: true, 
        data: preferences 
      }
    );
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch user preferences' 
      }, 
      { status: 500 }
    );
  }
}

/**
 * POST /api/user/preferences
 * 
 * Saves a user's preferences
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { walletAddress, preferences } = body;
    
    if (!walletAddress) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Wallet address is required' 
        }, 
        { status: 400 }
      );
    }
    
    if (!preferences) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Preferences data is required' 
        }, 
        { status: 400 }
      );
    }
    
    const success = await userPreferenceService.saveUserPreferences(walletAddress, preferences as YieldPreferences);
    
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      throw new Error('Failed to save preferences');
    }
  } catch (error) {
    console.error('Error saving user preferences:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to save user preferences' 
      }, 
      { status: 500 }
    );
  }
}
