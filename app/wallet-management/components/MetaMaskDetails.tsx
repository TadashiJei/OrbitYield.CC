import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
// Directly importing the default export from date-fns/format to avoid TS issues
import formatDateFn from "date-fns/format";
import { 
  ExternalLink, 
  Clock, 
  AlertCircle, 
  CircleDollarSign,
  FileText,
  CheckCircle,
  RotateCw,
  ShieldAlert
} from "lucide-react";

interface MetaMaskDetailsProps {
  walletData: any;
  walletAddress: string | null;
  isLoading: boolean;
  connections: any[];
}

export default function MetaMaskDetails({
  walletData,
  walletAddress,
  isLoading,
  connections
}: MetaMaskDetailsProps) {
  if (!walletAddress) return null;
  
  // Format date in readable format
  const formatWalletDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDateFn(date, 'MMM d, yyyy HH:mm');
    } catch (e) {
      return 'Invalid date';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Current Wallet</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-md border px-4 py-3 font-mono text-sm">
            {walletAddress}
            <Link
              href={`https://etherscan.io/address/${walletAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center ml-2 text-blue-600 hover:text-blue-800"
            >
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
          
          <div className="flex justify-between gap-4">
            <div className="flex items-center space-x-2">
              <CircleDollarSign className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-sm font-medium">
                  {connections.length} {connections.length === 1 ? 'Investment' : 'Investments'}
                </div>
                <div className="text-xs text-muted-foreground">Active positions</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-sm font-medium">
                  {connections.length} {connections.length === 1 ? 'Transaction' : 'Transactions'}
                </div>
                <div className="text-xs text-muted-foreground">Recorded</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Connection Details</h3>
          <dl className="grid grid-cols-2 gap-1 text-sm">
            <dt className="text-muted-foreground">First Connected:</dt>
            <dd>{walletData ? formatWalletDate(walletData.createdAt) : <Skeleton className="h-4 w-24" />}</dd>
            
            <dt className="text-muted-foreground">Last Activity:</dt>
            <dd>{walletData ? formatWalletDate(walletData.lastUsed || walletData.createdAt) : <Skeleton className="h-4 w-24" />}</dd>
            
            <dt className="text-muted-foreground">Connection ID:</dt>
            <dd className="truncate">{walletData?._id || <Skeleton className="h-4 w-24" />}</dd>
            
            <dt className="text-muted-foreground">Connection Status:</dt>
            <dd>
              {walletData ? (
                <Badge className="bg-green-100 text-green-800">
                  Active
                </Badge>
              ) : (
                <Skeleton className="h-4 w-16" />
              )}
            </dd>
          </dl>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Disconnect Request</h3>
          {isLoading ? (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Loading removal request status...
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="rounded-md border p-3 text-sm">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-800">
                      No active removal requests for this wallet. You can request disconnection if needed.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      For security reasons, wallet disconnection requests require admin approval. Make sure to withdraw your
                      assets before requesting a disconnection.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="border-t pt-4 mt-6">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p>
              For security reasons, wallet disconnection requests require admin approval. Make sure to withdraw your
              assets before requesting a disconnection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
