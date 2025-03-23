'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
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
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Check, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface RemovalRequest {
  _id: string;
  userId: {
    _id: string;
    username?: string;
    email?: string;
  };
  walletAddress: string;
  connectedAt: string;
  lastUsed: string;
  isActive: boolean;
  removalRequest: {
    requestedAt: string;
    status: 'pending' | 'approved' | 'rejected';
    reason?: string;
    email?: string;
    processedAt?: string;
    processedBy?: string;
  };
}

export default function MetaMaskAdminPage() {
  const [requests, setRequests] = useState<RemovalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<RemovalRequest | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [processingRequest, setProcessingRequest] = useState(false);
  const [stats, setStats] = useState({ pendingRequests: 0 });

  // Fetch removal requests
  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/admin/metamask?status=pending');
      const data = await response.json();
      
      if (data.success) {
        setRequests(data.data);
        setStats(data.stats || { pendingRequests: data.data.length });
      } else {
        throw new Error(data.error || 'Failed to fetch requests');
      }
    } catch (err: any) {
      console.error('Error fetching removal requests:', err);
      setError(err.message || 'An error occurred while fetching requests');
    } finally {
      setLoading(false);
    }
  };

  // Process a removal request
  const processRequest = async (requestId: string, status: 'approved' | 'rejected') => {
    try {
      setProcessingRequest(true);
      
      const response = await fetch('/api/admin/metamask', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          connectionId: requestId,
          status,
          notifyUser: true,
          // In a real app, you would include the admin ID here
          // adminId: currentUser._id,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Update the local state
        setRequests(prevRequests => 
          prevRequests.map(req => 
            req._id === requestId
              ? { ...req, removalRequest: { ...req.removalRequest, status } }
              : req
          )
        );
        
        // Close the details dialog
        setDetailsOpen(false);
        setSelectedRequest(null);
        
        // Refresh the data
        fetchRequests();
      } else {
        throw new Error(data.error || 'Failed to process request');
      }
    } catch (err: any) {
      console.error('Error processing request:', err);
      setError(err.message || 'An error occurred while processing the request');
    } finally {
      setProcessingRequest(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchRequests();
  }, []);

  // Open details dialog for a request
  const viewDetails = (request: RemovalRequest) => {
    setSelectedRequest(request);
    setDetailsOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">MetaMask Connection Management</h1>
          <p className="text-muted-foreground">
            Review and process wallet disconnection requests
          </p>
        </div>
        
        <Button onClick={fetchRequests} variant="outline">
          Refresh
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Pending Requests</CardTitle>
            <CardDescription>
              Awaiting administrator approval
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              {stats.pendingRequests}
            </p>
          </CardContent>
        </Card>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Disconnection Requests</CardTitle>
          <CardDescription>
            Users who have requested to disconnect their MetaMask wallets
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading requests...</div>
          ) : requests.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No pending disconnection requests
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Wallet Address</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Requested</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request._id}>
                    <TableCell className="font-mono">
                      {request.walletAddress.substring(0, 10)}...
                    </TableCell>
                    <TableCell>{request.removalRequest.email}</TableCell>
                    <TableCell>
                      {formatDistanceToNow(new Date(request.removalRequest.requestedAt), { addSuffix: true })}
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        request.removalRequest.status === 'pending' ? 'outline' :
                        request.removalRequest.status === 'approved' ? 'success' : 'destructive'
                      }>
                        {request.removalRequest.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" onClick={() => viewDetails(request)}>
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      
      {/* Details Dialog */}
      {selectedRequest && (
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Disconnection Request Details</DialogTitle>
              <DialogDescription>
                Review the details of this wallet disconnection request
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="font-semibold">Wallet Address:</div>
                <div className="col-span-2 font-mono break-all">{selectedRequest.walletAddress}</div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="font-semibold">Email:</div>
                <div className="col-span-2">{selectedRequest.removalRequest.email}</div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="font-semibold">Reason:</div>
                <div className="col-span-2">
                  {selectedRequest.removalRequest.reason || 'No reason provided'}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="font-semibold">Requested:</div>
                <div className="col-span-2">
                  {new Date(selectedRequest.removalRequest.requestedAt).toLocaleString()}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="font-semibold">Connected Since:</div>
                <div className="col-span-2">
                  {new Date(selectedRequest.connectedAt).toLocaleString()}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="font-semibold">Last Used:</div>
                <div className="col-span-2">
                  {new Date(selectedRequest.lastUsed).toLocaleString()}
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex space-x-2">
              <Button
                variant="ghost"
                onClick={() => setDetailsOpen(false)}
                disabled={processingRequest}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => processRequest(selectedRequest._id, 'rejected')}
                disabled={processingRequest}
                className="flex items-center"
              >
                <X className="mr-2 h-4 w-4" /> Reject
              </Button>
              <Button
                variant="default"
                onClick={() => processRequest(selectedRequest._id, 'approved')}
                disabled={processingRequest}
                className="flex items-center"
              >
                <Check className="mr-2 h-4 w-4" /> Approve
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
