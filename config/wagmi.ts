import { http, createConfig } from 'wagmi';
import { mainnet, polygon, goerli } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

// Configure client
export const config = createConfig({
  chains: [mainnet, polygon, goerli],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [goerli.id]: http(),
  },
  connectors: [
    injected(),
  ],
});
