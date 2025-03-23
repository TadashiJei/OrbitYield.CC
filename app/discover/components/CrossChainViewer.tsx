'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { ArrowRight, RefreshCw, TrendingUp, Globe, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface ChainData {
  id: string;
  name: string;
  tvl: number;
  numberOfStrategies: number;
  averageApy: number;
  highestApy: number;
  color: string;
  logoUrl?: string;
  strategyTypes: {
    lending: number;
    staking: number;
    farming: number;
    lp: number;
  };
  topAssets: {
    symbol: string;
    percentage: number;
  }[];
}

export function CrossChainViewer() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [chainsData, setChainsData] = useState<ChainData[]>([]);
  const [totalTVL, setTotalTVL] = useState(0);
  const [selectedChain, setSelectedChain] = useState<ChainData | null>(null);
  
  // Load chain data
  useEffect(() => {
    fetchChainData();
  }, []);
  
  // Fetch chain data
  const fetchChainData = async () => {
    try {
      setLoading(true);
      
      // In a real implementation, we would fetch from API
      // For demo, we'll use mock data
      
      // Try to fetch from API first
      try {
        const response = await fetch('/api/chain-data');
        const data = await response.json();
        
        if (data.success && data.chains.length > 0) {
          setChainsData(data.chains);
          setTotalTVL(data.chains.reduce((sum: number, chain: ChainData) => sum + chain.tvl, 0));
          setSelectedChain(data.chains[0]);
        } else {
          // Fallback to mock data
          const mockData = getMockChainData();
          setChainsData(mockData);
          setTotalTVL(mockData.reduce((sum, chain) => sum + chain.tvl, 0));
          setSelectedChain(mockData[0]);
        }
      } catch (error) {
        // API might not be implemented yet, use mock data
        const mockData = getMockChainData();
        setChainsData(mockData);
        setTotalTVL(mockData.reduce((sum, chain) => sum + chain.tvl, 0));
        setSelectedChain(mockData[0]);
      }
      
    } catch (error) {
      console.error('Error fetching chain data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Navigate to chain-specific opportunities
  const viewChainOpportunities = (chainId: string) => {
    router.push(`/discover?chain=${chainId}`);
  };
  
  // Mock data for development
  const getMockChainData = (): ChainData[] => {
    return [
      {
        id: 'ethereum',
        name: 'Ethereum',
        tvl: 425000000,
        numberOfStrategies: 28,
        averageApy: 6.8,
        highestApy: 42.5,
        color: '#627EEA',
        logoUrl: '/images/chains/ethereum.svg',
        strategyTypes: {
          lending: 43,
          staking: 12,
          farming: 30,
          lp: 15
        },
        topAssets: [
          { symbol: 'ETH', percentage: 35 },
          { symbol: 'USDC', percentage: 28 },
          { symbol: 'DAI', percentage: 18 },
          { symbol: 'WBTC', percentage: 12 },
          { symbol: 'Other', percentage: 7 }
        ]
      },
      {
        id: 'polkadot',
        name: 'Polkadot',
        tvl: 120000000,
        numberOfStrategies: 15,
        averageApy: 12.3,
        highestApy: 38.7,
        color: '#E6007A',
        logoUrl: '/images/chains/polkadot.svg',
        strategyTypes: {
          lending: 25,
          staking: 45,
          farming: 20,
          lp: 10
        },
        topAssets: [
          { symbol: 'DOT', percentage: 62 },
          { symbol: 'USDT', percentage: 15 },
          { symbol: 'USDC', percentage: 12 },
          { symbol: 'ACA', percentage: 8 },
          { symbol: 'Other', percentage: 3 }
        ]
      },
      {
        id: 'arbitrum',
        name: 'Arbitrum',
        tvl: 215000000,
        numberOfStrategies: 22,
        averageApy: 9.4,
        highestApy: 48.2,
        color: '#28A0F0',
        logoUrl: '/images/chains/arbitrum.svg',
        strategyTypes: {
          lending: 30,
          staking: 15,
          farming: 35,
          lp: 20
        },
        topAssets: [
          { symbol: 'ETH', percentage: 42 },
          { symbol: 'USDC', percentage: 22 },
          { symbol: 'ARB', percentage: 15 },
          { symbol: 'GMX', percentage: 12 },
          { symbol: 'Other', percentage: 9 }
        ]
      },
      {
        id: 'moonbeam',
        name: 'Moonbeam',
        tvl: 78000000,
        numberOfStrategies: 12,
        averageApy: 14.8,
        highestApy: 52.7,
        color: '#53CBC8',
        logoUrl: '/images/chains/moonbeam.svg',
        strategyTypes: {
          lending: 20,
          staking: 40,
          farming: 30,
          lp: 10
        },
        topAssets: [
          { symbol: 'GLMR', percentage: 55 },
          { symbol: 'USDC', percentage: 20 },
          { symbol: 'ETH', percentage: 15 },
          { symbol: 'STELLA', percentage: 7 },
          { symbol: 'Other', percentage: 3 }
        ]
      },
      {
        id: 'astar',
        name: 'Astar',
        tvl: 45000000,
        numberOfStrategies: 10,
        averageApy: 18.2,
        highestApy: 65.4,
        color: '#1B6DC1',
        logoUrl: '/images/chains/astar.svg',
        strategyTypes: {
          lending: 15,
          staking: 35,
          farming: 40,
          lp: 10
        },
        topAssets: [
          { symbol: 'ASTR', percentage: 58 },
          { symbol: 'USDT', percentage: 18 },
          { symbol: 'USDC', percentage: 12 },
          { symbol: 'DOT', percentage: 8 },
          { symbol: 'Other', percentage: 4 }
        ]
      },
      {
        id: 'polygon',
        name: 'Polygon',
        tvl: 180000000,
        numberOfStrategies: 24,
        averageApy: 8.6,
        highestApy: 45.3,
        color: '#8247E5',
        logoUrl: '/images/chains/polygon.svg',
        strategyTypes: {
          lending: 35,
          staking: 20,
          farming: 30,
          lp: 15
        },
        topAssets: [
          { symbol: 'MATIC', percentage: 38 },
          { symbol: 'USDC', percentage: 25 },
          { symbol: 'USDT', percentage: 18 },
          { symbol: 'WETH', percentage: 12 },
          { symbol: 'Other', percentage: 7 }
        ]
      },
      {
        id: 'moonriver',
        name: 'Moonriver',
        tvl: 32000000,
        numberOfStrategies: 8,
        averageApy: 22.5,
        highestApy: 78.9,
        color: '#F2AB1C',
        logoUrl: '/images/chains/moonriver.svg',
        strategyTypes: {
          lending: 10,
          staking: 30,
          farming: 50,
          lp: 10
        },
        topAssets: [
          { symbol: 'MOVR', percentage: 62 },
          { symbol: 'USDC', percentage: 18 },
          { symbol: 'SOLAR', percentage: 10 },
          { symbol: 'USDT', percentage: 8 },
          { symbol: 'Other', percentage: 2 }
        ]
      },
      {
        id: 'avalanche',
        name: 'Avalanche',
        tvl: 150000000,
        numberOfStrategies: 18,
        averageApy: 11.2,
        highestApy: 51.8,
        color: '#E84142',
        logoUrl: '/images/chains/avalanche.svg',
        strategyTypes: {
          lending: 30,
          staking: 25,
          farming: 30,
          lp: 15
        },
        topAssets: [
          { symbol: 'AVAX', percentage: 42 },
          { symbol: 'USDC', percentage: 25 },
          { symbol: 'USDT', percentage: 15 },
          { symbol: 'JOE', percentage: 8 },
          { symbol: 'Other', percentage: 10 }
        ]
      }
    ];
  };
  
  // Prepare chart data
  const getChartData = (data: any[], property: string, colors: string[]) => {
    return {
      labels: data.map(item => item.name),
      datasets: [
        {
          data: data.map(item => item[property]),
          backgroundColor: colors || data.map(item => item.color),
          borderColor: Array(data.length).fill('#ffffff'),
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
              label += new Intl.NumberFormat('en-US', { 
                style: 'currency', 
                currency: 'USD',
                notation: 'compact',
                compactDisplay: 'short'
              }).format(context.parsed);
            }
            return label;
          }
        }
      }
    },
  };
  
  // Strategy type chart data for selected chain
  const getStrategyChartData = () => {
    if (!selectedChain) return null;
    
    const { strategyTypes } = selectedChain;
    return {
      labels: ['Lending', 'Staking', 'Yield Farming', 'Liquidity Provision'],
      datasets: [
        {
          data: [
            strategyTypes.lending,
            strategyTypes.staking,
            strategyTypes.farming,
            strategyTypes.lp
          ],
          backgroundColor: [
            '#36A2EB',  // blue
            '#4BC0C0',  // teal
            '#FFCD56',  // yellow
            '#FF6384',  // pink
          ],
          borderColor: Array(4).fill('#ffffff'),
          borderWidth: 2,
        },
      ],
    };
  };
  
  // Asset allocation chart data for selected chain
  const getAssetChartData = () => {
    if (!selectedChain) return null;
    
    return {
      labels: selectedChain.topAssets.map(asset => asset.symbol),
      datasets: [
        {
          data: selectedChain.topAssets.map(asset => asset.percentage),
          backgroundColor: [
            '#FF6384',  // pink
            '#36A2EB',  // blue
            '#FFCD56',  // yellow
            '#4BC0C0',  // teal
            '#9966FF',  // purple
          ],
          borderColor: Array(selectedChain.topAssets.length).fill('#ffffff'),
          borderWidth: 2,
        },
      ],
    };
  };

  return (
    <div className="space-y-6">
      {/* TVL Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            Cross-Chain Value Distribution
          </CardTitle>
          <CardDescription>
            Compare total value locked and yield opportunities across supported blockchains
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="w-full lg:w-1/2 h-80">
              {loading ? (
                <div className="h-full flex items-center justify-center">
                  <Skeleton className="h-64 w-64 rounded-full" />
                </div>
              ) : (
                <Doughnut 
                  data={getChartData(chainsData, 'tvl', chainsData.map(chain => chain.color))} 
                  options={chartOptions}
                />
              )}
            </div>
            
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium">Total Value Locked</h3>
                <h3 className="text-2xl font-bold">${(totalTVL / 1000000).toFixed(1)}M</h3>
              </div>
              
              <div className="space-y-2">
                {loading ? (
                  Array(5).fill(0).map((_, i) => (
                    <div key={i} className="flex justify-between items-center p-2">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-6 w-24" />
                    </div>
                  ))
                ) : (
                  chainsData
                    .sort((a, b) => b.tvl - a.tvl)
                    .slice(0, 5)
                    .map(chain => (
                      <div 
                        key={chain.id} 
                        className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                        onClick={() => setSelectedChain(chain)}
                      >
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: chain.color }}></div>
                          <span>{chain.name}</span>
                        </div>
                        <span className="font-medium">${(chain.tvl / 1000000).toFixed(1)}M</span>
                      </div>
                    ))
                )}
              </div>
              
              <div className="pt-4">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center"
                  onClick={fetchChainData}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Data
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Chain Details */}
      {selectedChain && (
        <Card>
          <CardHeader className="border-b">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center">
                  <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: selectedChain.color }}></div>
                  {selectedChain.name} Insights
                </CardTitle>
                <CardDescription>{selectedChain.numberOfStrategies} active strategies available</CardDescription>
              </div>
              <Button onClick={() => viewChainOpportunities(selectedChain.id)}>
                View All Opportunities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {loading ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Chain Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-500 mb-1">Average APY</p>
                        <div className="flex items-center justify-center">
                          <TrendingUp className="h-5 w-5 mr-1 text-green-500" />
                          <p className="text-3xl font-bold text-green-600">{selectedChain.averageApy}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-500 mb-1">Highest APY</p>
                        <p className="text-3xl font-bold text-green-600">{selectedChain.highestApy}%</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="col-span-2">
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-medium mb-3">Strategy Types</h3>
                      <div className="h-40">
                        <Doughnut 
                          data={getStrategyChartData()} 
                          options={{
                            ...chartOptions,
                            plugins: {
                              ...chartOptions.plugins,
                              tooltip: {
                                callbacks: {
                                  label: function(context: any) {
                                    let label = context.label || '';
                                    if (label) {
                                      label += ': ';
                                    }
                                    if (context.parsed !== undefined) {
                                      label += context.parsed + '%';
                                    }
                                    return label;
                                  }
                                }
                              }
                            }
                          }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Asset Allocation */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-3">Top Assets</h3>
                    <div className="h-64">
                      <Doughnut 
                        data={getAssetChartData()} 
                        options={{
                          ...chartOptions,
                          plugins: {
                            ...chartOptions.plugins,
                            tooltip: {
                              callbacks: {
                                label: function(context: any) {
                                  let label = context.label || '';
                                  if (label) {
                                    label += ': ';
                                  }
                                  if (context.parsed !== undefined) {
                                    label += context.parsed + '%';
                                  }
                                  return label;
                                }
                              }
                            }
                          }
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      )}
      
      {/* Chain Selection */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {loading ? (
          Array(8).fill(0).map((_, i) => (
            <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="flex flex-col items-center justify-center p-4">
                <Skeleton className="h-12 w-12 rounded-full mb-2" />
                <Skeleton className="h-4 w-20" />
              </CardContent>
            </Card>
          ))
        ) : (
          chainsData.map(chain => (
            <Card 
              key={chain.id} 
              className={`cursor-pointer hover:shadow-md transition-shadow ${selectedChain?.id === chain.id ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setSelectedChain(chain)}
            >
              <CardContent className="flex flex-col items-center justify-center p-4">
                <div 
                  className="h-12 w-12 rounded-full mb-2 flex items-center justify-center"
                  style={{ backgroundColor: chain.color + '20' }}
                >
                  <div className="h-8 w-8 rounded-full" style={{ backgroundColor: chain.color }}></div>
                </div>
                <p className="font-medium text-center">{chain.name}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
