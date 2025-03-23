import { NextRequest } from 'next/server';
import { POST } from '@/app/api/yield/optimize/route';
import { YieldOptimizer } from '@/lib/yield/yield-optimizer';

// Mock the YieldOptimizer class
jest.mock('@/lib/yield/yield-optimizer', () => {
  return {
    YieldOptimizer: jest.fn().mockImplementation(() => {
      return {
        generateOptimizedPortfolio: jest.fn().mockResolvedValue({
          totalAPY: 850, // 8.5%
          totalRisk: 5,
          allocations: [
            {
              opportunity: {
                id: '1',
                strategyAddress: '0x123',
                assetAddress: '0xabc',
                assetSymbol: 'DAI',
                protocolName: 'Aave',
                strategyType: 'lending',
                apy: 500, // 5%
                risk: 3,
                tvl: '1000000000000000000000', // 1000 tokens in wei
              },
              amount: '500000000000000000000', // 500 tokens in wei
              percentage: 50 // 50%
            },
            {
              opportunity: {
                id: '2',
                strategyAddress: '0x456',
                assetAddress: '0xdef',
                assetSymbol: 'ETH',
                protocolName: 'Compound',
                strategyType: 'farming',
                apy: 1200, // 12%
                risk: 7,
                tvl: '500000000000000000000', // 500 tokens in wei
              },
              amount: '500000000000000000000', // 500 tokens in wei 
              percentage: 50 // 50%
            }
          ]
        })
      };
    }),
    YieldPreferences: jest.requireActual('@/lib/yield/yield-optimizer').YieldPreferences
  };
});

// Mock ethers
jest.mock('ethers', () => {
  const original = jest.requireActual('ethers');
  return {
    ethers: {
      ...original.ethers,
      providers: {
        JsonRpcProvider: jest.fn().mockImplementation(() => ({}))
      },
      utils: {
        isHexString: jest.fn().mockImplementation((value) => {
          return typeof value === 'string' && value.startsWith('0x');
        }),
        parseEther: jest.fn().mockImplementation((value) => {
          return {
            toString: () => '1000000000000000000' // 1 ETH in wei
          };
        }),
        formatEther: jest.fn().mockImplementation((value) => {
          return '1.0'; // 1 ETH
        }),
        BigNumber: {
          from: jest.fn().mockImplementation((value) => {
            return {
              mul: jest.fn().mockReturnThis(),
              div: jest.fn().mockReturnThis()
            };
          })
        }
      }
    }
  };
});

describe('Yield Optimizer API', () => {
  const createMockRequest = (body = {}) => {
    return {
      json: jest.fn().mockResolvedValue(body)
    } as unknown as NextRequest;
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should return a 400 error when required parameters are missing', async () => {
    const req = createMockRequest({});
    const res = await POST(req);
    
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.success).toBe(false);
    expect(data.error).toContain('Missing required parameters');
  });
  
  it('should return a 400 error for invalid totalAmount', async () => {
    const req = createMockRequest({
      totalAmount: 'invalid-amount',
      preferences: { riskTolerance: 5 }
    });
    const res = await POST(req);
    
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.success).toBe(false);
    expect(data.error).toContain('Invalid totalAmount format');
  });
  
  it('should return an optimized portfolio with valid parameters', async () => {
    const req = createMockRequest({
      totalAmount: '1000', // 1000 tokens
      preferences: {
        riskTolerance: 5,
        minAPY: 5,
        prioritizeAPY: true
      }
    });
    
    const res = await POST(req);
    const data = await res.json();
    
    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data.totalAPY).toBe(850);
    expect(data.data.totalRisk).toBe(5);
    expect(data.data.allocations.length).toBe(2);
    expect(data.data.allocations[0].opportunity.strategyType).toBe('lending');
    expect(data.data.allocations[1].opportunity.strategyType).toBe('farming');
  });
  
  it('should accept a hex string for totalAmount', async () => {
    const req = createMockRequest({
      totalAmount: '0x1000',
      preferences: { riskTolerance: 5 }
    });
    
    const res = await POST(req);
    const data = await res.json();
    
    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
  });
});
