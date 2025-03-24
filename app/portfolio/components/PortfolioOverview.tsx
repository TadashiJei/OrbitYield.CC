'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { PortfolioSummary } from './PortfolioSummary';
import { CrossChainAssets } from '@/app/cross-chain/components/CrossChainAssets';
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatPercent, cn } from '@/lib/utils';
import { Wallet, TrendingUp, ArrowRight, PieChart, BarChart3 } from 'lucide-react';
import { useAccount } from 'wagmi';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title
} from 'chart.js';
import 'chart.js/auto';
// Import date adapter for Chart.js
import 'chartjs-adapter-date-fns';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title
);

export function PortfolioOverview() {
  const { address, isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState('summary');
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalValue: 0,
    yieldValue: 0,
    crossChainValue: 0,
    percentChange24h: 0.5, // Mock data - would come from real data
    percentChange7d: 2.3,  // Mock data - would come from real data
  });

  useEffect(() => {
    if (isConnected && address) {
      // Generate mock historical data
      generateMockHistoricalData();
      setLoading(false);
    }
  }, [isConnected, address]);

  // Generate mock historical data for portfolio growth chart
  const generateMockHistoricalData = () => {
    const data = [];
    const now = new Date();
    const baseValue = 10000; // Starting value in USD
    
    // Generate daily data for the past 30 days
    for (let i = 30; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Create some randomness in daily fluctuations
      const randomFactor = 1 + (Math.random() * 0.04 - 0.015); // -1.5% to +2.5% daily change
      const cumulativeGrowthFactor = 1 + (0.03 * (30 - i) / 30); // Simulate growth over time
      
      const value = baseValue * randomFactor * cumulativeGrowthFactor;
      
      data.push({
        date: date.toISOString().split('T')[0],
        value: value
      });
    }
    
    setHistoricalData(data);
  };

  // Function to aggregate data from yield positions and cross-chain assets
  const updatePortfolioStats = (yieldValue: number, crossChainValue: number) => {
    setStats({
      ...stats,
      totalValue: yieldValue + crossChainValue,
      yieldValue,
      crossChainValue
    });
  };

  // Historical performance chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return formatCurrency(context.parsed.y);
          }
        }
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'MMM d, yyyy',
          displayFormats: {
            day: 'MMM d'
          }
        },
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          callback: function(value: any) {
            return formatCurrency(value);
          }
        }
      }
    }
  };

  const chartData = {
    labels: historicalData.map(item => item.date),
    datasets: [
      {
        label: 'Portfolio Value',
        data: historicalData.map(item => item.value),
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: 'rgba(59, 130, 246, 0.8)',
        tension: 0.3,
        pointRadius: 2,
        pointHoverRadius: 5
      }
    ]
  };

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-[300px] w-full" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-[100px] w-full" />
            <Skeleton className="h-[100px] w-full" />
            <Skeleton className="h-[100px] w-full" />
          </div>
        </div>
      ) : (
        <>
          {/* Portfolio Overview Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-bold">{formatCurrency(stats.totalValue)}</h2>
                <div className="flex items-center mt-1">
                  <span className={`text-sm ${stats.percentChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {stats.percentChange24h >= 0 ? '↑' : '↓'} {formatPercent(stats.percentChange24h / 100)} (24h)
                  </span>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className={`text-sm ${stats.percentChange7d >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {stats.percentChange7d >= 0 ? '↑' : '↓'} {formatPercent(stats.percentChange7d / 100)} (7d)
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Link 
                  href="/yield-opportunities"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" })
                  )}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Find Opportunities
                </Link>
                <Link 
                  href="/cross-chain?tab=transfer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" })
                  )}
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Transfer Assets
                </Link>
              </div>
            </div>
            
            <div className="h-[300px]">
              <Line data={chartData} options={chartOptions as any} />
            </div>
          </div>

          {/* Portfolio Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Portfolio</CardDescription>
                <CardTitle className="text-2xl">{formatCurrency(stats.totalValue)}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Wallet className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-500">
                    Combined assets across all chains
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Yield Positions</CardDescription>
                <CardTitle className="text-2xl">{formatCurrency(stats.yieldValue)}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm text-gray-500">
                    {formatPercent(stats.yieldValue / (stats.totalValue || 1))} of portfolio
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Cross-Chain Assets</CardDescription>
                <CardTitle className="text-2xl">{formatCurrency(stats.crossChainValue)}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-sm text-gray-500">
                    {formatPercent(stats.crossChainValue / (stats.totalValue || 1))} of portfolio
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Portfolio Content */}
          <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="yield">Yield Positions</TabsTrigger>
              <TabsTrigger value="assets">Chain Assets</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Yield Positions
                    </CardTitle>
                    <CardDescription>Active yield-generating strategies</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="px-2">
                      <PortfolioSummary 
                        compact={true} 
                        onValueCalculated={(value) => updatePortfolioStats(value, stats.crossChainValue)} 
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChart className="h-5 w-5 mr-2" />
                      Cross-Chain Assets
                    </CardTitle>
                    <CardDescription>Assets across different blockchains</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="px-2">
                      {address && (
                        <CrossChainAssets 
                          address={address} 
                          compact={true}
                          onValueCalculated={(value) => updatePortfolioStats(stats.yieldValue, value)}
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="yield">
              <PortfolioSummary 
                onValueCalculated={(value) => updatePortfolioStats(value, stats.crossChainValue)} 
              />
            </TabsContent>
            
            <TabsContent value="assets">
              {address && (
                <CrossChainAssets 
                  address={address}
                  onValueCalculated={(value) => updatePortfolioStats(stats.yieldValue, value)}
                />
              )}
            </TabsContent>
          </Tabs>

          {/* Add a "More Actions" section */}
          <div className="mt-8">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold">More Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link 
                  href="/dashboard"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" })
                  )}
                >
                  Dashboard Overview
                </Link>
                <Link 
                  href="/portfolio?tab=positions"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" })
                  )}
                >
                  View All Positions
                </Link>
                <Link 
                  href="/portfolio?tab=optimize"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" })
                  )}
                >
                  Optimize Portfolio
                </Link>
                <Link 
                  href="/transactions"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" })
                  )}
                >
                  Transaction History
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
