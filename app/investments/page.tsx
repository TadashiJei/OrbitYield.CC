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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  CircleDollarSign, 
  Wallet, 
  TrendingUp,
  ArrowUpRight,
  Clock,
  Filter,
  ChevronDown,
  Search,
  BarChart,
  ArrowLeft
} from 'lucide-react';
import MetaMaskConnector from '@/components/wallet/MetaMaskConnector';
import Link from 'next/link';
import { formatDistanceToNow, format } from 'date-fns';
import { ethers } from 'ethers';
import { claimRewards, withdrawFromInvestment } from '@/lib/blockchain/yield-farming';

// Investment status badge color mapping
const statusColorMap: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  active: 'bg-green-100 text-green-800',
  withdrawn: 'bg-gray-100 text-gray-800',
  completed: 'bg-blue-100 text-blue-800',
  failed: 'bg-red-100 text-red-800',
};

export default function InvestmentsPage() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [investments, setInvestments] = useState<any[]>([]);
  const [filteredInvestments, setFilteredInvestments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [claimLoading, setClaimLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeWithdrawalId, setActiveWithdrawalId] = useState<string | null>(null);
  const [activeClaimId, setActiveClaimId] = useState<string | null>(null);
  const [expandedInvestmentId, setExpandedInvestmentId] = useState<string | null>(null);
  
  // Stats
  const [stats, setStats] = useState({
    totalInvested: '0',
    activeInvestments: 0,
    totalEarned: '0',
    averageAPY: 0,
    pendingRewards: '0'
  });

  // Load investments when wallet is connected
  useEffect(() => {
    if (walletAddress) {
      fetchInvestments();
    } else {
      // Reset state when wallet is disconnected
      setInvestments([]);
      setFilteredInvestments([]);
      setStats({
        totalInvested: '0',
        activeInvestments: 0,
        totalEarned: '0',
        averageAPY: 0,
        pendingRewards: '0'
      });
      setLoading(false);
    }
  }, [walletAddress]);

  // Apply filters whenever tab changes or search query updates
  useEffect(() => {
    if (!loading) {
      applyFilters();
    }
  }, [activeTab, searchQuery, investments]);

  // Fetch investments
  const fetchInvestments = async () => {
    if (!walletAddress) return;
    
    setLoading(true);
    
    try {
      // Fetch user investments
      const response = await fetch(`/api/investments?walletAddress=${walletAddress}`);
      const data = await response.json();
      
      if (data.success) {
        setInvestments(data.data);
        setFilteredInvestments(data.data);
        
        // Calculate dashboard stats
        const activeInvs = data.data.filter((inv: any) => inv.status === 'active');
        const totalInvested = activeInvs.reduce((sum: number, inv: any) => sum + parseFloat(inv.amount), 0);
        const totalEarned = data.data.reduce((sum: number, inv: any) => {
          return sum + (parseFloat(inv.totalRewardsClaimed || '0'));
        }, 0);
        const pendingRewards = activeInvs.reduce((sum: number, inv: any) => {
          return sum + (parseFloat(inv.pendingRewards || '0'));
        }, 0);
        const totalAPY = activeInvs.reduce((sum: number, inv: any) => sum + (inv.currentAPY || inv.entryAPY), 0);
        const averageAPY = activeInvs.length > 0 ? totalAPY / activeInvs.length : 0;
        
        setStats({
          totalInvested: totalInvested.toFixed(4),
          activeInvestments: activeInvs.length,
          totalEarned: totalEarned.toFixed(4),
          averageAPY,
          pendingRewards: pendingRewards.toFixed(4)
        });
      }
    } catch (error) {
      console.error('Error fetching investments:', error);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters based on active tab and search query
  const applyFilters = () => {
    let filtered = [...investments];
    
    // Apply tab filter
    if (activeTab === 'active') {
      filtered = filtered.filter(inv => inv.status === 'active');
    } else if (activeTab === 'pending') {
      filtered = filtered.filter(inv => inv.status === 'pending');
    } else if (activeTab === 'withdrawn') {
      filtered = filtered.filter(inv => inv.status === 'withdrawn' || inv.status === 'completed');
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(inv => 
        (inv.opportunityName && inv.opportunityName.toLowerCase().includes(query)) ||
        (inv.protocol && inv.protocol.toLowerCase().includes(query)) ||
        (inv.asset && inv.asset.toLowerCase().includes(query)) ||
        (inv.chain && inv.chain.toLowerCase().includes(query))
      );
    }
    
    setFilteredInvestments(filtered);
  };

  // Handle wallet connection
  const handleConnect = (account: string) => {
    setWalletAddress(account);
  };

  // Handle wallet disconnection
  const handleDisconnect = () => {
    setWalletAddress(null);
  };

  // Handle withdrawal
  const handleWithdraw = async (investmentId: string) => {
    if (!walletAddress || !window.ethereum) return;
    
    try {
      setWithdrawLoading(true);
      setActiveWithdrawalId(investmentId);
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      
      // Call withdraw function
      const result = await withdrawFromInvestment(
        investmentId,
        'all', // Withdraw all funds
        walletAddress,
        signer
      );
      
      if (result.success) {
        // Refetch data after successful withdrawal
        setTimeout(fetchInvestments, 2000);
      }
    } catch (err) {
      console.error('Withdrawal error:', err);
    } finally {
      setWithdrawLoading(false);
      setActiveWithdrawalId(null);
    }
  };

  // Handle claiming rewards
  const handleClaimRewards = async (investmentId: string) => {
    if (!walletAddress || !window.ethereum) return;
    
    try {
      setClaimLoading(true);
      setActiveClaimId(investmentId);
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      
      // Call claim rewards function
      const result = await claimRewards(
        investmentId,
        walletAddress,
        signer
      );
      
      if (result.success) {
        // Refetch data after successful claim
        setTimeout(fetchInvestments, 2000);
      }
    } catch (err) {
      console.error('Claim rewards error:', err);
    } finally {
      setClaimLoading(false);
      setActiveClaimId(null);
    }
  };

  // Toggle expanded view for investment details
  const toggleExpandedInvestment = (id: string) => {
    if (expandedInvestmentId === id) {
      setExpandedInvestmentId(null);
    } else {
      setExpandedInvestmentId(id);
    }
  };

  // Get badge color for investment status
  const getStatusBadgeClass = (status: string) => {
    return statusColorMap[status] || 'bg-gray-100 text-gray-800';
  };

  // Format date in a readable format
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMM d, yyyy');
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">My Investments</h1>
          </div>
          <p className="text-muted-foreground mt-2">
            Track and manage your yield farming investments
          </p>
        </div>
        
        <MetaMaskConnector
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
          buttonSize="default"
          buttonText="Connect Wallet"
        />
      </div>
      
      {!walletAddress ? (
        <Card className="mb-8">
          <CardContent className="flex flex-col items-center py-12">
            <Wallet className="h-16 w-16 text-muted-foreground opacity-60 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
            <p className="text-center text-muted-foreground max-w-md mb-6">
              Connect your wallet to view your investments, track your earnings, and manage your yield farming positions.
            </p>
            <MetaMaskConnector
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
              buttonSize="lg"
              buttonText="Connect with MetaMask"
            />
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <CircleDollarSign className="mr-2 h-4 w-4" />
                  Total Invested
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? <Skeleton className="h-8 w-24" /> : stats.totalInvested}
                </div>
                <p className="text-sm text-muted-foreground">
                  Across {loading ? '...' : stats.activeInvestments} active investments
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Average APY
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? <Skeleton className="h-8 w-24" /> : `${stats.averageAPY.toFixed(2)}%`}
                </div>
                <p className="text-sm text-muted-foreground">
                  Weighted average yield
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <BarChart className="mr-2 h-4 w-4" />
                  Total Earned
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {loading ? <Skeleton className="h-8 w-24" /> : stats.totalEarned}
                </div>
                <p className="text-sm text-muted-foreground">
                  Total rewards claimed
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  Pending Rewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {loading ? <Skeleton className="h-8 w-24" /> : stats.pendingRewards}
                </div>
                <p className="text-sm text-muted-foreground">
                  Available to claim
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  Next Reward
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-medium">
                  {loading ? <Skeleton className="h-8 w-24" /> : "In ~12 hours"}
                </div>
                <p className="text-sm text-muted-foreground">
                  Average reward time
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <CardTitle>Investment Positions</CardTitle>
                  <CardDescription>
                    Manage your yield farming positions across multiple chains
                  </CardDescription>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input 
                      type="text" 
                      placeholder="Search investments..."
                      className="pl-8 h-9 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 px-3 py-2 w-[200px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={fetchInvestments}
                  >
                    Refresh
                  </Button>
                </div>
              </div>
              
              <Tabs className="mt-2" value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">All Investments</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="withdrawn">Withdrawn</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map(i => (
                    <Skeleton key={i} className="h-24 w-full" />
                  ))}
                </div>
              ) : filteredInvestments.length > 0 ? (
                <div>
                  <div className="text-sm text-muted-foreground mb-4">
                    Showing {filteredInvestments.length} of {investments.length} investments
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Opportunity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-right">Current Value</TableHead>
                        <TableHead className="text-right">APY</TableHead>
                        <TableHead className="text-right">Rewards</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInvestments.map((investment) => (
                        <React.Fragment key={investment._id}>
                          <TableRow 
                            className={expandedInvestmentId === investment._id ? 'bg-accent/50' : ''}
                            onClick={() => toggleExpandedInvestment(investment._id)}
                          >
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                <ChevronDown className={`h-4 w-4 mr-2 transition-transform ${
                                  expandedInvestmentId === investment._id ? 'transform rotate-180' : ''
                                }`} />
                                <div>
                                  <div>{investment.opportunityName || 'Unknown Opportunity'}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {investment.protocol} on {investment.chain}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusBadgeClass(investment.status)}>
                                {investment.status.charAt(0).toUpperCase() + investment.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              {investment.amount} {investment.tokenSymbol}
                            </TableCell>
                            <TableCell className="text-right">
                              {investment.currentValue} {investment.tokenSymbol}
                            </TableCell>
                            <TableCell className="text-right text-green-600">
                              {(investment.currentAPY || investment.entryAPY).toFixed(2)}%
                            </TableCell>
                            <TableCell className="text-right">
                              {parseFloat(investment.pendingRewards || '0').toFixed(4)} {investment.tokenSymbol}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                {investment.status === 'active' && (
                                  <>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleClaimRewards(investment._id);
                                      }}
                                      disabled={
                                        claimLoading && activeClaimId === investment._id || 
                                        parseFloat(investment.pendingRewards || '0') <= 0
                                      }
                                    >
                                      {claimLoading && activeClaimId === investment._id ? 'Claiming...' : 'Claim'}
                                    </Button>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleWithdraw(investment._id);
                                      }}
                                      disabled={withdrawLoading && activeWithdrawalId === investment._id}
                                    >
                                      {withdrawLoading && activeWithdrawalId === investment._id ? 'Withdrawing...' : 'Withdraw'}
                                    </Button>
                                  </>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                          
                          {/* Expanded details row */}
                          {expandedInvestmentId === investment._id && (
                            <TableRow className="bg-accent/50">
                              <TableCell colSpan={7} className="py-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
                                  <div>
                                    <h4 className="text-sm font-medium mb-2">Investment Details</h4>
                                    <dl className="grid grid-cols-2 gap-1 text-sm">
                                      <dt className="text-muted-foreground">Invested On:</dt>
                                      <dd>{formatDate(investment.startDate || investment.createdAt)}</dd>
                                      
                                      <dt className="text-muted-foreground">Investment ID:</dt>
                                      <dd className="truncate">{investment._id}</dd>
                                      
                                      <dt className="text-muted-foreground">Strategy:</dt>
                                      <dd>{investment.strategyType || 'Standard Staking'}</dd>
                                      
                                      <dt className="text-muted-foreground">Auto-Compound:</dt>
                                      <dd>{investment.autoCompound ? 'Yes' : 'No'}</dd>
                                    </dl>
                                  </div>
                                  
                                  <div>
                                    <h4 className="text-sm font-medium mb-2">Earnings & Performance</h4>
                                    <dl className="grid grid-cols-2 gap-1 text-sm">
                                      <dt className="text-muted-foreground">Entry APY:</dt>
                                      <dd>{investment.entryAPY?.toFixed(2)}%</dd>
                                      
                                      <dt className="text-muted-foreground">Current APY:</dt>
                                      <dd>{(investment.currentAPY || investment.entryAPY)?.toFixed(2)}%</dd>
                                      
                                      <dt className="text-muted-foreground">Total Claimed:</dt>
                                      <dd>{investment.totalRewardsClaimed || '0'} {investment.tokenSymbol}</dd>
                                      
                                      <dt className="text-muted-foreground">Pending Rewards:</dt>
                                      <dd>{investment.pendingRewards || '0'} {investment.tokenSymbol}</dd>
                                    </dl>
                                  </div>
                                  
                                  <div>
                                    <h4 className="text-sm font-medium mb-2">Transaction History</h4>
                                    <dl className="grid grid-cols-2 gap-1 text-sm mb-3">
                                      <dt className="text-muted-foreground">Deposit TX:</dt>
                                      <dd className="truncate">
                                        {investment.depositTxHash ? (
                                          <a 
                                            href={`https://${investment.chain || 'polkadot'}.subscan.io/tx/${investment.depositTxHash}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                            onClick={(e) => e.stopPropagation()}
                                          >
                                            {investment.depositTxHash.substring(0, 10)}...
                                          </a>
                                        ) : 'N/A'}
                                      </dd>
                                      
                                      {investment.withdrawTxHash && (
                                        <>
                                          <dt className="text-muted-foreground">Withdraw TX:</dt>
                                          <dd className="truncate">
                                            <a 
                                              href={`https://${investment.chain || 'polkadot'}.subscan.io/tx/${investment.withdrawTxHash}`}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-blue-600 hover:underline"
                                              onClick={(e) => e.stopPropagation()}
                                            >
                                              {investment.withdrawTxHash.substring(0, 10)}...
                                            </a>
                                          </dd>
                                        </>
                                      )}
                                    </dl>
                                    
                                    {investment.status === 'active' && (
                                      <div className="flex space-x-2">
                                        <Button 
                                          size="sm" 
                                          variant="default"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            window.open(`/opportunities?chain=${investment.chain}`, '_blank');
                                          }}
                                        >
                                          View Similar
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </React.Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12 bg-secondary/20 rounded-lg">
                  <CircleDollarSign className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Investments Found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    {searchQuery 
                      ? `We couldn't find any investments matching "${searchQuery}"`
                      : activeTab !== 'all' 
                        ? `You don't have any ${activeTab} investments`
                        : `You haven't made any investments yet. Start earning yield today!`
                    }
                  </p>
                  <Button asChild>
                    <Link href="/opportunities">
                      Browse Opportunities
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
