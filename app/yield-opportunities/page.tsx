'use client';

import React, { useState, useEffect } from 'react';
import { YieldOpportunitiesTable } from './components/YieldOpportunitiesTable';
import { OpportunityDetails } from './components/OpportunityDetails';
import { YieldOpportunity } from '@/lib/yield/yield-optimizer';
import { OptimizationReport } from '@/components/yield/OptimizationReport';
import { YieldRecommendation } from '@/lib/yield/optimization-service';
import { ethers } from 'ethers';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Loader2, AlertCircle, Sparkles, BarChart, Filter } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useWallet } from '@/hooks/useWallet';

export default function YieldOpportunitiesPage() {
  const { address, isConnected, connectWallet } = useWallet();
  const [opportunities, setOpportunities] = useState<YieldOpportunity[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<YieldOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [optimizationLoading, setOptimizationLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState<YieldOpportunity | null>(null);
  const [assetFilter, setAssetFilter] = useState<string>('all');
  const [strategyFilter, setStrategyFilter] = useState<string>('all');
  const [minApyFilter, setMinApyFilter] = useState<number>(0);
  const [maxRiskFilter, setMaxRiskFilter] = useState<number>(10);
  const [activeTab, setActiveTab] = useState<string>('discover');
  const [optimizationReport, setOptimizationReport] = useState<any>(null);
  const [riskTolerance, setRiskTolerance] = useState<'Low' | 'Medium' | 'High'>('Medium');

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
    filtered = filtered.filter(opp => opp.apy >= minApyFilter); 
    
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
  const handleInvest = async (opportunity: YieldOpportunity) => {
    setSelectedOpportunity(opportunity);
  };

  // Handle invest from recommendation
  const handleInvestFromRecommendation = (recommendation: YieldRecommendation) => {
    // Convert recommendation to YieldOpportunity format
    const opportunity: YieldOpportunity = {
      id: recommendation.opportunity.id,
      assetSymbol: recommendation.opportunity.assetSymbol,
      protocolName: recommendation.opportunity.protocol,
      strategyType: recommendation.opportunity.strategyType.toLowerCase() as 'lending' | 'farming' | 'liquidity' | 'staking',
      apy: recommendation.opportunity.apy,
      risk: recommendation.opportunity.riskLevel === 'Low' ? 3 : 
            recommendation.opportunity.riskLevel === 'Medium' ? 6 : 9,
      tvl: recommendation.opportunity.tvl.toString(),
      chainId: recommendation.opportunity.chainId,
      chain: recommendation.opportunity.chain
    };
    
    setSelectedOpportunity(opportunity);
  };

  // Reset filters
  const resetFilters = () => {
    setAssetFilter('all');
    setStrategyFilter('all');
    setMinApyFilter(0);
    setMaxRiskFilter(10);
  };

  // Load optimization report
  const loadOptimizationReport = async () => {
    if (!isConnected || !address) {
      toast({
        title: "Connect Wallet Required",
        description: "Please connect your wallet to get personalized recommendations.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setOptimizationLoading(true);
      const searchParams = new URLSearchParams();
      searchParams.append('walletAddress', address);
      searchParams.append('riskTolerance', riskTolerance);
      
      const response = await fetch(`/api/yield/optimization?${searchParams.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        setOptimizationReport(data.data);
        setActiveTab('optimize');
      } else {
        toast({
          title: "Optimization Failed",
          description: data.error || "Could not generate recommendations.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error loading optimization report:', error);
      toast({
        title: "Optimization Error",
        description: "An error occurred while generating recommendations.",
        variant: "destructive",
      });
    } finally {
      setOptimizationLoading(false);
    }
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
      
      {selectedOpportunity ? (
        <OpportunityDetails 
          opportunity={selectedOpportunity}
          onClose={() => setSelectedOpportunity(null)}
          onInvest={handleInvest}
        />
      ) : (
        <>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="discover" className="flex items-center">
                <BarChart className="h-4 w-4 mr-2" />
                Discover Opportunities
              </TabsTrigger>
              <TabsTrigger value="optimize" className="flex items-center">
                <Sparkles className="h-4 w-4 mr-2" />
                Optimized Recommendations
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="discover" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <Filter className="h-5 w-5 mr-2" />
                        Filters
                      </CardTitle>
                      <CardDescription>Customize your view of available yield opportunities</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={resetFilters}>
                      Reset Filters
                    </Button>
                  </div>
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
                          <SelectItem value="staking">Staking</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="min-apy">Minimum APY: {minApyFilter}%</Label>
                      <Slider 
                        id="min-apy"
                        defaultValue={[0]}
                        min={0}
                        max={50}
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
                </CardContent>
              </Card>
              
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2">Loading yield opportunities...</span>
                </div>
              ) : (
                <YieldOpportunitiesTable 
                  opportunities={filteredOpportunities}
                  onViewDetails={handleViewDetails}
                  onInvest={handleInvest}
                />
              )}
            </TabsContent>
            
            <TabsContent value="optimize" className="space-y-4">
              {!isConnected ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Wallet Connection Required</CardTitle>
                    <CardDescription>
                      Connect your wallet to get personalized yield optimization recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center py-8">
                    <Button onClick={connectWallet} size="lg">
                      Connect Wallet
                    </Button>
                  </CardContent>
                </Card>
              ) : optimizationLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2">Generating yield optimization recommendations...</span>
                </div>
              ) : !optimizationReport ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Get Your Personalized Optimization Report</CardTitle>
                    <CardDescription>
                      Our AI-powered yield optimization engine will analyze your portfolio and preferences
                      to recommend the most efficient strategies for maximizing your returns
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="py-4">
                    <div className="mb-4">
                      <Label htmlFor="risk-tolerance" className="mb-1 block">Risk Tolerance</Label>
                      <Select value={riskTolerance} onValueChange={(value: any) => setRiskTolerance(value)}>
                        <SelectTrigger id="risk-tolerance">
                          <SelectValue placeholder="Select Risk Tolerance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low - Prioritize Safety</SelectItem>
                          <SelectItem value="Medium">Medium - Balanced Approach</SelectItem>
                          <SelectItem value="High">High - Prioritize Yield</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={loadOptimizationReport} className="w-full" size="lg">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Optimization Report
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <OptimizationReport 
                  report={optimizationReport}
                  walletAddress={address || ''}
                  onInvest={handleInvestFromRecommendation}
                />
              )}
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
