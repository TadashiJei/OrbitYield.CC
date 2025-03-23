'use client';

import { ReactNode } from 'react';
import { WagmiProvider as WagmiConfigProvider } from 'wagmi';
import { config } from '@/config/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

interface WagmiProviderProps {
  children: ReactNode;
}

export function WagmiProvider({ children }: WagmiProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfigProvider config={config}>
        {children}
      </WagmiConfigProvider>
    </QueryClientProvider>
  );
}
