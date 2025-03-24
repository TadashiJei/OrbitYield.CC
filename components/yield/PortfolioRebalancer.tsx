'use client';

import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ArrowRightIcon, ArrowDownIcon, ArrowUpIcon, AlertCircle, RefreshCcw, DollarSign, ShieldCheck, LineChart } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Asset {
  symbol: string;
  amount: number;
  valueUSD: number;
  chain: string;
  protocol?: string;
  apy?: number;
  risk?: number;
}

export interface RebalancingAction {
  fromAsset: Asset;
  toAsset: Asset;
  amountToMove: number;
  valueToMove: number;
  reason: string;
  expectedAPYIncrease: number;
  riskChange: 'increased' | 'decreased' | 'unchanged';
}

export interface PortfolioRebalanceReport {
  currentPortfolio: {
    assets: Asset[];
    totalValue: number;
    weightedAPY: number;
    weightedRisk: number;
    diversificationScore: number;
  };
  recommendedPortfolio: {
    assets: Asset[];
    totalValue: number;
    weightedAPY: number;
    weightedRisk: number;
    diversificationScore: number;
  };
  actions: RebalancingAction[];
  potentialAPYIncrease: number;
  potentialRiskChange: number;
  estimatedAnnualYieldDifference: number;
}

interface PortfolioRebalancerProps {
  report: PortfolioRebalanceReport;
  onRebalance: (actions: RebalancingAction[]) => void;
  isLoading?: boolean;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#8DD1E1'];

export function PortfolioRebalancer({ report, onRebalance, isLoading = false }: PortfolioRebalancerProps) {
  const [selectedActions, setSelectedActions] = useState<RebalancingAction[]>([]);

  // Toggle selection of an action
  const toggleActionSelection = (action: RebalancingAction) => {
    if (selectedActions.includes(action)) {
      setSelectedActions(selectedActions.filter(a => a !== action));
    } else {
      setSelectedActions([...selectedActions, action]);
    }
  };

  // Handle rebalance button click
  const handleRebalance = () => {
    onRebalance(selectedActions.length > 0 ? selectedActions : report.actions);
  };

  // Format percentage
  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  // Format dollar amount
  const formatUSD = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  // Prepare data for pie charts
  const prepareChartData = (assets: Asset[]) => {
    return assets.map((asset, index) => ({
      name: asset.symbol,
      value: asset.valueUSD,
      color: COLORS[index % COLORS.length]
    }));
  };

  const currentPortfolioData = prepareChartData(report.currentPortfolio.assets);
  const recommendedPortfolioData = prepareChartData(report.recommendedPortfolio.assets);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <RefreshCcw className="mr-2 h-5 w-5" />
          Portfolio Rebalancing Recommendations
        </CardTitle>
        <CardDescription>
          Optimize your yield by strategically rebalancing your assets across protocols and chains
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-base flex items-center">
                <DollarSign className="mr-2 h-4 w-4 text-green-600" />
                Potential APY Increase
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                +{formatPercent(report.potentialAPYIncrease)}
              </div>
              <p className="text-sm text-muted-foreground">
                Current: {formatPercent(report.currentPortfolio.weightedAPY)} → 
                Recommended: {formatPercent(report.recommendedPortfolio.weightedAPY)}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-base flex items-center">
                <ShieldCheck className="mr-2 h-4 w-4 text-blue-600" />
                Risk Level Change
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {report.potentialRiskChange > 0 
                  ? <span className="text-amber-500">+{report.potentialRiskChange.toFixed(1)}</span> 
                  : <span className="text-green-600">{report.potentialRiskChange.toFixed(1)}</span>}
              </div>
              <p className="text-sm text-muted-foreground">
                Current: {report.currentPortfolio.weightedRisk.toFixed(1)}/10 → 
                Recommended: {report.recommendedPortfolio.weightedRisk.toFixed(1)}/10
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-base flex items-center">
                <LineChart className="mr-2 h-4 w-4 text-purple-600" />
                Estimated Annual Yield
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                {formatUSD(report.estimatedAnnualYieldDifference)}
              </div>
              <p className="text-sm text-muted-foreground">
                Additional yield per year based on current holdings
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Portfolio Comparison */}
        <Tabs defaultValue="comparison" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="comparison">Portfolio Comparison</TabsTrigger>
            <TabsTrigger value="actions">Recommended Actions</TabsTrigger>
            <TabsTrigger value="details">Detailed Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="comparison" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Portfolio</CardTitle>
                  <CardDescription>Total Value: {formatUSD(report.currentPortfolio.totalValue)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={currentPortfolioData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={3}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                        >
                          {currentPortfolioData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: number) => formatUSD(value)}
                          labelFormatter={(index) => currentPortfolioData[index as number]?.name || ''}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm">
                      <span>Diversification Score</span>
                      <span>{report.currentPortfolio.diversificationScore.toFixed(0)}/100</span>
                    </div>
                    <Progress value={report.currentPortfolio.diversificationScore} className="mt-1" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Portfolio</CardTitle>
                  <CardDescription>Total Value: {formatUSD(report.recommendedPortfolio.totalValue)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={recommendedPortfolioData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={3}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                        >
                          {recommendedPortfolioData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: number) => formatUSD(value)}
                          labelFormatter={(index) => recommendedPortfolioData[index as number]?.name || ''}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm">
                      <span>Diversification Score</span>
                      <span>{report.recommendedPortfolio.diversificationScore.toFixed(0)}/100</span>
                    </div>
                    <Progress value={report.recommendedPortfolio.diversificationScore} className="mt-1" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="actions" className="space-y-6">
            {report.actions.length === 0 ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>No Rebalancing Needed</AlertTitle>
                <AlertDescription>
                  Your portfolio is already well-optimized for yield based on your risk tolerance.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-3">
                {report.actions.map((action, index) => (
                  <Card key={index} className={selectedActions.includes(action) 
                    ? 'border-2 border-primary' 
                    : 'border'
                  }>
                    <CardHeader className="py-3">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">
                          Move {action.fromAsset.symbol} to {action.toAsset.symbol}
                        </CardTitle>
                        <Button
                          size="sm"
                          variant={selectedActions.includes(action) ? "default" : "outline"}
                          onClick={() => toggleActionSelection(action)}
                        >
                          {selectedActions.includes(action) ? 'Selected' : 'Select'}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="flex items-center mb-3">
                        <div className="text-sm w-1/3">
                          <div className="font-semibold">{action.fromAsset.symbol}</div>
                          <div className="text-muted-foreground">
                            {action.fromAsset.protocol} ({action.fromAsset.chain})
                          </div>
                          <div className="text-muted-foreground">
                            APY: {formatPercent(action.fromAsset.apy || 0)}
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-center w-1/3">
                          <ArrowRightIcon className="h-5 w-5 text-blue-600" />
                          <div className="text-sm font-medium">{formatUSD(action.valueToMove)}</div>
                        </div>
                        
                        <div className="text-sm w-1/3">
                          <div className="font-semibold">{action.toAsset.symbol}</div>
                          <div className="text-muted-foreground">
                            {action.toAsset.protocol} ({action.toAsset.chain})
                          </div>
                          <div className="text-muted-foreground">
                            APY: {formatPercent(action.toAsset.apy || 0)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <div>
                          <span className="font-medium">APY Change: </span>
                          <span className="text-green-600">+{formatPercent(action.expectedAPYIncrease)}</span>
                        </div>
                        <div>
                          <span className="font-medium">Risk: </span>
                          {action.riskChange === 'increased' && (
                            <span className="text-amber-500 flex items-center">
                              <ArrowUpIcon className="h-3 w-3 mr-1" /> Increased
                            </span>
                          )}
                          {action.riskChange === 'decreased' && (
                            <span className="text-green-600 flex items-center">
                              <ArrowDownIcon className="h-3 w-3 mr-1" /> Decreased
                            </span>
                          )}
                          {action.riskChange === 'unchanged' && (
                            <span className="text-gray-600">Unchanged</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="font-medium">Reason: </span>
                        {action.reason}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="details" className="space-y-4">
            <Table>
              <TableCaption>Asset allocation comparison between portfolios</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Chain</TableHead>
                  <TableHead>Protocol</TableHead>
                  <TableHead className="text-right">Current Value</TableHead>
                  <TableHead className="text-right">Current %</TableHead>
                  <TableHead className="text-right">Recommended Value</TableHead>
                  <TableHead className="text-right">Recommended %</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {report.currentPortfolio.assets.map((asset, index) => {
                  const recommendedAsset = report.recommendedPortfolio.assets.find(a => 
                    a.symbol === asset.symbol && a.chain === asset.chain && a.protocol === asset.protocol
                  );
                  
                  const currentPercentage = (asset.valueUSD / report.currentPortfolio.totalValue) * 100;
                  const recommendedPercentage = recommendedAsset
                    ? (recommendedAsset.valueUSD / report.recommendedPortfolio.totalValue) * 100
                    : 0;
                  
                  const valueChange = recommendedAsset
                    ? recommendedAsset.valueUSD - asset.valueUSD
                    : -asset.valueUSD;
                  
                  const percentageChange = recommendedPercentage - currentPercentage;
                  
                  return (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{asset.symbol}</TableCell>
                      <TableCell>{asset.chain}</TableCell>
                      <TableCell>{asset.protocol || 'N/A'}</TableCell>
                      <TableCell className="text-right">{formatUSD(asset.valueUSD)}</TableCell>
                      <TableCell className="text-right">{formatPercent(currentPercentage)}</TableCell>
                      <TableCell className="text-right">
                        {recommendedAsset ? formatUSD(recommendedAsset.valueUSD) : formatUSD(0)}
                      </TableCell>
                      <TableCell className="text-right">{formatPercent(recommendedPercentage)}</TableCell>
                      <TableCell className="text-right">
                        {valueChange > 0 
                          ? <span className="text-green-600">+{formatUSD(valueChange)}</span>
                          : <span className="text-red-600">{formatUSD(valueChange)}</span>
                        }
                        <br />
                        <span className="text-xs">
                          {percentageChange > 0 
                            ? <span className="text-green-600">+{formatPercent(percentageChange)}</span>
                            : <span className="text-red-600">{formatPercent(percentageChange)}</span>
                          }
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
                
                {/* Show new assets that are only in recommended portfolio */}
                {report.recommendedPortfolio.assets
                  .filter(recAsset => 
                    !report.currentPortfolio.assets.some(currentAsset => 
                      currentAsset.symbol === recAsset.symbol && 
                      currentAsset.chain === recAsset.chain &&
                      currentAsset.protocol === recAsset.protocol
                    )
                  )
                  .map((newAsset, index) => {
                    const recommendedPercentage = (newAsset.valueUSD / report.recommendedPortfolio.totalValue) * 100;
                    
                    return (
                      <TableRow key={`new-${index}`}>
                        <TableCell className="font-medium">
                          {newAsset.symbol}
                          <Badge variant="outline" className="ml-2 bg-green-50">New</Badge>
                        </TableCell>
                        <TableCell>{newAsset.chain}</TableCell>
                        <TableCell>{newAsset.protocol || 'N/A'}</TableCell>
                        <TableCell className="text-right">{formatUSD(0)}</TableCell>
                        <TableCell className="text-right">{formatPercent(0)}</TableCell>
                        <TableCell className="text-right">{formatUSD(newAsset.valueUSD)}</TableCell>
                        <TableCell className="text-right">{formatPercent(recommendedPercentage)}</TableCell>
                        <TableCell className="text-right">
                          <span className="text-green-600">+{formatUSD(newAsset.valueUSD)}</span>
                          <br />
                          <span className="text-xs text-green-600">+{formatPercent(recommendedPercentage)}</span>
                        </TableCell>
                      </TableRow>
                    );
                  })
                }
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          {selectedActions.length > 0 
            ? `${selectedActions.length} of ${report.actions.length} actions selected` 
            : 'All actions will be executed'
          }
        </div>
        <Button 
          onClick={handleRebalance} 
          disabled={isLoading || report.actions.length === 0}
          className="space-x-2"
        >
          {isLoading ? (
            <>
              <RefreshCcw className="h-4 w-4 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <RefreshCcw className="h-4 w-4 mr-1" />
              <span>Rebalance Portfolio</span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default PortfolioRebalancer;
