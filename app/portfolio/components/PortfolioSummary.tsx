'use client';

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useYieldContracts } from '@/hooks/useYieldContracts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, TrendingUp, Wallet, Clock } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { formatCurrency, formatPercent } from '@/lib/utils';

interface PositionData {
  strategy: string;
  asset: string;
  amount: string;
  entryTimestamp: number;
  lastUpdateTimestamp: number;
  strategyDetails: {
    type: string;
    protocol: string;
    apy: number;
    risk: number;
    assetSymbol: string;
    assetDecimals: number;
  };
  formattedAmount: string;
  valueUSD: number;
}

interface PortfolioSummaryProps {
  compact?: boolean;
  onValueCalculated?: (totalValue: number) => void;
}

export function PortfolioSummary({ 
  compact = false,
  onValueCalculated 
}: PortfolioSummaryProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [positions, setPositions] = useState<PositionData[]>([]);
  const [totalValueUSD, setTotalValueUSD] = useState(0);
  const [totalYieldUSD, setTotalYieldUSD] = useState(0);
  const [chartData, setChartData] = useState<any[]>([]);
  const { 
    getAllUserPositions, 
    getStrategyContract, 
    getTokenContract, 
    isConnected,
    address,
    withdrawFromStrategy,
    claimRewards
  } = useYieldContracts({
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  useEffect(() => {
    if (!isConnected) {
      setLoading(false);
      return;
    }

    loadPortfolio();
  }, [isConnected, address]);

  const loadPortfolio = async () => {
    try {
      setLoading(true);
      
      // Get user positions
      const rawPositions = await getAllUserPositions();
      if (!rawPositions) {
        setPositions([]);
        setLoading(false);
        return;
      }

      // Fetch additional details for each position
      const enrichedPositions = await Promise.all(
        rawPositions.map(async (pos) => {
          const strategyContract = getStrategyContract(pos.strategy);
          const tokenContract = getTokenContract(pos.asset);
          
          // Get strategy details
          const type = await strategyContract.getStrategyType();
          const protocol = await strategyContract.getProtocolName();
          const apy = await strategyContract.getAPY(pos.asset);
          const risk = await strategyContract.getRiskLevel();
          
          // Get token details
          const assetSymbol = await tokenContract.symbol();
          const assetDecimals = await tokenContract.decimals();
          
          // Format amount based on token decimals
          const formattedAmount = ethers.utils.formatUnits(pos.amount, assetDecimals);
          
          // For demo purposes, we'll use a mock price feed
          // In a real app, you would use an oracle or price API
          const mockPrice = getMockPrice(assetSymbol);
          const valueUSD = parseFloat(formattedAmount) * mockPrice;
          
          return {
            ...pos,
            strategyDetails: {
              type,
              protocol,
              apy: apy.toNumber(),
              risk: risk.toNumber(),
              assetSymbol,
              assetDecimals,
            },
            formattedAmount,
            valueUSD
          };
        })
      );

      setPositions(enrichedPositions);
      
      // Calculate portfolio totals
      const totalValue = enrichedPositions.reduce((sum, pos) => sum + pos.valueUSD, 0);
      setTotalValueUSD(totalValue);
      
      // Notify parent component about the calculated value
      if (onValueCalculated) {
        onValueCalculated(totalValue);
      }
      
      // Calculate estimated yield
      const totalYield = enrichedPositions.reduce((sum, pos) => {
        const annualYield = pos.valueUSD * (pos.strategyDetails.apy / 10000);
        return sum + annualYield;
      }, 0);
      setTotalYieldUSD(totalYield);
      
      // Prepare asset allocation data for charts
      const assetAllocation = enrichedPositions.reduce((acc, pos) => {
        const { assetSymbol } = pos.strategyDetails;
        if (!acc[assetSymbol]) {
          acc[assetSymbol] = 0;
        }
        acc[assetSymbol] += pos.valueUSD;
        return acc;
      }, {} as Record<string, number>);
      
      const chartDataArray = Object.entries(assetAllocation).map(([name, value]) => ({
        name,
        value,
        percentage: (value / totalValue * 100).toFixed(2)
      }));
      
      setChartData(chartDataArray);
      
    } catch (error) {
      console.error('Error loading portfolio:', error);
      toast({
        title: "Error Loading Portfolio",
        description: "Failed to load your portfolio data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Mock function to get token prices
  // In a real app, this would be replaced with price oracle or API call
  const getMockPrice = (symbol: string): number => {
    const prices: Record<string, number> = {
      'USDC': 1,
      'USDT': 1,
      'DAI': 1,
      'ETH': 2000,
      'DOT': 8,
      'ASTR': 0.5,
      'WBTC': 40000,
    };
    
    return prices[symbol] || 1; // Default to 1 if symbol not found
  };
  
  const handleWithdraw = async (position: PositionData) => {
    try {
      setLoading(true);
      await withdrawFromStrategy(
        position.strategy,
        position.asset,
        position.amount
      );
      
      toast({
        title: "Withdrawal Successful",
        description: `Successfully withdrew ${position.formattedAmount} ${position.strategyDetails.assetSymbol}`,
      });
      
      // Reload portfolio after withdraw
      loadPortfolio();
    } catch (error) {
      console.error('Withdrawal error:', error);
      toast({
        title: "Withdrawal Failed",
        description: "There was an error processing your withdrawal",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleClaimRewards = async (position: PositionData) => {
    try {
      setLoading(true);
      await claimRewards(position.strategy);
      
      toast({
        title: "Rewards Claimed",
        description: "Successfully claimed rewards from strategy",
      });
      
      // Reload portfolio after claiming rewards
      loadPortfolio();
    } catch (error) {
      console.error('Claim rewards error:', error);
      toast({
        title: "Failed to Claim Rewards",
        description: "There was an error claiming your rewards",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleInvestMore = () => {
    router.push('/yield-opportunities');
  };
  
  // Format currency display
  const formatUSD = (value: number) => {
    return formatCurrency(value);
  };
  
  // Format APY
  const formatAPY = (apy: number) => {
    return formatPercent(apy / 10000);
  };
  
  // Calculate time in strategy
  const getTimeInStrategy = (timestamp: number) => {
    const now = Math.floor(Date.now() / 1000);
    const secondsElapsed = now - timestamp;
    const days = Math.floor(secondsElapsed / 86400);
    
    if (days < 1) {
      const hours = Math.floor(secondsElapsed / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''}`;
    }
    
    return `${days} day${days !== 1 ? 's' : ''}`;
  };

  return (
    <div className="space-y-6">
      {!isConnected ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Wallet not connected</AlertTitle>
          <AlertDescription>
            Please connect your wallet to view your portfolio.
          </AlertDescription>
        </Alert>
      ) : loading ? (
        <div className="space-y-4">
          {!compact && <Skeleton className="h-12 w-1/3" />}
          <Skeleton className="h-[200px] w-full" />
          {!compact && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Skeleton className="h-[100px] w-full" />
              <Skeleton className="h-[100px] w-full" />
              <Skeleton className="h-[100px] w-full" />
            </div>
          )}
        </div>
      ) : (
        <>
          {!compact && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Portfolio Value</CardDescription>
                  <CardTitle className="text-2xl">{formatUSD(totalValueUSD)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Wallet className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm text-gray-500">
                      {positions.length} active position{positions.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Estimated Annual Yield</CardDescription>
                  <CardTitle className="text-2xl text-green-600">{formatUSD(totalYieldUSD)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm text-gray-500">
                      {totalValueUSD > 0 
                        ? formatPercent(totalYieldUSD / totalValueUSD) + ' average' 
                        : '0% APY average'}
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Asset Allocation</CardDescription>
                  <CardTitle className="text-2xl">{chartData.length} Asset{chartData.length !== 1 ? 's' : ''}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {chartData.slice(0, 3).map((item) => (
                      <div key={item.name} className="flex items-center justify-between text-sm">
                        <span>{item.name}</span>
                        <span>{item.percentage}%</span>
                      </div>
                    ))}
                    {chartData.length > 3 && (
                      <div className="text-xs text-gray-500 text-right">
                        +{chartData.length - 3} more assets
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Active Positions</CardTitle>
                  <CardDescription>Your currently active yield strategies</CardDescription>
                </div>
                {!compact && <Button onClick={handleInvestMore}>Invest More</Button>}
              </div>
            </CardHeader>
            <CardContent>
              {positions.length === 0 ? (
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium">No active positions</h3>
                  <p className="text-gray-500 mt-2">
                    Browse the yield opportunities to invest in strategies
                  </p>
                  <Button 
                    onClick={handleInvestMore}
                    className="mt-4"
                    variant="outline"
                  >
                    Explore Yield Opportunities
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {positions.map((position, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-medium">
                            {position.strategyDetails.assetSymbol} {position.strategyDetails.type.charAt(0).toUpperCase() + position.strategyDetails.type.slice(1)} Strategy
                          </h3>
                          <p className="text-gray-500">{position.strategyDetails.protocol}</p>
                        </div>
                        <div className="mt-2 md:mt-0 flex items-center">
                          <div className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-sm font-medium">
                            {formatAPY(position.strategyDetails.apy)} APY
                          </div>
                          <div className="ml-2 bg-amber-50 text-amber-700 px-2 py-1 rounded-md text-sm font-medium">
                            Risk: {position.strategyDetails.risk}/10
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">Amount</div>
                          <div className="font-medium">
                            {position.formattedAmount} {position.strategyDetails.assetSymbol}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-gray-500">Value</div>
                          <div className="font-medium">
                            {formatUSD(position.valueUSD)}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-gray-500">Est. Annual Yield</div>
                          <div className="font-medium text-green-600">
                            +{formatUSD(position.valueUSD * position.strategyDetails.apy / 10000)}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-gray-500">Time in Strategy</div>
                          <div className="font-medium flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {getTimeInStrategy(position.entryTimestamp)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleClaimRewards(position)}
                        >
                          Claim Rewards
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => handleWithdraw(position)}
                        >
                          Withdraw
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
