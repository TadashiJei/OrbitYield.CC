'use client';

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useYieldContracts } from '@/hooks/useYieldContracts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formatTimestamp } from '@/providers/DateProvider';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'claim';
  timestamp: number;
  asset: string;
  assetSymbol: string;
  amount: string;
  strategy: string;
  strategyType: string;
  protocolName: string;
  transactionHash: string;
}

export function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const { isConnected, address, contracts } = useYieldContracts();

  // Load transactions from API or blockchain events
  useEffect(() => {
    if (!isConnected) {
      setLoading(false);
      return;
    }

    fetchTransactionHistory();
  }, [isConnected, address]);

  const fetchTransactionHistory = async () => {
    try {
      setLoading(true);
      
      // In a real implementation, we would fetch this data from an API that tracks on-chain events
      // or directly query the blockchain for relevant events
      // For demo purposes, we'll use mock data
      
      const response = await fetch(`/api/transactions?address=${address}`);
      const data = await response.json();
      
      if (data.success) {
        setTransactions(data.transactions);
      } else {
        // If the API isn't implemented yet, use mock data
        setTransactions(getMockTransactions());
      }
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      // Fallback to mock data if API fails
      setTransactions(getMockTransactions());
    } finally {
      setLoading(false);
    }
  };
  
  // Mock transaction data for development
  const getMockTransactions = (): Transaction[] => {
    const now = Math.floor(Date.now() / 1000);
    const day = 86400; // seconds in a day
    
    return [
      {
        id: '1',
        type: 'deposit',
        timestamp: now - (7 * day),
        asset: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        assetSymbol: 'DAI',
        amount: ethers.utils.parseEther('100').toString(),
        strategy: '0x1234567890123456789012345678901234567891',
        strategyType: 'lending',
        protocolName: 'Aave',
        transactionHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890'
      },
      {
        id: '2',
        type: 'deposit',
        timestamp: now - (5 * day),
        asset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        assetSymbol: 'ETH',
        amount: ethers.utils.parseEther('0.5').toString(),
        strategy: '0x1234567890123456789012345678901234567892',
        strategyType: 'farming',
        protocolName: 'Compound',
        transactionHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567891'
      },
      {
        id: '3',
        type: 'withdraw',
        timestamp: now - (3 * day),
        asset: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        assetSymbol: 'DAI',
        amount: ethers.utils.parseEther('50').toString(),
        strategy: '0x1234567890123456789012345678901234567891',
        strategyType: 'lending',
        protocolName: 'Aave',
        transactionHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567892'
      },
      {
        id: '4',
        type: 'claim',
        timestamp: now - (1 * day),
        asset: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
        assetSymbol: 'UNI',
        amount: ethers.utils.parseEther('2').toString(),
        strategy: '0x1234567890123456789012345678901234567892',
        strategyType: 'farming',
        protocolName: 'Compound',
        transactionHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567893'
      }
    ];
  };
  
  // Filter transactions
  const filteredTransactions = transactions.filter(tx => {
    if (!filter) return true;
    
    const searchLower = filter.toLowerCase();
    return (
      tx.assetSymbol.toLowerCase().includes(searchLower) ||
      tx.protocolName.toLowerCase().includes(searchLower) ||
      tx.strategyType.toLowerCase().includes(searchLower) ||
      tx.type.toLowerCase().includes(searchLower) ||
      tx.transactionHash.toLowerCase().includes(searchLower)
    );
  });
  
  // Format amount based on token
  const formatAmount = (amount: string, symbol: string) => {
    try {
      const formatted = parseFloat(ethers.utils.formatEther(amount)).toFixed(4);
      return `${formatted} ${symbol}`;
    } catch (e) {
      return `${amount} ${symbol}`;
    }
  };
  
  // Format date
  const formatDate = (timestamp: number) => {
    return formatTimestamp(timestamp, 'PPpp');
  };
  
  // Shorten transaction hash
  const shortenHash = (hash: string) => {
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
  };
  
  // Get transaction type badge
  const getTransactionBadge = (type: string) => {
    switch (type) {
      case 'deposit':
        return (
          <Badge className="bg-green-100 text-green-800">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            Deposit
          </Badge>
        );
      case 'withdraw':
        return (
          <Badge className="bg-amber-100 text-amber-800">
            <ArrowDownRight className="h-3 w-3 mr-1" />
            Withdraw
          </Badge>
        );
      case 'claim':
        return (
          <Badge className="bg-purple-100 text-purple-800">
            Claim Rewards
          </Badge>
        );
      default:
        return <Badge>{type}</Badge>;
    }
  };
  
  // View transaction on block explorer
  const getTransactionUrl = (hash: string) => {
    // In a real app, you would use the correct block explorer URL for the network
    return `https://etherscan.io/tx/${hash}`;
  };

  return (
    <div className="space-y-6">
      {!isConnected ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Wallet not connected</AlertTitle>
          <AlertDescription>
            Please connect your wallet to view your transaction history.
          </AlertDescription>
        </Alert>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>Your yield strategy transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                placeholder="Search by asset, protocol, type, or hash..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="max-w-md"
              />
            </div>
            
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : transactions.length === 0 ? (
              <div className="text-center py-8">
                <h3 className="text-lg font-medium">No transactions found</h3>
                <p className="text-gray-500 mt-2">
                  Start investing in yield strategies to see your transaction history
                </p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Asset</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Protocol</TableHead>
                      <TableHead>Strategy</TableHead>
                      <TableHead>Transaction</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell>{formatDate(tx.timestamp)}</TableCell>
                        <TableCell>{getTransactionBadge(tx.type)}</TableCell>
                        <TableCell>{tx.assetSymbol}</TableCell>
                        <TableCell>{formatAmount(tx.amount, tx.assetSymbol)}</TableCell>
                        <TableCell>{tx.protocolName}</TableCell>
                        <TableCell className="capitalize">{tx.strategyType}</TableCell>
                        <TableCell>
                          <span className="font-mono text-xs">
                            {shortenHash(tx.transactionHash)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Link 
                            href={getTransactionUrl(tx.transactionHash)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              buttonVariants({ variant: "outline", size: "sm" })
                            )}
                          >
                            View
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                    
                    {filteredTransactions.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-4">
                          No transactions match your search
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
