'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';

// Very simple connector component that avoids hydration issues
export default function SimpleWalletConnector({
  onConnect
}: {
  onConnect: (address: string) => void
}) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  async function handleClick() {
    if (typeof window === 'undefined' || !window.ethereum) {
      alert('MetaMask not installed');
      return;
    }
    
    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts && accounts.length > 0) {
        onConnect(accounts[0]);
      }
    } catch (err) {
      console.error('Error connecting wallet:', err);
    }
  }
  
  // Server-side: return a placeholder button
  if (!mounted) {
    return (
      <Button
        size="lg" 
        className="w-full"
      >
        <Wallet className="mr-2 h-5 w-5" />
        Connect Wallet
      </Button>
    );
  }
  
  // Client-side: return interactive button
  return (
    <Button
      size="lg" 
      className="w-full"
      onClick={handleClick}
    >
      <Wallet className="mr-2 h-5 w-5" />
      Connect Wallet
    </Button>
  );
}
