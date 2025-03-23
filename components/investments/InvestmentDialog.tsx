'use client';

import { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ethers } from 'ethers';
import { stakeInOpportunity } from '@/lib/blockchain/yield-farming';
import { Wallet, AlertCircle, Loader2 } from 'lucide-react';

interface YieldOpportunity {
  _id: string;
  name: string;
  protocol: string;
  chain: string;
  asset: string;
  tokenSymbol: string;
  tokenDecimals?: number;
  apy: number;
  minInvestment?: string;
  maxInvestment?: string;
  contractAddress?: string;
  strategyType: string;
  riskLevel: 'low' | 'medium' | 'high';
}

interface InvestmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  opportunity: YieldOpportunity | null;
  onSuccess?: (txHash: string, amount: string) => void;
  walletAddress?: string;
}

export default function InvestmentDialog({ 
  open, 
  onOpenChange, 
  opportunity, 
  onSuccess,
  walletAddress 
}: InvestmentDialogProps) {
  const [amount, setAmount] = useState<string>('');
  const [balance, setBalance] = useState<string>('0');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [percentageToInvest, setPercentageToInvest] = useState<number>(50);
  const [estimatedYield, setEstimatedYield] = useState<string>('0');

  // Get wallet balance when component mounts or wallet changes
  useEffect(() => {
    const getBalance = async () => {
      if (!walletAddress || !window.ethereum) return;
      
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(walletAddress);
        setBalance(ethers.utils.formatEther(balance));
      } catch (err) {
        console.error('Error fetching balance:', err);
      }
    };
    
    getBalance();
  }, [walletAddress]);

  // Calculate estimated annual yield when amount or opportunity changes
  useEffect(() => {
    if (!opportunity || !amount || isNaN(parseFloat(amount))) {
      setEstimatedYield('0');
      return;
    }
    
    const investmentAmount = parseFloat(amount);
    const annualYield = (investmentAmount * opportunity.apy) / 100;
    setEstimatedYield(annualYield.toFixed(4));
  }, [amount, opportunity]);

  // Handle slider change
  const handlePercentageChange = (value: number[]) => {
    const percentage = value[0];
    setPercentageToInvest(percentage);
    
    if (balance && parseFloat(balance) > 0) {
      const amountToInvest = (parseFloat(balance) * percentage) / 100;
      // Format to max 6 decimal places to avoid floating point issues
      setAmount(amountToInvest.toFixed(6));
    }
  };

  // Handle investment submission
  const handleInvest = async () => {
    if (!opportunity || !walletAddress || !amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount to invest');
      return;
    }
    
    // Check minimum investment amount if applicable
    if (opportunity.minInvestment && parseFloat(amount) < parseFloat(opportunity.minInvestment)) {
      setError(`Minimum investment is ${opportunity.minInvestment} ${opportunity.tokenSymbol}`);
      return;
    }
    
    // Check maximum investment amount if applicable
    if (opportunity.maxInvestment && parseFloat(amount) > parseFloat(opportunity.maxInvestment)) {
      setError(`Maximum investment is ${opportunity.maxInvestment} ${opportunity.tokenSymbol}`);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      
      // Call the staking function
      const result = await stakeInOpportunity(
        opportunity._id,
        amount,
        walletAddress,
        signer
      );
      
      if (result.success) {
        // Call onSuccess callback with transaction hash and amount
        if (onSuccess) {
          onSuccess(result.txHash, amount);
        }
        
        // Close the dialog
        onOpenChange(false);
      }
    } catch (err: any) {
      console.error('Investment error:', err);
      setError(err.message || 'Failed to process investment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invest in Yield Opportunity</DialogTitle>
          <DialogDescription>
            {opportunity ? 
              `Earn up to ${opportunity.apy}% APY with ${opportunity.protocol} on ${opportunity.chain}` : 
              'Loading opportunity details...'}
          </DialogDescription>
        </DialogHeader>
        
        {!walletAddress ? (
          <div className="py-6 text-center">
            <Wallet className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-2" />
            <h3 className="text-lg font-medium">Connect Wallet</h3>
            <p className="text-sm text-muted-foreground mt-2 mb-4">
              Please connect your wallet to invest in this opportunity
            </p>
          </div>
        ) : opportunity ? (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <div className="flex justify-between">
                <Label htmlFor="amount">Investment Amount</Label>
                <span className="text-sm text-muted-foreground">
                  Balance: {parseFloat(balance).toFixed(4)} {opportunity.tokenSymbol}
                </span>
              </div>
              
              <Input
                id="amount"
                type="number"
                step="0.0001"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={`Enter amount in ${opportunity.tokenSymbol}`}
              />
              
              <div className="py-2">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>0%</span>
                  <span>{percentageToInvest}%</span>
                  <span>100%</span>
                </div>
                <Slider
                  defaultValue={[percentageToInvest]}
                  max={100}
                  step={1}
                  onValueChange={handlePercentageChange}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 p-4 bg-secondary/20 rounded-md">
              <div>
                <div className="text-sm text-muted-foreground">Asset</div>
                <div className="font-medium">{opportunity.asset} ({opportunity.tokenSymbol})</div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground">APY</div>
                <div className="font-medium text-green-600">{opportunity.apy}%</div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground">Strategy</div>
                <div className="font-medium">{opportunity.strategyType}</div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground">Est. Annual Yield</div>
                <div className="font-medium">
                  {estimatedYield} {opportunity.tokenSymbol}
                </div>
              </div>
            </div>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center text-sm">
                <AlertCircle className="h-4 w-4 mr-2" />
                <span>{error}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="py-6 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin opacity-50" />
            <p className="text-sm text-muted-foreground mt-2">
              Loading opportunity details...
            </p>
          </div>
        )}
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleInvest}
            disabled={loading || !walletAddress || !opportunity || !amount || parseFloat(amount) <= 0}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Investing...
              </>
            ) : (
              'Invest Now'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
