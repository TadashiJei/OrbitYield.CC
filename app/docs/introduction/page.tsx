import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Introduction to OrbitYield | Documentation",
  description: "An introduction to OrbitYield, the AI-powered cross-chain yield aggregator platform.",
};

export default function IntroductionPage() {
  return (
    <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="mb-16">
        <Link href="/docs" className="text-blue-600 hover:text-blue-800 flex items-center mb-8">
          <span className="mr-2">←</span> Back to Documentation
        </Link>
        <h1 className="text-4xl font-bold mb-6">
          Introduction to <span className="gradient-text">OrbitYield</span>
        </h1>
        <p className="text-xl text-gray-600">
          Welcome to OrbitYield, the AI-powered cross-chain yield aggregator that revolutionizes how you earn returns on your crypto assets.
        </p>
      </div>

      {/* What is OrbitYield */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">What is OrbitYield?</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-lg mb-6">
                OrbitYield is a next-generation yield optimization platform that uses artificial intelligence to 
                find and deploy capital to the most profitable yield opportunities across multiple blockchains.
              </p>
              <p className="text-lg mb-6">
                Unlike traditional yield aggregators that operate on a single blockchain, OrbitYield works across 
                all major DeFi ecosystems, intelligently moving your assets to capture the highest yields wherever they may be.
              </p>
              <p className="text-lg">
                Our platform analyzes thousands of yield opportunities in real-time, factoring in gas costs, bridge fees, 
                impermanent loss risks, protocol security, and historical performance to deliver optimized strategies that 
                maximize your returns while managing risk.
              </p>
            </div>
            <div className="relative h-80 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 mb-2">Platform overview</p>
                <p className="text-sm text-gray-400">(Illustration coming soon)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold mb-10">Key Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="h-12 w-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">AI-Powered Yield Optimization</h3>
            <p className="text-gray-600">
              Our proprietary AI algorithms continuously scan the DeFi landscape to identify the most 
              profitable yield opportunities while assessing risk factors, ensuring optimal capital allocation.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="h-12 w-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Cross-Chain Intelligence</h3>
            <p className="text-gray-600">
              Break free from single-chain limitations. OrbitYield operates across 10+ blockchains, 
              automatically moving your assets to where they can earn the highest returns.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="h-12 w-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Security-First Approach</h3>
            <p className="text-gray-600">
              All protocols are thoroughly vetted through our multi-factor risk assessment framework. 
              Non-custodial design ensures you always remain in control of your assets.
            </p>
          </div>
          
          {/* Feature 4 */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="h-12 w-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Customizable Strategies</h3>
            <p className="text-gray-600">
              Choose from automated strategies based on your risk tolerance and financial goals, 
              or create custom strategies tailored to your specific preferences.
            </p>
          </div>
          
          {/* Feature 5 */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="h-12 w-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Real-Time Analytics</h3>
            <p className="text-gray-600">
              Access comprehensive performance metrics through our intuitive dashboard, 
              providing full transparency into your investments and earnings.
            </p>
          </div>
          
          {/* Feature 6 */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="h-12 w-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Gas-Optimized Transactions</h3>
            <p className="text-gray-600">
              Our smart gas optimization system executes transactions when network fees are lowest, 
              maximizing your effective yield by minimizing transaction costs.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">How It Works</h2>
          <p className="text-lg mb-8">
            OrbitYield makes earning optimal yields simple, even across multiple blockchains:
          </p>
          
          <div className="space-y-10">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="bg-purple-100 text-purple-800 text-2xl font-bold h-12 w-12 rounded-full flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
                <p className="text-gray-600">
                  Simply connect your wallet to the OrbitYield platform. We support MetaMask, WalletConnect, 
                  Coinbase Wallet, and other popular wallet providers.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="bg-purple-100 text-purple-800 text-2xl font-bold h-12 w-12 rounded-full flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Choose a Strategy</h3>
                <p className="text-gray-600">
                  Browse our available yield strategies, filtered by your risk tolerance, preferred assets, 
                  or target returns. Each strategy shows detailed metrics including APY, risk assessment, 
                  and historical performance.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="bg-purple-100 text-purple-800 text-2xl font-bold h-12 w-12 rounded-full flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Deposit Assets</h3>
                <p className="text-gray-600">
                  Deposit your crypto assets into your selected strategy. Our smart contracts handle 
                  all the complexity of deploying your assets to the underlying protocols across 
                  different blockchains.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="bg-purple-100 text-purple-800 text-2xl font-bold h-12 w-12 rounded-full flex items-center justify-center shrink-0">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Earn Optimized Yields</h3>
                <p className="text-gray-600">
                  Your assets start earning yields immediately. Our AI continuously monitors your 
                  positions and rebalances as needed to maintain optimal returns, automatically 
                  compounding earnings when beneficial.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="bg-purple-100 text-purple-800 text-2xl font-bold h-12 w-12 rounded-full flex items-center justify-center shrink-0">
                5
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Track Performance</h3>
                <p className="text-gray-600">
                  Monitor your investments through our intuitive dashboard. View real-time yields, 
                  asset allocations, historical performance, and detailed transaction history.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="bg-purple-100 text-purple-800 text-2xl font-bold h-12 w-12 rounded-full flex items-center justify-center shrink-0">
                6
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Withdraw Anytime</h3>
                <p className="text-gray-600">
                  Access your funds whenever you need them. OrbitYield has no lock-up periods, 
                  allowing you to withdraw your assets and accumulated yields at any time.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-10">
            <Link href="/docs/how-it-works" className="text-blue-600 hover:text-blue-800">
              Learn more about how OrbitYield works →
            </Link>
          </div>
        </div>
      </section>

      {/* Supported Chains */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Supported Blockchain Networks</h2>
          <p className="text-lg mb-8">
            OrbitYield currently supports the following blockchains:
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "Ethereum", icon: "eth" },
              { name: "Arbitrum", icon: "arbitrum" },
              { name: "Optimism", icon: "optimism" },
              { name: "Base", icon: "base" },
              { name: "Polygon", icon: "polygon" },
              { name: "Avalanche", icon: "avalanche" },
              { name: "BNB Chain", icon: "bnb" },
              { name: "Fantom", icon: "fantom" },
              { name: "zkSync Era", icon: "zksync" },
              { name: "Linea", icon: "linea" },
              { name: "Moonbeam", icon: "moonbeam" },
              { name: "Celo", icon: "celo" }
            ].map((chain, index) => (
              <div key={index} className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                  {/* Placeholder for chain icon */}
                </div>
                <span className="text-center">{chain.name}</span>
              </div>
            ))}
          </div>
          
          <p className="mt-8 text-gray-600">
            The OrbitYield team is continuously working to add support for more blockchain networks.
          </p>
        </div>
      </section>

      {/* Getting Started */}
      <section>
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-10 rounded-xl shadow-md text-white">
          <h2 className="text-3xl font-semibold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Explore our comprehensive documentation to learn more about OrbitYield and begin your journey toward optimized DeFi yields.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <Link href="/docs/connect-wallet" className="bg-white bg-opacity-20 hover:bg-opacity-30 p-6 rounded-lg transition duration-200">
              <h3 className="text-xl font-semibold mb-3">Connect Your Wallet</h3>
              <p className="text-white text-opacity-90">
                Learn how to connect your wallet to OrbitYield.
              </p>
            </Link>
            
            <Link href="/docs/first-investment" className="bg-white bg-opacity-20 hover:bg-opacity-30 p-6 rounded-lg transition duration-200">
              <h3 className="text-xl font-semibold mb-3">Make Your First Investment</h3>
              <p className="text-white text-opacity-90">
                Step-by-step guide to making your first deposit.
              </p>
            </Link>
            
            <Link href="/docs/yield-strategies" className="bg-white bg-opacity-20 hover:bg-opacity-30 p-6 rounded-lg transition duration-200">
              <h3 className="text-xl font-semibold mb-3">Explore Yield Strategies</h3>
              <p className="text-white text-opacity-90">
                Learn about the various yield strategies available.
              </p>
            </Link>
          </div>
          
          <div className="text-center">
            <a href="https://orbityield.cc/dashboard" className="inline-block bg-white text-purple-700 font-semibold px-8 py-3 rounded-lg text-lg hover:bg-gray-100 transition duration-200">
              Launch App
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
