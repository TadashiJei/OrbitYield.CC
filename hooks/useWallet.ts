'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

export function useWallet() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = useCallback(async () => {
    try {
      setIsConnecting(true);
      setError(null);
      
      // Check if MetaMask is available
      if (typeof window !== 'undefined' && !window.ethereum) {
        setError('MetaMask is not installed. Please install MetaMask to continue.');
        return;
      }
      
      // Force disconnect first to clear any stale state
      disconnect();
      
      // Connect using wagmi
      connect({ connector: injected() });
    } catch (err: any) {
      console.error('Error connecting wallet:', err);
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  }, [connect, disconnect]);

  return {
    address,
    isConnected,
    isConnecting,
    error,
    connectWallet,
    disconnect
  };
}

export default useWallet;
