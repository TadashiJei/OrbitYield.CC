import { ApiPromise } from '@polkadot/api';
import { ethers } from 'ethers';
import { getContract, getProvider, waitForTransaction } from './contract-utils';

// ABI for a generic staking contract
// This would need to be replaced with the actual ABIs for your specific contracts
const STAKING_ABI = [
  "function stake(uint256 amount) external returns (bool)",
  "function withdraw(uint256 amount) external returns (bool)",
  "function getReward() external returns (bool)",
  "function balanceOf(address account) external view returns (uint256)",
  "function earned(address account) external view returns (uint256)",
  "function rewardRate() external view returns (uint256)",
  "function totalSupply() external view returns (uint256)"
];

/**
 * Fetch all available yield opportunities from the API
 * @param filters Optional filters to apply
 * @returns Array of yield opportunities
 */
export async function fetchYieldOpportunities(filters: Record<string, any> = {}) {
  // Build query string from filters
  const queryParams = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, String(value));
    }
  });
  
  // Always get active opportunities
  queryParams.append('isActive', 'true');
  
  // Fetch from API instead of direct database access
  const response = await fetch(`/api/opportunities?${queryParams.toString()}`);
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch yield opportunities');
  }
  
  return data.data;
}

/**
 * Get the details of a yield opportunity including real-time APY
 * @param opportunityId The ID of the yield opportunity
 * @returns The yield opportunity details with real-time data
 */
export async function getYieldOpportunityDetails(opportunityId: string) {
  if (!opportunityId) {
    throw new Error('Invalid opportunity ID');
  }
  
  // Fetch from API instead of direct database access
  const response = await fetch(`/api/opportunities/${opportunityId}`);
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Yield opportunity not found');
  }
  
  const opportunity = data.data;
  
  // If the opportunity has a contract address, fetch real-time data
  if (opportunity.contractAddress) {
    try {
      const provider = getProvider();
      const contract = getContract(opportunity.contractAddress, STAKING_ABI, provider);
      
      // Get total staked
      const totalStaked = await contract.totalSupply();
      
      // Get reward rate
      const rewardRate = await contract.rewardRate();
      
      // Calculate real-time APY
      // This is a simplified calculation and would need to be adjusted based on the specific protocol
      const rewardPerYear = rewardRate * BigInt(31536000); // seconds in a year
      const realTimeApy = totalStaked > 0 
        ? Number((rewardPerYear * BigInt(100)) / totalStaked)
        : opportunity.apy;
      
      // Return opportunity with real-time data
      return {
        ...opportunity,
        totalStaked: totalStaked.toString(),
        rewardRate: rewardRate.toString(),
        realTimeApy,
      };
    } catch (error) {
      console.error('Error fetching real-time data:', error);
      // Return the opportunity without real-time data
      return opportunity;
    }
  }
  
  // Return the opportunity data from the API
  return opportunity;
}

/**
 * Stake tokens in a yield opportunity
 * @param opportunityId The opportunity ID 
 * @param amount The amount to stake
 * @param walletAddress The user's wallet address
 * @param signer The ethers signer
 * @returns The transaction details
 */
