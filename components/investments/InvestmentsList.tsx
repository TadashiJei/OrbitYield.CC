'use client';

import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
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
  TableRow 
} from '@/components/ui/table';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowUpDown, 
  Calendar, 
  CircleDollarSign, 
  ExternalLink, 
  Gift,
  Wallet
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Define the investment interface
interface Investment {
  _id: string;
  userId: string;
  walletAddress: string;
  opportunityId: string;
  opportunityName: string;
  chain: string;
  protocol: string;
  amount: string;
  amountRaw: string;
  tokenSymbol: string;
  entryAPY: number;
  status: 'active' | 'withdrawn' | 'pending';
  transactionHash: string;
  investedAt: string;
  withdrawnAt?: string;
  withdrawTransactionHash?: string;
  lastRewardClaim?: {
    amount: string;
    amountRaw: string;
    transactionHash: string;
    timestamp: string;
  };
  totalRewardsClaimed?: string;
  totalRewardsClaimedRaw?: string;
}

interface InvestmentsListProps {
  investments: Investment[];
  onWithdraw: (investmentId: string) => void;
  onClaimRewards: (investmentId: string) => void;
  isLoadingWithdrawal?: boolean;
  isLoadingClaim?: boolean;
  activeWithdrawalId?: string;
  activeClaimId?: string;
}

export default function InvestmentsList({
  investments,
  onWithdraw,
  onClaimRewards,
  isLoadingWithdrawal = false,
  isLoadingClaim = false,
  activeWithdrawalId,
  activeClaimId
}: InvestmentsListProps) {
  const [sortField, setSortField] = useState<string>('investedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Handle sort click
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Sort investments
  const sortedInvestments = [...investments].sort((a, b) => {
    let aValue = a[sortField as keyof Investment];
    let bValue = b[sortField as keyof Investment];

    // Handle date fields
    if (sortField === 'investedAt' || sortField === 'withdrawnAt') {
      aValue = aValue ? new Date(aValue as string).getTime() : 0;
      bValue = bValue ? new Date(bValue as string).getTime() : 0;
    }
    
    // Handle numeric fields
    if (sortField === 'amount' || sortField === 'entryAPY') {
      aValue = parseFloat(aValue as string) || 0;
      bValue = parseFloat(bValue as string) || 0;
    }

    // Sort direction
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  // If no investments, show a message
  if (investments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Investments</CardTitle>
          <CardDescription>
            Track your yield farming investments across different protocols
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <CircleDollarSign className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
          <h3 className="text-lg font-medium">No investments found</h3>
          <p className="text-muted-foreground mt-2">
            You haven&apos;t made any investments yet. Explore opportunities to start earning yield.
          </p>
          <Link 
            href="/opportunities" 
            className={cn(
              buttonVariants({ variant: "default" }),
              "mt-4"
            )}
          >
            View Opportunities
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Investments</CardTitle>
        <CardDescription>
          Track your yield farming investments across different protocols
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => handleSort('opportunityName')} className="cursor-pointer">
                Opportunity
                {sortField === 'opportunityName' && (
                  <ArrowUpDown className={`ml-1 h-4 w-4 inline ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                )}
              </TableHead>
              <TableHead onClick={() => handleSort('amount')} className="cursor-pointer text-right">
                Amount
                {sortField === 'amount' && (
                  <ArrowUpDown className={`ml-1 h-4 w-4 inline ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                )}
              </TableHead>
              <TableHead onClick={() => handleSort('entryAPY')} className="cursor-pointer text-right">
                APY
                {sortField === 'entryAPY' && (
                  <ArrowUpDown className={`ml-1 h-4 w-4 inline ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                )}
              </TableHead>
              <TableHead onClick={() => handleSort('investedAt')} className="cursor-pointer">
                Invested
                {sortField === 'investedAt' && (
                  <ArrowUpDown className={`ml-1 h-4 w-4 inline ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                )}
              </TableHead>
              <TableHead onClick={() => handleSort('status')} className="cursor-pointer">
                Status
                {sortField === 'status' && (
                  <ArrowUpDown className={`ml-1 h-4 w-4 inline ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                )}
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedInvestments.map((investment) => (
              <TableRow key={investment._id}>
                <TableCell>
                  <div className="font-medium">{investment.opportunityName}</div>
                  <div className="text-sm text-muted-foreground">
                    {investment.protocol} on {investment.chain}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="font-medium">{investment.amount} {investment.tokenSymbol}</div>
                  {investment.totalRewardsClaimed && (
                    <div className="text-sm text-green-600 flex items-center justify-end">
                      <Gift className="h-3 w-3 mr-1" />
                      {investment.totalRewardsClaimed} earned
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {investment.entryAPY.toFixed(2)}%
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span title={format(new Date(investment.investedAt), 'PPP p')}>
                      {formatDistanceToNow(new Date(investment.investedAt), { addSuffix: true })}
                    </span>
                  </div>
                  {investment.status === 'withdrawn' && investment.withdrawnAt && (
                    <div className="text-sm text-muted-foreground flex items-center mt-1">
                      <Wallet className="h-3 w-3 mr-1" />
                      Withdrawn {formatDistanceToNow(new Date(investment.withdrawnAt), { addSuffix: true })}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      investment.status === 'active' ? 'default' :
                      investment.status === 'withdrawn' ? 'secondary' : 'outline'
                    }
                  >
                    {investment.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {investment.status === 'active' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onClaimRewards(investment._id)}
                          disabled={isLoadingClaim && activeClaimId === investment._id}
                        >
                          {isLoadingClaim && activeClaimId === investment._id ? 'Claiming...' : 'Claim'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onWithdraw(investment._id)}
                          disabled={isLoadingWithdrawal && activeWithdrawalId === investment._id}
                        >
                          {isLoadingWithdrawal && activeWithdrawalId === investment._id ? 'Withdrawing...' : 'Withdraw'}
                        </Button>
                      </>
                    )}
                    
                    <Link 
                      href={`/investments/${investment._id}`}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "sm" })
                      )}
                    >
                      View
                    </Link>
                    
                    {investment.transactionHash && (
                      <Link
                        href={`https://explorer.orbityield.example.com/tx/${investment.transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "sm" })
                        )}
                      >
                        Tx <ExternalLink className="ml-1 h-3 w-3" />
                      </Link>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {investments.length} investment{investments.length !== 1 ? 's' : ''}
        </div>
        
        <Link 
          href="/opportunities"
          className={cn(
            buttonVariants({ variant: "outline" })
          )}
        >
          Browse More Opportunities
        </Link>
      </CardFooter>
    </Card>
  );
}
