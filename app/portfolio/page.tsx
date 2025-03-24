'use client';

import React, { useState, useEffect } from 'react';
import { PortfolioSummary } from './components/PortfolioSummary';
import { PortfolioOverview } from './components/PortfolioOverview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TransactionHistory } from './components/TransactionHistory';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, RefreshCcw, BarChart3, History, PieChart, Sliders } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { useWallet } from '@/hooks/useWallet';
import { PortfolioRebalancer, RebalancingAction } from '@/components/yield/PortfolioRebalancer';
import { Calendar } from '@/components/ui/calendar'; // Import the Calendar component

export default function PortfolioPage() {
  const { address, isConnected, connectWallet, disconnect } = useWallet();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [rebalanceReport, setRebalanceReport] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch portfolio rebalance report
  const fetchRebalanceReport = async () => {
    if (!isConnected || !address) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`/api/portfolio/rebalance?walletAddress=${address}`);
      const data = await response.json();
      
      if (data.success) {
        setRebalanceReport(data.data);
      } else {
        setError(data.error || 'Could not fetch portfolio rebalance report');
        toast({
          title: "Error",
          description: data.error || 'Could not fetch portfolio rebalance report',
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error('Error fetching rebalance report:', err);
      setError('An error occurred while fetching the rebalance report');
      toast({
        title: "Error",
        description: 'An error occurred while fetching the rebalance report',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected && activeTab === 'optimize') {
      fetchRebalanceReport();
    }
  }, [isConnected, activeTab, address]);

  // Handle rebalance action
  const handleRebalance = async (actions: RebalancingAction[]) => {
    if (!isConnected || !address) return;
    
    try {
      setIsLoading(true);
      
      // In a real implementation, this would call smart contracts to execute the rebalancing
      toast({
        title: "Rebalancing Initiated",
        description: `Executing ${actions.length} rebalancing actions. This may take a few moments.`,
      });
      
      // Simulated delay for rebalancing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Rebalancing Complete",
        description: "Your portfolio has been successfully rebalanced for optimal yield.",
      });
      
      // Refresh the rebalance report after successful rebalancing
      fetchRebalanceReport();
    } catch (err) {
      console.error('Rebalancing error:', err);
      toast({
        title: "Rebalancing Failed",
        description: "There was an error processing your rebalancing request.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    // Using the DateProvider from RootClientLayout, no need to wrap again
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold">Your Portfolio</h1>
      <p className="text-gray-600">
        Track, manage, and optimize your yield investments across the Polkadot ecosystem
      </p>
      
      {isConnected && address ? (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center">
              <PieChart className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="positions" className="flex items-center">
              <BarChart3 className="mr-2 h-4 w-4" />
              Positions
            </TabsTrigger>
            <TabsTrigger value="optimize" className="flex items-center">
              <Sliders className="mr-2 h-4 w-4" />
              Optimize
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center">
              <History className="mr-2 h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <PortfolioOverview />
          </TabsContent>
          
          <TabsContent value="positions">
            <PortfolioSummary />
          </TabsContent>
          
          <TabsContent value="optimize">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p>Loading portfolio optimization recommendations...</p>
              </div>
            ) : error ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4" 
                  onClick={fetchRebalanceReport}
                >
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </Alert>
            ) : !rebalanceReport ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Button onClick={fetchRebalanceReport} size="lg">
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Generate Portfolio Optimization Report
                </Button>
              </div>
            ) : (
              <PortfolioRebalancer 
                report={rebalanceReport} 
                onRebalance={handleRebalance} 
                isLoading={isLoading}
              />
            )}
          </TabsContent>
          
          <TabsContent value="history">
            <TransactionHistory />
          </TabsContent>
        </Tabs>
      ) : (
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="w-full max-w-md shadow-lg border-2 border-gray-100">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-3xl font-bold">Connect Wallet</CardTitle>
              <CardDescription className="text-lg mt-2">
                Connect your wallet to access your portfolio
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pt-4 pb-8 px-8">
              <Button 
                onClick={connectWallet}
                size="lg"
                className="w-full"
              >
                Connect Wallet
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
