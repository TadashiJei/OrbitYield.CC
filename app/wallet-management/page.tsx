'use client';

import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { 
  Wallet, 
  History, 
  BadgeAlert, 
  ChevronRight, 
  Shield, 
  ShieldAlert, 
  Clock,
  AlertTriangle,
  Check,
  XCircle,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import MetaMaskConnector from '@/components/wallet/MetaMaskConnector';
import MetaMaskActivities from '@/app/wallet-management/components/MetaMaskActivities';
import MetaMaskDetails from '@/app/wallet-management/components/MetaMaskDetails';
import RemovalRequestForm from '@/app/wallet-management/components/RemovalRequestForm';

export default function WalletManagementPage() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletData, setWalletData] = useState<any>(null);
  const [connections, setConnections] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showDisconnectDialog, setShowDisconnectDialog] = useState(false);
  
  useEffect(() => {
    // Check if MetaMask is connected
    const checkMetaMask = async () => {
      try {
        if (typeof window !== 'undefined' && window.ethereum) {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts && accounts.length > 0) {
            setWalletAddress(accounts[0]);
            fetchWalletData(accounts[0]);
            fetchConnections(accounts[0]);
          } else {
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error checking MetaMask connection:', error);
        setIsLoading(false);
      }
    };
    
    checkMetaMask();
  }, []);
  
  const handleConnect = (address: string) => {
    setWalletAddress(address);
    fetchWalletData(address);
    fetchConnections(address);
  };
  
  const fetchWalletData = async (address: string) => {
    setIsLoading(true);
    try {
      const investmentsResponse = await fetch(`/api/investments/count?walletAddress=${address}`);
      const transactionsResponse = await fetch(`/api/transactions/count?walletAddress=${address}`);
      
      if (investmentsResponse.ok && transactionsResponse.ok) {
        const investments = await investmentsResponse.json();
        const transactions = await transactionsResponse.json();
        
        setWalletData({
          investmentCount: investments.count,
          transactionCount: transactions.count,
          firstConnected: null, // Will be set from connections data
          lastActive: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchConnections = async (address: string) => {
    try {
      const response = await fetch(`/api/metamask/connections?walletAddress=${address}`);
      
      if (response.ok) {
        const data = await response.json();
        setConnections(data.connections || []);
        
        // Update first connected date if connections exist
        if (data.connections && data.connections.length > 0) {
          const sortedConnections = [...data.connections].sort(
            (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
          
          setWalletData(prev => ({
            ...prev,
            firstConnected: sortedConnections[0].createdAt
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching connections:', error);
    }
  };
  
  const handleDisconnectRequest = async (reason: string, email: string) => {
    try {
      const response = await fetch('/api/metamask/removal-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress,
          reason,
          contactEmail: email,
        }),
      });
      
      if (response.ok) {
        // Refresh connections to show updated status
        fetchConnections(walletAddress as string);
        setShowDisconnectDialog(false);
        alert('Disconnection request submitted successfully. An administrator will review your request.');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Failed to submit disconnection request.'}`);
      }
    } catch (error) {
      console.error('Error submitting disconnection request:', error);
      alert('An error occurred while submitting your disconnection request. Please try again.');
    }
  };
  
  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <div className="flex items-center mb-6">
        <Link href="/dashboard" className="mr-4">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Wallet Management</h1>
      </div>
      
      {!walletAddress && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Connect Your MetaMask Wallet</CardTitle>
            <CardDescription>
              Connect your MetaMask wallet to manage your investments and transactions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MetaMaskConnector onConnect={handleConnect} />
          </CardContent>
          <CardFooter className="flex flex-col items-start space-y-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Shield className="h-4 w-4 mr-2" />
              Your wallet information is securely stored and can only be removed with admin verification.
            </div>
          </CardFooter>
        </Card>
      )}
      
      {walletAddress && (
        <>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activities">Recent Activities</TabsTrigger>
              <TabsTrigger value="security">Security & Removal</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <MetaMaskDetails 
                walletAddress={walletAddress}
                walletData={walletData}
                isLoading={isLoading}
                connections={connections}
              />
            </TabsContent>
            
            <TabsContent value="activities">
              <MetaMaskActivities walletAddress={walletAddress} />
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" /> Security & Wallet Removal
                  </CardTitle>
                  <CardDescription>
                    Manage the security of your wallet connection and request disconnection if needed.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Connection Status</h3>
                    {connections.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Connected Since</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Last Activity</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {connections.map((connection) => {
                            const hasPendingRemovalRequest = connection.removalRequest && 
                              connection.removalRequest.status === 'pending';
                            
                            return (
                              <TableRow key={connection._id}>
                                <TableCell>
                                  {new Date(connection.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </TableCell>
                                <TableCell>
                                  {hasPendingRemovalRequest ? (
                                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                                      Disconnection Pending
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="bg-green-100 text-green-800">
                                      Connected
                                    </Badge>
                                  )}
                                </TableCell>
                                <TableCell>
                                  {new Date(connection.updatedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-muted-foreground">No connection records found.</div>
                    )}
                  </div>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-3" />
                      <div>
                        <h4 className="font-medium text-amber-800">Important Security Notice</h4>
                        <p className="text-sm text-amber-700 mt-1">
                          For your security, wallet disconnection requests require admin verification.
                          This helps prevent unauthorized removal and protects your assets.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <RemovalRequestForm 
                    walletAddress={walletAddress} 
                    onSubmit={handleDisconnectRequest}
                    hasPendingRequest={connections.some(c => 
                      c.removalRequest && c.removalRequest.status === 'pending'
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
