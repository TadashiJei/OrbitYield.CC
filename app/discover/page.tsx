'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OpportunityFinder } from './components/OpportunityFinder';
import { CrossChainViewer } from './components/CrossChainViewer';
import { StrategyComparison } from './components/StrategyComparison';

export default function DiscoverPage() {
  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold">
        Discover <span className="gradient-text">Yield Opportunities</span>
      </h1>
      <p className="text-gray-600 max-w-3xl">
        Explore the highest-yielding opportunities across multiple chains and protocols, all optimized by OrbitYield's AI-powered algorithms.
      </p>
      
      <Tabs defaultValue="finder" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="finder">Opportunity Finder</TabsTrigger>
          <TabsTrigger value="cross-chain">Cross-Chain View</TabsTrigger>
          <TabsTrigger value="comparison">Strategy Comparison</TabsTrigger>
        </TabsList>
        <TabsContent value="finder">
          <OpportunityFinder />
        </TabsContent>
        <TabsContent value="cross-chain">
          <CrossChainViewer />
        </TabsContent>
        <TabsContent value="comparison">
          <StrategyComparison />
        </TabsContent>
      </Tabs>
    </div>
  );
}
