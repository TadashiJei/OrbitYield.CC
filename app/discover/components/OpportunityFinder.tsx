'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useYieldContracts } from '@/hooks/useYieldContracts';
import { toast } from '@/components/ui/use-toast';
import { AlertCircle, ArrowUpRight, TrendingUp, Shield, Clock, Filter } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';

interface YieldOpportunity {
  id: string;
  name: string;
  protocolName: string;
  chain: string;
  asset: string;
  assetSymbol: string;
  tvl: number;
  apy: number;
  risk: number;
  type: 'lending' | 'farming' | 'staking' | 'lp';
  strategyAddress: string;
  isNew?: boolean;
  isHot?: boolean;
  description: string;
  url?: string;
  isAudited: boolean;
  impermanentLossRisk?: 'low' | 'medium' | 'high';
  lockupPeriod?: number; // in days, 0 means no lockup
  tags: string[];
}

export function OpportunityFinder() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [opportunities, setOpportunities] = useState<YieldOpportunity[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<YieldOpportunity[]>([]);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChain, setSelectedChain] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedAsset, setSelectedAsset] = useState<string>('all');
  const [minApy, setMinApy] = useState(0);
  const [maxRisk, setMaxRisk] = useState(10);
  const [onlyAudited, setOnlyAudited] = useState(false);
  const [sortBy, setSortBy] = useState<'apy' | 'risk' | 'tvl'>('apy');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Unique options for filters
  const [chains, setChains] = useState<string[]>([]);
  const [assets, setAssets] = useState<string[]>([]);
  const [strategyTypes, setStrategyTypes] = useState<string[]>([]);
  
  // Connect to yield contracts
  const { isConnected, connectWallet } = useYieldContracts({
    onError: (error) => {
      toast({
        title: "Contract Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Load opportunities
  useEffect(() => {
    fetchOpportunities();
  }, []);
  
  // Apply filters when filter values change
  useEffect(() => {
    applyFilters();
  }, [
    opportunities, 
    searchQuery, 
    selectedChain, 
    selectedType, 
    selectedAsset, 
    minApy, 
    maxRisk, 
    onlyAudited, 
    sortBy,
    sortDirection
  ]);
  
  // Fetch yield opportunities
  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      
      // In a real implementation, we would fetch from API or smart contracts
      // For demo, we'll use mock data
      
      // Try to fetch from API first
      try {
        const response = await fetch('/api/yield-opportunities');
        const data = await response.json();
        
        if (data.success && data.opportunities.length > 0) {
          setOpportunities(data.opportunities);
        } else {
          // Fallback to mock data
          setOpportunities(getMockOpportunities());
        }
      } catch (error) {
        // API might not be implemented yet, use mock data
        setOpportunities(getMockOpportunities());
      }
      
      // Extract unique values for filters
      const mockData = getMockOpportunities();
      setChains([...new Set(mockData.map(opp => opp.chain))]);
      setAssets([...new Set(mockData.map(opp => opp.assetSymbol))]);
      setStrategyTypes([...new Set(mockData.map(opp => opp.type))]);
      
    } catch (error) {
      console.error('Error fetching yield opportunities:', error);
      toast({
        title: "Error Loading Opportunities",
        description: "Failed to load yield opportunities data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Apply all filters to opportunities
  const applyFilters = () => {
    if (!opportunities.length) return;
    
    let filtered = [...opportunities];
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(opp => 
        opp.name.toLowerCase().includes(query) || 
        opp.protocolName.toLowerCase().includes(query) ||
        opp.description.toLowerCase().includes(query) ||
        opp.assetSymbol.toLowerCase().includes(query)
      );
    }
    
    // Apply chain filter
    if (selectedChain !== 'all') {
      filtered = filtered.filter(opp => opp.chain === selectedChain);
    }
    
    // Apply type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(opp => opp.type === selectedType);
    }
    
    // Apply asset filter
    if (selectedAsset !== 'all') {
      filtered = filtered.filter(opp => opp.assetSymbol === selectedAsset);
    }
    
    // Apply APY filter
    if (minApy > 0) {
      filtered = filtered.filter(opp => opp.apy >= minApy);
    }
    
    // Apply risk filter
    if (maxRisk < 10) {
      filtered = filtered.filter(opp => opp.risk <= maxRisk);
    }
    
    // Apply audited filter
    if (onlyAudited) {
      filtered = filtered.filter(opp => opp.isAudited);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'apy') {
        comparison = a.apy - b.apy;
      } else if (sortBy === 'risk') {
        comparison = a.risk - b.risk;
      } else if (sortBy === 'tvl') {
        comparison = a.tvl - b.tvl;
      }
      
      return sortDirection === 'desc' ? -comparison : comparison;
    });
    
    setFilteredOpportunities(filtered);
  };
  
  // Invest in strategy
  const handleInvest = (opportunity: YieldOpportunity) => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to invest in this strategy",
        action: (
          <Button variant="outline" onClick={connectWallet}>
            Connect Wallet
          </Button>
        ),
      });
      return;
    }
    
    // Navigate to the investment page with the strategy details
    router.push(`/invest?strategy=${opportunity.strategyAddress}&asset=${opportunity.asset}`);
  };
  
  // Mock data for development
  const getMockOpportunities = (): YieldOpportunity[] => {
    return [
      {
        id: '1',
        name: 'Aave USDC Lending',
        protocolName: 'Aave',
        chain: 'Ethereum',
        asset: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        assetSymbol: 'USDC',
        tvl: 120000000,
        apy: 3.8,
        risk: 2,
        type: 'lending',
        strategyAddress: '0xaave1234567890123456789012345678901234567',
        description: 'Earn yield by lending USDC on Aave V3, one of the largest lending protocols in DeFi.',
        isAudited: true,
        lockupPeriod: 0,
        tags: ['stablecoin', 'blue-chip']
      },
      {
        id: '2',
        name: 'Compound ETH Lending',
        protocolName: 'Compound',
        chain: 'Ethereum',
        asset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        assetSymbol: 'ETH',
        tvl: 85000000,
        apy: 2.1,
        risk: 3,
        type: 'lending',
        strategyAddress: '0xcomp1234567890123456789012345678901234567',
        description: 'Lend ETH on Compound to earn interest and COMP rewards',
        isAudited: true,
        lockupPeriod: 0,
        tags: ['ethereum', 'blue-chip']
      },
      {
        id: '3',
        name: 'Uniswap ETH-USDC LP',
        protocolName: 'Uniswap',
        chain: 'Ethereum',
        asset: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc',
        assetSymbol: 'ETH-USDC',
        tvl: 210000000,
        apy: 12.5,
        risk: 6,
        type: 'lp',
        strategyAddress: '0xuni12345678901234567890123456789012345678',
        description: 'Provide liquidity to the ETH-USDC pair on Uniswap V3 and earn trading fees',
        isAudited: true,
        impermanentLossRisk: 'medium',
        lockupPeriod: 0,
        isHot: true,
        tags: ['dex', 'liquidity']
      },
      {
        id: '4',
        name: 'Acala DOT Staking',
        protocolName: 'Acala',
        chain: 'Polkadot',
        asset: '0x0000000000000000000000000000000000000001',
        assetSymbol: 'DOT',
        tvl: 45000000,
        apy: 10.2,
        risk: 4,
        type: 'staking',
        strategyAddress: '0xacala123456789012345678901234567890123456',
        description: 'Stake DOT through Acala to earn higher yields than native staking',
        isAudited: true,
        lockupPeriod: 28,
        tags: ['polkadot', 'staking']
      },
      {
        id: '5',
        name: 'Astar ASTR-USDT LP Farm',
        protocolName: 'ArthSwap',
        chain: 'Astar',
        asset: '0xastr1234567890123456789012345678901234567',
        assetSymbol: 'ASTR-USDT',
        tvl: 12000000,
        apy: 38.5,
        risk: 8,
        type: 'farming',
        strategyAddress: '0xarthswap1234567890123456789012345678901234',
        description: 'Provide liquidity to ASTR-USDT pair on ArthSwap and farm rewards',
        isAudited: false,
        impermanentLossRisk: 'high',
        lockupPeriod: 7,
        isNew: true,
        tags: ['astar', 'high-risk', 'high-yield']
      },
      {
        id: '6',
        name: 'Moonbeam GLMR Staking',
        protocolName: 'Moonbeam',
        chain: 'Moonbeam',
        asset: '0x0000000000000000000000000000000000000002',
        assetSymbol: 'GLMR',
        tvl: 28000000,
        apy: 15.8,
        risk: 5,
        type: 'staking',
        strategyAddress: '0xmoonbeam123456789012345678901234567890123',
        description: 'Stake GLMR tokens to earn staking rewards on Moonbeam',
        isAudited: true,
        lockupPeriod: 14,
        tags: ['moonbeam', 'staking']
      },
      {
        id: '7',
        name: 'DAI/USDC/USDT Curve Pool',
        protocolName: 'Curve',
        chain: 'Ethereum',
        asset: '0xcurve123456789012345678901234567890123456',
        assetSymbol: '3pool',
        tvl: 320000000,
        apy: 4.2,
        risk: 3,
        type: 'lp',
        strategyAddress: '0xcurve223456789012345678901234567890123456',
        description: 'Provide liquidity to Curve\'s 3pool (DAI/USDC/USDT) and earn CRV rewards',
        isAudited: true,
        impermanentLossRisk: 'low',
        lockupPeriod: 0,
        tags: ['stablecoin', 'curve']
      },
      {
        id: '8',
        name: 'Moonriver MOVR-USDC LP',
        protocolName: 'SolarBeam',
        chain: 'Moonriver',
        asset: '0xmovr1234567890123456789012345678901234567',
        assetSymbol: 'MOVR-USDC',
        tvl: 8500000,
        apy: 42.6,
        risk: 7,
        type: 'farming',
        strategyAddress: '0xsolarbeam123456789012345678901234567890123',
        description: 'Farm SOLAR tokens by providing liquidity to the MOVR-USDC pair on SolarBeam',
        isAudited: false,
        impermanentLossRisk: 'high',
        lockupPeriod: 3,
        isHot: true,
        tags: ['moonriver', 'high-yield']
      },
      {
        id: '9',
        name: 'Osmosis ATOM-OSMO LP',
        protocolName: 'Osmosis',
        chain: 'Cosmos',
        asset: '0xosmo1234567890123456789012345678901234567',
        assetSymbol: 'ATOM-OSMO',
        tvl: 34000000,
        apy: 28.7,
        risk: 6,
        type: 'farming',
        strategyAddress: '0xosmosis12345678901234567890123456789012345',
        description: 'Provide liquidity to ATOM-OSMO pool on Osmosis DEX and earn rewards',
        isAudited: true,
        impermanentLossRisk: 'medium',
        lockupPeriod: 14,
        tags: ['cosmos', 'ibc']
      },
      {
        id: '10',
        name: 'Aave USDT Lending',
        protocolName: 'Aave',
        chain: 'Polygon',
        asset: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
        assetSymbol: 'USDT',
        tvl: 78000000,
        apy: 4.1,
        risk: 3,
        type: 'lending',
        strategyAddress: '0xaavepoly1234567890123456789012345678901234',
        description: 'Earn yield by lending USDT on Aave V3 Polygon, with lower gas fees than Ethereum',
        isAudited: true,
        lockupPeriod: 0,
        tags: ['stablecoin', 'polygon', 'layer2']
      }
    ];
  };
  
  // Render a single opportunity card
  const renderOpportunityCard = (opportunity: YieldOpportunity) => {
    return (
      <Card key={opportunity.id} className="flex flex-col h-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{opportunity.name}</CardTitle>
            <div className="flex space-x-1">
              {opportunity.isNew && (
                <Badge className="bg-blue-100 text-blue-800">New</Badge>
              )}
              {opportunity.isHot && (
                <Badge className="bg-red-100 text-red-800">Hot</Badge>
              )}
            </div>
          </div>
          <CardDescription>{opportunity.protocolName} on {opportunity.chain}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">APY</p>
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                <p className="text-2xl font-bold text-green-600">{opportunity.apy}%</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Risk Level</p>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-orange-500" />
                <Progress value={(opportunity.risk / 10) * 100} className="h-2 w-20" />
                <span className="text-sm font-medium">{opportunity.risk}/10</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            <Badge variant="outline" className="text-xs">
              {opportunity.type}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {opportunity.assetSymbol}
            </Badge>
            {opportunity.isAudited && (
              <Badge variant="outline" className="bg-green-50 text-green-700 text-xs border-green-200">
                Audited
              </Badge>
            )}
            {opportunity.lockupPeriod ? (
              <Badge variant="outline" className="text-xs flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {opportunity.lockupPeriod}d lock
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs border-blue-200">
                No Lockup
              </Badge>
            )}
          </div>
          
          <p className="text-sm text-gray-600 mb-4">{opportunity.description}</p>
          
          <div className="text-sm text-gray-500">
            <div className="flex justify-between mb-1">
              <span>TVL:</span>
              <span className="font-medium">${(opportunity.tvl / 1000000).toFixed(1)}M</span>
            </div>
            {opportunity.impermanentLossRisk && (
              <div className="flex justify-between">
                <span>IL Risk:</span>
                <span className={`font-medium ${
                  opportunity.impermanentLossRisk === 'low' ? 'text-green-600' : 
                  opportunity.impermanentLossRisk === 'medium' ? 'text-yellow-600' : 
                  'text-red-600'
                }`}>
                  {opportunity.impermanentLossRisk.charAt(0).toUpperCase() + opportunity.impermanentLossRisk.slice(1)}
                </span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={() => handleInvest(opportunity)}
          >
            <ArrowUpRight className="h-4 w-4 mr-2" />
            Invest Now
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filter Opportunities
          </CardTitle>
          <CardDescription>
            Customize your yield search to find the perfect strategy for your portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                placeholder="Search by name, asset..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="chain">Blockchain</Label>
              <Select value={selectedChain} onValueChange={setSelectedChain}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Chain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Chains</SelectItem>
                  {chains.map(chain => (
                    <SelectItem key={chain} value={chain}>{chain}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Strategy Type</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="lending">Lending</SelectItem>
                  <SelectItem value="staking">Staking</SelectItem>
                  <SelectItem value="farming">Yield Farming</SelectItem>
                  <SelectItem value="lp">Liquidity Provision</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="asset">Asset</Label>
              <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Asset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Assets</SelectItem>
                  {assets.map(asset => (
                    <SelectItem key={asset} value={asset}>{asset}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label htmlFor="min-apy">Minimum APY: {minApy}%</Label>
              </div>
              <Slider
                id="min-apy"
                min={0}
                max={50}
                step={1}
                value={[minApy]}
                onValueChange={(value) => setMinApy(value[0])}
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label htmlFor="max-risk">Maximum Risk Level: {maxRisk}/10</Label>
              </div>
              <Slider
                id="max-risk"
                min={1}
                max={10}
                step={1}
                value={[maxRisk]}
                onValueChange={(value) => setMaxRisk(value[0])}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="audited"
                className="rounded border-gray-300 focus:ring-blue-500"
                checked={onlyAudited}
                onChange={(e) => setOnlyAudited(e.target.checked)}
              />
              <Label htmlFor="audited" className="cursor-pointer text-sm">
                Show only audited protocols
              </Label>
            </div>
            
            <div className="flex items-center space-x-3">
              <Label className="text-sm">Sort by:</Label>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apy">APY</SelectItem>
                  <SelectItem value="risk">Risk Level</SelectItem>
                  <SelectItem value="tvl">TVL</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc')}
              >
                {sortDirection === 'desc' ? '↓ Desc' : '↑ Asc'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Results Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Available Opportunities</h2>
          <p className="text-gray-500">
            {filteredOpportunities.length} opportunities found
          </p>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="flex flex-col h-80">
                <CardHeader>
                  <Skeleton className="h-6 w-2/3 mb-1" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : filteredOpportunities.length === 0 ? (
          <Card className="p-10 text-center">
            <AlertCircle className="h-10 w-10 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">No Matching Opportunities</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters to see more opportunities.
            </p>
            <Button onClick={() => {
              setSearchQuery('');
              setSelectedChain('all');
              setSelectedType('all');
              setSelectedAsset('all');
              setMinApy(0);
              setMaxRisk(10);
              setOnlyAudited(false);
            }}>
              Reset Filters
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map(renderOpportunityCard)}
          </div>
        )}
      </div>
    </div>
  );
}
