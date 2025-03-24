'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

interface Strategy {
  id: string;
  name: string;
  description: string;
  risk: 'low' | 'medium' | 'high';
  apy: number;
  chains: string[];
  protocols: string[];
  lockupPeriod: string;
  impermanentLossRisk: boolean;
  liquidityDepth: 'low' | 'medium' | 'high';
  audited: boolean;
}

export function StrategyComparison() {
  const [timeframe, setTimeframe] = useState('30d');
  const [riskLevel, setRiskLevel] = useState<string[]>(['low', 'medium', 'high']);
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>(['staking', 'liquid-staking', 'lending']);
  
  // Mock strategies data
  const strategies: Strategy[] = [
    {
      id: 'staking',
      name: 'Pure Staking',
      description: 'Stake assets directly on PoS networks to earn validator rewards',
      risk: 'low',
      apy: 5.2,
      chains: ['Ethereum', 'Polkadot', 'Cosmos'],
      protocols: ['Native'],
      lockupPeriod: '21-28 days',
      impermanentLossRisk: false,
      liquidityDepth: 'high',
      audited: true
    },
    {
      id: 'liquid-staking',
      name: 'Liquid Staking',
      description: 'Stake assets while maintaining liquidity through derivative tokens',
      risk: 'low',
      apy: 6.8,
      chains: ['Ethereum', 'Polkadot', 'Solana'],
      protocols: ['Lido', 'Rocket Pool', 'Marinade'],
      lockupPeriod: 'None',
      impermanentLossRisk: false,
      liquidityDepth: 'high',
      audited: true
    },
    {
      id: 'lending',
      name: 'Lending',
      description: 'Provide assets to lending protocols to earn interest',
      risk: 'low',
      apy: 4.5,
      chains: ['Ethereum', 'Polygon', 'Avalanche', 'Arbitrum'],
      protocols: ['Aave', 'Compound', 'Morpho'],
      lockupPeriod: 'None',
      impermanentLossRisk: false,
      liquidityDepth: 'high',
      audited: true
    },
    {
      id: 'lp-stable',
      name: 'Stablecoin LP',
      description: 'Provide liquidity to stablecoin pairs',
      risk: 'medium',
      apy: 8.3,
      chains: ['Ethereum', 'Polygon', 'Arbitrum', 'Optimism'],
      protocols: ['Curve', 'Balancer', 'Uniswap'],
      lockupPeriod: 'None',
      impermanentLossRisk: false,
      liquidityDepth: 'high',
      audited: true
    },
    {
      id: 'lp-volatile',
      name: 'Volatile LP',
      description: 'Provide liquidity to volatile asset pairs with higher APY',
      risk: 'high',
      apy: 18.7,
      chains: ['Ethereum', 'BSC', 'Arbitrum', 'Optimism'],
      protocols: ['Uniswap', 'PancakeSwap', 'Velodrome'],
      lockupPeriod: 'None',
      impermanentLossRisk: true,
      liquidityDepth: 'medium',
      audited: true
    },
    {
      id: 'option-strategies',
      name: 'Option Strategies',
      description: 'Earn premiums from covered calls and put selling',
      risk: 'high',
      apy: 22.4,
      chains: ['Ethereum', 'Arbitrum'],
      protocols: ['Ribbon', 'Friktion', 'Dopex'],
      lockupPeriod: '7 days',
      impermanentLossRisk: false,
      liquidityDepth: 'low',
      audited: true
    }
  ];
  
  // Filter strategies based on selected risk levels
  const filteredStrategies = strategies.filter(
    strategy => riskLevel.includes(strategy.risk)
  );
  
  // Filter for comparison
  const strategiesToCompare = filteredStrategies.filter(
    strategy => selectedStrategies.includes(strategy.id)
  );
  
  // Toggle a strategy selection
  const toggleStrategy = (strategyId: string) => {
    if (selectedStrategies.includes(strategyId)) {
      setSelectedStrategies(selectedStrategies.filter(id => id !== strategyId));
    } else {
      // Limit to maximum 4 strategies for reasonable comparison
      if (selectedStrategies.length < 4) {
        setSelectedStrategies([...selectedStrategies, strategyId]);
      }
    }
  };
  
  const getRiskBadgeClass = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return '';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Strategy Comparison</CardTitle>
        <CardDescription>
          Compare different yield strategies across metrics to find the best option for your goals
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="space-y-2 md:w-1/3">
            <Label>Time Period</Label>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger>
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="365d">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2 md:w-2/3">
            <Label>Risk Filter</Label>
            <div className="flex gap-2 flex-wrap">
              <Button 
                variant={riskLevel.includes('low') ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  if (riskLevel.includes('low')) {
                    setRiskLevel(riskLevel.filter(r => r !== 'low'));
                  } else {
                    setRiskLevel([...riskLevel, 'low']);
                  }
                }}
                className={riskLevel.includes('low') ? "bg-green-600 hover:bg-green-700" : ""}
              >
                Low Risk
              </Button>
              <Button 
                variant={riskLevel.includes('medium') ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  if (riskLevel.includes('medium')) {
                    setRiskLevel(riskLevel.filter(r => r !== 'medium'));
                  } else {
                    setRiskLevel([...riskLevel, 'medium']);
                  }
                }}
                className={riskLevel.includes('medium') ? "bg-yellow-600 hover:bg-yellow-700" : ""}
              >
                Medium Risk
              </Button>
              <Button 
                variant={riskLevel.includes('high') ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  if (riskLevel.includes('high')) {
                    setRiskLevel(riskLevel.filter(r => r !== 'high'));
                  } else {
                    setRiskLevel([...riskLevel, 'high']);
                  }
                }}
                className={riskLevel.includes('high') ? "bg-red-600 hover:bg-red-700" : ""}
              >
                High Risk
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {filteredStrategies.map(strategy => (
            <Card key={strategy.id} className={`overflow-hidden ${selectedStrategies.includes(strategy.id) ? 'border-2 border-primary' : ''}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{strategy.name}</CardTitle>
                  <Badge variant="outline" className={`${getRiskBadgeClass(strategy.risk)} capitalize`}>
                    {strategy.risk} risk
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <p className="text-sm text-muted-foreground mb-4">{strategy.description}</p>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">APY</span>
                    <span className="text-sm font-bold text-green-600">{strategy.apy}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Protocols</span>
                    <span className="text-sm">{strategy.protocols.slice(0, 2).join(', ')}{strategy.protocols.length > 2 ? '...' : ''}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Lockup</span>
                    <span className="text-sm">{strategy.lockupPeriod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">IL Risk</span>
                    <span className="text-sm">{strategy.impermanentLossRisk ? 'Yes' : 'No'}</span>
                  </div>
                </div>
                <Button 
                  variant={selectedStrategies.includes(strategy.id) ? "default" : "outline"} 
                  className="w-full mt-4"
                  onClick={() => toggleStrategy(strategy.id)}
                >
                  {selectedStrategies.includes(strategy.id) ? 'Selected for Comparison' : 'Add to Comparison'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {selectedStrategies.length > 1 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Detailed Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-3 text-left text-sm font-medium text-muted-foreground">Metric</th>
                    {strategiesToCompare.map(strategy => (
                      <th key={strategy.id} className="p-3 text-left text-sm font-medium">
                        {strategy.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 text-sm font-medium">APY</td>
                    {strategiesToCompare.map(strategy => (
                      <td key={strategy.id} className="p-3 text-sm font-bold text-green-600">
                        {strategy.apy}%
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-sm font-medium">Risk Level</td>
                    {strategiesToCompare.map(strategy => (
                      <td key={strategy.id} className="p-3">
                        <Badge variant="outline" className={`${getRiskBadgeClass(strategy.risk)} capitalize`}>
                          {strategy.risk}
                        </Badge>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-sm font-medium">Chains</td>
                    {strategiesToCompare.map(strategy => (
                      <td key={strategy.id} className="p-3 text-sm">
                        {strategy.chains.join(', ')}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-sm font-medium">Protocols</td>
                    {strategiesToCompare.map(strategy => (
                      <td key={strategy.id} className="p-3 text-sm">
                        {strategy.protocols.join(', ')}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-sm font-medium">Lockup Period</td>
                    {strategiesToCompare.map(strategy => (
                      <td key={strategy.id} className="p-3 text-sm">
                        {strategy.lockupPeriod}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-sm font-medium">Impermanent Loss Risk</td>
                    {strategiesToCompare.map(strategy => (
                      <td key={strategy.id} className="p-3 text-sm">
                        {strategy.impermanentLossRisk ? 'Yes' : 'No'}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 text-sm font-medium">Liquidity Depth</td>
                    {strategiesToCompare.map(strategy => (
                      <td key={strategy.id} className="p-3 text-sm capitalize">
                        {strategy.liquidityDepth}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-sm font-medium">Audited</td>
                    {strategiesToCompare.map(strategy => (
                      <td key={strategy.id} className="p-3 text-sm">
                        {strategy.audited ? 'Yes' : 'No'}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
