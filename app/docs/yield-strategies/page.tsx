import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yield Strategies Explained | OrbitYield Documentation",
  description: "Learn about the different yield strategies available on OrbitYield, including risk levels, mechanisms, and optimization techniques.",
};

export default function YieldStrategiesPage() {
  return (
    <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="mb-16">
        <Link href="/docs" className="text-blue-600 hover:text-blue-800 flex items-center mb-8">
          <span className="mr-2">←</span> Back to Documentation
        </Link>
        <h1 className="text-4xl font-bold mb-6">
          Yield <span className="gradient-text">Strategies</span> Explained
        </h1>
        <p className="text-xl text-gray-600">
          Understanding yield strategies is key to maximizing your returns on OrbitYield. This guide explains the different strategy types, risk levels, and optimization techniques.
        </p>
      </div>

      {/* What Are Yield Strategies */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">What Are Yield Strategies?</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-lg mb-6">
                Yield strategies are carefully designed investment approaches that determine how your assets are deployed across DeFi protocols to generate returns.
              </p>
              <p className="text-lg mb-6">
                Each strategy in OrbitYield is a unique combination of:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-lg mb-6">
                <li>Underlying DeFi protocols (lending platforms, DEXs, etc.)</li>
                <li>Asset allocations across those protocols</li>
                <li>Cross-chain deployments when applicable</li>
                <li>Compounding methods and frequencies</li>
                <li>Risk management parameters</li>
              </ul>
              <p className="text-lg">
                OrbitYield's AI constantly analyzes market conditions to create, monitor, and adjust these strategies for optimal returns while managing risk.
              </p>
            </div>
            <div className="relative h-80 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 mb-2">Strategy architecture diagram</p>
                <p className="text-sm text-gray-400">(Interactive diagram coming soon)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Types */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold mb-10">Core Strategy Types</h2>
        
        <div className="space-y-12">
          {/* Lending Strategies */}
          <div className="bg-white p-10 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="md:w-1/3">
                <div className="bg-blue-600 text-white p-6 rounded-lg h-full">
                  <h3 className="text-2xl font-semibold mb-4">Lending Strategies</h3>
                  <p className="text-lg">
                    Generate yield by providing your assets to lending protocols where borrowers pay interest.
                  </p>
                </div>
              </div>
              <div className="md:w-2/3">
                <h4 className="text-xl font-semibold mb-3">How Lending Strategies Work</h4>
                <p className="text-lg mb-4">
                  When you invest in a lending strategy, your assets are deployed to DeFi lending protocols like Compound, Aave, or Euler. These protocols lend your assets to borrowers who pay interest, which becomes your yield.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-green-800 mb-2">Advantages</h5>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                      <li>Lower risk profile</li>
                      <li>Stable, predictable yields</li>
                      <li>High liquidity (withdraw anytime)</li>
                      <li>No impermanent loss</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-yellow-800 mb-2">Considerations</h5>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                      <li>Generally lower APYs than other strategies</li>
                      <li>Interest rates fluctuate with market demand</li>
                      <li>Smart contract risk exposure</li>
                    </ul>
                  </div>
                </div>
                <p className="text-gray-700">
                  OrbitYield's lending strategies utilize multiple lending platforms simultaneously, automatically moving your assets to whichever protocol offers the highest rates at any given time.
                </p>
              </div>
            </div>
          </div>
          
          {/* Liquidity Provision Strategies */}
          <div className="bg-white p-10 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="md:w-1/3">
                <div className="bg-purple-600 text-white p-6 rounded-lg h-full">
                  <h3 className="text-2xl font-semibold mb-4">Liquidity Provision Strategies</h3>
                  <p className="text-lg">
                    Earn trading fees and rewards by providing liquidity to decentralized exchanges.
                  </p>
                </div>
              </div>
              <div className="md:w-2/3">
                <h4 className="text-xl font-semibold mb-3">How Liquidity Provision Works</h4>
                <p className="text-lg mb-4">
                  Liquidity provision strategies involve supplying asset pairs to decentralized exchanges like Uniswap, SushiSwap, or Curve. You earn a share of the trading fees generated when users swap between those assets.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-green-800 mb-2">Advantages</h5>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                      <li>Higher yields than lending</li>
                      <li>Additional token incentives</li>
                      <li>Double revenue streams (fees + rewards)</li>
                      <li>Support DeFi infrastructure</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-yellow-800 mb-2">Considerations</h5>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                      <li>Impermanent loss risk</li>
                      <li>Higher volatility in returns</li>
                      <li>Medium risk profile</li>
                      <li>Complex mechanics</li>
                    </ul>
                  </div>
                </div>
                <p className="text-gray-700">
                  OrbitYield's AI carefully selects asset pairs with correlated price movements to minimize impermanent loss while maximizing fee generation.
                </p>
              </div>
            </div>
          </div>
          
          {/* Staking Strategies */}
          <div className="bg-white p-10 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="md:w-1/3">
                <div className="bg-green-600 text-white p-6 rounded-lg h-full">
                  <h3 className="text-2xl font-semibold mb-4">Staking Strategies</h3>
                  <p className="text-lg">
                    Lock your assets to support blockchain networks and protocols in exchange for rewards.
                  </p>
                </div>
              </div>
              <div className="md:w-2/3">
                <h4 className="text-xl font-semibold mb-3">How Staking Strategies Work</h4>
                <p className="text-lg mb-4">
                  Staking involves locking your tokens to participate in network consensus (for PoS blockchains) or governance (for DeFi protocols). In return, you receive staking rewards from inflation or protocol fees.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-green-800 mb-2">Advantages</h5>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                      <li>Predictable reward schedules</li>
                      <li>No impermanent loss</li>
                      <li>Governance rights (often included)</li>
                      <li>Support network security</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-yellow-800 mb-2">Considerations</h5>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                      <li>Lockup periods (reduced liquidity)</li>
                      <li>Token price risk</li>
                      <li>Slashing penalties (for validators)</li>
                      <li>Unbonding waiting periods</li>
                    </ul>
                  </div>
                </div>
                <p className="text-gray-700">
                  OrbitYield's staking strategies include both native blockchain staking (like ETH staking) and protocol staking (like staking governance tokens in DeFi projects).
                </p>
              </div>
            </div>
          </div>
          
          {/* Yield Farming Strategies */}
          <div className="bg-white p-10 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="md:w-1/3">
                <div className="bg-orange-600 text-white p-6 rounded-lg h-full">
                  <h3 className="text-2xl font-semibold mb-4">Yield Farming Strategies</h3>
                  <p className="text-lg">
                    Complex multi-step strategies that maximize protocol incentives and rewards.
                  </p>
                </div>
              </div>
              <div className="md:w-2/3">
                <h4 className="text-xl font-semibold mb-3">How Yield Farming Works</h4>
                <p className="text-lg mb-4">
                  Yield farming strategies combine multiple DeFi actions to maximize returns, often involving providing liquidity, staking LP tokens, harvesting rewards, and reinvesting them in a continuous cycle.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-green-800 mb-2">Advantages</h5>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                      <li>Highest potential APYs</li>
                      <li>Multiple reward tokens</li>
                      <li>Leveraged yield opportunities</li>
                      <li>Early access to new protocols</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-yellow-800 mb-2">Considerations</h5>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                      <li>Highest risk profile</li>
                      <li>Complex interactions</li>
                      <li>APY volatility</li>
                      <li>Higher gas costs</li>
                    </ul>
                  </div>
                </div>
                <p className="text-gray-700">
                  OrbitYield automates the entire yield farming process, handling complex interactions, optimal harvest timing, and reinvestment strategies to maximize your returns while minimizing gas costs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Risk Categories */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Strategy Risk Categories</h2>
          
          <p className="text-lg mb-8">
            OrbitYield classifies strategies into risk categories to help you make informed decisions based on your risk tolerance.
          </p>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg border-t-4 border-blue-600">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Conservative</h3>
                <p className="text-gray-700 mb-3">
                  Low-risk strategies focused on capital preservation with modest yields.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                  <li>Major lending protocols only</li>
                  <li>Stablecoin-focused</li>
                  <li>Established blue-chip protocols</li>
                  <li>Multiple audits and long track records</li>
                  <li>Approximate APY: 2-8%</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg border-t-4 border-purple-600">
                <h3 className="text-xl font-semibold text-purple-800 mb-3">Balanced</h3>
                <p className="text-gray-700 mb-3">
                  Moderate-risk strategies that balance yield potential with reasonable security.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                  <li>Mix of lending and liquidity strategies</li>
                  <li>Stable asset pairs for LP positions</li>
                  <li>Established mid-tier protocols</li>
                  <li>Some exposure to market volatility</li>
                  <li>Approximate APY: 8-20%</li>
                </ul>
              </div>
              
              <div className="bg-pink-50 p-6 rounded-lg border-t-4 border-pink-600">
                <h3 className="text-xl font-semibold text-pink-800 mb-3">Aggressive</h3>
                <p className="text-gray-700 mb-3">
                  Higher-risk strategies designed to maximize potential returns.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                  <li>Complex yield farming strategies</li>
                  <li>More volatile asset pairs</li>
                  <li>Newer protocols with higher rewards</li>
                  <li>Leveraged positions (carefully managed)</li>
                  <li>Approximate APY: 20%+</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded mt-6">
              <h3 className="text-xl font-semibold mb-3">Risk Factors Considered</h3>
              <p className="text-gray-700 mb-4">
                OrbitYield evaluates multiple risk factors when categorizing and creating strategies:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-3 rounded shadow-sm">
                  <h4 className="font-semibold mb-1">Smart Contract Risk</h4>
                  <p className="text-sm text-gray-600">Protocol audits, code quality, history of exploits</p>
                </div>
                <div className="bg-white p-3 rounded shadow-sm">
                  <h4 className="font-semibold mb-1">Market Risk</h4>
                  <p className="text-sm text-gray-600">Asset volatility, correlation, liquidity depth</p>
                </div>
                <div className="bg-white p-3 rounded shadow-sm">
                  <h4 className="font-semibold mb-1">Protocol Risk</h4>
                  <p className="text-sm text-gray-600">Team reputation, TVL, time in operation</p>
                </div>
                <div className="bg-white p-3 rounded shadow-sm">
                  <h4 className="font-semibold mb-1">Complexity Risk</h4>
                  <p className="text-sm text-gray-600">Number of interactions, dependencies, failure points</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Chain Strategies */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Cross-Chain Strategy Intelligence</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
            <div>
              <p className="text-lg mb-6">
                OrbitYield's most powerful feature is its ability to deploy assets across multiple blockchains to capture the highest yields, regardless of which network they're on.
              </p>
              <p className="text-lg mb-6">
                This cross-chain functionality allows us to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-lg">
                <li>Access exclusive opportunities on emerging L1 and L2 networks</li>
                <li>Capitalize on yield differentials between chains</li>
                <li>Reduce concentration risk by diversifying across networks</li>
                <li>Optimize for lower gas fees on certain networks</li>
                <li>Participate in incentivized liquidity mining programs across chains</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Supported Networks</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded shadow-sm flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                  <span>Ethereum</span>
                </div>
                <div className="bg-white p-3 rounded shadow-sm flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                  <span>Arbitrum</span>
                </div>
                <div className="bg-white p-3 rounded shadow-sm flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                  <span>Optimism</span>
                </div>
                <div className="bg-white p-3 rounded shadow-sm flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                  <span>Polygon</span>
                </div>
                <div className="bg-white p-3 rounded shadow-sm flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                  <span>Avalanche</span>
                </div>
                <div className="bg-white p-3 rounded shadow-sm flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                  <span>+ More</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">How Cross-Chain Strategies Work</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-800 font-bold h-8 w-8 rounded-full flex items-center justify-center shrink-0 mr-4 mt-1">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Opportunity Detection</h4>
                  <p className="text-gray-700">
                    OrbitYield's AI scans all supported chains simultaneously, identifying yield opportunities and their relative attractiveness after accounting for bridging costs.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-800 font-bold h-8 w-8 rounded-full flex items-center justify-center shrink-0 mr-4 mt-1">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Bridging Optimization</h4>
                  <p className="text-gray-700">
                    When a high-yield opportunity is identified on another chain, the platform calculates whether the yield differential justifies the bridging costs and latency.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-800 font-bold h-8 w-8 rounded-full flex items-center justify-center shrink-0 mr-4 mt-1">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Secure Asset Transfer</h4>
                  <p className="text-gray-700">
                    Using industry-leading bridges and cross-chain messaging protocols, assets are securely transferred to the target chain for deployment.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-800 font-bold h-8 w-8 rounded-full flex items-center justify-center shrink-0 mr-4 mt-1">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Strategy Execution</h4>
                  <p className="text-gray-700">
                    Once on the target chain, assets are deployed according to the specific strategy parameters, with all interactions happening automatically.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-800 font-bold h-8 w-8 rounded-full flex items-center justify-center shrink-0 mr-4 mt-1">
                  5
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Continuous Monitoring</h4>
                  <p className="text-gray-700">
                    The platform continuously monitors the performance and will bridge assets back to the original chain or to another chain if opportunities shift.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Power of AI in Strategy Optimization */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">AI-Powered Strategy Optimization</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
            <div>
              <p className="text-lg mb-6">
                OrbitYield's AI engine is the heart of our strategy optimization, leveraging machine learning and data analysis to maximize your returns while managing risk.
              </p>
              <p className="text-lg">
                Our proprietary algorithms analyze millions of data points across the DeFi landscape, making decisions no human manager could match in terms of speed, accuracy, and efficiency.
              </p>
            </div>
            <div className="relative h-64 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 mb-2">AI optimization visualization</p>
                <p className="text-sm text-gray-400">(Interactive visualization coming soon)</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Data-Driven Decisions</h3>
              <p className="text-gray-700">
                Our AI analyzes historical yield data, protocol metrics, token economics, market trends, and risk indicators to identify optimal investment pathways.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Predictive Modeling</h3>
              <p className="text-gray-700">
                Using advanced machine learning models, we predict yield trends, protocol performance, and market shifts before they happen, positioning your assets accordingly.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Gas Optimization</h3>
              <p className="text-gray-700">
                Our AI precisely times transactions to minimize gas costs, batches operations when possible, and uses gas-efficient contract interactions to preserve your returns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Selection Guide */}
      <section>
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-10 rounded-xl shadow-md text-white">
          <h2 className="text-3xl font-semibold mb-6">Choosing the Right Strategy</h2>
          
          <p className="text-lg mb-8">
            When selecting strategies for your portfolio, consider the following factors:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3">Your Investment Timeline</h3>
              <p className="text-white text-opacity-90">
                Short-term investors (less than 30 days) should prioritize liquid strategies without lockups.
                Long-term investors can benefit from higher-yield strategies with staking or lock periods.
              </p>
            </div>
            
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3">Risk Tolerance</h3>
              <p className="text-white text-opacity-90">
                Be honest about your comfort with volatility and potential losses. Higher yields always come with higher risks.
                Consider diversifying across risk categories rather than going all-in on high-risk strategies.
              </p>
            </div>
            
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3">Gas Efficiency</h3>
              <p className="text-white text-opacity-90">
                If investing smaller amounts, prioritize strategies with less frequent rebalancing or those on L2s with lower gas costs.
                Larger investments can absorb more frequent operations and still remain profitable.
              </p>
            </div>
            
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3">Portfolio Composition</h3>
              <p className="text-white text-opacity-90">
                Aim for strategies that complement your existing crypto holdings. If you're already heavily exposed to certain assets,
                seek strategies that hedge or diversify that exposure.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <Link href="/docs/first-investment" className="inline-block bg-white text-purple-700 font-semibold px-8 py-3 rounded-lg text-lg hover:bg-gray-100 transition duration-200">
              Make Your First Investment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
