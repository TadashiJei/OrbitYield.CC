import { getPolkadotApi } from './polkadot-api';
import { getProvider } from './contract-utils';
import { ethers } from 'ethers';

/**
 * Struct to hold chain information
 */
export interface ChainInfo {
  name: string;
  tokenSymbol: string;
  tokenDecimals: number;
  blockHeight: number;
  finalized?: number;
  lastBlockTime?: Date;
  nodesCount?: number;
  isTestnet: boolean;
  explorerUrl: string;
}

/**
 * Fetch current chain data from Polkadot
 * @returns ChainInfo object with current chain data
 */
export async function fetchPolkadotChainData(): Promise<ChainInfo> {
  try {
    // Get the Polkadot API
    const api = await getPolkadotApi();
    
    // Fetch basic chain info
    const [chain, properties, health, blockNumber, finalizedHead, finalizedNumber] = await Promise.all([
      api.rpc.system.chain(),
      api.rpc.system.properties(),
      api.rpc.system.health(),
      api.rpc.chain.getHeader(),
      api.rpc.chain.getFinalizedHead(),
      api.rpc.chain.getHeader(await api.rpc.chain.getFinalizedHead()),
    ]);
    
    // Extract token info
    const tokenSymbol = properties.tokenSymbol.unwrapOr(['DOT'])[0].toString();
    const tokenDecimalValue = properties.tokenDecimals.unwrapOr([10])[0];
    const tokenDecimals = typeof tokenDecimalValue === 'object' && 'toNumber' in tokenDecimalValue ? 
      tokenDecimalValue.toNumber() : 
      Number(tokenDecimalValue);
    
    // Determine if testnet
    const chainName = chain.toString().toLowerCase();
    const isTestnet = 
      chainName.includes('test') || 
      chainName.includes('dev') || 
      chainName === 'westend' ||
      chainName === 'moonbase';
    
    // Generate explorer URL
    let explorerUrl = 'https://polkadot.subscan.io';
    
    if (chainName === 'kusama') {
      explorerUrl = 'https://kusama.subscan.io';
    } else if (chainName === 'westend') {
      explorerUrl = 'https://westend.subscan.io';
    } else if (chainName.includes('moonbeam')) {
      explorerUrl = 'https://moonbeam.subscan.io';
    } else if (chainName.includes('moonriver')) {
      explorerUrl = 'https://moonriver.subscan.io';
    } else if (chainName.includes('moonbase')) {
      explorerUrl = 'https://moonbase.subscan.io';
    }
    
    // Return chain info
    return {
      name: chain.toString(),
      tokenSymbol,
      tokenDecimals,
      blockHeight: blockNumber.number.toNumber(),
      finalized: finalizedNumber.number.toNumber(),
      nodesCount: health.peers.toNumber(),
      isTestnet,
      explorerUrl
    };
  } catch (error) {
    console.error('Error fetching Polkadot chain data:', error);
    
    // Return default values in case of error
    return {
      name: 'Polkadot',
      tokenSymbol: 'DOT',
      tokenDecimals: 10,
      blockHeight: 0,
      isTestnet: false,
      explorerUrl: 'https://polkadot.subscan.io'
    };
  }
}

/**
 * Fetches gas price from EVM-compatible chains
 * @returns Current gas price in gwei
 */
export async function fetchGasPrice(): Promise<string> {
  try {
    const provider = getProvider();
    const gasPrice = await provider.getFeeData();
    
    // Convert to gwei for display
    return ethers.utils.formatUnits(gasPrice.gasPrice || 0, 'gwei');
  } catch (error) {
    console.error('Error fetching gas price:', error);
    return '0';
  }
}

/**
 * Fetch token price from an API
 * @param token Token symbol (e.g., DOT)
 * @returns Token price in USD
 */
export async function fetchTokenPrice(token: string): Promise<number> {
  try {
    // Replace with your preferred price API
    // This is just a placeholder implementation
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${mapTokenToId(token)}&vs_currencies=usd`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch token price');
    }
    
    const data = await response.json();
    const tokenId = mapTokenToId(token);
    
    return data[tokenId]?.usd || 0;
  } catch (error) {
    console.error(`Error fetching ${token} price:`, error);
    return 0;
  }
}

/**
 * Maps token symbols to IDs used by CoinGecko API
 */
function mapTokenToId(token: string): string {
  const tokenMap: Record<string, string> = {
    'DOT': 'polkadot',
    'KSM': 'kusama',
    'GLMR': 'moonbeam',
    'MOVR': 'moonriver',
    'ACA': 'acala',
    'ASTR': 'astar',
  };
  
  return tokenMap[token.toUpperCase()] || token.toLowerCase();
}

/**
 * Calculate APR to APY conversion
 * @param apr Annual Percentage Rate
 * @param compoundingFrequency Number of times compounded per year
 * @returns Annual Percentage Yield
 */
export function aprToApy(apr: number, compoundingFrequency: number = 365): number {
  return Math.pow(1 + apr / 100 / compoundingFrequency, compoundingFrequency) * 100 - 100;
}

/**
 * Calculate APY to APR conversion
 * @param apy Annual Percentage Yield
 * @param compoundingFrequency Number of times compounded per year
 * @returns Annual Percentage Rate
 */
export function apyToApr(apy: number, compoundingFrequency: number = 365): number {
  return (Math.pow(1 + apy / 100, 1 / compoundingFrequency) - 1) * compoundingFrequency * 100;
}

/**
 * Calculate estimated earnings based on investment amount and APY
 * @param amount Investment amount
 * @param apy Annual Percentage Yield
 * @param durationDays Investment duration in days
 * @returns Estimated earnings
 */
export function calculateEstimatedEarnings(amount: number, apy: number, durationDays: number): number {
  // Convert APY to daily rate
  const dailyRate = Math.pow(1 + apy / 100, 1 / 365) - 1;
  
  // Calculate compound interest over the period
  return amount * Math.pow(1 + dailyRate, durationDays) - amount;
}

/**
 * Get a list of supported chains in OrbitYield
 * @returns Array of supported chains with their details
 */
export function getSupportedChains(): Array<{id: string, name: string, isTestnet: boolean}> {
  return [
    { id: 'polkadot', name: 'Polkadot', isTestnet: false },
    { id: 'kusama', name: 'Kusama', isTestnet: false },
    { id: 'moonbeam', name: 'Moonbeam', isTestnet: false },
    { id: 'moonriver', name: 'Moonriver', isTestnet: false },
    { id: 'acala', name: 'Acala', isTestnet: false },
    { id: 'astar', name: 'Astar', isTestnet: false },
    { id: 'westend', name: 'Westend', isTestnet: true },
    { id: 'moonbase', name: 'Moonbase Alpha', isTestnet: true },
  ];
}
