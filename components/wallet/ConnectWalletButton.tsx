'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, AlertCircle } from 'lucide-react';

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (request: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
      selectedAddress: string | null;
    };
  }
}

interface ConnectWalletButtonProps {
  onConnect?: (account: string) => void;
  onDisconnect?: () => void;
  className?: string;
  buttonText?: string;
  buttonSize?: 'default' | 'sm' | 'lg' | 'icon';
  showFeedback?: boolean;
}

export default function ConnectWalletButton({
  onConnect,
  onDisconnect,
  className = '',
  buttonText = 'Connect Wallet',
  buttonSize = 'default',
  showFeedback = true
}: ConnectWalletButtonProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');

  // Check if already connected
  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Check if MetaMask is available
        if (!window.ethereum) {
          setDebugInfo('MetaMask not installed');
          return;
        }
        
        setDebugInfo('Checking existing connection...');
        
        const accounts = await window.ethereum.request({ 
          method: 'eth_accounts' 
        });
        
        if (accounts && accounts.length > 0) {
          setAddress(accounts[0]);
          if (onConnect) onConnect(accounts[0]);
        }
      } catch (err: any) {
        console.error('Error checking connection:', err);
        setDebugInfo(`Error: ${err.message}`);
      }
    };
    
    checkConnection();
    
    // Listen for account changes
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          setAddress(null);
          if (onDisconnect) onDisconnect();
        } else if (accounts[0] !== address) {
          setAddress(accounts[0]);
          if (onConnect) onConnect(accounts[0]);
        }
      };
      
      window.ethereum?.on('accountsChanged', handleAccountsChanged);
      return () => {
        window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, [address, onConnect, onDisconnect]);
  
  const connectWallet = async () => {
    setError(null);
    setIsConnecting(true);
    setDebugInfo('');
    
    try {
      if (!window.ethereum) {
        setError('MetaMask not installed');
        return;
      }
      
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts && accounts.length > 0) {
        setAddress(accounts[0]);
        if (onConnect) onConnect(accounts[0]);
      } else {
        setError('No accounts returned from MetaMask');
      }
    } catch (err: any) {
      console.error('Error connecting wallet:', err);
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };
  
  // Format address for display
  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };
  
  return (
    <div className={className}>
      {error && showFeedback && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 flex items-center text-sm">
          <AlertCircle className="h-4 w-4 mr-2" />
          {error}
        </div>
      )}
      
      {!address ? (
        <Button
          size={buttonSize}
          onClick={connectWallet}
          disabled={isConnecting}
          className="flex items-center justify-center"
          suppressHydrationWarning
        >
          <Wallet className="mr-2 h-5 w-5" />
          {isConnecting ? 'Connecting...' : buttonText}
        </Button>
      ) : (
        <div className="px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-gray-700">
          {formatAddress(address)}
        </div>
      )}
    </div>
  );
}
