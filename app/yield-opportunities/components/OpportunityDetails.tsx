import React, { useState } from 'react';
import { ethers } from 'ethers';
import { YieldOpportunity } from '@/lib/yield/yield-optimizer';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, Clock, AlertTriangle, BarChart, DollarSign } from 'lucide-react';

interface OpportunityDetailsProps {
  opportunity: YieldOpportunity;
  onClose: () => void;
  onInvest: (opportunity: YieldOpportunity, amount: string) => void;
}

export function OpportunityDetails({ opportunity, onClose, onInvest }: OpportunityDetailsProps) {
  const [investAmount, setInvestAmount] = useState('');
  const [investDuration, setInvestDuration] = useState(30); // 30 days
  const [isCompounding, setIsCompounding] = useState(false);

  // Format APY as percentage
  const formatAPY = (apy: number) => {
    return (apy / 100).toFixed(2) + '%';
  };
  
  // Format TVL with proper units
  const formatTVL = (tvlWei: string) => {
    const tvl = parseFloat(ethers.utils.formatEther(tvlWei));
    if (tvl >= 1_000_000) {
      return `$${(tvl / 1_000_000).toFixed(2)}M`;
    } else if (tvl >= 1_000) {
      return `$${(tvl / 1_000).toFixed(2)}K`;
    } else {
      return `$${tvl.toFixed(2)}`;
    }
  };

  // Generate projected returns data for the chart
  const generateProjectedReturns = () => {
    const data = [];
    const amount = investAmount ? parseFloat(investAmount) : 100;
    const apyDecimal = opportunity.apy / 10000;

    for (let day = 0; day <= 365; day += 15) {
      let value;
      if (isCompounding) {
        // Compound interest formula: A = P(1 + r/n)^(nt)
        value = amount * Math.pow(1 + apyDecimal / 365, day);
      } else {
        // Simple interest formula: A = P(1 + rt)
        value = amount * (1 + apyDecimal * day / 365);
      }
      
      data.push({
        day,
        value: parseFloat(value.toFixed(2)),
      });
    }
    
    return data;
  };

  // Calculate projected returns for the current input values
  const calculateProjectedReturns = () => {
    if (!investAmount) return { principal: 0, returns: 0, total: 0 };
    
    const amount = parseFloat(investAmount);
    const apyDecimal = opportunity.apy / 10000;
    let returns = 0;
    
    if (isCompounding) {
      // Compound interest calculation
      const finalAmount = amount * Math.pow(1 + apyDecimal / 365, investDuration);
      returns = finalAmount - amount;
    } else {
      // Simple interest calculation
      returns = amount * apyDecimal * (investDuration / 365);
    }
    
    return {
      principal: amount,
      returns: parseFloat(returns.toFixed(2)),
      total: amount + parseFloat(returns.toFixed(2)),
    };
  };

  // Handle invest button click
  const handleInvest = () => {
    if (!investAmount) return;
    
    try {
      // Format amount to wei
      const amountWei = ethers.utils.parseEther(investAmount).toString();
      onInvest(opportunity, amountWei);
    } catch (error) {
      console.error('Invalid amount:', error);
    }
  };

  // Factor descriptions based on strategy type
  const getRiskFactors = () => {
    const baseFactors = [
      'Market volatility',
      'Smart contract risk',
    ];
    
    switch (opportunity.strategyType) {
      case 'lending':
        return [
          ...baseFactors,
          'Borrower default risk',
          'Liquidation efficiency',
          'Interest rate fluctuations',
        ];
      case 'farming':
        return [
          ...baseFactors,
          'Impermanent loss',
          'Token value depreciation',
          'Reward token sustainability',
          'Protocol governance changes',
        ];
      case 'liquidity':
        return [
          ...baseFactors,
          'Impermanent loss',
          'Trading volume fluctuations',
          'Protocol fee changes',
          'Liquidity pool imbalance',
        ];
      default:
        return baseFactors;
    }
  };

  // Get the projected returns
  const projectedReturns = calculateProjectedReturns();
  const chartData = generateProjectedReturns();
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl">
              {opportunity.assetSymbol} {opportunity.strategyType.charAt(0).toUpperCase() + opportunity.strategyType.slice(1)} Strategy
            </CardTitle>
            <CardDescription>{opportunity.protocolName}</CardDescription>
          </div>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="simulation">Return Simulation</TabsTrigger>
            <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
            <TabsTrigger value="invest">Invest</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-blue-600 text-sm font-medium mb-1">Annual Percentage Yield</div>
                <div className="text-2xl font-bold flex items-center">
                  {formatAPY(opportunity.apy)}
                  <ArrowUpRight className="ml-1 h-5 w-5 text-green-500" />
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-purple-600 text-sm font-medium mb-1">Total Value Locked</div>
                <div className="text-2xl font-bold">
                  {formatTVL(opportunity.tvl)}
                </div>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg">
                <div className="text-amber-600 text-sm font-medium mb-1">Risk Level</div>
                <div className="text-2xl font-bold flex items-center">
                  {opportunity.risk}/10
                  {opportunity.risk > 7 && <AlertTriangle className="ml-1 h-5 w-5 text-red-500" />}
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-green-600 text-sm font-medium mb-1">Minimum Deposit</div>
                <div className="text-2xl font-bold">
                  {ethers.utils.formatEther(opportunity.minDeposit)} {opportunity.assetSymbol}
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Strategy Details</h3>
              <p className="text-gray-600 mb-4">
                This {opportunity.strategyType} strategy on {opportunity.protocolName} allows you to earn yield on your {opportunity.assetSymbol} by 
                {opportunity.strategyType === 'lending' ? ' providing liquidity to borrowers.' : 
                 opportunity.strategyType === 'farming' ? ' staking your assets and earning reward tokens.' : 
                 ' providing liquidity to trading pairs and earning trading fees.'}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                {opportunity.rewardTokens && (
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">Reward Tokens</div>
                      <div>Yes (Additional token rewards)</div>
                    </div>
                  </div>
                )}
                
                {opportunity.lockupPeriod && (
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500 mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">Lockup Period</div>
                      <div>{opportunity.lockupPeriod / 86400} days</div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center">
                  <BarChart className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <div className="text-sm text-gray-500">Risk-Adjusted Return</div>
                    <div>{(opportunity.apy / opportunity.risk / 100).toFixed(2)}x</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="simulation">
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="invest-amount">Investment Amount ({opportunity.assetSymbol})</Label>
                  <Input
                    id="invest-amount"
                    type="number"
                    value={investAmount}
                    onChange={(e) => setInvestAmount(e.target.value)}
                    placeholder={`Enter amount in ${opportunity.assetSymbol}`}
                  />
                </div>
                <div>
                  <Label htmlFor="compound-toggle">Compounding</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <Button
                      variant={isCompounding ? "default" : "outline"}
                      onClick={() => setIsCompounding(true)}
                      className="flex-1"
                    >
                      Yes
                    </Button>
                    <Button
                      variant={!isCompounding ? "default" : "outline"}
                      onClick={() => setIsCompounding(false)}
                      className="flex-1"
                    >
                      No
                    </Button>
                  </div>
                </div>
              </div>
              
              <div>
                <Label>Investment Duration: {investDuration} days</Label>
                <Slider
                  defaultValue={[30]}
                  max={365}
                  min={1}
                  step={1}
                  className="mt-2"
                  onValueChange={(value) => setInvestDuration(value[0])}
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-gray-600 text-sm font-medium mb-1">Principal</div>
                  <div className="text-xl font-bold">
                    {projectedReturns.principal} {opportunity.assetSymbol}
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-green-600 text-sm font-medium mb-1">Estimated Returns</div>
                  <div className="text-xl font-bold flex items-center">
                    +{projectedReturns.returns} {opportunity.assetSymbol}
                    <ArrowUpRight className="ml-1 h-4 w-4 text-green-500" />
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-blue-600 text-sm font-medium mb-1">Total Value</div>
                  <div className="text-xl font-bold">
                    {projectedReturns.total} {opportunity.assetSymbol}
                  </div>
                </div>
              </div>
              
              <div className="h-80 mt-6">
                <h3 className="text-lg font-medium mb-2">Projected Growth</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" label={{ value: 'Days', position: 'insideBottomRight', offset: -10 }} />
                    <YAxis label={{ value: `Value (${opportunity.assetSymbol})`, angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value) => [`${value} ${opportunity.assetSymbol}`, 'Value']} labelFormatter={(label) => `Day ${label}`} />
                    <Area type="monotone" dataKey="value" stroke="#4f46e5" fill="#818cf8" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="risks">
            <div className="space-y-4 mt-4">
              <div className="flex items-center mb-4">
                <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                  <span className="text-3xl font-bold text-amber-600">{opportunity.risk}</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Risk Score: {opportunity.risk}/10</h3>
                  <p className="text-gray-600">
                    {opportunity.risk <= 3 ? 'Low risk strategy suitable for conservative investors.' :
                     opportunity.risk <= 6 ? 'Medium risk strategy with balanced risk-reward profile.' :
                     'High risk strategy with potential for higher returns but increased volatility.'}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Risk Factors</h3>
                <ul className="space-y-2">
                  {getRiskFactors().map((factor, index) => (
                    <li key={index} className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Risk Mitigation</h3>
                <p className="text-gray-600 mb-2">
                  OrbitYield implements several risk mitigation strategies:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2">✓</div>
                    <span>Regular smart contract audits</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2">✓</div>
                    <span>Diversification across multiple protocols</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2">✓</div>
                    <span>Dynamic risk assessment and monitoring</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2">✓</div>
                    <span>Insurance coverage for certain strategies</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="invest">
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="invest-amount-final">Amount to Invest</Label>
                <div className="flex space-x-2 items-center">
                  <Input
                    id="invest-amount-final"
                    type="number"
                    value={investAmount}
                    onChange={(e) => setInvestAmount(e.target.value)}
                    placeholder={`Enter amount in ${opportunity.assetSymbol}`}
                    className="flex-1"
                  />
                  <span className="font-medium">{opportunity.assetSymbol}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Minimum deposit: {ethers.utils.formatEther(opportunity.minDeposit)} {opportunity.assetSymbol}
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <h3 className="text-lg font-medium mb-2">Investment Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Strategy:</span>
                    <span className="font-medium">{opportunity.strategyType.charAt(0).toUpperCase() + opportunity.strategyType.slice(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Protocol:</span>
                    <span className="font-medium">{opportunity.protocolName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Asset:</span>
                    <span className="font-medium">{opportunity.assetSymbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">APY:</span>
                    <span className="font-medium text-green-600">{formatAPY(opportunity.apy)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Risk Level:</span>
                    <span className="font-medium">{opportunity.risk}/10</span>
                  </div>
                  {opportunity.lockupPeriod && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lockup Period:</span>
                      <span className="font-medium">{opportunity.lockupPeriod / 86400} days</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Annual Projected Returns</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Principal:</span>
                    <span className="font-medium">{investAmount || '0'} {opportunity.assetSymbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Est. Annual Yield:</span>
                    <span className="font-medium text-green-600">
                      {investAmount ? 
                        (parseFloat(investAmount) * opportunity.apy / 10000).toFixed(4) : 
                        '0'} {opportunity.assetSymbol}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total After 1 Year:</span>
                    <span className="font-medium">
                      {investAmount ? 
                        (parseFloat(investAmount) * (1 + opportunity.apy / 10000)).toFixed(4) : 
                        '0'} {opportunity.assetSymbol}
                    </span>
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full mt-4" 
                size="lg"
                onClick={handleInvest}
                disabled={!investAmount || parseFloat(investAmount) <= 0}
              >
                Invest Now
              </Button>
              
              <p className="text-sm text-gray-500 mt-2">
                By investing, you agree to the terms and conditions of the protocol. 
                Please review the protocol's documentation for any additional information.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
