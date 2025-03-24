'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { formatCurrency } from '@/lib/utils';
import { OptimizationReport as OptimizationReportType, YieldRecommendation } from '@/lib/yield/optimization-service';
import { AlertCircle, ChevronDown, ChevronUp, ExternalLink, Info, TrendingUp, CheckCircle2 } from 'lucide-react';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface OptimizationReportProps {
  report: OptimizationReportType;
  walletAddress: string;
  onInvest: (recommendation: YieldRecommendation) => void;
}

export function OptimizationReport({ report, walletAddress, onInvest }: OptimizationReportProps) {
  const [expandedRecommendation, setExpandedRecommendation] = useState<string | null>(null);

  // Toggle recommendation expansion
  const toggleRecommendation = (id: string) => {
    if (expandedRecommendation === id) {
      setExpandedRecommendation(null);
    } else {
      setExpandedRecommendation(id);
    }
  };

  // Get risk level color
  const getRiskColor = (riskLevel: 'Low' | 'Medium' | 'High') => {
    switch (riskLevel) {
      case 'Low':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'High':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  // Get strategy type color
  const getStrategyColor = (strategyType: string) => {
    switch (strategyType) {
      case 'Lending':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'Staking':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'Liquidity':
        return 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200';
      case 'Farming':
        return 'bg-pink-100 text-pink-800 hover:bg-pink-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  // Prepare data for the protocol distribution chart
  const getProtocolDistributionData = () => {
    const protocols = report.recommendations.map(rec => rec.opportunity.protocol);
    const uniqueProtocols = [...new Set(protocols)];
    
    // Count occurrences of each protocol
    const protocolCounts: Record<string, number> = {};
    protocols.forEach(protocol => {
      protocolCounts[protocol] = (protocolCounts[protocol] || 0) + 1;
    });
    
    // Generate random colors
    const getRandomColor = () => {
      const colorPalette = [
        '#4C51BF', '#38B2AC', '#ED8936', '#ECC94B', '#48BB78',
        '#E53E3E', '#805AD5', '#D53F8C', '#3182CE', '#DD6B20'
      ];
      
      return colorPalette[Math.floor(Math.random() * colorPalette.length)];
    };
    
    return {
      labels: uniqueProtocols,
      datasets: [
        {
          data: uniqueProtocols.map(protocol => protocolCounts[protocol]),
          backgroundColor: uniqueProtocols.map(() => getRandomColor()),
          borderWidth: 1,
          borderColor: ['#fff']
        },
      ],
    };
  };

  // Format APY for display
  const formatApy = (apy: number) => {
    return `${apy.toFixed(2)}%`;
  };

  // Format risk metrics
  const formatRiskPercentage = (value: number) => {
    if (typeof value === 'number') {
      return `${Math.min(100, Math.max(0, value)).toFixed(0)}%`;
    }
    return '0%';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Yield Optimization Report</CardTitle>
          <CardDescription>
            Personalized recommendations based on your portfolio and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-green-700 font-medium">Potential Yield</div>
              <div className="text-2xl font-bold text-green-900">
                {formatApy(report.totalPotentialYield)}
              </div>
              <div className="text-xs text-green-600 mt-1 flex items-center">
                {report.potentialAdditionalYield > 0 && (
                  <>
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{formatApy(report.potentialAdditionalYield)} from current
                  </>
                )}
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-blue-700 font-medium">Diversification Score</div>
              <div className="flex items-center gap-2">
                <Progress 
                  value={report.riskAssessment.diversificationScore} 
                  className="h-2" 
                />
                <span className="text-sm font-medium text-blue-900">
                  {formatRiskPercentage(report.riskAssessment.diversificationScore)}
                </span>
              </div>
              <div className="text-xs text-blue-600 mt-1">
                {report.riskAssessment.diversificationScore >= 75 
                  ? 'Well diversified across chains and protocols'
                  : 'Consider diversifying your investments further'
                }
              </div>
            </div>
            
            <div className="p-4 bg-amber-50 rounded-lg">
              <div className="text-sm text-amber-700 font-medium">Risk Assessment</div>
              <div className="flex items-center mt-1">
                <div className="flex-1">
                  <div className="text-xs text-amber-800">Protocol Risk</div>
                  <Progress 
                    value={report.riskAssessment.protocolRiskScore} 
                    className="h-1.5 mt-1" 
                  />
                </div>
                <div className="ml-4 flex-1">
                  <div className="text-xs text-amber-800">Impermanent Loss Risk</div>
                  <Progress 
                    value={report.riskAssessment.impermanentLossRisk} 
                    className="h-1.5 mt-1" 
                  />
                </div>
              </div>
              <div className="text-xs text-amber-600 mt-2">
                {report.riskAssessment.averageRisk < 2 
                  ? 'Low risk strategy recommended'
                  : report.riskAssessment.averageRisk < 2.5
                    ? 'Moderate risk strategy recommended'
                    : 'Higher risk strategy for maximum yield'
                }
              </div>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold mb-4">Top Recommendations</h3>
          
          <div className="space-y-4">
            {report.recommendations.map((recommendation) => (
              <Card key={recommendation.opportunity.id} className="border-l-4 border-l-primary">
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg font-bold">
                        {recommendation.opportunity.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {recommendation.opportunity.protocol} • {recommendation.opportunity.chain}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">
                        {formatApy(recommendation.opportunity.apy)}
                      </div>
                      <div className="text-xs text-gray-500">
                        Est. annual return: {formatCurrency(recommendation.estimatedAnnualRewardsUsd)}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4 pt-2 pb-3">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline" className={getRiskColor(recommendation.opportunity.riskLevel)}>
                      {recommendation.opportunity.riskLevel} Risk
                    </Badge>
                    <Badge variant="outline" className={getStrategyColor(recommendation.opportunity.strategyType)}>
                      {recommendation.opportunity.strategyType}
                    </Badge>
                    <Badge variant="outline" className="bg-gray-100">
                      Min: {recommendation.opportunity.minDeposit} {recommendation.opportunity.assetSymbol}
                    </Badge>
                    {recommendation.opportunity.verified && (
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-700">
                    {recommendation.opportunity.description}
                  </div>
                  
                  <div className="flex items-center mt-3 text-xs text-gray-500">
                    <Button variant="ghost" size="sm" className="p-0 h-auto font-medium text-primary hover:text-primary-600"
                      onClick={() => toggleRecommendation(recommendation.opportunity.id)}>
                      {expandedRecommendation === recommendation.opportunity.id ? (
                        <>
                          <ChevronUp className="h-4 w-4 mr-1" />
                          Hide details
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 mr-1" />
                          Show details
                        </>
                      )}
                    </Button>
                  </div>
                  
                  {expandedRecommendation === recommendation.opportunity.id && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Why this recommendation?</h4>
                          <ul className="text-sm text-gray-600 pl-5 list-disc space-y-1">
                            {recommendation.reasons.map((reason, index) => (
                              <li key={index}>{reason}</li>
                            ))}
                          </ul>
                        </div>
                        
                        {recommendation.potentialOptimizations.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium mb-2">Optimization Opportunities</h4>
                            <ul className="text-sm text-gray-600 pl-5 list-disc space-y-1">
                              {recommendation.potentialOptimizations.map((optimization, index) => (
                                <li key={index}>{optimization}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <div className="flex gap-2 mt-4">
                          <Button 
                            variant="default" 
                            className="flex-1"
                            onClick={() => onInvest(recommendation)}
                          >
                            Invest Now
                          </Button>
                          <Button 
                            variant="outline" 
                            className="flex items-center" 
                            onClick={() => window.open(recommendation.opportunity.url, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Visit Protocol
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="distribution" className="w-full">
        <TabsList>
          <TabsTrigger value="distribution">Protocol Distribution</TabsTrigger>
          <TabsTrigger value="analysis">Risk Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="distribution">
          <Card>
            <CardHeader>
              <CardTitle>Protocol Distribution</CardTitle>
              <CardDescription>
                Breakdown of recommended protocols for optimal diversification
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-4">
              <div className="w-full max-w-md h-64">
                <Doughnut data={getProtocolDistributionData()} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle>Risk Analysis</CardTitle>
              <CardDescription>
                Detailed breakdown of risks in your recommended yield strategy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Diversification</h4>
                  <Progress 
                    value={report.riskAssessment.diversificationScore} 
                    className="h-2 mb-2" 
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Poor</span>
                    <span>Excellent</span>
                  </div>
                  {report.riskAssessment.diversificationScore < 50 && (
                    <Alert variant="destructive" className="mt-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Low Diversification</AlertTitle>
                      <AlertDescription>
                        Consider adding more protocols and chains to reduce risk.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Protocol Risk</h4>
                  <Progress 
                    value={report.riskAssessment.protocolRiskScore} 
                    className="h-2 mb-2" 
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Low Risk</span>
                    <span>High Risk</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Impermanent Loss Risk</h4>
                  <Progress 
                    value={report.riskAssessment.impermanentLossRisk} 
                    className="h-2 mb-2" 
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Low Risk</span>
                    <span>High Risk</span>
                  </div>
                  {report.riskAssessment.impermanentLossRisk > 70 && (
                    <Alert variant="destructive" className="mt-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>High Impermanent Loss Risk</AlertTitle>
                      <AlertDescription>
                        Your recommendations include many liquidity provision strategies which may 
                        be subject to impermanent loss in volatile markets.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