export async function stakeInOpportunity(
  opportunityId: string,
  amount: string,
  walletAddress: string,
  signer: ethers.Signer
) {
  // Validate inputs
  if (!opportunityId) {
    throw new Error('Invalid opportunity ID');
  }
  
  if (!amount || parseFloat(amount) <= 0) {
    throw new Error('Invalid amount');
  }
  
  // Get opportunity details from API
  const opportunityResponse = await fetch(`/api/opportunities/${opportunityId}`);
  const opportunityData = await opportunityResponse.json();
  
  if (!opportunityData.success) {
    throw new Error(opportunityData.error || 'Yield opportunity not found');
  }
  
  const opportunity = opportunityData.data;
  
  if (!opportunity.isActive) {
    throw new Error('This yield opportunity is no longer active');
  }
  
  if (!opportunity.contractAddress) {
    throw new Error('This yield opportunity does not have a contract address');
  }
  
  try {
    // Create a new contract instance with the signer
    const contract = getContract(opportunity.contractAddress, STAKING_ABI, signer);
    
    // Convert amount to the correct format based on decimals
    const amountInWei = ethers.utils.parseUnits(amount, opportunity.tokenDecimals || 18);
    
    // Call the stake function
    const tx = await contract.stake(amountInWei);
    
    // Wait for the transaction to be mined
    const receipt = await waitForTransaction(signer.provider!, tx.hash);
    
    if (receipt.status === 0) {
      throw new Error('Transaction failed');
    }
    
    // Create investment via API
    const investmentResponse = await fetch('/api/investments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        walletAddress: walletAddress.toLowerCase(),
        opportunityId,
        amount: amount,
        currency: opportunity.tokenSymbol,
        depositTxHash: tx.hash,
        autoCompound: false
      }),
    });
    
    const investmentData = await investmentResponse.json();
    
    if (!investmentData.success) {
      throw new Error(investmentData.error || 'Failed to record investment');
    }
    
    // Create transaction via API
    const transactionResponse = await fetch('/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: investmentData.data.userId,
        walletAddress: walletAddress.toLowerCase(),
        type: 'investment',
        amount: amount,
        amountRaw: amountInWei.toString(),
        tokenSymbol: opportunity.tokenSymbol,
        chain: opportunity.chain,
        protocol: opportunity.protocol,
        opportunityId,
        investmentId: investmentData.data._id,
        status: 'completed',
        transactionHash: tx.hash,
        timestamp: new Date(),
      }),
    });
    
    const transactionData = await transactionResponse.json();
    
    return {
      success: true,
      investment: investmentData.data,
      transaction: transactionData.data,
      txHash: tx.hash,
    };
  } catch (error: any) {
    console.error('Staking error:', error);
    
    // Create a failed transaction record via API
    try {
      await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: walletAddress.toLowerCase(),
          type: 'investment',
          amount: amount,
          tokenSymbol: opportunity.tokenSymbol,
          chain: opportunity.chain,
          protocol: opportunity.protocol,
          opportunityId,
          status: 'failed',
          error: error.message || 'Transaction failed',
          timestamp: new Date(),
        }),
      });
    } catch (e) {
      console.error('Failed to record failed transaction:', e);
    }
    
    throw error;
  }
}

/**
 * Withdraw tokens from a yield opportunity
 * @param investmentId The ID of the user's investment
 * @param amount The amount to withdraw (or 'all' for full withdrawal)
 * @param walletAddress The user's wallet address
 * @param signer The ethers signer
 * @returns The transaction details
 */
