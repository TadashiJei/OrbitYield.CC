export interface Chain {
  id: string;
  name: string;
  rpcUrl: string;
  explorer: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  logo?: string;
  isTestnet?: boolean;
}

export interface ChainToken {
  chainId: string;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logo?: string;
  priceUsd?: number;
  balance?: string;
  formattedBalance?: string;
  valueUsd?: number;
}

export interface BridgeProvider {
  id: string;
  name: string;
  logo?: string;
  supportedChains: string[];
  estimateFees: (sourceChainId: string, destChainId: string, tokenAddress: string, amount: string) => Promise<{
    fee: string;
    estimatedTime: number; // in minutes
  }>;
  bridge: (sourceChainId: string, destChainId: string, tokenAddress: string, amount: string, recipient: string) => Promise<{
    txHash: string;
    estimatedTime: number; // in minutes
  }>;
}

export interface CrossChainTransfer {
  id: string;
  fromChainId: string;
  toChainId: string;
  tokenAddress: string;
  tokenSymbol: string;
  amount: string;
  sender: string;
  recipient: string;
  sourceTxHash: string;
  destinationTxHash?: string; 
  status: 'pending' | 'completed' | 'failed';
  timestamp: number;
  bridgeProvider: string;
  fee?: string;
  estimatedCompletionTime?: number; // timestamp
}

export interface ChainBalance {
  chainId: string;
  tokens: ChainToken[];
  totalValueUsd: number;
}

export interface CrossChainAssetSummary {
  totalValueUsd: number;
  chainBalances: ChainBalance[];
}
