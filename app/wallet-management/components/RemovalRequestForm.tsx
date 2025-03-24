import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, Loader2 } from 'lucide-react';

interface RemovalRequestFormProps {
  walletAddress: string | null;
  onSubmit: (reason: string, email: string) => Promise<void>;
  hasPendingRequest?: boolean;
  onCancel?: () => void;
}

export default function RemovalRequestForm({ 
  walletAddress, 
  onSubmit,
  hasPendingRequest = false,
  onCancel = () => {} 
}: RemovalRequestFormProps) {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Validate email
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Check if form is valid
  const isFormValid = () => {
    return isValidEmail(email) && reason.trim().length >= 10;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      setError('Please fill in all fields correctly');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      await onSubmit(reason, email);
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error('Form submission error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle cancel - clear form
  const handleCancel = () => {
    setEmail('');
    setReason('');
    setError(null);
    onCancel();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
        <p className="text-xs text-muted-foreground">
          We'll send confirmation and updates about your request to this email
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="reason">Reason for Disconnection</Label>
        <Textarea
          id="reason"
          placeholder="Please explain why you want to disconnect this wallet..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          disabled={loading}
          required
          className="min-h-[100px]"
        />
        <p className="text-xs text-muted-foreground">
          This information helps us improve our services and ensure your security
        </p>
      </div>
      
      <div className="rounded-md bg-amber-50 p-3">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-medium">Important Notice</p>
            <p>
              By requesting disconnection, you understand that:
            </p>
            <ul className="list-disc pl-4 mt-1 space-y-1">
              <li>Admin approval is required to disconnect wallets for security</li>
              <li>Active investments should be withdrawn before disconnection</li>
              <li>The process may take 24-48 hours to complete</li>
            </ul>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="rounded-md bg-red-50 p-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      )}
      
      <div className="flex justify-end gap-2 pt-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={loading || !isFormValid()}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Request'
          )}
        </Button>
      </div>
    </form>
  );
}
