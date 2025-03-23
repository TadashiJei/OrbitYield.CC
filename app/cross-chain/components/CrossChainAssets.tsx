'use client';

import React, { useState, useEffect } from 'react';
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
import { CrossChainAssetSummary, ChainBalance, ChainToken } from '@/lib/blockchain/cross-chain/types';
import { crossChainService } from '@/lib/blockchain/cross-chain/cross-chain-service';
import { getChainById } from '@/lib/blockchain/cross-chain/chains';
import { formatCurrency } from '@/lib/utils';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface CrossChainAssetsProps {
  address: string;
}

export function CrossChainAssets({ address }: CrossChainAssetsProps) {
  const [loading, setLoading] = useState(true);
  const [assets, setAssets] = useState<CrossChainAssetSummary | null>(null);
  const [expandedChains, setExpandedChains] = useState<Record<string, boolean>>({});
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
      const assetData = await crossChainService.getCrossChainAssets(address);
      setAssets(assetData);
      
      // Initialize expanded state for chains with assets
      const expanded: Record<string, boolean> = {};
      assetData.chainBalances.forEach(chain => {
        expanded[chain.chainId] = assetData.chainBalances.length <= 3;
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
  const toggleChainExpand = (chainId: string) => {
    setExpandedChains(prev => ({
      ...prev,
      [chainId]: !prev[chainId]
    }));
  };
  
  // Get chain distribution chart data
  const getChainDistributionData = () => {
    if (!assets || assets.chainBalances.length === 0) {
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
    const chainColors: Record<string, string> = {
      ethereum: '#627EEA',
      arbitrum: '#28A0F0',
      polygon: '#8247E5',
      avalanche: '#E84142',
      polkadot: '#E6007A',
      moonbeam: '#53CBC8',
      moonriver: '#F2AB1C',
      astar: '#1B6DC1',
      optimism: '#FF0420'
    };
    
    return {
      labels: assets.chainBalances.map(chain => {
        const chainInfo = getChainById(chain.chainId);
        return chainInfo?.name || chain.chainId;
      }),
      datasets: [
        {
          data: assets.chainBalances.map(chain => chain.totalValueUsd),
          backgroundColor: assets.chainBalances.map(chain => 
            chainColors[chain.chainId] || '#' + Math.floor(Math.random() * 16777215).toString(16)
          ),
          borderColor: Array(assets.chainBalances.length).fill('#ffffff'),
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
        position: 'right' as const,
        labels: {
          boxWidth: 12,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== undefined) {
              label += formatCurrency(context.parsed);
            }
            return label;
          }
        }
      }
    },
  };
  
  // Render single token row
  const renderTokenRow = (token: ChainToken) => {
    const valueUsd = token.valueUsd || 0;
    
    return (
      <div key={`${token.chainId}-${token.address}`} className="flex items-center justify-between py-3 border-b last:border-0">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
            {token.logo ? (
              <img src={token.logo} alt={token.symbol} className="w-6 h-6" />
            ) : (
              <span className="text-xs font-bold">{token.symbol.slice(0, 2)}</span>
            )}
          </div>
          <div>
            <p className="font-medium">{token.symbol}</p>
            <p className="text-xs text-gray-500">{token.name}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-medium">{formatCurrency(valueUsd)}</p>
          <p className="text-xs text-gray-500">
            {token.formattedBalance} {token.symbol}
          </p>
        </div>
      </div>
    );
  };
  
  // Render chain balances
  const renderChainBalances = () => {
    if (!assets || assets.chainBalances.length === 0) {
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
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Refreshing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Assets
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      );
    }
    
    return assets.chainBalances.map(chain => {
      const chainInfo = getChainById(chain.chainId);
      const isExpanded = expandedChains[chain.chainId];
      
      return (
        <Card key={chain.chainId} className="mb-4">
          <CardHeader className="border-b pb-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div 
                  className="w-8 h-8 rounded-full mr-3 flex items-center justify-center"
                  style={{ 
                    backgroundColor: 
                      chain.chainId === 'ethereum' ? '#627EEA20' :
                      chain.chainId === 'arbitrum' ? '#28A0F020' :
                      chain.chainId === 'polygon' ? '#8247E520' :
                      chain.chainId === 'avalanche' ? '#E8414220' :
                      chain.chainId === 'polkadot' ? '#E6007A20' :
                      chain.chainId === 'moonbeam' ? '#53CBC820' :
                      chain.chainId === 'moonriver' ? '#F2AB1C20' :
                      chain.chainId === 'astar' ? '#1B6DC120' :
                      chain.chainId === 'optimism' ? '#FF042020' : '#64748B20'
                  }}
                >
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ 
                      backgroundColor: 
                        chain.chainId === 'ethereum' ? '#627EEA' :
                        chain.chainId === 'arbitrum' ? '#28A0F0' :
                        chain.chainId === 'polygon' ? '#8247E5' :
                        chain.chainId === 'avalanche' ? '#E84142' :
                        chain.chainId === 'polkadot' ? '#E6007A' :
                        chain.chainId === 'moonbeam' ? '#53CBC8' :
                        chain.chainId === 'moonriver' ? '#F2AB1C' :
                        chain.chainId === 'astar' ? '#1B6DC1' :
                        chain.chainId === 'optimism' ? '#FF0420' : '#64748B'
                    }}
                  />
                </div>
                <div>
                  <CardTitle className="text-xl">{chainInfo?.name || chain.chainId}</CardTitle>
                  <CardDescription>
                    {chain.tokens.length} {chain.tokens.length === 1 ? 'asset' : 'assets'}
                  </CardDescription>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{formatCurrency(chain.totalValueUsd)}</p>
                <p className="text-sm text-gray-500">
                  {((chain.totalValueUsd / assets.totalValueUsd) * 100).toFixed(1)}% of portfolio
                </p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className={`pt-4 ${isExpanded ? '' : 'hidden'}`}>
            <div className="space-y-1">
              {chain.tokens.map(renderTokenRow)}
            </div>
          </CardContent>
          
          <CardFooter className="py-2 flex justify-between border-t">
            <a 
              href={chainInfo?.explorer} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-600 flex items-center"
            >
              View in Explorer
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => toggleChainExpand(chain.chainId)}
              className="text-gray-500"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Hide Assets
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  Show Assets
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      );
    });
  };
  
  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wallet className="h-5 w-5 mr-2" />
            Cross-Chain Asset Overview
          </CardTitle>
          <CardDescription>
            View your assets across multiple blockchains in one place
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {loading ? (
              <>
                <div className="w-full lg:w-1/2 h-80">
                  <div className="h-full flex items-center justify-center">
                    <Skeleton className="h-64 w-64 rounded-full" />
                  </div>
                </div>
                <div className="w-full lg:w-1/2 space-y-6">
                  <Skeleton className="h-12 w-full" />
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-full lg:w-1/2 h-80">
                  {assets && assets.chainBalances.length > 0 ? (
                    <Doughnut data={getChainDistributionData()} options={chartOptions} />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <Wallet className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <h3 className="text-xl font-medium mb-2">No Assets Found</h3>
                        <p className="text-gray-500 max-w-md">
                          We couldn't find any assets for this wallet across our supported blockchains.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-medium">Total Portfolio Value</h3>
                    <h3 className="text-3xl font-bold">
                      {assets ? formatCurrency(assets.totalValueUsd) : '$0.00'}
                    </h3>
                  </div>
                  
                  <div className="space-y-2">
                    {!assets || assets.chainBalances.length === 0 ? (
                      <div className="text-center py-4">
                        <p className="text-gray-500">No chain balances to display</p>
                      </div>
                    ) : (
                      assets.chainBalances
                        .sort((a, b) => b.totalValueUsd - a.totalValueUsd)
                        .map(chain => {
                          const chainInfo = getChainById(chain.chainId);
                          return (
                            <div 
                              key={chain.chainId} 
                              className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                              onClick={() => toggleChainExpand(chain.chainId)}
                            >
                              <div className="flex items-center">
                                <div 
                                  className="w-3 h-3 rounded-full mr-2"
                                  style={{ 
                                    backgroundColor: 
                                      chain.chainId === 'ethereum' ? '#627EEA' :
                                      chain.chainId === 'arbitrum' ? '#28A0F0' :
                                      chain.chainId === 'polygon' ? '#8247E5' :
                                      chain.chainId === 'avalanche' ? '#E84142' :
                                      chain.chainId === 'polkadot' ? '#E6007A' :
                                      chain.chainId === 'moonbeam' ? '#53CBC8' :
                                      chain.chainId === 'moonriver' ? '#F2AB1C' :
                                      chain.chainId === 'astar' ? '#1B6DC1' :
                                      chain.chainId === 'optimism' ? '#FF0420' : '#64748B'
                                  }}
                                ></div>
                                <span>{chainInfo?.name || chain.chainId}</span>
                              </div>
                              <span className="font-medium">{formatCurrency(chain.totalValueUsd)}</span>
                            </div>
                          );
                        })
                    )}
                  </div>
                  
                  <div className="pt-4 flex justify-between">
                    <Button 
                      variant="outline" 
                      className="flex items-center justify-center"
                      onClick={handleRefresh}
                      disabled={refreshing}
                    >
                      <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                      {refreshing ? 'Refreshing...' : 'Refresh Data'}
                    </Button>
                    
                    <Button 
                      variant="default" 
                      className="flex items-center justify-center"
                      onClick={() => window.location.href = '/cross-chain?tab=transfer'}
                    >
                      <ArrowRightLeft className="h-4 w-4 mr-2" />
                      Transfer Assets
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Chain Balances */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Chain Balances</h2>
        
        {loading ? (
          <>
            <Skeleton className="h-32 w-full mb-3" />
            <Skeleton className="h-32 w-full mb-3" />
            <Skeleton className="h-32 w-full" />
          </>
        ) : (
          renderChainBalances()
        )}
      </div>
    </div>
  );
}
