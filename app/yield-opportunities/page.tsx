'use client';

import React, { useState, useEffect } from 'react';
import { YieldOpportunitiesTable } from './components/YieldOpportunitiesTable';
import { OpportunityDetails } from './components/OpportunityDetails';
import { YieldOpportunity } from '@/lib/yield/yield-optimizer';
import { ethers } from 'ethers';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Loader2, AlertCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function YieldOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<YieldOpportunity[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<YieldOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState<YieldOpportunity | null>(null);
  const [assetFilter, setAssetFilter] = useState<string>('all');
  const [strategyFilter, setStrategyFilter] = useState<string>('all');
  const [minApyFilter, setMinApyFilter] = useState<number>(0);
  const [maxRiskFilter, setMaxRiskFilter] = useState<number>(10);

  // Fetch opportunities
  useEffect(() => {
    async function fetchOpportunities() {
      try {
        setLoading(true);
        const response = await fetch('/api/yield/opportunities');
        const data = await response.json();
        
        if (data.success) {
          setOpportunities(data.data);
          setFilteredOpportunities(data.data);
        } else {
          setError(data.error || 'Failed to fetch yield opportunities');
        }
      } catch (err) {
        setError('An error occurred while fetching yield opportunities');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchOpportunities();
  }, []);

  // Apply filters when they change
  useEffect(() => {
    let filtered = [...opportunities];
    
    // Filter by asset
    if (assetFilter !== 'all') {
      filtered = filtered.filter(opp => opp.assetSymbol === assetFilter);
    }
    
    // Filter by strategy
    if (strategyFilter !== 'all') {
      filtered = filtered.filter(opp => opp.strategyType === strategyFilter);
    }
    
    // Filter by minimum APY
    filtered = filtered.filter(opp => opp.apy >= minApyFilter * 100); // Convert to basis points
    
    // Filter by maximum risk
    filtered = filtered.filter(opp => opp.risk <= maxRiskFilter);
    
    setFilteredOpportunities(filtered);
  }, [opportunities, assetFilter, strategyFilter, minApyFilter, maxRiskFilter]);

  // Get unique assets for filter
  const uniqueAssets = React.useMemo(() => {
    const assets = opportunities.map(opp => opp.assetSymbol);
    return ['all', ...new Set(assets)];
  }, [opportunities]);

  // Handle view details
  const handleViewDetails = (opportunity: YieldOpportunity) => {
    setSelectedOpportunity(opportunity);
  };

  // Handle invest
  const handleInvest = async (opportunity: YieldOpportunity, amount: string) => {
    // In a real implementation, this would call a smart contract
    try {
      toast({
        title: "Investment Initiated",
        description: `Investing ${ethers.utils.formatEther(amount)} ${opportunity.assetSymbol} in ${opportunity.protocolName}.`,
      });
      
      // Close details
      setSelectedOpportunity(null);
    } catch (err) {
      console.error('Investment error:', err);
      toast({
        title: "Investment Failed",
        description: "There was an error processing your investment.",
        variant: "destructive",
      });
    }
  };

  // Reset filters
  const resetFilters = () => {
    setAssetFilter('all');
    setStrategyFilter('all');
    setMinApyFilter(0);
    setMaxRiskFilter(10);
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold">Yield Opportunities</h1>
      <p className="text-gray-600">
        Discover and invest in the best yield opportunities across the Polkadot ecosystem
      </p>
      
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading yield opportunities...</span>
        </div>
      ) : (
        <>
          {selectedOpportunity ? (
            <OpportunityDetails 
              opportunity={selectedOpportunity}
              onClose={() => setSelectedOpportunity(null)}
              onInvest={handleInvest}
            />
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Filters</CardTitle>
                  <CardDescription>Customize your view of available yield opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="asset-filter">Asset</Label>
                      <Select value={assetFilter} onValueChange={setAssetFilter}>
                        <SelectTrigger id="asset-filter">
                          <SelectValue placeholder="Select Asset" />
                        </SelectTrigger>
                        <SelectContent>
                          {uniqueAssets.map(asset => (
                            <SelectItem key={asset} value={asset}>
                              {asset === 'all' ? 'All Assets' : asset}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="strategy-filter">Strategy</Label>
                      <Select value={strategyFilter} onValueChange={setStrategyFilter}>
                        <SelectTrigger id="strategy-filter">
                          <SelectValue placeholder="Select Strategy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Strategies</SelectItem>
                          <SelectItem value="lending">Lending</SelectItem>
                          <SelectItem value="farming">Farming</SelectItem>
                          <SelectItem value="liquidity">Liquidity</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="min-apy">Minimum APY: {minApyFilter}%</Label>
                      <Slider 
                        id="min-apy"
                        defaultValue={[0]}
                        min={0}
                        max={20}
                        step={0.5}
                        value={[minApyFilter]}
                        onValueChange={(value) => setMinApyFilter(value[0])}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="max-risk">Maximum Risk: {maxRiskFilter}/10</Label>
                      <Slider 
                        id="max-risk"
                        defaultValue={[10]}
                        min={1}
                        max={10}
                        step={1}
                        value={[maxRiskFilter]}
                        onValueChange={(value) => setMaxRiskFilter(value[0])}
                        className="mt-2"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
                  </div>
                </CardContent>
              </Card>
              
              <YieldOpportunitiesTable 
                opportunities={filteredOpportunities}
                onInvest={handleViewDetails}
                onViewDetails={handleViewDetails}
              />
              
              {filteredOpportunities.length === 0 && !loading && (
                <Alert>
                  <AlertTitle>No opportunities found</AlertTitle>
                  <AlertDescription>
                    Try adjusting your filters to see more yield opportunities.
                  </AlertDescription>
                </Alert>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
