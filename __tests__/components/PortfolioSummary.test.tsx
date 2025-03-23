import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PortfolioSummary } from '@/app/portfolio/components/PortfolioSummary';
import { useYieldContracts } from '@/hooks/useYieldContracts';
import '@testing-library/jest-dom';

// Mock the useYieldContracts hook
jest.mock('@/hooks/useYieldContracts', () => ({
  useYieldContracts: jest.fn()
}));

// Mock the toast component
jest.mock('@/components/ui/use-toast', () => ({
  toast: jest.fn(),
  useToast: () => ({
    toast: jest.fn()
  })
}));

describe('PortfolioSummary', () => {
  const mockUserPositions = [
    {
      strategy: '0x123',
      strategyType: 'lending',
      asset: '0xabc',
      assetSymbol: 'DAI',
      protocolName: 'Aave',
      depositAmount: '1000000000000000000', // 1 DAI in wei
      depositValue: '1000000000000000000', // 1 DAI in wei
      depositTimestamp: Math.floor(Date.now() / 1000) - 3600 * 24 * 7, // 7 days ago
      apy: 500, // 5%
      rewards: '50000000000000000' // 0.05 DAI in wei
    },
    {
      strategy: '0x456',
      strategyType: 'farming',
      asset: '0xdef',
      assetSymbol: 'ETH',
      protocolName: 'Compound',
      depositAmount: '500000000000000000', // 0.5 ETH in wei
      depositValue: '1000000000000000000', // 1 ETH in wei (assuming 1 ETH = $2000)
      depositTimestamp: Math.floor(Date.now() / 1000) - 3600 * 24 * 3, // 3 days ago
      apy: 1200, // 12%
      rewards: '20000000000000000' // 0.02 ETH in wei
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays wallet not connected message when not connected', () => {
    (useYieldContracts as jest.Mock).mockReturnValue({
      isConnected: false,
      address: null,
      getUserPositions: jest.fn()
    });

    render(<PortfolioSummary />);
    expect(screen.getByText(/wallet not connected/i)).toBeInTheDocument();
  });

  it('displays loading state while fetching positions', () => {
    (useYieldContracts as jest.Mock).mockReturnValue({
      isConnected: true,
      address: '0x123',
      getUserPositions: jest.fn().mockReturnValue([])
    });

    render(<PortfolioSummary />);
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  it('displays empty state when no positions found', async () => {
    (useYieldContracts as jest.Mock).mockReturnValue({
      isConnected: true,
      address: '0x123',
      getUserPositions: jest.fn().mockResolvedValue([])
    });

    render(<PortfolioSummary />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText(/no active yield positions/i)).toBeInTheDocument();
    });
  });

  it('displays portfolio summary with positions', async () => {
    (useYieldContracts as jest.Mock).mockReturnValue({
      isConnected: true,
      address: '0x123',
      getUserPositions: jest.fn().mockResolvedValue(mockUserPositions),
      withdraw: jest.fn().mockResolvedValue({ hash: '0x123' }),
      claimRewards: jest.fn().mockResolvedValue({ hash: '0x456' })
    });

    render(<PortfolioSummary />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText(/Total portfolio value/i)).toBeInTheDocument();
    });

    // Check if position details are displayed
    expect(screen.getByText('DAI')).toBeInTheDocument();
    expect(screen.getByText('ETH')).toBeInTheDocument();
    expect(screen.getByText('Aave')).toBeInTheDocument();
    expect(screen.getByText('Compound')).toBeInTheDocument();
  });

  it('handles withdraw action correctly', async () => {
    const mockWithdraw = jest.fn().mockResolvedValue({ hash: '0x123' });
    
    (useYieldContracts as jest.Mock).mockReturnValue({
      isConnected: true,
      address: '0x123',
      getUserPositions: jest.fn().mockResolvedValue(mockUserPositions),
      withdraw: mockWithdraw,
      claimRewards: jest.fn().mockResolvedValue({ hash: '0x456' })
    });

    render(<PortfolioSummary />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText(/Total portfolio value/i)).toBeInTheDocument();
    });

    // Find and click withdraw button
    const withdrawButtons = screen.getAllByText(/withdraw/i);
    fireEvent.click(withdrawButtons[0]);
    
    // Check if withdraw function was called with correct parameters
    await waitFor(() => {
      expect(mockWithdraw).toHaveBeenCalledWith(
        '0x123', // strategy
        '0xabc', // asset
        '1000000000000000000' // amount
      );
    });
  });

  it('handles claim rewards action correctly', async () => {
    const mockClaimRewards = jest.fn().mockResolvedValue({ hash: '0x456' });
    
    (useYieldContracts as jest.Mock).mockReturnValue({
      isConnected: true,
      address: '0x123',
      getUserPositions: jest.fn().mockResolvedValue(mockUserPositions),
      withdraw: jest.fn().mockResolvedValue({ hash: '0x123' }),
      claimRewards: mockClaimRewards
    });

    render(<PortfolioSummary />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText(/Total portfolio value/i)).toBeInTheDocument();
    });

    // Find and click claim rewards button
    const claimButtons = screen.getAllByText(/claim/i);
    fireEvent.click(claimButtons[0]);
    
    // Check if claimRewards function was called with correct parameters
    await waitFor(() => {
      expect(mockClaimRewards).toHaveBeenCalledWith(
        '0x123', // strategy
        '0xabc' // asset
      );
    });
  });

  it('handles errors during position fetching', async () => {
    (useYieldContracts as jest.Mock).mockReturnValue({
      isConnected: true,
      address: '0x123',
      getUserPositions: jest.fn().mockRejectedValue(new Error('Failed to fetch positions'))
    });

    render(<PortfolioSummary />);
    
    // Wait for loading to complete and error to be displayed
    await waitFor(() => {
      expect(screen.getByText(/error loading portfolio/i)).toBeInTheDocument();
    });
  });
});
