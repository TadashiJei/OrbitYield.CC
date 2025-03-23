'use client';

import React from 'react';
import { PortfolioSummary } from './components/PortfolioSummary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TransactionHistory } from './components/TransactionHistory';

export default function PortfolioPage() {
  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold">Your Portfolio</h1>
      <p className="text-gray-600">
        Track and manage your yield investments across the Polkadot ecosystem
      </p>
      
      <Tabs defaultValue="positions" className="w-full">
        <TabsList>
          <TabsTrigger value="positions">Positions</TabsTrigger>
          <TabsTrigger value="history">Transaction History</TabsTrigger>
        </TabsList>
        <TabsContent value="positions">
          <PortfolioSummary />
        </TabsContent>
        <TabsContent value="history">
          <TransactionHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
