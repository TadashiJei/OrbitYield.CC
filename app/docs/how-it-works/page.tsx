import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How OrbitYield Works | Documentation",
  description: "Learn how OrbitYield uses AI and blockchain technology to maximize your DeFi yield across multiple chains.",
};

export default function HowItWorksPage() {
  return (
    <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="mb-16">
        <Link href="/docs" className="text-blue-600 hover:text-blue-800 flex items-center mb-8">
          <span className="mr-2">←</span> Back to Documentation
        </Link>
        <h1 className="text-4xl font-bold mb-6">
          How <span className="gradient-text">OrbitYield</span> Works
        </h1>
        <p className="text-xl text-gray-600">
          OrbitYield employs cutting-edge AI and blockchain technology to optimize your yield across multiple chains.
          Here&apos;s everything you need to know about how our platform works.
        </p>
      </div>

      {/* Platform Overview */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Platform Overview</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-lg mb-6">
                OrbitYield is an AI-powered cross-chain yield aggregator that automatically maximizes returns on your crypto assets.
                Our platform identifies the most profitable yield opportunities across multiple blockchains and protocols,
                then allocates your funds accordingly.
              </p>
              <p className="text-lg mb-6">
                Unlike traditional yield aggregators that operate on a single chain, OrbitYield can seamlessly move
                your assets across different blockchains to capture the highest yields wherever they may be.
              </p>
              <p className="text-lg">
                The platform is designed to be non-custodial, meaning you always maintain control of your assets.
                OrbitYield smart contracts interact with various DeFi protocols on your behalf, but funds can only
                move according to predefined parameters and with your explicit permission.
              </p>
            </div>
            <div className="relative h-80 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 mb-2">Platform architecture diagram</p>
                <p className="text-sm text-gray-400">(Interactive diagram coming soon)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The OrbitYield Process */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold mb-10">The OrbitYield Process</h2>
        
        <div className="space-y-16">
          {/* Step 1 */}
          <div className="bg-white p-10 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-2xl font-bold h-14 w-14 rounded-full flex items-center justify-center shrink-0">
                1
              </div>
              <h3 className="text-2xl font-semibold">Analysis & Opportunity Discovery</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="col-span-2">
                <p className="text-lg mb-4">
                  Our AI algorithms continuously scan the DeFi landscape across all supported blockchains, analyzing:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Current APY/APR of various protocols</li>
                  <li>Historical yield stability</li>
                  <li>Protocol security metrics and audit status</li>
                  <li>Total value locked (TVL)</li>
                  <li>Gas costs for interactions</li>
                  <li>Liquidity depth and withdrawal conditions</li>
                </ul>
                <p className="text-lg">
                  The algorithms then rank opportunities based on a combination of yield potential, risk assessment,
                  and your personal investment preferences.
                </p>
              </div>
              <div className="relative h-60 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500">Analysis illustration</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="bg-white p-10 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-2xl font-bold h-14 w-14 rounded-full flex items-center justify-center shrink-0">
                2
              </div>
              <h3 className="text-2xl font-semibold">Strategy Creation & Optimization</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="col-span-2">
                <p className="text-lg mb-4">
                  Based on the discovered opportunities, OrbitYield creates optimized yield strategies that:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Balance potential returns against risk</li>
                  <li>Factor in gas costs and bridge fees for cross-chain movements</li>
                  <li>Consider impermanent loss potential for liquidity pools</li>
                  <li>Account for lockup periods and withdrawal conditions</li>
                  <li>Create diversification across different yield sources</li>
                </ul>
                <p className="text-lg">
                  Our StrategyFactory smart contracts then prepare these strategies for deployment, ensuring
                  they meet all security requirements and operational parameters.
                </p>
              </div>
              <div className="relative h-60 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500">Strategy diagram</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="bg-white p-10 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-2xl font-bold h-14 w-14 rounded-full flex items-center justify-center shrink-0">
                3
              </div>
              <h3 className="text-2xl font-semibold">Asset Deployment & Management</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="col-span-2">
                <p className="text-lg mb-4">
                  Once you choose a strategy and deposit funds, the YieldAggregator smart contract:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Accepts your deposit and records your position</li>
                  <li>Routes your assets to the appropriate protocols across chains</li>
                  <li>Monitors position performance in real-time</li>
                  <li>Automatically harvests and compounds yields when profitable</li>
                  <li>Maintains detailed records of all transactions and earnings</li>
                </ul>
                <p className="text-lg">
                  The deployed strategy contracts interact directly with the underlying DeFi protocols using
                  specialized adapters for each platform, ensuring optimal integration and security.
                </p>
              </div>
              <div className="relative h-60 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500">Deployment illustration</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 4 */}
          <div className="bg-white p-10 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-2xl font-bold h-14 w-14 rounded-full flex items-center justify-center shrink-0">
                4
              </div>
              <h3 className="text-2xl font-semibold">Continuous Optimization & Rebalancing</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="col-span-2">
                <p className="text-lg mb-4">
                  The DeFi landscape changes rapidly, so OrbitYield continuously:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Monitors existing positions for performance changes</li>
                  <li>Evaluates new yield opportunities as they emerge</li>
                  <li>Calculates whether rebalancing would improve returns</li>
                  <li>Executes rebalancing when benefits exceed transaction costs</li>
                  <li>Updates risk assessments based on protocol behavior</li>
                </ul>
                <p className="text-lg">
                  This active management ensures your assets are always positioned to capture
                  the best yields available, adjusting to market conditions automatically.
                </p>
              </div>
              <div className="relative h-60 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500">Optimization graph</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-white p-10 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-2xl font-bold h-14 w-14 rounded-full flex items-center justify-center shrink-0">
                5
              </div>
              <h3 className="text-2xl font-semibold">Transparent Reporting & Withdrawals</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="col-span-2">
                <p className="text-lg mb-4">
                  Throughout your investment with OrbitYield, you have full visibility and control:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Real-time performance dashboard showing current yields</li>
                  <li>Detailed transaction history and fee accounting</li>
                  <li>Asset allocation breakdown across chains and protocols</li>
                  <li>One-click withdrawal process for any or all assets</li>
                  <li>Emergency withdrawal function for urgent access needs</li>
                </ul>
                <p className="text-lg">
                  When you request a withdrawal, the platform automatically retrieves your
                  assets from the deployed strategies and returns them to your wallet, calculating
                  and distributing any accrued yields in the process.
                </p>
              </div>
              <div className="relative h-60 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500">Dashboard preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Protocols */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Supported Protocols & Chains</h2>
          
          <div className="mb-10">
            <h3 className="text-2xl font-semibold mb-4">Blockchain Networks</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Ethereum", logo: "/path/to/eth.svg" },
                { name: "Arbitrum", logo: "/path/to/arbitrum.svg" },
                { name: "Optimism", logo: "/path/to/optimism.svg" },
                { name: "Base", logo: "/path/to/base.svg" },
                { name: "Polygon", logo: "/path/to/polygon.svg" },
                { name: "Avalanche", logo: "/path/to/avax.svg" },
                { name: "BNB Chain", logo: "/path/to/bnb.svg" },
                { name: "Fantom", logo: "/path/to/ftm.svg" },
              ].map((chain, index) => (
                <div key={index} className="p-4 border rounded-lg flex flex-col items-center">
                  <div className="w-12 h-12 mb-3 bg-gray-100 rounded-full"></div>
                  <span>{chain.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-4">Integrated Protocols</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-3">Lending Platforms</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Aave</li>
                  <li>Compound</li>
                  <li>Spark</li>
                  <li>Euler</li>
                  <li>Radiant</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3">Liquidity Protocols</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Uniswap</li>
                  <li>Curve</li>
                  <li>Balancer</li>
                  <li>SushiSwap</li>
                  <li>PancakeSwap</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3">Farming Platforms</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Convex</li>
                  <li>Yearn</li>
                  <li>Beefy</li>
                  <li>Ribbon</li>
                  <li>Stake DAO</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Risk Management */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Security & Risk Management</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Platform Security</h3>
              <p className="text-lg mb-4">
                OrbitYield employs multiple layers of security to protect user funds:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Audited Smart Contracts:</strong> All contracts undergo thorough security audits by leading firms.</li>
                <li><strong>Multi-Signature Controls:</strong> Admin functions require multiple approvals through our MultiSig wallet.</li>
                <li><strong>Formal Verification:</strong> Critical contract functions are mathematically verified.</li>
                <li><strong>Open Source Code:</strong> All contracts are publicly verifiable.</li>
                <li><strong>Bug Bounty Program:</strong> Rewards for responsible disclosure of security vulnerabilities.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Risk Assessment Framework</h3>
              <p className="text-lg mb-4">
                Our AI risk assessment model evaluates protocols on several dimensions:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Smart Contract Risk:</strong> Code quality, audit status, historical vulnerabilities.</li>
                <li><strong>Market Risk:</strong> Volatility, liquidity, impermanent loss potential.</li>
                <li><strong>Counterparty Risk:</strong> Protocol governance, team experience, track record.</li>
                <li><strong>Oracle Risk:</strong> Price feed reliability and manipulation resistance.</li>
                <li><strong>Operational Risk:</strong> Protocol complexity, dependencies, upgrade history.</li>
              </ul>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-6">Emergency Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-amber-200 bg-amber-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-3 text-amber-800">Emergency Withdrawals</h4>
                <p className="text-gray-700">
                  Users can trigger emergency withdrawals that bypass normal withdrawal processes
                  in urgent situations, ensuring you always have access to your funds.
                </p>
              </div>
              <div className="border border-amber-200 bg-amber-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-3 text-amber-800">Circuit Breakers</h4>
                <p className="text-gray-700">
                  Automatic system pausing if unusual activity is detected, such as large unexpected
                  losses or transaction patterns that indicate potential exploits.
                </p>
              </div>
              <div className="border border-amber-200 bg-amber-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-3 text-amber-800">Strategy Isolation</h4>
                <p className="text-gray-700">
                  Each strategy operates independently, preventing issues in one strategy from
                  affecting others and limiting the scope of potential problems.
                </p>
              </div>
              <div className="border border-amber-200 bg-amber-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-3 text-amber-800">Governance Controls</h4>
                <p className="text-gray-700">
                  Critical system changes require multi-signature approval and often include
                  time-locks, giving users time to withdraw if they disagree with changes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Fee Structure</h2>
          <p className="text-lg mb-8">
            OrbitYield maintains a simple and transparent fee structure designed to align our interests with those of our users:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Performance Fee</h3>
              <p className="text-5xl font-bold text-purple-600 mb-4">10%</p>
              <p className="text-gray-600">
                We take a 10% fee on the yields generated by your investments. This is only applied
                to earnings, not your principal amount, ensuring we only profit when you do.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Deposit Fee</h3>
              <p className="text-5xl font-bold text-purple-600 mb-4">0%</p>
              <p className="text-gray-600">
                We do not charge any fees for depositing assets into OrbitYield strategies.
                You only pay the network gas fees required for transactions.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Withdrawal Fee</h3>
              <p className="text-5xl font-bold text-purple-600 mb-4">0%</p>
              <p className="text-gray-600">
                There are no withdrawal fees for removing your assets from OrbitYield strategies.
                You only pay the network gas fees required for transactions.
              </p>
            </div>
          </div>
          
          <div className="mt-8 bg-blue-50 border border-blue-100 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-blue-800">Additional Costs</h3>
            <p className="text-gray-700 mb-4">
              When using OrbitYield, there are some external costs to be aware of:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Gas Fees:</strong> Network transaction fees for operations like deposits, withdrawals, and harvesting.</li>
              <li><strong>Bridge Fees:</strong> When assets move across chains, there may be bridge protocol fees.</li>
              <li><strong>Protocol Fees:</strong> Some underlying protocols charge their own fees (included in APY calculations).</li>
            </ul>
            <p className="mt-4 text-gray-700">
              OrbitYield&apos;s optimization algorithms factor these costs into strategy creation,
              ensuring transactions only occur when the benefits significantly outweigh the costs.
            </p>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section>
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-10 rounded-xl shadow-md text-white">
          <h2 className="text-3xl font-semibold mb-6">Ready to Start?</h2>
          <p className="text-xl mb-8">
            Now that you understand how OrbitYield works, it&apos;s time to put your assets to work
            and start earning optimized yields across the DeFi ecosystem.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <Link href="/docs/connect-wallet" className="bg-white bg-opacity-20 hover:bg-opacity-30 p-6 rounded-lg transition duration-200">
              <h3 className="text-xl font-semibold mb-3">1. Connect Your Wallet</h3>
              <p className="text-white text-opacity-90">
                Learn how to securely connect your crypto wallet to OrbitYield.
              </p>
            </Link>
            
            <Link href="/docs/first-investment" className="bg-white bg-opacity-20 hover:bg-opacity-30 p-6 rounded-lg transition duration-200">
              <h3 className="text-xl font-semibold mb-3">2. Make Your First Deposit</h3>
              <p className="text-white text-opacity-90">
                Step-by-step guide to depositing assets into a yield strategy.
              </p>
            </Link>
            
            <Link href="/docs/dashboard" className="bg-white bg-opacity-20 hover:bg-opacity-30 p-6 rounded-lg transition duration-200">
              <h3 className="text-xl font-semibold mb-3">3. Monitor Your Portfolio</h3>
              <p className="text-white text-opacity-90">
                Learn how to track your investments and yields in real-time.
              </p>
            </Link>
          </div>
          
          <div className="text-center">
            <a href="https://app.orbityield.cc" className="inline-block bg-white text-purple-700 font-semibold px-8 py-3 rounded-lg text-lg hover:bg-gray-100 transition duration-200">
              Launch App
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
