'use client';

import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { CrossChainAssets } from './components/CrossChainAssets';
import { CrossChainTransfer } from './components/CrossChainTransfer';
import { TransferHistory } from './components/TransferHistory';

export default function CrossChainPage() {
  const { address, isConnected, connectWallet } = useWallet();
  const [activeTab, setActiveTab] = useState("assets");
  
  if (!isConnected) {
    return (
      <div className="container max-w-7xl mx-auto py-10">
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Cross-Chain Asset Management</CardTitle>
            <CardDescription>
              Connect your wallet to manage assets across multiple blockchains
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Alert variant="default" className="mb-6 max-w-lg">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Wallet connection required</AlertTitle>
              <AlertDescription>
                Connect your wallet to view your assets across different blockchains and perform cross-chain transfers.
              </AlertDescription>
            </Alert>
            <Button size="lg" onClick={connectWallet}>
              Connect Wallet
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container max-w-7xl mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Cross-Chain Asset Management</h1>
        <p className="text-muted-foreground mt-2">
          View and manage your assets across multiple blockchains from a single dashboard
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="assets">Asset Overview</TabsTrigger>
          <TabsTrigger value="transfer">Cross-Chain Transfer</TabsTrigger>
          <TabsTrigger value="history">Transfer History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assets" className="space-y-8">
          <CrossChainAssets address={address} />
        </TabsContent>
        
        <TabsContent value="transfer" className="space-y-8">
          <CrossChainTransfer address={address} onTransferComplete={() => setActiveTab("history")} />
        </TabsContent>
        
        <TabsContent value="history" className="space-y-8">
          <TransferHistory address={address} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
