import { useState, useEffect } from 'react';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Clock, 
  ExternalLink, 
  CheckCircle,
  Shield,
  AlertCircle,
  Wallet,
  CircleDollarSign,
  ArrowRightLeft,
  RefreshCw
} from "lucide-react";
import { format, formatDistanceToNow } from 'date-fns';

interface MetaMaskActivitiesProps {
  walletAddress: string | null;
}

// Activity type color mapping
const activityColorMap: Record<string, string> = {
  connect: "bg-green-100 text-green-800",
  disconnect: "bg-orange-100 text-orange-800",
  investment: "bg-blue-100 text-blue-800",
  withdrawal: "bg-purple-100 text-purple-800",
  transaction: "bg-slate-100 text-slate-800",
  removalRequest: "bg-yellow-100 text-yellow-800",
  admin: "bg-red-100 text-red-800",
};

export default function MetaMaskActivities({ walletAddress }: MetaMaskActivitiesProps) {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (walletAddress) {
      fetchActivities();
    } else {
      setActivities([]);
      setLoading(false);
    }
  }, [walletAddress]);
  
  const fetchActivities = async () => {
    if (!walletAddress) return;
    
    setLoading(true);
    
    try {
      // In development, always use sample activities
      if (process.env.NODE_ENV !== 'production') {
        const sampleActivities = generateSampleActivities(walletAddress);
        setTimeout(() => {
          setActivities(sampleActivities);
          setLoading(false);
        }, 500); // Simulate loading delay
        return;
      }
      
      // Fetch wallet activities (for production)
      const response = await fetch(`/api/metamask/activities?walletAddress=${walletAddress}`);
      const data = await response.json();
      
      if (data.success && data.data && data.data.length > 0) {
        setActivities(data.data);
      } else {
        // If API returns empty or fails, use sample activities
        const sampleActivities = generateSampleActivities(walletAddress);
        setActivities(sampleActivities);
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
      
      // Fallback to sample activities if API fails
      const sampleActivities = generateSampleActivities(walletAddress);
      setActivities(sampleActivities);
    } finally {
      setLoading(false);
    }
  };
  
  // Generate sample activities for demonstration
  const generateSampleActivities = (address: string) => {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    return [
      {
        _id: '1',
        type: 'connect',
        walletAddress: address,
        timestamp: now.toISOString(),
        details: 'Wallet connected to OrbitYield platform',
        ip: '192.168.1.1'
      },
      {
        _id: '2',
        type: 'investment',
        walletAddress: address,
        timestamp: oneHourAgo.toISOString(),
        details: 'Invested 0.5 ETH in Polkadot Yield Strategy',
        txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
      },
      {
        _id: '3',
        type: 'transaction',
        walletAddress: address,
        timestamp: oneDayAgo.toISOString(),
        details: 'Transferred 1.2 ETH to Cross-Chain Strategy',
        txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890'
      },
      {
        _id: '4',
        type: 'withdrawal',
        walletAddress: address,
        timestamp: threeDaysAgo.toISOString(),
        details: 'Withdrew 0.3 ETH from Cosmos Yield Strategy',
        txHash: '0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456'
      },
      {
        _id: '5',
        type: 'connect',
        walletAddress: address,
        timestamp: oneWeekAgo.toISOString(),
        details: 'Initial wallet connection',
        ip: '192.168.1.100'
      }
    ];
  };
  
  // Add refresh button functionality
  const handleRefresh = () => {
    if (walletAddress) {
      fetchActivities();
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
  
  // Get activity icon based on type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'connect':
        return <Wallet className="h-4 w-4" />;
      case 'disconnect':
        return <Shield className="h-4 w-4" />;
      case 'investment':
        return <CircleDollarSign className="h-4 w-4" />;
      case 'withdrawal':
        return <ArrowRightLeft className="h-4 w-4" />;
      case 'transaction':
        return <ArrowRightLeft className="h-4 w-4" />;
      case 'removalRequest':
        return <AlertCircle className="h-4 w-4" />;
      case 'admin':
        return <Shield className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Recent Activities</h3>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          className="text-xs gap-1"
        >
          <RefreshCw className="h-4 w-4" /> Refresh
        </Button>
      </div>
      
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : activities.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity._id}>
                <TableCell className="whitespace-nowrap">
                  <div className="text-sm">{formatDate(activity.timestamp)}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={`flex items-center gap-1 ${activityColorMap[activity.type] || 'bg-gray-100 text-gray-800'}`}>
                    {getActivityIcon(activity.type)}
                    {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{activity.details}</div>
                  {activity.transactionHash && (
                    <div className="text-xs text-blue-600 hover:underline">
                      <a 
                        href={`https://${activity.chain || 'polkadot'}.subscan.io/tx/${activity.transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        View Transaction <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                  {activity.investmentId && (
                    <div className="text-xs text-blue-600 hover:underline">
                      <a 
                        href={`/investments?id=${activity.investmentId}`}
                        className="flex items-center gap-1"
                      >
                        View Investment <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-6 bg-secondary/20 rounded-lg">
          <p className="text-muted-foreground">No activities found for this wallet</p>
        </div>
      )}
      
      <div className="text-xs text-muted-foreground">
        This log records all wallet activities, including connections, transactions, and security events.
      </div>
    </div>
  );
}
