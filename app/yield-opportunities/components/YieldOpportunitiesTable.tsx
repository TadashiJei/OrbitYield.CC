import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ethers } from 'ethers';
import { YieldOpportunity } from '@/lib/yield/yield-optimizer';

interface YieldOpportunitiesTableProps {
  opportunities: YieldOpportunity[];
  onInvest: (opportunity: YieldOpportunity) => void;
  onViewDetails: (opportunity: YieldOpportunity) => void;
}

export function YieldOpportunitiesTable({
  opportunities,
  onInvest,
  onViewDetails,
}: YieldOpportunitiesTableProps) {
  // Sort opportunities by APY (highest first)
  const sortedOpportunities = [...opportunities].sort((a, b) => b.apy - a.apy);

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

  // Get strategy type badge color
  const getStrategyBadgeColor = (type: string) => {
    switch (type) {
      case 'lending':
        return 'bg-blue-100 text-blue-800';
      case 'farming':
        return 'bg-green-100 text-green-800';
      case 'liquidity':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get risk level color
  const getRiskColor = (risk: number) => {
    if (risk <= 3) return 'text-green-600';
    if (risk <= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Yield Opportunities</CardTitle>
        <CardDescription>
          Discover the best yield opportunities across Polkadot ecosystem
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Protocol</TableHead>
                <TableHead>Strategy</TableHead>
                <TableHead className="text-right">APY</TableHead>
                <TableHead className="text-right">TVL</TableHead>
                <TableHead className="text-center">Risk</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedOpportunities.map((opportunity) => (
                <TableRow key={opportunity.id}>
                  <TableCell className="font-medium">
                    {opportunity.assetSymbol}
                  </TableCell>
                  <TableCell>{opportunity.protocolName}</TableCell>
                  <TableCell>
                    <Badge className={getStrategyBadgeColor(opportunity.strategyType)}>
                      {opportunity.strategyType.charAt(0).toUpperCase() + opportunity.strategyType.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {formatAPY(opportunity.apy)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatTVL(opportunity.tvl)}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`font-bold ${getRiskColor(opportunity.risk)}`}>
                      {opportunity.risk}/10
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex space-x-2 justify-end">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onViewDetails(opportunity)}
                      >
                        Details
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => onInvest(opportunity)}
                      >
                        Invest
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {sortedOpportunities.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No yield opportunities found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
