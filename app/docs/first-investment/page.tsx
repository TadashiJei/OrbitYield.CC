import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Making Your First Investment | OrbitYield Documentation",
  description: "Step-by-step guide to making your first deposit and investment in OrbitYield's optimized yield strategies.",
};

export default function FirstInvestmentPage() {
  return (
    <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="mb-16">
        <Link href="/docs" className="text-blue-600 hover:text-blue-800 flex items-center mb-8">
          <span className="mr-2">←</span> Back to Documentation
        </Link>
        <h1 className="text-4xl font-bold mb-6">
          Making Your First <span className="gradient-text">Investment</span>
        </h1>
        <p className="text-xl text-gray-600">
          Follow this step-by-step guide to make your first deposit and start earning optimized yields with OrbitYield.
        </p>
      </div>

      {/* Prerequisites */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Prerequisites</h2>
          
          <p className="text-lg mb-6">
            Before making your first investment with OrbitYield, make sure you have:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Connected Wallet</h3>
              </div>
              <p className="text-gray-700">
                Your wallet should be connected to OrbitYield. If you haven't connected yet, follow our <Link href="/docs/connect-wallet" className="text-blue-600 hover:text-blue-800">wallet connection guide</Link> first.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Supported Assets</h3>
              </div>
              <p className="text-gray-700">
                Funds in one of our supported assets (ETH, USDC, USDT, DAI, WBTC, etc.) in your wallet. You'll need enough for your investment plus gas fees.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Correct Network</h3>
              </div>
              <p className="text-gray-700">
                Your wallet should be on the appropriate blockchain network for the strategy you want to invest in. OrbitYield will prompt you to switch networks if needed.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Basic Knowledge</h3>
              </div>
              <p className="text-gray-700">
                A basic understanding of how yield strategies work. If you're new to yield farming, check our <Link href="/docs/yield-strategies" className="text-blue-600 hover:text-blue-800">Yield Strategies Explained</Link> guide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-step Guide */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold mb-10">Step-by-Step Investment Guide</h2>
        
        <div className="space-y-12">
          {/* Step 1 */}
          <div className="bg-white p-10 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="bg-gray-100 rounded-xl p-4 h-60 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">(Screenshot: Navigate to Strategies page)</p>
                </div>
              </div>
              <div className="md:w-2/3">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 text-purple-800 text-2xl font-bold h-12 w-12 rounded-full flex items-center justify-center shrink-0 mr-4">
                    1
                  </div>
                  <h3 className="text-2xl font-semibold">Navigate to Strategies</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  From the OrbitYield dashboard, click on "Strategies" in the main navigation menu. This will take you to a page displaying all available yield strategies.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <p className="text-gray-700">
                    <strong>Tip:</strong> You can use the filters to narrow down strategies by asset type, chain, risk level, or APY range to find the perfect match for your investment goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="bg-white p-10 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="bg-gray-100 rounded-xl p-4 h-60 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">(Screenshot: Select a strategy)</p>
                </div>
              </div>
              <div className="md:w-2/3">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 text-purple-800 text-2xl font-bold h-12 w-12 rounded-full flex items-center justify-center shrink-0 mr-4">
                    2
                  </div>
                  <h3 className="text-2xl font-semibold">Select a Strategy</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Browse through the available strategies and select one that aligns with your investment goals. Each strategy card displays:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                  <li>Asset type (ETH, USDC, etc.)</li>
                  <li>Current APY</li>
                  <li>Risk level</li>
                  <li>Blockchain network</li>
                  <li>Strategy description</li>
                </ul>
                <p className="text-gray-700">
                  Click on a strategy card to view more details, including historical performance, underlying protocols, and user reviews.
                </p>
              </div>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="bg-white p-10 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="bg-gray-100 rounded-xl p-4 h-60 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">(Screenshot: Investment form)</p>
                </div>
              </div>
              <div className="md:w-2/3">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 text-purple-800 text-2xl font-bold h-12 w-12 rounded-full flex items-center justify-center shrink-0 mr-4">
                    3
                  </div>
                  <h3 className="text-2xl font-semibold">Enter Investment Amount</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  After selecting a strategy, click the "Invest" button to open the investment form. Enter the amount you wish to invest.
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mb-4">
                  <p className="text-gray-700">
                    <strong>Note:</strong> Each strategy has a minimum investment amount (typically 0.01 ETH or $10 in stablecoins). The platform will show your current wallet balance for reference.
                  </p>
                </div>
                <p className="text-gray-700">
                  You'll see an estimate of your expected returns based on the current APY and your investment amount. Review this information carefully before proceeding.
                </p>
              </div>
            </div>
          </div>
          
          {/* Step 4 */}
          <div className="bg-white p-10 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="bg-gray-100 rounded-xl p-4 h-60 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">(Screenshot: Approve token)</p>
                </div>
              </div>
              <div className="md:w-2/3">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 text-purple-800 text-2xl font-bold h-12 w-12 rounded-full flex items-center justify-center shrink-0 mr-4">
                    4
                  </div>
                  <h3 className="text-2xl font-semibold">Approve Token Spending (If Needed)</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  If this is your first time investing with a particular token, you'll need to approve the OrbitYield smart contracts to use your tokens.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
                  <li>Click the "Approve" button</li>
                  <li>A transaction request will appear in your wallet</li>
                  <li>Review the approval request details</li>
                  <li>Confirm the transaction and pay the gas fee</li>
                </ol>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <p className="text-gray-700">
                    <strong>Tip:</strong> This is a one-time approval for each token. Future investments with the same token won't require this step.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 5 */}
          <div className="bg-white p-10 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="bg-gray-100 rounded-xl p-4 h-60 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">(Screenshot: Confirm investment)</p>
                </div>
              </div>
              <div className="md:w-2/3">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 text-purple-800 text-2xl font-bold h-12 w-12 rounded-full flex items-center justify-center shrink-0 mr-4">
                    5
                  </div>
                  <h3 className="text-2xl font-semibold">Confirm Your Investment</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  After approval (or immediately if approval wasn't needed), click the "Invest" button to finalize your investment.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
                  <li>Review all investment details one final time</li>
                  <li>A transaction request will appear in your wallet</li>
                  <li>Confirm the transaction and pay the gas fee</li>
                  <li>Wait for the transaction to be processed on the blockchain</li>
                </ol>
                <p className="text-gray-700">
                  The platform will show a loading indicator while your transaction is being processed. This can take anywhere from a few seconds to a few minutes depending on network congestion.
                </p>
              </div>
            </div>
          </div>
          
          {/* Step 6 */}
          <div className="bg-white p-10 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="bg-gray-100 rounded-xl p-4 h-60 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">(Screenshot: Portfolio view)</p>
                </div>
              </div>
              <div className="md:w-2/3">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 text-purple-800 text-2xl font-bold h-12 w-12 rounded-full flex items-center justify-center shrink-0 mr-4">
                    6
                  </div>
                  <h3 className="text-2xl font-semibold">Track Your Investment</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Congratulations! Your investment is now active and earning yield. You'll be redirected to your portfolio page, where you can track:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                  <li>Your active investments and their current value</li>
                  <li>Accumulated yields in real-time</li>
                  <li>Performance charts and metrics</li>
                  <li>Transaction history</li>
                </ul>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <p className="text-gray-700">
                    <strong>Success:</strong> Your funds are now working for you! OrbitYield's AI will continuously optimize your position to maximize returns based on market conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Your Investment */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Understanding Your Investment</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Yield Accrual</h3>
              <p className="text-gray-700">
                Your investment starts earning yield immediately after your transaction is confirmed. Yields are calculated in real-time and typically compound automatically (the frequency depends on the specific strategy and gas optimization parameters).
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Fee Structure</h3>
              <p className="text-gray-700">
                OrbitYield charges a small performance fee on the yields generated (typically 5-10% depending on the strategy). There are no deposit fees, but withdrawal may incur regular network gas fees. All fees are transparently displayed before you invest.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Withdrawals</h3>
              <p className="text-gray-700">
                You can withdraw your funds at any time from your portfolio page. Simply click on the investment you wish to exit, enter the amount to withdraw, and confirm the transaction in your wallet. Funds will be returned to your wallet after the transaction is processed.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Cross-Chain Movement</h3>
              <p className="text-gray-700">
                If your strategy involves cross-chain yield optimization, OrbitYield will automatically handle bridging your assets between blockchains. This process is transparent to you, but may require additional confirmation for security purposes.
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">APY Fluctuations</h3>
            <p className="text-gray-700">
              It's normal for APYs to fluctuate based on market conditions. OrbitYield's AI continuously monitors these changes and may rebalance your position to maintain optimal returns. You'll receive notifications of significant changes or rebalancing events.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-xl font-semibold mb-2">What's the minimum investment amount?</h3>
              <p className="text-gray-700">
                Minimum investments vary by strategy but typically start at 0.01 ETH for Ethereum-based assets or $10 for stablecoins. The platform will show the specific minimum for each strategy.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-xl font-semibold mb-2">How soon can I withdraw my funds?</h3>
              <p className="text-gray-700">
                OrbitYield strategies are generally designed for liquidity, allowing withdrawals at any time. However, some high-yield strategies might have lockup periods or withdrawal windows. These details are clearly displayed on the strategy details page before you invest.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-xl font-semibold mb-2">What happens if a strategy's performance drops?</h3>
              <p className="text-gray-700">
                OrbitYield's AI constantly monitors all strategies. If performance drops below certain thresholds, the system may automatically rebalance your position to better-performing opportunities. You'll receive notifications about significant changes to your investments.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-xl font-semibold mb-2">Are there any tax implications?</h3>
              <p className="text-gray-700">
                Yield farming and DeFi activities generally have tax implications that vary by jurisdiction. OrbitYield provides transaction records and performance data to help with your reporting, but we recommend consulting with a tax professional for advice specific to your situation.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-xl font-semibold mb-2">What if I need help with my investment?</h3>
              <p className="text-gray-700">
                OrbitYield offers 24/7 support through our Help Center. You can also reach our support team via live chat or email at support@orbityield.cc for assistance with any investment-related questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section>
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-10 rounded-xl shadow-md text-white">
          <h2 className="text-3xl font-semibold mb-6">Ready to Grow Your Portfolio?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <Link href="/docs/portfolio-management" className="bg-white bg-opacity-20 hover:bg-opacity-30 p-6 rounded-lg transition duration-200">
              <h3 className="text-xl font-semibold mb-3">Portfolio Management</h3>
              <p className="text-white text-opacity-90">
                Learn how to track, optimize, and manage your DeFi investments.
              </p>
            </Link>
            
            <Link href="/docs/advanced-strategies" className="bg-white bg-opacity-20 hover:bg-opacity-30 p-6 rounded-lg transition duration-200">
              <h3 className="text-xl font-semibold mb-3">Advanced Strategies</h3>
              <p className="text-white text-opacity-90">
                Explore more complex yield farming techniques and opportunities.
              </p>
            </Link>
          </div>
          
          <div className="text-center">
            <a href="https://app.orbityield.cc/strategies" className="inline-block bg-white text-purple-700 font-semibold px-8 py-3 rounded-lg text-lg hover:bg-gray-100 transition duration-200">
              Explore Available Strategies
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
