'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLinkIcon } from 'lucide-react';

interface TransferHistoryProps {
  address: string;
}

interface Transfer {
  id: string;
  sourceChain: string;
  destinationChain: string;
  asset: string;
  amount: string;
  timestamp: number;
  status: 'pending' | 'completed' | 'failed';
  txHash: string;
}

export function TransferHistory({ address }: TransferHistoryProps) {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate fetching transfer history
    const fetchTransferHistory = async () => {
      try {
        // In a real app, this would fetch from an API or indexed data source
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock data for demonstration
        const mockTransfers: Transfer[] = [
          {
            id: '1',
            sourceChain: 'ethereum',
            destinationChain: 'polygon',
            asset: 'USDC',
            amount: '1000',
            timestamp: Date.now() - 3600000, // 1 hour ago
            status: 'completed',
            txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
          },
          {
            id: '2',
            sourceChain: 'arbitrum',
            destinationChain: 'optimism',
            asset: 'ETH',
            amount: '0.5',
            timestamp: Date.now() - 86400000, // 1 day ago
            status: 'completed',
            txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890'
          },
          {
            id: '3',
            sourceChain: 'polygon',
            destinationChain: 'base',
            asset: 'USDT',
            amount: '500',
            timestamp: Date.now() - 10800000, // 3 hours ago
            status: 'pending',
            txHash: '0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456'
          }
        ];
        
        setTransfers(mockTransfers);
      } catch (error) {
        console.error('Failed to fetch transfer history:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTransferHistory();
  }, [address]);
  
  const getChainName = (chainId: string) => {
    const chains: Record<string, string> = {
      'ethereum': 'Ethereum',
      'polygon': 'Polygon',
      'arbitrum': 'Arbitrum',
      'optimism': 'Optimism',
      'base': 'Base'
    };
    return chains[chainId] || chainId;
  };
  
  const getChainExplorerUrl = (chainId: string, txHash: string) => {
    const explorers: Record<string, string> = {
      'ethereum': 'https://etherscan.io/tx/',
      'polygon': 'https://polygonscan.com/tx/',
      'arbitrum': 'https://arbiscan.io/tx/',
      'optimism': 'https://optimistic.etherscan.io/tx/',
      'base': 'https://basescan.org/tx/'
    };
    return (explorers[chainId] || '#') + txHash;
  };
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };
  
  const getStatusBadge = (status: Transfer['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case 'failed':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Failed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transfer History</CardTitle>
          <CardDescription>Your recent cross-chain transfers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(3).fill(0).map((_, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-md">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
                <Skeleton className="h-8 w-24" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transfer History</CardTitle>
        <CardDescription>Your recent cross-chain transfers</CardDescription>
      </CardHeader>
      <CardContent>
        {transfers.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            You haven't made any cross-chain transfers yet.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Transaction</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transfers.map((transfer) => (
                <TableRow key={transfer.id}>
                  <TableCell className="font-medium">{formatDate(transfer.timestamp)}</TableCell>
                  <TableCell>{getChainName(transfer.sourceChain)}</TableCell>
                  <TableCell>{getChainName(transfer.destinationChain)}</TableCell>
                  <TableCell>{transfer.asset}</TableCell>
                  <TableCell className="text-right">{transfer.amount}</TableCell>
                  <TableCell>{getStatusBadge(transfer.status)}</TableCell>
                  <TableCell className="text-right">
                    <a 
                      href={getChainExplorerUrl(transfer.sourceChain, transfer.txHash)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                    >
                      View
                      <ExternalLinkIcon className="h-3 w-3 ml-1" />
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
