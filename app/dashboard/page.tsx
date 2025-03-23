'use client';

import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  BarChart3, 
  CircleDollarSign, 
  Wallet,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Settings
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import OpportunityCard from '@/components/opportunities/OpportunityCard';
import InvestmentsList from '@/components/investments/InvestmentsList';
import InvestmentDialog from '@/components/investments/InvestmentDialog';
import MetaMaskConnector from '@/components/wallet/MetaMaskConnector';
import { claimRewards, withdrawFromInvestment } from '@/lib/blockchain/yield-farming';
import { ethers } from 'ethers';
import Link from 'next/link';

export default function DashboardPage() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [investments, setInvestments] = useState<any[]>([]);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [investmentDialogOpen, setInvestmentDialogOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [claimLoading, setClaimLoading] = useState(false);
  const [activeWithdrawalId, setActiveWithdrawalId] = useState<string | null>(null);
  const [activeClaimId, setActiveClaimId] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalInvested: '0',
    activeInvestments: 0,
    totalEarned: '0',
    averageAPY: 0
  });

  // Fetch dashboard data when wallet is connected
  useEffect(() => {
    if (walletAddress) {
      fetchDashboardData();
    } else {
      // Reset state when wallet is disconnected
      setInvestments([]);
      setOpportunities([]);
      setTransactions([]);
      setStats({
        totalInvested: '0',
        activeInvestments: 0,
        totalEarned: '0',
        averageAPY: 0
      });
      setLoading(false);
    }
  }, [walletAddress]);

  // Fetch dashboard data (investments, opportunities, transactions)
  const fetchDashboardData = async () => {
    if (!walletAddress) return;
    
    setLoading(true);
    
    try {
      // Fetch user investments
      const investmentsResponse = await fetch(`/api/investments?walletAddress=${walletAddress}`);
      const investmentsData = await investmentsResponse.json();
      
      if (investmentsData.success) {
        setInvestments(investmentsData.data);
        
        // Calculate dashboard stats
        const activeInvs = investmentsData.data.filter((inv: any) => inv.status === 'active');
        const totalInvested = activeInvs.reduce((sum: number, inv: any) => sum + parseFloat(inv.amount), 0);
        const totalEarned = investmentsData.data.reduce((sum: number, inv: any) => {
          return sum + (parseFloat(inv.totalRewardsClaimed || '0'));
        }, 0);
        const totalAPY = activeInvs.reduce((sum: number, inv: any) => sum + inv.entryAPY, 0);
        const averageAPY = activeInvs.length > 0 ? totalAPY / activeInvs.length : 0;
        
        setStats({
          totalInvested: totalInvested.toFixed(4),
          activeInvestments: activeInvs.length,
          totalEarned: totalEarned.toFixed(4),
          averageAPY
        });
      }
      
      // Fetch top yield opportunities
      const opportunitiesResponse = await fetch('/api/opportunities?limit=4&sort=apy:desc');
      const opportunitiesData = await opportunitiesResponse.json();
      
      if (opportunitiesData.success) {
        setOpportunities(opportunitiesData.data);
      }
      
      // Fetch recent transactions
      const transactionsResponse = await fetch(`/api/transactions?walletAddress=${walletAddress}&limit=5`);
      const transactionsData = await transactionsResponse.json();
      
      if (transactionsData.success) {
        setTransactions(transactionsData.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Effect to initialize wallet connection status
  useEffect(() => {
    // Check if browser storage has any wallet connection state that's stale
    const checkAndClearStaleConnection = async () => {
      if (window.ethereum) {
        try {
          // Try to get accounts to see if we're actually connected
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          
          // If no accounts but we think we're connected, reset the state
          if ((!accounts || accounts.length === 0) && walletAddress) {
            console.log('Detected stale wallet connection, resetting state');
            setWalletAddress(null);
          }
        } catch (error) {
          console.error('Error checking wallet connection:', error);
          // Reset state to be safe
          setWalletAddress(null);
        }
      }
    };
    
    checkAndClearStaleConnection();
    
    // Set up event listener for account changes
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected
          setWalletAddress(null);
        } else if (accounts[0] !== walletAddress) {
          // Account switched
          setWalletAddress(accounts[0]);
        }
      };
      
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, [walletAddress]);

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
    // Refetch data after successful investment
    setTimeout(fetchDashboardData, 3000);
  };

  // Handle withdrawal from an investment
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
        fetchDashboardData();
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
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Claim rewards error:', err);
    } finally {
      setClaimLoading(false);
      setActiveClaimId(null);
    }
  };

  return (
    <>
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        {!walletAddress ? (
          <div className="flex items-center justify-center min-h-[80vh]">
            <Card className="w-full max-w-md shadow-lg border-2 border-gray-100">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-3xl font-bold">Connect Wallet</CardTitle>
                <CardDescription className="text-lg mt-2">
                  Connect your wallet to access your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center pt-4 pb-8 px-8">
                <MetaMaskConnector 
                  onConnect={handleConnect} 
                  onDisconnect={handleDisconnect}
                  className="w-full"
                  buttonVariant="default"
                  buttonSize="lg"
                />
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <TabsList>
                  <TabsTrigger value="overview" className="gap-2">
                    <BarChart3 className="h-4 w-4" />
                    <span className="hidden sm:inline">Overview</span>
                  </TabsTrigger>
                  <TabsTrigger value="investments" className="gap-2">
                    <CircleDollarSign className="h-4 w-4" />
                    <span className="hidden sm:inline">Investments</span>
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="overview" className="space-y-8">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Invested
                      </CardTitle>
                      <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      {loading ? (
                        <Skeleton className="h-8 w-full" />
                      ) : (
                        <div className="text-2xl font-bold">${stats.totalInvested}</div>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Across {stats.activeInvestments} active investments
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Earned
                      </CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      {loading ? (
                        <Skeleton className="h-8 w-full" />
                      ) : (
                        <div className="text-2xl font-bold">${stats.totalEarned}</div>
                      )}
                      <p className="text-xs text-muted-foreground">
                        From yield farming rewards
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Average APY
                      </CardTitle>
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      {loading ? (
                        <Skeleton className="h-8 w-full" />
                      ) : (
                        <div className="text-2xl font-bold">{stats.averageAPY.toFixed(2)}%</div>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Based on your active investments
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Wallet Balance
                      </CardTitle>
                      <Wallet className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      {loading ? (
                        <Skeleton className="h-8 w-full" />
                      ) : (
                        <div className="text-2xl font-bold">-</div>
                      )}
                      <p className="text-xs text-muted-foreground">
                        <Link href="/wallet-management" className="text-primary hover:underline">
                          Manage wallet
                        </Link>
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="md:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Top Yield Opportunities</CardTitle>
                        <CardDescription>
                          Explore the highest yielding opportunities
                        </CardDescription>
                      </div>
                      <Link href="/opportunities">
                        <Button variant="outline" size="sm" className="text-xs h-8">
                          View All
                          <ArrowUpRight className="ml-1 h-3 w-3" />
                        </Button>
                      </Link>
                    </CardHeader>
                    <CardContent>
                      {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[...Array(4)].map((_, i) => (
                            <Skeleton key={i} className="h-36 w-full" />
                          ))}
                        </div>
                      ) : opportunities.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {opportunities.map((opportunity) => (
                            <OpportunityCard
                              key={opportunity._id}
                              opportunity={opportunity}
                              onInvest={handleInvest}
                              compact
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-32 bg-gray-50 rounded-lg border border-dashed text-center p-4">
                          <p className="text-sm text-gray-500">No yield opportunities available</p>
                          <p className="text-xs text-gray-400 mt-1">Check back later for new opportunities</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Transactions</CardTitle>
                      <CardDescription>
                        Your latest activities
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {loading ? (
                        <div className="space-y-4">
                          {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="h-12 w-full" />
                          ))}
                        </div>
                      ) : transactions.length > 0 ? (
                        <div className="space-y-4">
                          {transactions.map((tx) => (
                            <div key={tx._id} className="flex items-start justify-between">
                              <div className="flex items-start space-x-3">
                                <div className={`rounded-full p-1.5 ${
                                  tx.type === 'investment' 
                                    ? 'bg-green-100 text-green-700' 
                                    : tx.type === 'withdrawal'
                                    ? 'bg-orange-100 text-orange-700'
                                    : 'bg-blue-100 text-blue-700'
                                }`}>
                                  {tx.type === 'investment' ? (
                                    <TrendingUp className="h-3.5 w-3.5" />
                                  ) : tx.type === 'withdrawal' ? (
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                  ) : (
                                    <CircleDollarSign className="h-3.5 w-3.5" />
                                  )}
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-sm font-medium line-clamp-1">
                                    {tx.type === 'investment'
                                      ? 'Investment'
                                      : tx.type === 'withdrawal'
                                      ? 'Withdrawal'
                                      : 'Reward Claim'}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {formatDistanceToNow(new Date(tx.timestamp), { addSuffix: true })}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium">
                                  {tx.type === 'withdrawal' ? '-' : '+'}{tx.amount} {tx.tokenSymbol}
                                </p>
                                <p className="text-xs text-gray-500 truncate max-w-[120px]">
                                  {tx.protocol}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-32 bg-gray-50 rounded-lg border border-dashed text-center p-4">
                          <p className="text-sm text-gray-500">No transactions yet</p>
                          <p className="text-xs text-gray-400 mt-1">Your activities will appear here</p>
                        </div>
                      )}
                    </CardContent>
                    {transactions.length > 0 && (
                      <CardFooter className="border-t px-6 py-4">
                        <Link href="/transactions" className="text-xs text-primary hover:underline w-full text-center">
                          View all transactions
                        </Link>
                      </CardFooter>
                    )}
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Security Overview</CardTitle>
                    <CardDescription>
                      Monitor the security of your investments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-4 bg-green-50 p-4 rounded-lg">
                        <div className="rounded-full bg-green-100 p-2">
                          <ShieldCheck className="h-5 w-5 text-green-700" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Contracts Audited</p>
                          <p className="text-xs text-gray-500">All investment contracts verified</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 bg-blue-50 p-4 rounded-lg">
                        <div className="rounded-full bg-blue-100 p-2">
                          <Clock className="h-5 w-5 text-blue-700" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Real-time Monitoring</p>
                          <p className="text-xs text-gray-500">24/7 protocol monitoring active</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 bg-purple-50 p-4 rounded-lg">
                        <div className="rounded-full bg-purple-100 p-2">
                          <Settings className="h-5 w-5 text-purple-700" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Risk Assessment</p>
                          <p className="text-xs text-gray-500">All protocols risk-evaluated</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="investments" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Your Investments</h2>
                  <Link href="/opportunities">
                    <Button size="sm">
                      New Investment
                    </Button>
                  </Link>
                </div>
                
                {loading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-24 w-full" />
                    ))}
                  </div>
                ) : investments.length > 0 ? (
                  <InvestmentsList 
                    investments={investments}
                    onWithdraw={handleWithdraw}
                    onClaimRewards={handleClaimRewards}
                    withdrawLoading={withdrawLoading}
                    claimLoading={claimLoading}
                    activeWithdrawalId={activeWithdrawalId}
                    activeClaimId={activeClaimId}
                  />
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                      <CircleDollarSign className="h-12 w-12 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium">No Investments Yet</h3>
                      <p className="text-sm text-gray-500 mb-6 max-w-md">
                        Start your yield farming journey by investing in one of our curated opportunities.
                      </p>
                      <Link href="/opportunities">
                        <Button>
                          Browse Opportunities
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
      
      <InvestmentDialog 
        open={investmentDialogOpen} 
        onOpenChange={setInvestmentDialogOpen}
        opportunity={selectedOpportunity}
        onSuccess={handleInvestmentSuccess}
        walletAddress={walletAddress}
      />
    </>
  );
}
