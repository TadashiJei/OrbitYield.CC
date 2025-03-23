'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronUp, ExternalLink, Layers, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface OpportunityCardProps {
  opportunity: {
    _id: string;
    name: string;
    protocol: string;
    chain: string;
    asset: string;
    tokenSymbol: string;
    apy: number;
    tvl?: string;
    strategyType: string;
    riskLevel: 'low' | 'medium' | 'high';
    description?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    protocolLogo?: string;
    contractAddress?: string;
    realTimeApy?: number;
  };
  onInvest?: (opportunityId: string) => void;
}

export default function OpportunityCard({ opportunity, onInvest }: OpportunityCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Format APY as percentage with 2 decimal places
  const formattedApy = `${(opportunity.realTimeApy || opportunity.apy).toFixed(2)}%`;
  
  // Determine risk color
  const riskColor = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  }[opportunity.riskLevel];
  
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{opportunity.name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              {opportunity.protocolLogo ? (
                <img 
                  src={opportunity.protocolLogo} 
                  alt={opportunity.protocol} 
                  className="w-4 h-4 mr-1" 
                />
              ) : null}
              <span>{opportunity.protocol} on {opportunity.chain}</span>
            </CardDescription>
          </div>
          
          <Badge variant="outline" className={`${riskColor} border-none`}>
            {opportunity.riskLevel.toUpperCase()} RISK
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-sm text-muted-foreground">APY</div>
            <div className="text-2xl font-bold flex items-center">
              {formattedApy}
              <TrendingUp className="h-4 w-4 ml-1 text-green-500" />
            </div>
          </div>
          
          <div>
            <div className="text-sm text-muted-foreground">Asset</div>
            <div className="text-xl font-semibold">
              {opportunity.asset} 
              <span className="text-sm text-muted-foreground ml-1">
                ({opportunity.tokenSymbol})
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Layers className="h-4 w-4 mr-1" />
            {opportunity.strategyType}
          </div>
          
          {opportunity.tvl && (
            <div className="text-sm text-muted-foreground">
              TVL: ${opportunity.tvl}
            </div>
          )}
        </div>
        
        {isExpanded && opportunity.description && (
          <div className="mt-4 text-sm">
            <p>{opportunity.description}</p>
            
            {opportunity.contractAddress && (
              <a
                href={`https://polkadot.subscan.io/account/${opportunity.contractAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm mt-2 text-blue-600 hover:underline"
              >
                View Contract <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2 pb-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-muted-foreground"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show Less' : 'Details'}
          <ChevronUp className={`h-4 w-4 ml-1 transition-transform duration-200 ${isExpanded ? '' : 'rotate-180'}`} />
        </Button>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            asChild
          >
            <Link href={`/opportunities/${opportunity._id}`}>
              View
            </Link>
          </Button>
          
          <Button 
            variant="default" 
            size="sm"
            onClick={() => onInvest && onInvest(opportunity._id)}
          >
            Invest
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
