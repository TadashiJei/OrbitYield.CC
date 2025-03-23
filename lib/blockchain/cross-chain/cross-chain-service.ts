import { ethers } from 'ethers';
import { 
  Chain, 
  ChainToken, 
  BridgeProvider, 
  CrossChainTransfer,
  ChainBalance,
  CrossChainAssetSummary
} from './types';
import { supportedChains, getChainById } from './chains';
import { getBridgeProviderById, getBestBridgeProvider } from './bridge-providers';

// ABI for ERC20 token balance checking
const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function name() view returns (string)'
];

// Mock token data per chain for development - in production this would come from a token list API
const CHAIN_TOKENS: Record<string, ChainToken[]> = {
  'ethereum': [
    { chainId: 'ethereum', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', name: 'USD Coin', symbol: 'USDC', decimals: 6, priceUsd: 1 },
    { chainId: 'ethereum', address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', name: 'Tether USD', symbol: 'USDT', decimals: 6, priceUsd: 1 },
    { chainId: 'ethereum', address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', name: 'Dai Stablecoin', symbol: 'DAI', decimals: 18, priceUsd: 1 },
    { chainId: 'ethereum', address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', name: 'Wrapped Bitcoin', symbol: 'WBTC', decimals: 8, priceUsd: 64000 },
  ],
  'arbitrum': [
    { chainId: 'arbitrum', address: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8', name: 'USD Coin', symbol: 'USDC', decimals: 6, priceUsd: 1 },
    { chainId: 'arbitrum', address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9', name: 'Tether USD', symbol: 'USDT', decimals: 6, priceUsd: 1 },
    { chainId: 'arbitrum', address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1', name: 'Dai Stablecoin', symbol: 'DAI', decimals: 18, priceUsd: 1 },
    { chainId: 'arbitrum', address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f', name: 'Wrapped Bitcoin', symbol: 'WBTC', decimals: 8, priceUsd: 64000 },
  ],
  'polygon': [
    { chainId: 'polygon', address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', name: 'USD Coin', symbol: 'USDC', decimals: 6, priceUsd: 1 },
    { chainId: 'polygon', address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', name: 'Tether USD', symbol: 'USDT', decimals: 6, priceUsd: 1 },
    { chainId: 'polygon', address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', name: 'Dai Stablecoin', symbol: 'DAI', decimals: 18, priceUsd: 1 },
    { chainId: 'polygon', address: '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6', name: 'Wrapped Bitcoin', symbol: 'WBTC', decimals: 8, priceUsd: 64000 },
  ]
  // Additional chains would be defined here
};

// In-memory store for transfer history (would be replaced with database in production)
let transferHistory: CrossChainTransfer[] = [];

export class CrossChainService {
  private providerCache: Record<string, ethers.providers.JsonRpcProvider> = {};
  
  constructor() {
    // Initialize any required services
    this.initializeProviders();
  }
  
  private initializeProviders() {
    // Pre-initialize providers for each supported chain
    supportedChains.forEach(chain => {
      try {
        // Replace ${INFURA_API_KEY} with actual key in production
        const rpcUrl = chain.rpcUrl.replace('${INFURA_API_KEY}', 'fallback_dev_key');
        this.providerCache[chain.id] = new ethers.providers.JsonRpcProvider(rpcUrl);
      } catch (error) {
        console.error(`Failed to initialize provider for ${chain.name}:`, error);
      }
    });
  }
  
  private getProvider(chainId: string): ethers.providers.JsonRpcProvider {
    if (!this.providerCache[chainId]) {
      const chain = getChainById(chainId);
      if (!chain) {
        throw new Error(`Chain ${chainId} not supported`);
      }
      
      const rpcUrl = chain.rpcUrl.replace('${INFURA_API_KEY}', 'fallback_dev_key');
      this.providerCache[chainId] = new ethers.providers.JsonRpcProvider(rpcUrl);
    }
    
    return this.providerCache[chainId];
  }
  
  // Get native token balance for an address on a specific chain
  async getNativeBalance(chainId: string, address: string): Promise<{
    balance: string;
    formattedBalance: string;
    valueUsd: number;
  }> {
    try {
      const chain = getChainById(chainId);
      if (!chain) {
        throw new Error(`Chain ${chainId} not supported`);
      }
      
      const provider = this.getProvider(chainId);
      const balance = await provider.getBalance(address);
      
      // Mock price data - in production would come from price oracle
      const priceUsd = chainId === 'ethereum' ? 3500 : 
                       chainId === 'polygon' ? 0.6 : 
                       chainId === 'avalanche' ? 35 : 20;
      
      const formattedBalance = ethers.utils.formatUnits(balance, chain.nativeCurrency.decimals);
      const valueUsd = parseFloat(formattedBalance) * priceUsd;
      
      return {
        balance: balance.toString(),
        formattedBalance,
        valueUsd
      };
    } catch (error) {
      console.error(`Error getting native balance for ${address} on ${chainId}:`, error);
      return {
        balance: '0',
        formattedBalance: '0',
        valueUsd: 0
      };
    }
  }
  
  // Get token balances for an address on a specific chain
  async getTokenBalances(chainId: string, address: string): Promise<ChainToken[]> {
    try {
      const chain = getChainById(chainId);
      if (!chain) {
        throw new Error(`Chain ${chainId} not supported`);
      }
      
      const provider = this.getProvider(chainId);
      const chainTokens = CHAIN_TOKENS[chainId] || [];
      
      // For each token in the chain, get the balance
      const tokenPromises = chainTokens.map(async (token) => {
        try {
          const tokenContract = new ethers.Contract(token.address, ERC20_ABI, provider);
          const balance = await tokenContract.balanceOf(address);
          const formattedBalance = ethers.utils.formatUnits(balance, token.decimals);
          const valueUsd = parseFloat(formattedBalance) * (token.priceUsd || 0);
          
          return {
            ...token,
            balance: balance.toString(),
            formattedBalance,
            valueUsd
          };
        } catch (error) {
          console.error(`Error getting balance for token ${token.symbol} on ${chainId}:`, error);
          return {
            ...token,
            balance: '0',
            formattedBalance: '0',
            valueUsd: 0
          };
        }
      });
      
      const tokens = await Promise.all(tokenPromises);
      return tokens;
    } catch (error) {
      console.error(`Error getting token balances for ${address} on ${chainId}:`, error);
      return [];
    }
  }
  
  // Get all assets across all chains for a user
  async getCrossChainAssets(address: string): Promise<CrossChainAssetSummary> {
    try {
      const chainBalancePromises = supportedChains.map(async (chain) => {
        try {
          // Get native token balance
          const { balance, formattedBalance, valueUsd: nativeValueUsd } = 
            await this.getNativeBalance(chain.id, address);
          
          // Get token balances
          const tokens = await this.getTokenBalances(chain.id, address);
          
          // Add native token to the list
          const allTokens = [
            {
              chainId: chain.id,
              address: 'native',
              name: chain.nativeCurrency.name,
              symbol: chain.nativeCurrency.symbol,
              decimals: chain.nativeCurrency.decimals,
              balance,
              formattedBalance,
              valueUsd: nativeValueUsd,
              // Mock price data
              priceUsd: chain.id === 'ethereum' ? 3500 : 
                        chain.id === 'polygon' ? 0.6 : 
                        chain.id === 'avalanche' ? 35 : 20
            },
            ...tokens
          ];
          
          // Calculate total value on this chain
          const totalValueUsd = allTokens.reduce((sum, token) => sum + (token.valueUsd || 0), 0);
          
          return {
            chainId: chain.id,
            tokens: allTokens,
            totalValueUsd
          };
        } catch (error) {
          console.error(`Error getting assets for ${address} on ${chain.id}:`, error);
          return {
            chainId: chain.id,
            tokens: [],
            totalValueUsd: 0
          };
        }
      });
      
      const chainBalances = await Promise.all(chainBalancePromises);
      
      // Filter out chains with zero balance for cleaner UI
      const nonEmptyChainBalances = chainBalances.filter(chain => chain.totalValueUsd > 0);
      
      // Calculate total value across all chains
      const totalValueUsd = nonEmptyChainBalances.reduce((sum, chain) => sum + chain.totalValueUsd, 0);
      
      return {
        totalValueUsd,
        chainBalances: nonEmptyChainBalances
      };
    } catch (error) {
      console.error(`Error getting cross-chain assets for ${address}:`, error);
      return {
        totalValueUsd: 0,
        chainBalances: []
      };
    }
  }
  
  // Initiate a cross-chain transfer
  async initiateTransfer(
    sourceChainId: string,
    destChainId: string,
    tokenAddress: string,
    amount: string,
    sender: string,
    recipient: string,
    bridgeProviderId?: string
  ): Promise<CrossChainTransfer> {
    try {
      // Get token info
      const sourceChain = getChainById(sourceChainId);
      const destChain = getChainById(destChainId);
      
      if (!sourceChain || !destChain) {
        throw new Error('Source or destination chain not supported');
      }
      
      let tokenSymbol = 'Unknown';
      if (tokenAddress === 'native') {
        tokenSymbol = sourceChain.nativeCurrency.symbol;
      } else {
        // In production, we would get the token symbol from the contract
        const chainTokens = CHAIN_TOKENS[sourceChainId] || [];
        const token = chainTokens.find(t => t.address.toLowerCase() === tokenAddress.toLowerCase());
        tokenSymbol = token?.symbol || 'Unknown';
      }
      
      // Get the best bridge provider if not specified
      let bridgeProvider: BridgeProvider;
      let estimatedFee: string;
      let estimatedTime: number;
      
      if (bridgeProviderId) {
        const provider = getBridgeProviderById(bridgeProviderId);
        if (!provider) {
          throw new Error(`Bridge provider ${bridgeProviderId} not found`);
        }
        
        bridgeProvider = provider;
        const feeEstimate = await provider.estimateFees(sourceChainId, destChainId, tokenAddress, amount);
        estimatedFee = feeEstimate.fee;
        estimatedTime = feeEstimate.estimatedTime;
      } else {
        const bestProviderData = await getBestBridgeProvider(sourceChainId, destChainId, tokenAddress, amount);
        bridgeProvider = bestProviderData.provider;
        estimatedFee = bestProviderData.fee;
        estimatedTime = bestProviderData.estimatedTime;
      }
      
      // Initiate the bridge transaction
      const { txHash } = await bridgeProvider.bridge(
        sourceChainId,
        destChainId,
        tokenAddress,
        amount,
        recipient
      );
      
      // Calculate estimated completion time
      const now = Date.now();
      const estimatedCompletionTime = now + (estimatedTime * 60 * 1000); // Convert minutes to milliseconds
      
      // Create a record of the transfer
      const transfer: CrossChainTransfer = {
        id: `transfer_${now}_${Math.floor(Math.random() * 1000)}`,
        fromChainId: sourceChainId,
        toChainId: destChainId,
        tokenAddress,
        tokenSymbol,
        amount,
        sender,
        recipient,
        sourceTxHash: txHash,
        status: 'pending',
        timestamp: now,
        bridgeProvider: bridgeProvider.id,
        fee: estimatedFee,
        estimatedCompletionTime
      };
      
      // Save to history (in production, this would be saved to a database)
      transferHistory.push(transfer);
      
      return transfer;
    } catch (error) {
      console.error('Error initiating cross-chain transfer:', error);
      throw error;
    }
  }
  
  // Get transfer history for a user
  getTransferHistory(address: string): CrossChainTransfer[] {
    try {
      // Filter transfers where the user is either sender or recipient
      return transferHistory.filter(
        transfer => 
          transfer.sender.toLowerCase() === address.toLowerCase() || 
          transfer.recipient.toLowerCase() === address.toLowerCase()
      ).sort((a, b) => b.timestamp - a.timestamp); // Sort by timestamp, newest first
    } catch (error) {
      console.error(`Error getting transfer history for ${address}:`, error);
      return [];
    }
  }
  
  // Get a specific transfer by ID
  getTransferById(transferId: string): CrossChainTransfer | undefined {
    return transferHistory.find(transfer => transfer.id === transferId);
  }
  
  // Update transfer status (e.g., when monitoring for completion)
  updateTransferStatus(transferId: string, status: 'pending' | 'completed' | 'failed', destinationTxHash?: string): CrossChainTransfer | undefined {
    const transferIndex = transferHistory.findIndex(transfer => transfer.id === transferId);
    
    if (transferIndex === -1) {
      return undefined;
    }
    
    const updatedTransfer = {
      ...transferHistory[transferIndex],
      status,
      ...(destinationTxHash && { destinationTxHash })
    };
    
    transferHistory[transferIndex] = updatedTransfer;
    return updatedTransfer;
  }
  
  // Get summarized asset distribution by chain
  getAssetDistribution(address: string): Promise<{
    chainId: string;
    chainName: string;
    percentage: number;
    valueUsd: number;
  }[]> {
    return new Promise(async (resolve) => {
      try {
        const { totalValueUsd, chainBalances } = await this.getCrossChainAssets(address);
        
        if (totalValueUsd === 0) {
          resolve([]);
          return;
        }
        
        const distribution = chainBalances.map(chain => {
          const chainInfo = getChainById(chain.chainId);
          return {
            chainId: chain.chainId,
            chainName: chainInfo?.name || chain.chainId,
            percentage: (chain.totalValueUsd / totalValueUsd) * 100,
            valueUsd: chain.totalValueUsd
          };
        });
        
        resolve(distribution);
      } catch (error) {
        console.error(`Error getting asset distribution for ${address}:`, error);
        resolve([]);
      }
    });
  }
}

// Create and export a singleton instance
export const crossChainService = new CrossChainService();
