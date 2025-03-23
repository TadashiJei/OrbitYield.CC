import { NextRequest } from 'next/server';
import { GET } from '@/app/api/yield/opportunities/route';
import { YieldOptimizer } from '@/lib/yield/yield-optimizer';

// Mock the YieldOptimizer class
jest.mock('@/lib/yield/yield-optimizer', () => {
  return {
    YieldOptimizer: jest.fn().mockImplementation(() => {
      return {
        discoverOpportunities: jest.fn().mockResolvedValue([
          {
            id: '1',
            strategyAddress: '0x123',
            assetAddress: '0xabc',
            assetSymbol: 'DAI',
            protocolName: 'Aave',
            strategyType: 'lending',
            apy: 500, // 5%
            risk: 3,
            tvl: '1000000000000000000000', // 1000 tokens in wei
            minDeposit: '1000000000000000000', // 1 token in wei
            lockupPeriod: 0
          },
          {
            id: '2',
            strategyAddress: '0x456',
            assetAddress: '0xdef',
            assetSymbol: 'ETH',
            protocolName: 'Compound',
            strategyType: 'farming',
            apy: 1200, // 12%
            risk: 7,
            tvl: '500000000000000000000', // 500 tokens in wei
            minDeposit: '10000000000000000', // 0.01 token in wei
            lockupPeriod: 86400 // 1 day
          }
        ])
      };
    })
  };
});

// Mock ethers
jest.mock('ethers', () => {
  return {
    ethers: {
      providers: {
        JsonRpcProvider: jest.fn().mockImplementation(() => ({}))
      }
    }
  };
});

describe('Yield Opportunities API', () => {
  const createMockRequest = (searchParams = {}) => {
    const url = new URL('https://example.com/api/yield/opportunities');
    
    // Add search params
    Object.entries(searchParams).forEach(([key, value]) => {
      url.searchParams.append(key, value as string);
    });
    
    return {
      nextUrl: url
    } as unknown as NextRequest;
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should return all opportunities when no filters are provided', async () => {
    const req = createMockRequest();
    const res = await GET(req);
    const data = await res.json();
    
    expect(data.success).toBe(true);
    expect(data.data.length).toBe(2);
    expect(data.data[0].assetSymbol).toBe('DAI');
    expect(data.data[1].assetSymbol).toBe('ETH');
  });
  
  it('should filter opportunities by asset address', async () => {
    const req = createMockRequest({ assetAddress: '0xabc' });
    const res = await GET(req);
    const data = await res.json();
    
    expect(data.success).toBe(true);
    expect(data.data.length).toBe(1);
    expect(data.data[0].assetSymbol).toBe('DAI');
  });
  
  it('should filter opportunities by minimum APY', async () => {
    const req = createMockRequest({ minApy: '10' });
    const res = await GET(req);
    const data = await res.json();
    
    expect(data.success).toBe(true);
    expect(data.data.length).toBe(1);
    expect(data.data[0].assetSymbol).toBe('ETH');
  });
  
  it('should filter opportunities by maximum risk', async () => {
    const req = createMockRequest({ maxRisk: '5' });
    const res = await GET(req);
    const data = await res.json();
    
    expect(data.success).toBe(true);
    expect(data.data.length).toBe(1);
    expect(data.data[0].assetSymbol).toBe('DAI');
  });
  
  it('should filter opportunities by strategy type', async () => {
    const req = createMockRequest({ strategyType: 'farming' });
    const res = await GET(req);
    const data = await res.json();
    
    expect(data.success).toBe(true);
    expect(data.data.length).toBe(1);
    expect(data.data[0].strategyType).toBe('farming');
  });
  
  it('should combine multiple filters correctly', async () => {
    const req = createMockRequest({ 
      minApy: '10', 
      strategyType: 'farming',
      maxRisk: '8'
    });
    const res = await GET(req);
    const data = await res.json();
    
    expect(data.success).toBe(true);
    expect(data.data.length).toBe(1);
    expect(data.data[0].assetSymbol).toBe('ETH');
  });
  
  it('should return no results when filters match nothing', async () => {
    const req = createMockRequest({ 
      minApy: '20', 
      strategyType: 'lending'
    });
    const res = await GET(req);
    const data = await res.json();
    
    expect(data.success).toBe(true);
    expect(data.data.length).toBe(0);
  });
});
