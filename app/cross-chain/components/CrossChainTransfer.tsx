'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, ArrowRightIcon, AlertTriangleIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface CrossChainTransferProps {
  address: string;
  onTransferComplete: () => void;
}

export function CrossChainTransfer({ address, onTransferComplete }: CrossChainTransferProps) {
  const [sourceChain, setSourceChain] = useState('ethereum');
  const [targetChain, setTargetChain] = useState('polygon');
  const [asset, setAsset] = useState('USDC');
  const [amount, setAmount] = useState('');
  const [transferring, setTransferring] = useState(false);
  const [transferError, setTransferError] = useState<string | null>(null);
  const [transferSuccess, setTransferSuccess] = useState(false);
  
  const supportedChains = [
    { id: 'ethereum', name: 'Ethereum', logo: '/assets/chains/ethereum.svg' },
    { id: 'polygon', name: 'Polygon', logo: '/assets/chains/polygon.svg' },
    { id: 'arbitrum', name: 'Arbitrum', logo: '/assets/chains/arbitrum.svg' },
    { id: 'optimism', name: 'Optimism', logo: '/assets/chains/optimism.svg' },
    { id: 'base', name: 'Base', logo: '/assets/chains/base.svg' },
  ];
  
  const supportedAssets = [
    { symbol: 'USDC', name: 'USD Coin', logo: '/assets/tokens/usdc.svg' },
    { symbol: 'USDT', name: 'Tether', logo: '/assets/tokens/usdt.svg' },
    { symbol: 'ETH', name: 'Ethereum', logo: '/assets/tokens/eth.svg' },
    { symbol: 'WBTC', name: 'Wrapped Bitcoin', logo: '/assets/tokens/wbtc.svg' },
    { symbol: 'DAI', name: 'Dai', logo: '/assets/tokens/dai.svg' },
  ];

  const handleTransfer = async () => {
    // Reset states
    setTransferError(null);
    setTransferring(true);
    
    // Simulate transfer process
    try {
      // In a real app, this would integrate with a bridge protocol
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful transfer
      setTransferSuccess(true);
      
      // After successful transfer, notify parent
      setTimeout(() => {
        onTransferComplete();
      }, 1500);
    } catch (error) {
      setTransferError('Failed to execute transfer. Please try again.');
    } finally {
      setTransferring(false);
    }
  };

  if (transferSuccess) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <div className="rounded-full bg-green-100 p-3 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Transfer Successful!</h3>
          <p className="text-gray-600 text-center mb-6">
            Your cross-chain transfer has been submitted and will be processed shortly.
          </p>
          <Button onClick={onTransferComplete}>View Transfer History</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cross-Chain Transfer</CardTitle>
        <CardDescription>Transfer assets across different blockchains using secured bridge protocols</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="space-y-3 flex-1">
            <Label htmlFor="sourceChain">Source Chain</Label>
            <Select value={sourceChain} onValueChange={setSourceChain}>
              <SelectTrigger id="sourceChain">
                <SelectValue placeholder="Select source chain" />
              </SelectTrigger>
              <SelectContent>
                {supportedChains.map(chain => (
                  <SelectItem key={chain.id} value={chain.id}>
                    {chain.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-center mt-2">
            <ArrowRightIcon className="h-6 w-6 text-muted-foreground" />
          </div>
          
          <div className="space-y-3 flex-1">
            <Label htmlFor="targetChain">Target Chain</Label>
            <Select value={targetChain} onValueChange={setTargetChain}>
              <SelectTrigger id="targetChain">
                <SelectValue placeholder="Select target chain" />
              </SelectTrigger>
              <SelectContent>
                {supportedChains.map(chain => (
                  <SelectItem key={chain.id} value={chain.id}>
                    {chain.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <Label htmlFor="asset">Asset</Label>
            <Select value={asset} onValueChange={setAsset}>
              <SelectTrigger id="asset">
                <SelectValue placeholder="Select asset" />
              </SelectTrigger>
              <SelectContent>
                {supportedAssets.map(asset => (
                  <SelectItem key={asset.symbol} value={asset.symbol}>
                    {asset.name} ({asset.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
        
        <Alert className="bg-blue-50 text-blue-800 border-blue-200">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Bridge Information</AlertTitle>
          <AlertDescription>
            Cross-chain transfers typically take 10-30 minutes to complete depending on network congestion and the bridge protocol used.
          </AlertDescription>
        </Alert>
        
        {transferError && (
          <Alert variant="destructive">
            <AlertTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{transferError}</AlertDescription>
          </Alert>
        )}
        
        <div className="flex justify-end">
          <Button 
            onClick={handleTransfer} 
            disabled={!amount || transferring || sourceChain === targetChain}
          >
            {transferring ? 'Processing...' : 'Transfer Assets'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
