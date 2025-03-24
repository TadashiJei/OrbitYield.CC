import { useState, useEffect, useMemo } from 'react';
import { ethers } from 'ethers';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import YieldAggregatorABI from '@/abis/YieldAggregator.json';
import StrategyFactoryABI from '@/abis/StrategyFactory.json';
import IYieldStrategyABI from '@/abis/IYieldStrategy.json';
import ERC20ABI from '@/abis/ERC20.json';

// Contract addresses - these should be environment variables in production
const YIELD_AGGREGATOR_ADDRESS = process.env.NEXT_PUBLIC_YIELD_AGGREGATOR_ADDRESS || '0x1234567890123456789012345678901234567890';
const STRATEGY_FACTORY_ADDRESS = process.env.NEXT_PUBLIC_STRATEGY_FACTORY_ADDRESS || '0x0987654321098765432109876543210987654321';

interface UseYieldContractsProps {
  onError?: (error: Error) => void;
}

export function useYieldContracts({ onError }: UseYieldContractsProps = {}) {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [isLoading, setIsLoading] = useState(false);
  
  // Create ethers.js provider from Wagmi publicClient
  const provider = useMemo(() => {
    if (!publicClient) return null;
    return new ethers.providers.JsonRpcProvider(
      publicClient.transport.url || 'https://ethereum.publicnode.com'
    );
  }, [publicClient]);

  // Create ethers.js signer from Wagmi walletClient
  const signer = useMemo(() => {
    if (!walletClient || !provider) return null;
    const { account, chain } = walletClient;
    return provider.getSigner(account.address);
  }, [walletClient, provider]);
  
  // Initialize contracts with provider (read-only)
  const contracts = useMemo(() => {
    if (!provider) return { aggregator: null, factory: null };
    
    try {
      const aggregator = new ethers.Contract(
        YIELD_AGGREGATOR_ADDRESS,
        YieldAggregatorABI,
        provider
      );
      
      const factory = new ethers.Contract(
        STRATEGY_FACTORY_ADDRESS,
        StrategyFactoryABI,
        provider
      );
      
      return { aggregator, factory };
    } catch (error) {
      console.error('Error initializing contracts:', error);
      onError?.(error as Error);
      return { aggregator: null, factory: null };
    }
  }, [provider, onError]);
  
  // Get signer-connected contracts (for write operations)
  const signerContracts = useMemo(() => {
    if (!signer) return { aggregator: null, factory: null };
    
    try {
      const aggregator = new ethers.Contract(
        YIELD_AGGREGATOR_ADDRESS,
        YieldAggregatorABI,
        signer
      );
      
      const factory = new ethers.Contract(
        STRATEGY_FACTORY_ADDRESS,
        StrategyFactoryABI,
        signer
      );
      
      return { aggregator, factory };
    } catch (error) {
      console.error('Error initializing signer contracts:', error);
      onError?.(error as Error);
      return { aggregator: null, factory: null };
    }
  }, [signer, onError]);
  
  // Get strategy contract by address
  const getStrategyContract = (strategyAddress: string, withSigner = false) => {
    try {
      return new ethers.Contract(
        strategyAddress,
        IYieldStrategyABI,
        withSigner && signer ? signer : provider
      );
    } catch (error) {
      console.error('Error creating strategy contract:', error);
      onError?.(error as Error);
      return null;
    }
  };
  
  // Get ERC20 token contract
  const getTokenContract = (tokenAddress: string, withSigner = false) => {
    try {
      return new ethers.Contract(
        tokenAddress,
        ERC20ABI,
        withSigner && signer ? signer : provider
      );
    } catch (error) {
      console.error('Error creating token contract:', error);
      onError?.(error as Error);
      return null;
    }
  };
  
  // Check if connected
  const isConnected = !!address && !!signer;
  
  // Function to deposit into strategy
  const depositToStrategy = async (strategyAddress: string, tokenAddress: string, amount: string) => {
    if (!isConnected || !signerContracts.aggregator) {
      throw new Error('Wallet not connected or contracts not initialized');
    }
    
    setIsLoading(true);
    try {
      // First approve the token transfer
      const tokenContract = getTokenContract(tokenAddress, true);
      if (!tokenContract) throw new Error('Failed to get token contract');
      
      const approveTx = await tokenContract.approve(YIELD_AGGREGATOR_ADDRESS, amount);
      await approveTx.wait();
      
      // Then deposit
      const tx = await signerContracts.aggregator.deposit(strategyAddress, tokenAddress, amount);
      const receipt = await tx.wait();
      
      return receipt;
    } catch (error) {
      console.error('Error in deposit:', error);
      onError?.(error as Error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to withdraw from strategy
  const withdrawFromStrategy = async (strategyAddress: string, tokenAddress: string, amount: string) => {
    if (!isConnected || !signerContracts.aggregator) {
      throw new Error('Wallet not connected or contracts not initialized');
    }
    
    setIsLoading(true);
    try {
      const tx = await signerContracts.aggregator.withdraw(strategyAddress, tokenAddress, amount);
      const receipt = await tx.wait();
      
      return receipt;
    } catch (error) {
      console.error('Error in withdraw:', error);
      onError?.(error as Error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to get user's position in a strategy
  const getUserPosition = async (strategyAddress: string, tokenAddress: string) => {
    if (!address || !contracts.aggregator) {
      throw new Error('Wallet not connected or contracts not initialized');
    }
    
    try {
      const position = await contracts.aggregator.getUserPosition(address, strategyAddress, tokenAddress);
      return {
        amount: position.amount.toString(),
        entryTimestamp: position.entryTimestamp.toNumber(),
        lastUpdateTimestamp: position.lastUpdateTimestamp.toNumber()
      };
    } catch (error) {
      console.error('Error getting user position:', error);
      onError?.(error as Error);
      throw error;
    }
  };
  
  // Function to get all supported strategies
  const getSupportedStrategies = async () => {
    if (!contracts.factory) {
      throw new Error('Contracts not initialized');
    }
    
    try {
      const strategies = await contracts.factory.getAllStrategies();
      return strategies;
    } catch (error) {
      console.error('Error getting supported strategies:', error);
      onError?.(error as Error);
      throw error;
    }
  };
  
  // Function to get all user positions across strategies
  const getAllUserPositions = async () => {
    if (!address) {
      throw new Error('Wallet not connected');
    }
    
    // If contracts aren't initialized or we're in development mode, return mock data
    if (!contracts.aggregator || 
        YIELD_AGGREGATOR_ADDRESS === '0x1234567890123456789012345678901234567890') {
      console.log('Using mock data for user positions (contract not available)');
      // Return mock positions data for development/demo
      return [
        {
          strategy: '0xStrategy1',
          asset: '0xAsset1',
          amount: '1000000000000000000', // 1 ETH in wei
          entryTimestamp: Math.floor(Date.now() / 1000) - 86400 * 7, // 7 days ago
          lastUpdateTimestamp: Math.floor(Date.now() / 1000) - 86400 // 1 day ago
        },
        {
          strategy: '0xStrategy2',
          asset: '0xAsset2',
          amount: '500000000000000000', // 0.5 ETH in wei
          entryTimestamp: Math.floor(Date.now() / 1000) - 86400 * 14, // 14 days ago
          lastUpdateTimestamp: Math.floor(Date.now() / 1000) - 86400 * 2 // 2 days ago
        }
      ];
    }
    
    try {
      const positions = await contracts.aggregator.getUserPositions(address);
      return positions.map((pos: any) => ({
        strategy: pos.strategy,
        asset: pos.asset,
        amount: pos.amount.toString(),
        entryTimestamp: pos.entryTimestamp.toNumber(),
        lastUpdateTimestamp: pos.lastUpdateTimestamp.toNumber()
      }));
    } catch (error) {
      console.error('Error getting all user positions:', error);
      onError?.(error as Error);
      
      // If contract call fails, return mock data in development
      if (process.env.NODE_ENV !== 'production') {
        console.log('Falling back to mock data after contract error');
        return [
          {
            strategy: '0xStrategy1',
            asset: '0xAsset1',
            amount: '1000000000000000000', // 1 ETH in wei
            entryTimestamp: Math.floor(Date.now() / 1000) - 86400 * 7, // 7 days ago
            lastUpdateTimestamp: Math.floor(Date.now() / 1000) - 86400 // 1 day ago
          },
          {
            strategy: '0xStrategy2',
            asset: '0xAsset2',
            amount: '500000000000000000', // 0.5 ETH in wei
            entryTimestamp: Math.floor(Date.now() / 1000) - 86400 * 14, // 14 days ago
            lastUpdateTimestamp: Math.floor(Date.now() / 1000) - 86400 * 2 // 2 days ago
          }
        ];
      }
      
      throw error;
    }
  };
  
  // Function to claim rewards from a strategy
  const claimRewards = async (strategyAddress: string) => {
    if (!isConnected || !signerContracts.aggregator) {
      throw new Error('Wallet not connected or contracts not initialized');
    }
    
    setIsLoading(true);
    try {
      const tx = await signerContracts.aggregator.claimRewards(strategyAddress);
      const receipt = await tx.wait();
      
      return receipt;
    } catch (error) {
      console.error('Error claiming rewards:', error);
      onError?.(error as Error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    contracts,
    signerContracts,
    getStrategyContract,
    getTokenContract,
    isConnected,
    isLoading,
    depositToStrategy,
    withdrawFromStrategy,
    getUserPosition,
    getSupportedStrategies,
    getAllUserPositions,
    claimRewards,
    address
  };
}