export async function withdrawFromInvestment(
  investmentId: string,
  amount: string,
  walletAddress: string,
  signer: ethers.Signer
) {
  // Validate inputs
  if (!investmentId) {
    throw new Error('Invalid investment ID');
  }
  
  // Get investment details from API
  const investmentResponse = await fetch(`/api/investments/${investmentId}`);
  const investmentData = await investmentResponse.json();
  
  if (!investmentData.success) {
    throw new Error(investmentData.error || 'Investment not found');
  }
  
  const investment = investmentData.data;
  
  // Get opportunity details from API
  const opportunityResponse = await fetch(`/api/opportunities/${investment.opportunityId}`);
  const opportunityData = await opportunityResponse.json();
  
  if (!opportunityData.success) {
    throw new Error(opportunityData.error || 'Yield opportunity not found');
  }
  
  const opportunity = opportunityData.data;
  
  if (!opportunity.contractAddress) {
    throw new Error('This yield opportunity does not have a contract address');
  }
  
  try {
    // Create a new contract instance with the signer
    const contract = getContract(opportunity.contractAddress, STAKING_ABI, signer);
    
    // Get current staked balance
    const stakedBalance = await contract.balanceOf(walletAddress);
    
    // Determine amount to withdraw
    const withdrawAmount = amount === 'all' ? 
      stakedBalance : 
      ethers.utils.parseUnits(amount, opportunity.tokenDecimals || 18);
    
    // Ensure we're not withdrawing more than staked
    if (withdrawAmount > stakedBalance) {
      throw new Error('Withdraw amount exceeds staked balance');
    }
    
    // Call the withdraw function
    const tx = await contract.withdraw(withdrawAmount);
    
    // Wait for the transaction to be mined
    const receipt = await waitForTransaction(signer.provider!, tx.hash);
    
    if (receipt.status === 0) {
      throw new Error('Transaction failed');
    }
    
    // Update investment status via API
    const updateResponse = await fetch(`/api/investments/${investmentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: withdrawAmount === stakedBalance ? 'completed' : 'active',
        withdrawnAmount: ethers.utils.formatUnits(withdrawAmount, opportunity.tokenDecimals || 18),
        withdrawTxHash: tx.hash,
        withdrawnAt: new Date()
      }),
    });
    
    const updatedInvestment = await updateResponse.json();
    
    // Create transaction record via API
    const transactionResponse = await fetch('/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: investment.userId,
        walletAddress: walletAddress.toLowerCase(),
        type: 'withdrawal',
        amount: ethers.utils.formatUnits(withdrawAmount, opportunity.tokenDecimals || 18),
        amountRaw: withdrawAmount.toString(),
        tokenSymbol: opportunity.tokenSymbol,
        chain: opportunity.chain,
        protocol: opportunity.protocol,
        opportunityId: opportunity._id,
        investmentId,
        status: 'completed',
        transactionHash: tx.hash,
        timestamp: new Date(),
      }),
    });
    
    const transactionData = await transactionResponse.json();
    
    return {
      success: true,
      investment: updatedInvestment.data,
      transaction: transactionData.data,
      txHash: tx.hash,
    };
  } catch (error: any) {
    console.error('Withdrawal error:', error);
    
    // Create a failed transaction record via API
    try {
      await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: walletAddress.toLowerCase(),
          type: 'withdrawal',
          amount: amount,
          tokenSymbol: opportunity.tokenSymbol,
          chain: opportunity.chain,
          protocol: opportunity.protocol,
          opportunityId: opportunity._id,
          investmentId,
          status: 'failed',
          error: error.message || 'Transaction failed',
          timestamp: new Date(),
        }),
      });
    } catch (e) {
      console.error('Failed to record failed transaction:', e);
    }
    
    throw error;
  }
}

/**
 * Claim rewards from a yield opportunity
 * @param investmentId The ID of the user's investment
 * @param walletAddress The user's wallet address
 * @param signer The ethers signer
 * @returns The transaction details
 */
export async function claimRewards(
  investmentId: string,
  walletAddress: string,
  signer: ethers.Signer
) {
  // Validate inputs
  if (!investmentId) {
    throw new Error('Invalid investment ID');
  }
  
  // Get investment details from API
  const investmentResponse = await fetch(`/api/investments/${investmentId}`);
  const investmentData = await investmentResponse.json();
  
  if (!investmentData.success) {
    throw new Error(investmentData.error || 'Investment not found');
  }
  
  const investment = investmentData.data;
  
  // Get opportunity details from API
  const opportunityResponse = await fetch(`/api/opportunities/${investment.opportunityId}`);
  const opportunityData = await opportunityResponse.json();
  
  if (!opportunityData.success) {
    throw new Error(opportunityData.error || 'Yield opportunity not found');
  }
  
  const opportunity = opportunityData.data;
  
  if (!opportunity.contractAddress) {
    throw new Error('This yield opportunity does not have a contract address');
  }
  
  try {
    // Create a new contract instance with the signer
    const contract = getContract(opportunity.contractAddress, STAKING_ABI, signer);
    
    // Get current rewards
    const earnedRewards = await contract.earned(walletAddress);
    
    if (earnedRewards <= 0) {
      throw new Error('No rewards available to claim');
    }
    
    // Call the getReward function
    const tx = await contract.getReward();
    
    // Wait for the transaction to be mined
    const receipt = await waitForTransaction(signer.provider!, tx.hash);
    
    if (receipt.status === 0) {
      throw new Error('Transaction failed');
    }
    
    const rewardAmount = ethers.utils.formatUnits(earnedRewards, opportunity.rewardTokenDecimals || 18);
    
    // Update investment with claimed rewards via API
    const updateResponse = await fetch(`/api/investments/${investmentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lastRewardClaim: new Date(),
        lastRewardAmount: rewardAmount,
        totalRewardsClaimed: (parseFloat(investment.totalRewardsClaimed || '0') + parseFloat(rewardAmount)).toString(),
      }),
    });
    
    const updatedInvestment = await updateResponse.json();
    
    // Create transaction record via API
    const transactionResponse = await fetch('/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: investment.userId,
        walletAddress: walletAddress.toLowerCase(),
        type: 'reward',
        amount: rewardAmount,
        amountRaw: earnedRewards.toString(),
        tokenSymbol: opportunity.rewardTokenSymbol || opportunity.tokenSymbol,
        chain: opportunity.chain,
        protocol: opportunity.protocol,
        opportunityId: opportunity._id,
        investmentId,
        status: 'completed',
        transactionHash: tx.hash,
        timestamp: new Date(),
      }),
    });
    
    const transactionData = await transactionResponse.json();
    
    return {
      success: true,
      rewardAmount,
      investment: updatedInvestment.data,
      transaction: transactionData.data,
      txHash: tx.hash,
    };
  } catch (error: any) {
    console.error('Reward claim error:', error);
    
    // Create a failed transaction record via API
    try {
      await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: walletAddress.toLowerCase(),
          type: 'reward',
          tokenSymbol: opportunity.rewardTokenSymbol || opportunity.tokenSymbol,
          chain: opportunity.chain,
          protocol: opportunity.protocol,
          opportunityId: opportunity._id,
          investmentId,
          status: 'failed',
          error: error.message || 'Transaction failed',
          timestamp: new Date(),
        }),
      });
    } catch (e) {
      console.error('Failed to record failed transaction:', e);
    }
    
    throw error;
  }
}
