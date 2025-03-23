import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, LogOut, Wallet } from 'lucide-react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

interface MetaMaskConnectorProps {
  onConnect?: (account: string) => void;
  onDisconnect?: () => void;
  buttonVariant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  buttonSize?: 'default' | 'sm' | 'lg' | 'icon';
  buttonText?: string;
  className?: string;
}

export default function MetaMaskConnector({
  onConnect,
  onDisconnect,
  buttonVariant = 'default',
  buttonSize = 'default',
  buttonText = 'Connect Wallet',
  className
}: MetaMaskConnectorProps) {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRemovalDialog, setShowRemovalDialog] = useState(false);
  const [removalEmail, setRemovalEmail] = useState('');
  const [removalReason, setRemovalReason] = useState('');
  const [isSubmittingRemoval, setIsSubmittingRemoval] = useState(false);
  const [pendingRemovalRequest, setPendingRemovalRequest] = useState(false);

  // Check if MetaMask is available
  const isMetaMaskAvailable = typeof window !== 'undefined' && window.ethereum;

  // Check if we're already connected
  useEffect(() => {
    if (isConnected && address && onConnect) {
      onConnect(address);
      
      // Check with our API if this account has a pending removal request
      const checkPendingRemoval = async () => {
        try {
          const response = await fetch(`/api/metamask?walletAddress=${address}`);
          const data = await response.json();
          
          if (data.success && data.data.length > 0) {
            const connection = data.data[0];
            if (connection.removalRequest?.status === 'pending') {
              setPendingRemovalRequest(true);
            }
          }
        } catch (err) {
          console.error('Error checking removal status:', err);
        }
      };
      
      checkPendingRemoval();
    } else if (!isConnected && onDisconnect) {
      onDisconnect();
    }
  }, [isConnected, address, onConnect, onDisconnect]);

  // Connect to MetaMask
  const connectWallet = useCallback(async () => {
    if (!isMetaMaskAvailable) {
      setError('MetaMask is not installed. Please install MetaMask to continue.');
      return;
    }

    try {
      setIsConnecting(true);
      setError(null);
      
      // Force disconnect first to clear any stale state
      disconnect();
      
      // Connect using wagmi
      connect({ connector: injected() });
      
      // If connection successful and we have an address, save the connection
      if (address !== undefined && address !== null) {
        try {
          // Save the connection to our database
          await fetch('/api/metamask', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              walletAddress: address,
            }),
          });
        } catch (err) {
          console.error('Error saving connection:', err);
        }
      }
    } catch (err: any) {
      console.error('Error connecting wallet:', err);
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  }, [isMetaMaskAvailable, connect, disconnect, address]);

  // Disconnect wallet (request removal)
  const requestDisconnect = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address) return;
    
    try {
      setIsSubmittingRemoval(true);
      
      const response = await fetch('/api/metamask/removal-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: address,
          email: removalEmail,
          reason: removalReason,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setPendingRemovalRequest(true);
        setShowRemovalDialog(false);
        // We don't actually disconnect the wallet here,
        // just mark it in our database as pending removal
      } else {
        throw new Error(data.error || 'Failed to request disconnection');
      }
    } catch (err: any) {
      console.error('Error requesting disconnection:', err);
      setError(err.message || 'Failed to request disconnection');
    } finally {
      setIsSubmittingRemoval(false);
    }
  };

  // Immediately disconnect (for development purposes)
  const handleDisconnect = () => {
    disconnect();
    if (onDisconnect) {
      onDisconnect();
    }
  };

  // Format address for display
  const formatAddress = (addr: string | undefined) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <div className={className}>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 flex items-center text-sm">
          <AlertCircle className="h-4 w-4 mr-2" />
          {error}
        </div>
      )}
      
      {!isConnected ? (
        <Button
          variant={buttonVariant}
          size={buttonSize}
          onClick={connectWallet}
          disabled={isConnecting || !isMetaMaskAvailable}
          className="flex items-center justify-center w-full py-6 text-lg font-medium"
        >
          <Wallet className="mr-2 h-5 w-5" />
          {isConnecting ? 'Connecting...' : buttonText}
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <div className="px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-gray-700">
            {address ? formatAddress(address) : ''}
          </div>
          
          {pendingRemovalRequest ? (
            <div className="text-amber-600 text-xs font-medium flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Removal pending
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowRemovalDialog(true)}
              className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 hover:bg-red-50"
            >
              <LogOut className="h-3 w-3 mr-1" /> Disconnect
            </Button>
          )}
        </div>
      )}
      
      {/* Disconnection request dialog */}
      <Dialog open={showRemovalDialog} onOpenChange={setShowRemovalDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Wallet Disconnection</DialogTitle>
            <DialogDescription>
              For security purposes, wallet connections require admin approval for removal.
              Please provide your email and reason for disconnection.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={requestDisconnect}>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={removalEmail}
                  onChange={(e) => setRemovalEmail(e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <Label htmlFor="reason">Reason for Disconnection</Label>
                <Textarea
                  id="reason"
                  required
                  value={removalReason}
                  onChange={(e) => setRemovalReason(e.target.value)}
                  placeholder="Please explain why you want to disconnect your wallet"
                  rows={3}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowRemovalDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isSubmittingRemoval}
              >
                {isSubmittingRemoval ? 'Submitting...' : 'Submit Request'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
