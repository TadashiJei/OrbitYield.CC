'use client';

import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OpportunityCard from '@/components/opportunities/OpportunityCard';
import InvestmentDialog from '@/components/investments/InvestmentDialog';
import MetaMaskConnector from '@/components/wallet/MetaMaskConnector';
import { 
  CircleDollarSign, 
  Search, 
  Wallet,
  SlidersHorizontal,
  ArrowUpDown,
  RefreshCw,
  Filter,
  BarChart
} from 'lucide-react';
import { getSupportedChains } from '@/lib/blockchain/chain-data';

export default function OpportunitiesPage() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [investmentDialogOpen, setInvestmentDialogOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChain, setSelectedChain] = useState<string>('');
  const [selectedAsset, setSelectedAsset] = useState<string>('');
  const [selectedProtocol, setSelectedProtocol] = useState<string>('');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string>('');
  const [minApy, setMinApy] = useState<number>(0);
  const [maxApy, setMaxApy] = useState<number>(100);
  const [sortBy, setSortBy] = useState<string>('apy:desc');
  
  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [limit, setLimit] = useState(12);
  
  // Get unique values for filter dropdowns
  const [chains, setChains] = useState<string[]>([]);
  const [assets, setAssets] = useState<string[]>([]);
  const [protocols, setProtocols] = useState<string[]>([]);
  const supportedChains = getSupportedChains();
  
  // Fetch opportunities
  useEffect(() => {
    fetchOpportunities();
  }, [page, sortBy, selectedChain]);

  // Apply filters whenever filter values change
  useEffect(() => {
    if (!loading) {
      applyFilters();
    }
  }, [searchQuery, selectedChain, selectedAsset, selectedProtocol, selectedRiskLevel, minApy, maxApy, opportunities]);

  // Fetch opportunities from API
  const fetchOpportunities = async () => {
    setLoading(true);
    
    try {
      // Build query parameters
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      
      // Add sort parameters
      const [sortField, sortOrder] = sortBy.split(':');
      params.append('sortBy', sortField);
      params.append('sortOrder', sortOrder);
      
      // Add chain filter if selected
      if (selectedChain) {
        params.append('chain', selectedChain);
      }
      
      // Fetch opportunities
      const response = await fetch(`/api/opportunities?${params.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        setOpportunities(data.data);
        setFilteredOpportunities(data.data);
        setTotalPages(data.pagination.pages);
        setTotalResults(data.pagination.total);
        
        // Extract unique values for filters
        extractFilterOptions(data.data);
      }
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    } finally {
      setLoading(false);
    }
  };

  // Extract unique values for filter options
  const extractFilterOptions = (data: any[]) => {
    const uniqueChains = [...new Set(data.map(item => item.chain))];
    const uniqueAssets = [...new Set(data.map(item => item.asset))];
    const uniqueProtocols = [...new Set(data.map(item => item.protocol))];
    
    setChains(uniqueChains);
    setAssets(uniqueAssets);
    setProtocols(uniqueProtocols);
  };

  // Apply client-side filters
  const applyFilters = () => {
    let filtered = [...opportunities];
    
    // Text search across multiple fields
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(opp => 
        opp.name.toLowerCase().includes(query) || 
        opp.protocol.toLowerCase().includes(query) || 
        opp.asset.toLowerCase().includes(query) || 
        opp.strategyType.toLowerCase().includes(query)
      );
    }
    
    // Apply dropdown filters
    if (selectedAsset) {
      filtered = filtered.filter(opp => opp.asset === selectedAsset);
    }
    
    if (selectedProtocol) {
      filtered = filtered.filter(opp => opp.protocol === selectedProtocol);
    }
    
    if (selectedRiskLevel) {
      filtered = filtered.filter(opp => opp.riskLevel === selectedRiskLevel);
    }
    
    // Apply APY range
    filtered = filtered.filter(opp => 
      opp.apy >= minApy && opp.apy <= maxApy
    );
    
    setFilteredOpportunities(filtered);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedChain('');
    setSelectedAsset('');
    setSelectedProtocol('');
    setSelectedRiskLevel('');
    setMinApy(0);
    setMaxApy(100);
    setSortBy('apy:desc');
    setPage(1);
    fetchOpportunities();
  };

  // Handle wallet connection
  const handleConnect = (account: string) => {
    setWalletAddress(account);
  };

  // Handle wallet disconnection
  const handleDisconnect = () => {
    setWalletAddress(null);
  };

  // Handle investment dialog
  const handleInvest = (opportunityId: string) => {
    const opportunity = opportunities.find(opp => opp._id === opportunityId);
    if (opportunity) {
      setSelectedOpportunity(opportunity);
      setInvestmentDialogOpen(true);
    }
  };

  // Handle investment success
  const handleInvestmentSuccess = (txHash: string, amount: string) => {
    // Could implement additional logic on successful investment
    // For now, just close the dialog
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    if (value === 'all') {
      setFilteredOpportunities(opportunities);
    } else if (value === 'staking') {
      setFilteredOpportunities(opportunities.filter(opp => 
        opp.strategyType.toLowerCase().includes('staking')
      ));
    } else if (value === 'lending') {
      setFilteredOpportunities(opportunities.filter(opp => 
        opp.strategyType.toLowerCase().includes('lending')
      ));
    } else if (value === 'liquidity') {
      setFilteredOpportunities(opportunities.filter(opp => 
        opp.strategyType.toLowerCase().includes('liquidity')
      ));
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Yield Opportunities</h1>
          <p className="text-muted-foreground">
            Discover and invest in the best yield opportunities across the Polkadot ecosystem
          </p>
        </div>
        
        <MetaMaskConnector
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
          buttonSize="default"
          buttonText="Connect Wallet"
        />
      </div>
      
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search opportunities, protocols, assets..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort Options</SelectLabel>
                    <SelectItem value="apy:desc">Highest APY</SelectItem>
                    <SelectItem value="apy:asc">Lowest APY</SelectItem>
                    <SelectItem value="tvl:desc">Highest TVL</SelectItem>
                    <SelectItem value="createdAt:desc">Newest</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setFiltersOpen(!filtersOpen)}
              >
                <Filter className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={fetchOpportunities}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Expanded filters */}
          {filtersOpen && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Chain</label>
                <Select value={selectedChain} onValueChange={setSelectedChain}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Chains" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Chains</SelectItem>
                    {supportedChains.map(chain => (
                      <SelectItem key={chain.id} value={chain.id}>
                        {chain.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1.5 block">Asset</label>
                <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Assets" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Assets</SelectItem>
                    {assets.map(asset => (
                      <SelectItem key={asset} value={asset}>{asset}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1.5 block">Protocol</label>
                <Select value={selectedProtocol} onValueChange={setSelectedProtocol}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Protocols" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Protocols</SelectItem>
                    {protocols.map(protocol => (
                      <SelectItem key={protocol} value={protocol}>{protocol}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1.5 block">Risk Level</label>
                <Select value={selectedRiskLevel} onValueChange={setSelectedRiskLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Risk Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Risk Levels</SelectItem>
                    <SelectItem value="low">Low Risk</SelectItem>
                    <SelectItem value="medium">Medium Risk</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="md:col-span-2 lg:col-span-4">
                <label className="text-sm font-medium mb-1.5 block">
                  APY Range: {minApy}% - {maxApy}%
                </label>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[minApy, maxApy]}
                  onValueChange={([min, max]) => {
                    setMinApy(min);
                    setMaxApy(max);
                  }}
                  className="my-4"
                />
              </div>
              
              <div className="md:col-span-2 lg:col-span-4 flex justify-end">
                <Button variant="outline" onClick={resetFilters} className="mr-2">
                  Reset Filters
                </Button>
                <Button onClick={() => setFiltersOpen(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="mb-6">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Opportunities</TabsTrigger>
            <TabsTrigger value="staking">Staking</TabsTrigger>
            <TabsTrigger value="lending">Lending</TabsTrigger>
            <TabsTrigger value="liquidity">Liquidity Pools</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="text-sm text-muted-foreground mb-4">
          Showing {filteredOpportunities.length} of {totalResults} opportunities
        </div>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      ) : filteredOpportunities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map(opportunity => (
            <OpportunityCard
              key={opportunity._id}
              opportunity={opportunity}
              onInvest={handleInvest}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-secondary/20 rounded-lg">
          <CircleDollarSign className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
          <h3 className="text-lg font-medium mb-2">No Opportunities Found</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            We couldn&apos;t find any opportunities matching your search criteria. Try adjusting your filters or check back later.
          </p>
          <Button onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
      )}
      
      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                // Show page numbers around current page
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else {
                  if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }
                }
                
                return (
                  <Button
                    key={i}
                    variant={page === pageNum ? "default" : "outline"}
                    className="w-10"
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
      
      {/* Investment Dialog */}
      <InvestmentDialog
        open={investmentDialogOpen}
        onOpenChange={setInvestmentDialogOpen}
        opportunity={selectedOpportunity}
        onSuccess={handleInvestmentSuccess}
        walletAddress={walletAddress || undefined}
      />
    </div>
  );
}
