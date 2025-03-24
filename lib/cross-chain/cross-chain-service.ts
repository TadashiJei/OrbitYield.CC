import { ethers } from 'ethers';

export interface CrossChainAsset {
  chainId: number;
  chainName: string;
  assetSymbol: string;
  assetName: string;
  assetAddress: string;
  balance: string; // Wei string
  balanceUsd: number;
  decimals: number;
  logoUrl?: string;
  isNative: boolean;
}

export interface ChainInfo {
  id: number;
  name: string;
  rpcUrl: string;
  logoUrl?: string;
  explorerUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

// Supported chains
export const supportedChains: ChainInfo[] = [
  {
    id: 1,
    name: 'Ethereum',
    rpcUrl: 'https://mainnet.infura.io/v3/',
    logoUrl: '/images/chains/ethereum.svg',
    explorerUrl: 'https://etherscan.io',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  {
    id: 137,
    name: 'Polygon',
    rpcUrl: 'https://polygon-rpc.com',
    logoUrl: '/images/chains/polygon.svg',
    explorerUrl: 'https://polygonscan.com',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
  {
    id: 1284,
    name: 'Moonbeam',
    rpcUrl: 'https://rpc.api.moonbeam.network',
    logoUrl: '/images/chains/moonbeam.svg',
    explorerUrl: 'https://moonbeam.moonscan.io',
    nativeCurrency: {
      name: 'GLMR',
      symbol: 'GLMR',
      decimals: 18,
    },
  },
  {
    id: 1285,
    name: 'Moonriver',
    rpcUrl: 'https://rpc.api.moonriver.moonbeam.network',
    logoUrl: '/images/chains/moonriver.svg',
    explorerUrl: 'https://moonriver.moonscan.io',
    nativeCurrency: {
      name: 'MOVR',
      symbol: 'MOVR',
      decimals: 18,
    },
  },
  {
    id: 592,
    name: 'Astar',
    rpcUrl: 'https://astar.api.onfinality.io/public',
    logoUrl: '/images/chains/astar.svg',
    explorerUrl: 'https://blockscout.com/astar',
    nativeCurrency: {
      name: 'ASTR',
      symbol: 'ASTR',
      decimals: 18,
    },
  },
];

// Define a minimum ERC20 ABI to interact with tokens
const minimumERC20ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function name() view returns (string)',
];

// Token prices in USD (mock data - in real implementation, use price feed API)
const tokenPrices: Record<string, number> = {
  'ETH': 2500,
  'MATIC': 1.2,
  'GLMR': 0.6,
  'MOVR': 15,
  'ASTR': 0.12,
  'DOT': 9.5,
  'KSM': 30,
  'USDT': 1,
  'USDC': 1,
  'DAI': 1,
};

export class CrossChainService {
  private providers: Map<number, ethers.providers.Provider> = new Map();
  
  constructor() {
    // Initialize providers for all supported chains
    supportedChains.forEach(chain => {
      const rpcUrl = chain.id === 1 
        ? `${chain.rpcUrl}${process.env.NEXT_PUBLIC_INFURA_ID}`
        : chain.rpcUrl;
        
      this.providers.set(chain.id, new ethers.providers.JsonRpcProvider(rpcUrl));
    });
  }
  
  /**
   * Get assets across multiple chains for an address
   */
  async getAssetsAcrossChains(address: string): Promise<CrossChainAsset[]> {
    try {
      const allAssets: CrossChainAsset[] = [];
      
      // Get balances from all chains in parallel
      const chainPromises = supportedChains.map(async (chain) => {
        const provider = this.providers.get(chain.id);
        if (!provider) return [];
        
        const assets = await this.getAssetsOnChain(address, chain);
        return assets;
      });
      
      const assetsPerChain = await Promise.all(chainPromises);
      return assetsPerChain.flat();
    } catch (error) {
      console.error('Error getting cross-chain assets:', error);
      throw error;
    }
  }
  
  /**
   * Get assets on a specific chain
   */
  private async getAssetsOnChain(address: string, chain: ChainInfo): Promise<CrossChainAsset[]> {
    const provider = this.providers.get(chain.id);
    if (!provider) {
      return [];
    }
    
    const assets: CrossChainAsset[] = [];
    
    try {
      // Get native token balance
      const balance = await provider.getBalance(address);
      const balanceUsd = parseFloat(ethers.utils.formatEther(balance)) * 
        (tokenPrices[chain.nativeCurrency.symbol] || 0);
      
      assets.push({
        chainId: chain.id,
        chainName: chain.name,
        assetSymbol: chain.nativeCurrency.symbol,
        assetName: chain.nativeCurrency.name,
        assetAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // Convention for native tokens
        balance: balance.toString(),
        balanceUsd,
        decimals: chain.nativeCurrency.decimals,
        logoUrl: `/images/tokens/${chain.nativeCurrency.symbol.toLowerCase()}.svg`,
        isNative: true,
      });
      
      // Add some mock ERC20 tokens for development
      // In production, you'd discover tokens from indexers or token lists
      const mockTokens = this.getMockTokensForChain(chain.id);
      
      for (const token of mockTokens) {
        try {
          const tokenContract = new ethers.Contract(
            token.address,
            minimumERC20ABI,
            provider
          );
          
          const tokenBalance = await tokenContract.balanceOf(address);
          const tokenSymbol = token.symbol;
          const tokenDecimals = token.decimals;
          
          const formattedBalance = parseFloat(
            ethers.utils.formatUnits(tokenBalance, tokenDecimals)
          );
          
          const balanceUsd = formattedBalance * (tokenPrices[tokenSymbol] || 0);
          
          if (!tokenBalance.isZero()) {
            assets.push({
              chainId: chain.id,
              chainName: chain.name,
              assetSymbol: tokenSymbol,
              assetName: token.name,
              assetAddress: token.address,
              balance: tokenBalance.toString(),
              balanceUsd,
              decimals: tokenDecimals,
              logoUrl: `/images/tokens/${tokenSymbol.toLowerCase()}.svg`,
              isNative: false,
            });
          }
        } catch (error) {
          console.error(`Error getting balance for token ${token.address}:`, error);
        }
      }
      
      return assets;
    } catch (error) {
      console.error(`Error getting assets on chain ${chain.name}:`, error);
      return [];
    }
  }
  
  /**
   * Transfers assets from one chain to another
   */
  async transferCrossChain(
    fromChainId: number,
    toChainId: number,
    assetAddress: string,
    amount: string,
    recipient: string,
    signer: ethers.Signer
  ): Promise<{
    txHash: string;
    status: 'pending' | 'completed' | 'failed';
    estimatedTimeMinutes: number;
  }> {
    // In a real implementation, this would:
    // 1. Connect to a cross-chain bridge contract
    // 2. Execute the transfer transaction
    // 3. Return transaction details and estimated completion time
    
    // For now, we'll mock a successful transaction
    // In production, this would interact with Polkadot's cross-chain messaging
    
    // Mock transaction hash 
    const txHash = `0x${Array.from({length: 64}, () => 
      Math.floor(Math.random() * 16).toString(16)).join('')}`;
      
    // Store the transfer in local storage for history tracking
    this.storeTransferInHistory(
      fromChainId,
      toChainId,
      assetAddress,
      amount,
      recipient,
      txHash
    );
    
    // Return mock response
    return {
      txHash,
      status: 'pending',
      estimatedTimeMinutes: Math.floor(Math.random() * 10) + 5, // 5-15 minutes
    };
  }
  
  /**
   * Store transfer data in history
   */
  private storeTransferInHistory(
    fromChainId: number,
    toChainId: number,
    assetAddress: string,
    amount: string,
    recipient: string,
    txHash: string
  ): void {
    const timestamp = Date.now();
    
    const fromChain = supportedChains.find(chain => chain.id === fromChainId);
    const toChain = supportedChains.find(chain => chain.id === toChainId);
    
    // Mock asset data based on address
    const isNative = assetAddress === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
    const assetSymbol = isNative 
      ? fromChain?.nativeCurrency.symbol || 'UNKNOWN'
      : this.getMockTokensForChain(fromChainId)
          .find(token => token.address.toLowerCase() === assetAddress.toLowerCase())?.symbol || 'UNKNOWN';
    
    const transfer = {
      id: `transfer-${timestamp}`,
      txHash,
      fromChainId,
      fromChainName: fromChain?.name || 'Unknown Chain',
      toChainId,
      toChainName: toChain?.name || 'Unknown Chain',
      assetAddress,
      assetSymbol,
      amount,
      recipient,
      sender: recipient, // In this mock, sender is the same as recipient
      timestamp,
      status: 'pending',
      completedAt: null,
    };
    
    const historyKey = `orbitYield_transferHistory_${recipient}`;
    const existingHistory = localStorage.getItem(historyKey);
    const history = existingHistory ? JSON.parse(existingHistory) : [];
    
    history.unshift(transfer);
    localStorage.setItem(historyKey, JSON.stringify(history));
  }
  
  /**
   * Get transfer history for an address
   */
  getTransferHistory(address: string): Array<{
    id: string;
    txHash: string;
    fromChainId: number;
    fromChainName: string;
    toChainId: number;
    toChainName: string;
    assetAddress: string;
    assetSymbol: string;
    amount: string;
    recipient: string;
    sender: string;
    timestamp: number;
    status: 'pending' | 'completed' | 'failed';
    completedAt: number | null;
  }> {
    const historyKey = `orbitYield_transferHistory_${address}`;
    const existingHistory = localStorage.getItem(historyKey);
    return existingHistory ? JSON.parse(existingHistory) : [];
  }
  
  /**
   * Get mock tokens for a specific chain
   */
  private getMockTokensForChain(chainId: number): Array<{
    address: string;
    symbol: string;
    name: string;
    decimals: number;
  }> {
    // These would come from a token list API in production
    switch (chainId) {
      case 1: // Ethereum
        return [
          {
            address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
            symbol: 'USDT',
            name: 'Tether USD',
            decimals: 6,
          },
          {
            address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
            symbol: 'USDC',
            name: 'USD Coin',
            decimals: 6,
          },
          {
            address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
            symbol: 'DAI',
            name: 'Dai Stablecoin',
            decimals: 18,
          },
        ];
      case 137: // Polygon
        return [
          {
            address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
            symbol: 'USDT',
            name: 'Tether USD',
            decimals: 6,
          },
          {
            address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
            symbol: 'USDC',
            name: 'USD Coin',
            decimals: 6,
          },
          {
            address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
            symbol: 'DAI',
            name: 'Dai Stablecoin',
            decimals: 18,
          },
        ];
      case 1284: // Moonbeam
        return [
          {
            address: '0xeFAeeE334F0Fd1712f9a8cc375f427D9Cdd40d73',
            symbol: 'USDT',
            name: 'Tether USD',
            decimals: 6,
          },
          {
            address: '0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b',
            symbol: 'USDC',
            name: 'USD Coin',
            decimals: 6,
          },
          {
            address: '0x765277EebeCA2e31912C9946eAe1021199B39C61',
            symbol: 'DAI',
            name: 'Dai Stablecoin',
            decimals: 18,
          },
        ];
      default:
        return [];
    }
  }
}

// Export a singleton instance
export const crossChainService = new CrossChainService();
