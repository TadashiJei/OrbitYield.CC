import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TransactionHistory } from '@/app/portfolio/components/TransactionHistory';
import { useYieldContracts } from '@/hooks/useYieldContracts';
import '@testing-library/jest-dom';

// Mock the useYieldContracts hook
jest.mock('@/hooks/useYieldContracts', () => ({
  useYieldContracts: jest.fn()
}));

// Mock fetch for API calls
global.fetch = jest.fn();

// Mock window.open
const mockOpen = jest.fn();
Object.defineProperty(window, 'open', {
  writable: true,
  value: mockOpen
});

describe('TransactionHistory', () => {
  const mockTransactions = [
    {
      id: '1',
      type: 'deposit',
      timestamp: Math.floor(Date.now() / 1000) - 604800, // 7 days ago
      asset: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      assetSymbol: 'DAI',
      amount: '100000000000000000000', // 100 DAI
      strategy: '0x1234567890123456789012345678901234567891',
      strategyType: 'lending',
      protocolName: 'Aave',
      transactionHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890'
    },
    {
      id: '2',
      type: 'withdraw',
      timestamp: Math.floor(Date.now() / 1000) - 259200, // 3 days ago
      asset: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      assetSymbol: 'DAI',
      amount: '50000000000000000000', // 50 DAI
      strategy: '0x1234567890123456789012345678901234567891',
      strategyType: 'lending',
      protocolName: 'Aave',
      transactionHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567892'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockImplementation(() => 
      Promise.resolve({
        json: () => Promise.resolve({ success: true, transactions: mockTransactions })
      })
    );
  });

  it('displays wallet not connected message when not connected', () => {
    (useYieldContracts as jest.Mock).mockReturnValue({
      isConnected: false,
      address: null
    });

    render(<TransactionHistory />);
    expect(screen.getByText(/wallet not connected/i)).toBeInTheDocument();
  });

  it('displays loading state while fetching transactions', async () => {
    (useYieldContracts as jest.Mock).mockReturnValue({
      isConnected: true,
      address: '0x123'
    });

    // Delay the fetch response
    (global.fetch as jest.Mock).mockImplementation(() => 
      new Promise(resolve => {
        setTimeout(() => {
          resolve({
            json: () => Promise.resolve({ success: true, transactions: mockTransactions })
          });
        }, 100);
      })
    );

    render(<TransactionHistory />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays transactions when fetch is successful', async () => {
    (useYieldContracts as jest.Mock).mockReturnValue({
      isConnected: true,
      address: '0x123'
    });

    render(<TransactionHistory />);
    
    // Wait for transactions to load
    await waitFor(() => {
      expect(screen.getByText('Transaction History')).toBeInTheDocument();
    });

    // Check if transaction details are displayed
    expect(screen.getByText('DAI')).toBeInTheDocument();
    expect(screen.getByText('Aave')).toBeInTheDocument();
    expect(screen.getAllByText(/deposit/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/withdraw/i)[0]).toBeInTheDocument();
  });

  it('displays no transactions message when none are found', async () => {
    (useYieldContracts as jest.Mock).mockReturnValue({
      isConnected: true,
      address: '0x123'
    });

    // Mock empty transactions response
    (global.fetch as jest.Mock).mockImplementation(() => 
      Promise.resolve({
        json: () => Promise.resolve({ success: true, transactions: [] })
      })
    );

    render(<TransactionHistory />);
    
    // Wait for transactions to load
    await waitFor(() => {
      expect(screen.getByText(/no transactions found/i)).toBeInTheDocument();
    });
  });

  it('handles API failures gracefully', async () => {
    (useYieldContracts as jest.Mock).mockReturnValue({
      isConnected: true,
      address: '0x123'
    });

    // Mock API failure
    (global.fetch as jest.Mock).mockImplementation(() => 
      Promise.reject(new Error('API failure'))
    );

    render(<TransactionHistory />);
    
    // Wait for transactions to load (should fall back to mock data)
    await waitFor(() => {
      expect(screen.getByText('Transaction History')).toBeInTheDocument();
    });

    // Should still display some transaction data (from mock fallback)
    expect(screen.getAllByText(/deposit/i)[0]).toBeInTheDocument();
  });

  it('filters transactions based on search input', async () => {
    (useYieldContracts as jest.Mock).mockReturnValue({
      isConnected: true,
      address: '0x123'
    });

    render(<TransactionHistory />);
    
    // Wait for transactions to load
    await waitFor(() => {
      expect(screen.getByText('Transaction History')).toBeInTheDocument();
    });

    // Both deposit and withdraw should be visible initially
    expect(screen.getAllByText(/deposit/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/withdraw/i)[0]).toBeInTheDocument();

    // Filter for only deposits
    const searchInput = screen.getByPlaceholderText(/search by asset/i);
    fireEvent.change(searchInput, { target: { value: 'deposit' } });

    // Now only deposit should be visible
    expect(screen.getAllByText(/deposit/i)[0]).toBeInTheDocument();
    expect(screen.queryByText('withdraw')).not.toBeInTheDocument();
  });

  it('opens block explorer when clicking view transaction', async () => {
    (useYieldContracts as jest.Mock).mockReturnValue({
      isConnected: true,
      address: '0x123'
    });

    render(<TransactionHistory />);
    
    // Wait for transactions to load
    await waitFor(() => {
      expect(screen.getByText('Transaction History')).toBeInTheDocument();
    });

    // Click the view button for the first transaction
    const viewButtons = screen.getAllByText('View');
    fireEvent.click(viewButtons[0]);

    // Check if window.open was called with correct URL
    expect(mockOpen).toHaveBeenCalledWith(
      `https://etherscan.io/tx/${mockTransactions[0].transactionHash}`,
      '_blank'
    );
  });
});
