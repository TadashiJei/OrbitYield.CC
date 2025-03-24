'use client';

import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { 
  Wallet, 
  ArrowRightLeft, 
  TrendingUp, 
  RefreshCw, 
  ChevronDown, 
  ChevronUp,
  ExternalLink 
} from 'lucide-react';
import { CrossChainAsset } from '@/lib/cross-chain/cross-chain-service';
import { crossChainService } from '@/lib/cross-chain/cross-chain-service';
import { formatCurrency } from '@/lib/utils';
import { ethers } from 'ethers';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface CrossChainAssetsProps {
  address: string;
  compact?: boolean;
  onValueCalculated?: (totalValue: number) => void;
}

export function CrossChainAssets({ 
  address,
  compact = false,
  onValueCalculated
}: CrossChainAssetsProps) {
  const [loading, setLoading] = useState(true);
  const [assets, setAssets] = useState<CrossChainAsset[]>([]);
  const [expandedChains, setExpandedChains] = useState<Record<number, boolean>>({});
  const [refreshing, setRefreshing] = useState(false);
  
  // Load assets data
  useEffect(() => {
    if (address) {
      loadAssets();
    }
  }, [address]);
  
  // Load assets for the user
  const loadAssets = async () => {
    try {
      setLoading(true);
      const assetData = await crossChainService.getAssetsAcrossChains(address);
      setAssets(assetData);
      
      // Calculate total value
      const totalValue = assetData.reduce((sum, asset) => sum + asset.balanceUsd, 0);
      
      // Notify parent component about the calculated value
      if (onValueCalculated) {
        onValueCalculated(totalValue);
      }
      
      // Initialize expanded state for chains with assets
      const expanded: Record<number, boolean> = {};
      const uniqueChains = [...new Set(assetData.map(asset => asset.chainId))];
      uniqueChains.forEach(chainId => {
        expanded[chainId] = uniqueChains.length <= 3 && !compact;
      });
      setExpandedChains(expanded);
    } catch (error) {
      console.error('Error loading cross-chain assets:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Refresh assets data
  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await loadAssets();
    } catch (error) {
      console.error('Error refreshing assets:', error);
    } finally {
      setRefreshing(false);
    }
  };
  
  // Toggle chain expansion
  const toggleChainExpand = (chainId: number) => {
    setExpandedChains(prev => ({
      ...prev,
      [chainId]: !prev[chainId]
    }));
  };
  
  // Get chain distribution chart data
  const getChainDistributionData = () => {
    if (!assets || assets.length === 0) {
      return {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
          },
        ],
      };
    }
    
    // Get chain colors
    const chainColors: Record<number, string> = {
      1: '#627EEA', // Ethereum
      137: '#8247E5', // Polygon
      1284: '#53CBC8', // Moonbeam
      1285: '#F2AB1C', // Moonriver
      592: '#1B6DC1', // Astar
    };
    
    // Calculate value per chain
    const chainValues: Record<number, number> = {};
    const chainNames: Record<number, string> = {};
    
    assets.forEach(asset => {
      if (!chainValues[asset.chainId]) {
        chainValues[asset.chainId] = 0;
        chainNames[asset.chainId] = asset.chainName;
      }
      chainValues[asset.chainId] += asset.balanceUsd;
    });
    
    const chainIds = Object.keys(chainValues).map(id => parseInt(id));
    
    return {
      labels: chainIds.map(id => chainNames[id]),
      datasets: [
        {
          data: chainIds.map(id => chainValues[id]),
          backgroundColor: chainIds.map(id => 
            chainColors[id] || '#' + Math.floor(Math.random() * 16777215).toString(16)
          ),
          borderColor: Array(chainIds.length).fill('#ffffff'),
          borderWidth: 2,
        },
      ],
    };
  };
  
  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        display: !compact
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const dataset = context.dataset;
            const total = dataset.data.reduce((acc: number, data: number) => acc + data, 0);
            const percentage = total > 0 ? (value / total * 100).toFixed(1) : '0';
            return `${label}: ${formatCurrency(value)} (${percentage}%)`;
          }
        }
      }
    },
    cutout: compact ? '70%' : '60%',
  };
  
  // Render single token row
  const renderTokenRow = (asset: CrossChainAsset) => {
    return (
      <div key={`${asset.chainId}-${asset.assetAddress}`} className="py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
            <span className="text-xs font-bold">{asset.assetSymbol?.slice(0, 2) || '?'}</span>
          </div>
          <div>
            <div className="font-medium">{asset.assetSymbol || 'Unknown Token'}</div>
            <div className="text-xs text-gray-500">
              {asset.assetName || 'Unknown'} • {ethers.utils.formatUnits(asset.balance, asset.decimals)}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-medium">{formatCurrency(asset.balanceUsd)}</div>
          <div className="text-xs text-gray-500">
            ${(asset.assetPrice || 0).toFixed(2)} per token
          </div>
        </div>
      </div>
    );
  };
  
  // Render chain balances
  const renderChainBalances = () => {
    if (!assets || assets.length === 0) {
      return (
        <Card>
          <CardContent className="py-10 text-center">
            <Wallet className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-medium mb-2">No Assets Found</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              We couldn't find any assets for this wallet across our supported blockchains.
            </p>
            <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
              {refreshing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Refreshing...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh Assets
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      );
    }
    
    // Group assets by chain
    const assetsByChain: Record<number, CrossChainAsset[]> = {};
    const chainTotals: Record<number, number> = {};
    const chainOrder: number[] = [];
    
    assets.forEach(asset => {
      const chainId = asset.chainId;
      if (!assetsByChain[chainId]) {
        assetsByChain[chainId] = [];
        chainTotals[chainId] = 0;
        chainOrder.push(chainId);
      }
      assetsByChain[chainId].push(asset);
      chainTotals[chainId] += asset.balanceUsd;
    });
    
    // Sort chains by total value
    chainOrder.sort((a, b) => chainTotals[b] - chainTotals[a]);
    
    return (
      <div className="space-y-4">
        {chainOrder.map(chainId => {
          const chainAssets = assetsByChain[chainId];
          const isExpanded = expandedChains[chainId];
          const chainTotal = chainTotals[chainId];
          const chainName = chainAssets[0].chainName;
          
          return (
            <Card key={chainId} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-xs font-bold">{chainName.slice(0, 2)}</span>
                    </div>
                    <CardTitle className="text-lg">{chainName}</CardTitle>
                    <Badge variant="secondary" className="ml-2">
                      {chainAssets.length} Token{chainAssets.length !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">{formatCurrency(chainTotal)}</div>
                    <div className="text-xs text-gray-500">Total Value</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className={`px-6 ${isExpanded ? 'pb-3' : 'pb-0'}`}>
                {isExpanded && (
                  <div className="divide-y">
                    {chainAssets.map(asset => renderTokenRow(asset))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between py-3 bg-gray-50">
                <Button variant="ghost" size="sm" onClick={() => toggleChainExpand(chainId)}>
                  {isExpanded ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Hide Tokens
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-1" />
                      Show {chainAssets.length} Token{chainAssets.length !== 1 ? 's' : ''}
                    </>
                  )}
                </Button>
                <a 
                  href={`https://debank.com/profile/${address}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-gray-500 hover:text-gray-900 flex items-center"
                >
                  View on Explorer <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    );
  };
  
  return (
    <div className="w-full space-y-6">
      {loading ? (
        <div className="space-y-4">
          {!compact && (
            <>
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-[300px] w-full" />
            </>
          )}
          <div className="grid grid-cols-1 gap-4">
            <Skeleton className="h-[70px] w-full" />
            <Skeleton className="h-[70px] w-full" />
          </div>
        </div>
      ) : (
        <>
          {!compact && (
            <Tabs defaultValue="assets" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="assets">Assets</TabsTrigger>
                <TabsTrigger value="visualization">Visualization</TabsTrigger>
              </TabsList>
              
              <TabsContent value="assets">
                {renderChainBalances()}
              </TabsContent>
              
              <TabsContent value="visualization">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="w-full lg:w-1/2 h-80">
                    {assets && assets.length > 0 ? (
                      <Doughnut data={getChainDistributionData()} options={chartOptions} />
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <p className="text-gray-500">No data to display</p>
                      </div>
                    )}
                  </div>
                  
                  <Card className="shadow-none border-none">
                    <CardHeader className="px-0 pt-0">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-medium">Total Portfolio Value</h3>
                        <h3 className="text-3xl font-bold">
                          {assets ? formatCurrency(assets.reduce((acc, asset) => acc + asset.balanceUsd, 0)) : '$0.00'}
                        </h3>
                      </div>
                      
                      <div className="space-y-1 mt-4">
                        {!assets || assets.length === 0 ? (
                          <div className="text-center py-4">
                            <p className="text-gray-500">No chain balances to display</p>
                          </div>
                        ) : (
                          assets
                            .sort((a, b) => b.balanceUsd - a.balanceUsd)
                            .map(asset => {
                              return (
                                <div 
                                  key={`${asset.chainId}-${asset.assetAddress}`} 
                                  className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                                  onClick={() => toggleChainExpand(asset.chainId)}
                                >
                                  <div className="flex items-center">
                                    <div 
                                      className="w-3 h-3 rounded-full mr-2"
                                      style={{ 
                                        backgroundColor: 
                                          asset.chainId === 1 ? '#627EEA' :
                                          asset.chainId === 137 ? '#8247E5' :
                                          asset.chainId === 1284 ? '#53CBC8' :
                                          asset.chainId === 1285 ? '#F2AB1C' :
                                          asset.chainId === 592 ? '#1B6DC1' : '#64748B'
                                      }}
                                    ></div>
                                    <span>{asset.chainName}</span>
                                  </div>
                                  <span className="font-medium">{formatCurrency(asset.balanceUsd)}</span>
                                </div>
                              );
                            })
                        )}
                      </div>
                    </CardHeader>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          )}
          
          {compact ? (
            <div>
              {assets && assets.length > 0 ? (
                <div className="h-[200px] flex items-center justify-center">
                  <div className="w-full h-full max-w-[200px]">
                    <Doughnut data={getChainDistributionData()} options={chartOptions} />
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Wallet className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                  <p className="text-gray-500">No assets found</p>
                </div>
              )}
              
              <div className="mt-4">
                {assets && assets.length > 0 && (
                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      {assets.length} assets across {new Set(assets.map(a => a.chainId)).size} chains
                    </p>
                    <p className="text-lg font-bold mt-1">
                      {formatCurrency(assets.reduce((acc, asset) => acc + asset.balanceUsd, 0))}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            !assets || assets.length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center">
                  <Wallet className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-medium mb-2">No Assets Found</h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    We couldn't find any assets for this wallet across our supported blockchains.
                  </p>
                  <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
                    {refreshing ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Refreshing...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refresh Assets
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              renderChainBalances()
            )
          )}
          
          {!compact && assets && assets.length > 0 && (
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh} 
                disabled={refreshing}
                className="mr-2"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
              
              <Button 
                variant="default" 
                size="sm"
                onClick={() => window.location.href = '/cross-chain?tab=transfer'}
              >
                <ArrowRightLeft className="h-4 w-4 mr-2" />
                Transfer Assets
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
