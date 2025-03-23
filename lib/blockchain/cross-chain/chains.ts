import { Chain } from './types';

// Define supported chains with their configuration
export const supportedChains: Chain[] = [
  {
    id: 'ethereum',
    name: 'Ethereum',
    rpcUrl: 'https://mainnet.infura.io/v3/${INFURA_API_KEY}',
    explorer: 'https://etherscan.io',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    logo: '/images/chains/ethereum.svg'
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    explorer: 'https://arbiscan.io',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    logo: '/images/chains/arbitrum.svg'
  },
  {
    id: 'polygon',
    name: 'Polygon',
    rpcUrl: 'https://polygon-rpc.com',
    explorer: 'https://polygonscan.com',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    },
    logo: '/images/chains/polygon.svg'
  },
  {
    id: 'optimism',
    name: 'Optimism',
    rpcUrl: 'https://mainnet.optimism.io',
    explorer: 'https://optimistic.etherscan.io',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    logo: '/images/chains/optimism.svg'
  },
  {
    id: 'polkadot',
    name: 'Polkadot',
    rpcUrl: 'https://rpc.polkadot.io',
    explorer: 'https://polkadot.subscan.io',
    nativeCurrency: {
      name: 'Polkadot',
      symbol: 'DOT',
      decimals: 10
    },
    logo: '/images/chains/polkadot.svg'
  },
  {
    id: 'astar',
    name: 'Astar',
    rpcUrl: 'https://astar.api.onfinality.io/public',
    explorer: 'https://blockscout.com/astar',
    nativeCurrency: {
      name: 'Astar',
      symbol: 'ASTR',
      decimals: 18
    },
    logo: '/images/chains/astar.svg'
  },
  {
    id: 'moonbeam',
    name: 'Moonbeam',
    rpcUrl: 'https://rpc.api.moonbeam.network',
    explorer: 'https://moonbeam.moonscan.io',
    nativeCurrency: {
      name: 'Glimmer',
      symbol: 'GLMR',
      decimals: 18
    },
    logo: '/images/chains/moonbeam.svg'
  },
  {
    id: 'moonriver',
    name: 'Moonriver',
    rpcUrl: 'https://rpc.api.moonriver.moonbeam.network',
    explorer: 'https://moonriver.moonscan.io',
    nativeCurrency: {
      name: 'Moonriver',
      symbol: 'MOVR',
      decimals: 18
    },
    logo: '/images/chains/moonriver.svg'
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    explorer: 'https://snowtrace.io',
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18
    },
    logo: '/images/chains/avalanche.svg'
  }
];

// Helper functions for chain operations
export function getChainById(chainId: string): Chain | undefined {
  return supportedChains.find(chain => chain.id === chainId);
}

export function getChainByName(chainName: string): Chain | undefined {
  return supportedChains.find(chain => chain.name.toLowerCase() === chainName.toLowerCase());
}

export function isChainSupported(chainId: string): boolean {
  return supportedChains.some(chain => chain.id === chainId);
}

export function getEthereumCompatibleChains(): Chain[] {
  return supportedChains.filter(chain => [
    'ethereum', 'arbitrum', 'polygon', 'optimism', 'avalanche', 'moonbeam', 'moonriver'
  ].includes(chain.id));
}

export function getSubstrateChains(): Chain[] {
  return supportedChains.filter(chain => [
    'polkadot', 'astar', 'moonbeam', 'moonriver'
  ].includes(chain.id));
}

// Chain icons mapping for use in UI components
export const chainIcons: Record<string, string> = {
  ethereum: '/images/chains/ethereum.svg',
  arbitrum: '/images/chains/arbitrum.svg',
  polygon: '/images/chains/polygon.svg',
  optimism: '/images/chains/optimism.svg',
  polkadot: '/images/chains/polkadot.svg',
  astar: '/images/chains/astar.svg',
  moonbeam: '/images/chains/moonbeam.svg',
  moonriver: '/images/chains/moonriver.svg',
  avalanche: '/images/chains/avalanche.svg'
};
