'use client';

import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle,
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  CircleDollarSign, 
  Wallet, 
  ArrowRight,
  ArrowDown,
  Clock,
  Filter,
  Search,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Download,
  ArrowUpRight,
  ScrollText,
  ExternalLink
} from 'lucide-react';
import MetaMaskConnector from '@/components/wallet/MetaMaskConnector';
import Link from 'next/link';
import { format, formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

// Define Transaction interface
interface Transaction {
  _id: string;
  type: string;
  status: string;
  amount: string;
  tokenSymbol: string;
  timestamp: string;
  chain?: string;
  from?: string;
  to?: string;
  transactionHash?: string;
  opportunityId?: string;
  investmentId?: string;
  [key: string]: any; // For any additional properties
}

// Transaction type badge color mapping
const typeColorMap: Record<string, string> = {
  investment: 'bg-blue-100 text-blue-800',
  withdrawal: 'bg-orange-100 text-orange-800',
  reward: 'bg-green-100 text-green-800',
  fee: 'bg-red-100 text-red-800',
  transfer: 'bg-purple-100 text-purple-800',
  deposit: 'bg-blue-100 text-blue-800',
};

// Transaction status badge color mapping
const statusColorMap: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  completed: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
};

export default function TransactionsPage() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedTxId, setExpandedTxId] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [chainFilter, setChainFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  
  // Options for filtering
  const [availableChains, setAvailableChains] = useState<string[]>([]);
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);

  // Load transactions when wallet is connected
  useEffect(() => {
    if (walletAddress) {
      fetchTransactions();
    } else {
      // Reset state when wallet is disconnected
      setTransactions([]);
      setLoading(false);
    }
  }, [walletAddress, currentPage, pageSize]);

  // Fetch transactions
  const fetchTransactions = async () => {
    if (!walletAddress) return;
    
    setLoading(true);
    
    try {
      // Build query parameters
      const params = new URLSearchParams();
      params.append('walletAddress', walletAddress);
      params.append('page', currentPage.toString());
      params.append('limit', pageSize.toString());
      
      // Add filters if selected
      if (typeFilter) params.append('type', typeFilter);
      if (statusFilter) params.append('status', statusFilter);
      if (chainFilter) params.append('chain', chainFilter);
      
      // Fetch user transactions
      const response = await fetch(`/api/transactions?${params.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        setTransactions(data.data);
        setTotalPages(data.pagination.pages);
        setTotalTransactions(data.pagination.total);
        
        // Extract unique values for filters
        extractFilterOptions(data.data);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  // Extract unique values for filter options
  const extractFilterOptions = (data: Transaction[]) => {
    const chains = [...new Set(data.map(tx => tx.chain).filter(Boolean))];
    const types = [...new Set(data.map(tx => tx.type).filter(Boolean))];
    
    setAvailableChains(chains as string[]);
    setAvailableTypes(types as string[]);
  };

  // Apply filters
  const applyFilters = () => {
    fetchTransactions();
    setCurrentPage(1); // Reset to first page when applying filters
  };

  // Reset filters
  const resetFilters = () => {
    setTypeFilter('');
    setStatusFilter('');
    setChainFilter('');
    setDateFilter('');
    setSearchQuery('');
    setCurrentPage(1);
    fetchTransactions();
  };

  // Handle wallet connection
  const handleConnect = (account: string) => {
    setWalletAddress(account);
  };

  // Handle wallet disconnection
  const handleDisconnect = () => {
    setWalletAddress(null);
  };

  // Toggle expanded view for transaction details
  const toggleExpandedTx = (id: string) => {
    if (expandedTxId === id) {
      setExpandedTxId(null);
    } else {
      setExpandedTxId(id);
    }
  };

  // Format date in readable format
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMM d, yyyy HH:mm');
    } catch (e) {
      return 'Invalid date';
    }
  };

  // Download transaction history as CSV
  const downloadTransactionHistory = async () => {
    if (!walletAddress) return;
    
    try {
      // Fetch all transactions (you might want to limit this)
      const response = await fetch(`/api/transactions?walletAddress=${walletAddress}&limit=1000`);
      const data = await response.json();
      
      if (data.success && data.data.length > 0) {
        // Create CSV content
        const headers = ['Date', 'Type', 'Amount', 'Currency', 'Chain', 'Status', 'Transaction Hash'];
        const rows = data.data.map((tx: Transaction) => [
          formatDate(tx.timestamp),
          tx.type,
          tx.amount,
          tx.tokenSymbol,
          tx.chain,
          tx.status,
          tx.transactionHash
        ]);
        
        const csvContent = [
          headers.join(','),
          ...rows.map(row => row.join(','))
        ].join('\n');
        
        // Create and download the file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `transactions-${format(new Date(), 'yyyyMMdd')}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error downloading transaction history:', error);
      toast({
        title: 'Download Failed',
        description: 'There was an error downloading your transaction history.',
        variant: 'destructive'
      });
    }
  };

  // Calculate actual numeric value for sorting
  const getNumericValue = (row: Transaction, columnId: keyof Transaction): number => {
    if (columnId === 'amount') {
      return parseFloat(row.amount || '0');
    }
    
    if (columnId === 'timestamp') {
      return new Date(row.timestamp).getTime();
    }
    
    return 0;
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <Link 
              href="/dashboard" 
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "mr-2"
              )}
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="text-3xl font-bold">Transaction History</h1>
          </div>
          <p className="text-muted-foreground mt-2">
            View and filter your transaction history across all investments
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
              Connect your wallet to view your transaction history across all investments.
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
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle>Transactions</CardTitle>
                <CardDescription>
                  Your transaction history across all investments
                </CardDescription>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search transactions..."
                    className="pl-8 h-9 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 px-3 py-2 w-[200px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Link 
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" })
                  )}
                  onClick={() => setFiltersOpen(!filtersOpen)}
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Link>
                
                <Link 
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" })
                  )}
                  onClick={downloadTransactionHistory}
                >
                  <Download className="h-4 w-4" />
                  Export
                </Link>
              </div>
            </div>
            
            {/* Filters section */}
            {filtersOpen && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 pt-4 border-t">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Transaction Type</label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Types</SelectItem>
                      <SelectItem value="investment">Investment</SelectItem>
                      <SelectItem value="withdrawal">Withdrawal</SelectItem>
                      <SelectItem value="reward">Reward</SelectItem>
                      <SelectItem value="fee">Fee</SelectItem>
                      <SelectItem value="transfer">Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Chain</label>
                  <Select value={chainFilter} onValueChange={setChainFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Chains" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Chains</SelectItem>
                      {availableChains.map(chain => (
                        <SelectItem key={chain} value={chain}>{chain}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Time Period</label>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="md:col-span-4 flex justify-end">
                  <Link 
                    href="#"
                    className={cn(
                      buttonVariants({ variant: "outline" })
                    )}
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </Link>
                  <Link 
                    href="#"
                    className={cn(
                      buttonVariants({ variant: "default" })
                    )}
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </Link>
                </div>
              </div>
            )}
          </CardHeader>
          
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : transactions.length > 0 ? (
              <div>
                <div className="text-sm text-muted-foreground mb-4">
                  Showing {transactions.length} of {totalTransactions} transactions
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Protocol/Chain</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((tx: Transaction) => (
                      <React.Fragment key={tx._id}>
                        <TableRow 
                          className={expandedTxId === tx._id ? 'bg-accent/50' : ''}
                          onClick={() => toggleExpandedTx(tx._id)}
                        >
                          <TableCell>
                            <div className="flex items-center">
                              {expandedTxId === tx._id ? 
                                <ChevronUp className="h-4 w-4 mr-2" /> : 
                                <ChevronDown className="h-4 w-4 mr-2" />
                              }
                              <div>
                                <div>{formatDate(tx.timestamp)}</div>
                                <div className="text-xs text-muted-foreground">
                                  {formatDistanceToNow(new Date(tx.timestamp), { addSuffix: true })}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={typeColorMap[tx.type] || 'bg-gray-100 text-gray-800'}>
                              {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className={`flex items-center ${
                              tx.type === 'withdrawal' || tx.type === 'fee' ? 'text-red-600' : 
                              tx.type === 'investment' ? 'text-blue-600' : 'text-green-600'
                            }`}>
                              {tx.type === 'withdrawal' || tx.type === 'fee' ? '-' : 
                               tx.type === 'investment' ? '' : '+'}
                              {tx.amount} {tx.tokenSymbol}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={statusColorMap[tx.status] || 'bg-gray-100 text-gray-800'}>
                              {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div>{tx.protocol || 'Unknown'}</div>
                            <div className="text-xs text-muted-foreground">{tx.chain || 'Unknown Chain'}</div>
                          </TableCell>
                          <TableCell className="text-right">
                            {tx.transactionHash && (
                              <Link 
                                href={`https://${tx.chain || 'polkadot'}.subscan.io/tx/${tx.transactionHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                  buttonVariants({ variant: "ghost", size: "sm" })
                                )}
                              >
                                <ExternalLink className="h-3.5 w-3.5" />
                                Explorer
                              </Link>
                            )}
                          </TableCell>
                        </TableRow>
                        
                        {/* Expanded details section */}
                        {expandedTxId === tx._id && (
                          <TableRow className="bg-accent/50">
                            <TableCell colSpan={6} className="px-6 py-4">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Transaction Details</h4>
                                  <dl className="grid grid-cols-2 gap-1 text-sm">
                                    <dt className="text-muted-foreground">Transaction ID:</dt>
                                    <dd className="truncate">{tx._id}</dd>
                                    
                                    <dt className="text-muted-foreground">Hash:</dt>
                                    <dd className="truncate">
                                      {tx.transactionHash ? (
                                        <Link 
                                          href={`https://${tx.chain || 'polkadot'}.subscan.io/tx/${tx.transactionHash}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className={cn(
                                            buttonVariants({ variant: "ghost", size: "sm" })
                                          )}
                                        >
                                          {tx.transactionHash}
                                        </Link>
                                      ) : 'N/A'}
                                    </dd>
                                    
                                    {tx.blockNumber && (
                                      <>
                                        <dt className="text-muted-foreground">Block Number:</dt>
                                        <dd>{tx.blockNumber}</dd>
                                      </>
                                    )}
                                    
                                    <dt className="text-muted-foreground">Date & Time:</dt>
                                    <dd>{formatDate(tx.timestamp)}</dd>
                                  </dl>
                                </div>
                                
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Amount Details</h4>
                                  <dl className="grid grid-cols-2 gap-1 text-sm">
                                    <dt className="text-muted-foreground">Amount:</dt>
                                    <dd>{tx.amount} {tx.tokenSymbol}</dd>
                                    
                                    {tx.fee !== undefined && (
                                      <>
                                        <dt className="text-muted-foreground">Fee:</dt>
                                        <dd>{tx.fee} {tx.feeCurrency || tx.tokenSymbol}</dd>
                                      </>
                                    )}
                                    
                                    {tx.rate !== undefined && (
                                      <>
                                        <dt className="text-muted-foreground">Exchange Rate:</dt>
                                        <dd>{tx.rate}</dd>
                                      </>
                                    )}
                                    
                                    {tx.type === 'reward' && (
                                      <>
                                        <dt className="text-muted-foreground">Reward Type:</dt>
                                        <dd>{tx.rewardType || 'Yield'}</dd>
                                      </>
                                    )}
                                  </dl>
                                </div>
                                
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Related Information</h4>
                                  <dl className="grid grid-cols-2 gap-1 text-sm">
                                    {tx.opportunityId && (
                                      <>
                                        <dt className="text-muted-foreground">Opportunity:</dt>
                                        <dd className="truncate">
                                          <Link 
                                            href={`/opportunities/${tx.opportunityId}`}
                                            className={cn(
                                              buttonVariants({ variant: "ghost", size: "sm" })
                                            )}
                                          >
                                            View Opportunity
                                          </Link>
                                        </dd>
                                      </>
                                    )}
                                    
                                    {tx.investmentId && (
                                      <>
                                        <dt className="text-muted-foreground">Investment:</dt>
                                        <dd className="truncate">
                                          <Link 
                                            href={`/investments?id=${tx.investmentId}`}
                                            className={cn(
                                              buttonVariants({ variant: "ghost", size: "sm" })
                                            )}
                                          >
                                            View Investment
                                          </Link>
                                        </dd>
                                      </>
                                    )}
                                    
                                    {tx.fromChain && tx.toChain && (
                                      <>
                                        <dt className="text-muted-foreground">Bridge:</dt>
                                        <dd>
                                          {tx.fromChain} <ArrowRight className="inline h-3 w-3" /> {tx.toChain}
                                        </dd>
                                      </>
                                    )}
                                    
                                    {tx.error && (
                                      <>
                                        <dt className="text-muted-foreground">Error:</dt>
                                        <dd className="text-red-600">{tx.error}</dd>
                                      </>
                                    )}
                                  </dl>
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
                <ScrollText className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Transactions Found</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  {searchQuery || typeFilter || statusFilter || chainFilter || dateFilter
                    ? "We couldn't find any transactions matching your search criteria. Try adjusting your filters."
                    : "You don't have any transactions yet. Start investing to see your transaction history."}
                </p>
                {(searchQuery || typeFilter || statusFilter || chainFilter || dateFilter) ? (
                  <Link 
                    href="#"
                    className={cn(
                      buttonVariants({ variant: "default" })
                    )}
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </Link>
                ) : (
                  <Link 
                    href="/opportunities"
                    className={cn(
                      buttonVariants({ variant: "default" })
                    )}
                  >
                    Browse Opportunities
                  </Link>
                )}
              </div>
            )}
          </CardContent>
          
          {/* Pagination */}
          {transactions.length > 0 && totalPages > 1 && (
            <CardFooter className="flex justify-between items-center border-t pt-6">
              <div className="text-sm text-muted-foreground">
                Showing {transactions.length} of {totalTransactions} transactions
              </div>
              
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Calculate page numbers to display
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <PaginationItem key={i}>
                        <PaginationLink
                          onClick={() => setCurrentPage(pageNum)}
                          isActive={currentPage === pageNum}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
              
              <div className="flex items-center gap-2">
                <Select value={pageSize.toString()} onValueChange={(value) => {
                  setPageSize(parseInt(value));
                  setCurrentPage(1); // Reset to first page when changing page size
                }}>
                  <SelectTrigger className="w-[80px]">
                    <SelectValue placeholder="10" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">per page</span>
              </div>
            </CardFooter>
          )}
        </Card>
      )}
    </div>
  );
}
