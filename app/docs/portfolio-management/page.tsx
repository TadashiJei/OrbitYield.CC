import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio Management | OrbitYield Documentation",
  description: "Learn how to monitor, manage, and optimize your investments in OrbitYield's AI-powered yield strategies.",
};

export default function PortfolioManagementPage() {
  return (
    <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="mb-16">
        <Link href="/docs" className="text-blue-600 hover:text-blue-800 flex items-center mb-8">
          <span className="mr-2">←</span> Back to Documentation
        </Link>
        <h1 className="text-4xl font-bold mb-6">
          Portfolio <span className="gradient-text">Management</span>
        </h1>
        <p className="text-xl text-gray-600">
          Learn how to monitor, manage, and optimize your investments in the OrbitYield platform for maximum yield and security.
        </p>
      </div>

      {/* Portfolio Dashboard Overview */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Portfolio Dashboard Overview</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
            <div>
              <p className="text-lg mb-6">
                The OrbitYield Portfolio Dashboard is your command center for monitoring all your DeFi investments. 
                It provides a comprehensive view of your assets, investments, and yields across all supported chains and protocols.
              </p>
              <p className="text-lg">
                To access your portfolio, connect your wallet and navigate to the "Portfolio" tab in the main navigation. 
                The dashboard is automatically personalized based on your wallet address and investment activities.
              </p>
            </div>
            <div className="bg-gray-100 rounded-xl p-4 h-64 flex items-center justify-center">
              <p className="text-gray-500 text-sm">(Portfolio Dashboard Screenshot)</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Portfolio Summary</h3>
              <p className="text-gray-700">
                The summary section displays your total portfolio value, total invested amount, 
                total earnings, and overall portfolio performance metrics including APY and ROI.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Active Strategies</h3>
              <p className="text-gray-700">
                View all your active investment strategies, including the amount invested, 
                current value, yield earned, and performance metrics for each position.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Performance Analytics</h3>
              <p className="text-gray-700">
                Interactive charts and visualizations showing historical performance, 
                yield comparisons, and strategy allocation breakdowns over customizable time periods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Managing Your Investments */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold mb-10">Managing Your Investments</h2>
        
        <div className="space-y-12">
          {/* Adding to Positions */}
          <div className="bg-white p-10 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="md:w-1/3">
                <div className="bg-gradient-to-br from-purple-500 to-blue-600 text-white p-6 rounded-lg">
                  <h3 className="text-2xl font-semibold mb-4">Adding to Positions</h3>
                  <p>Increase your investment in existing strategies to compound your returns even further.</p>
                </div>
              </div>
              <div className="md:w-2/3">
                <p className="text-lg mb-4">
                  You can add funds to any of your existing investment positions directly from your portfolio:
                </p>
                <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
                  <li>Navigate to your Portfolio Dashboard</li>
                  <li>Find the strategy you want to add funds to</li>
                  <li>Click the "Add Funds" button</li>
                  <li>Enter the additional amount you wish to invest</li>
                  <li>Review and confirm the transaction in your wallet</li>
                </ol>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <p className="text-gray-700">
                    <strong>Tip:</strong> When adding to existing positions, you won't need to approve token spending again if you've already approved that token.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Withdrawing Funds */}
          <div className="bg-white p-10 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="md:w-1/3">
                <div className="bg-gradient-to-br from-blue-500 to-green-600 text-white p-6 rounded-lg">
                  <h3 className="text-2xl font-semibold mb-4">Withdrawing Funds</h3>
                  <p>Access your principal and earned yields whenever you need them.</p>
                </div>
              </div>
              <div className="md:w-2/3">
                <p className="text-lg mb-4">
                  OrbitYield makes it easy to withdraw your funds from any active strategy:
                </p>
                <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
                  <li>Navigate to your Portfolio Dashboard</li>
                  <li>Find the strategy you want to withdraw from</li>
                  <li>Click the "Withdraw" button</li>
                  <li>Choose to withdraw a specific amount or your entire position</li>
                  <li>Review and confirm the transaction in your wallet</li>
                </ol>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mb-4">
                  <p className="text-gray-700">
                    <strong>Note:</strong> Most strategies allow immediate withdrawals, but some high-yield strategies may have specific withdrawal windows or timeframes. These details are always displayed before confirming your withdrawal.
                  </p>
                </div>
                <p className="text-gray-700">
                  After confirmation, the withdrawn funds will be transferred back to your connected wallet. 
                  Cross-chain strategies may require additional time for bridging operations to complete.
                </p>
              </div>
            </div>
          </div>
          
          {/* Rebalancing Positions */}
          <div className="bg-white p-10 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="md:w-1/3">
                <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-6 rounded-lg">
                  <h3 className="text-2xl font-semibold mb-4">Rebalancing Positions</h3>
                  <p>Optimize your allocation across different strategies for maximum returns.</p>
                </div>
              </div>
              <div className="md:w-2/3">
                <p className="text-lg mb-4">
                  While OrbitYield's AI handles most rebalancing automatically, you can also manually adjust your positions:
                </p>
                <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
                  <li>Go to the "Portfolio Optimization" section</li>
                  <li>View the AI-recommended rebalancing suggestions</li>
                  <li>Choose to accept the recommendations or create your own allocation plan</li>
                  <li>Confirm the rebalancing transactions</li>
                </ol>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <p className="text-gray-700">
                    <strong>Tip:</strong> Rebalancing can help you adapt to changing market conditions, but consider the gas costs involved before making frequent adjustments.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Claiming Rewards */}
          <div className="bg-white p-10 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="md:w-1/3">
                <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white p-6 rounded-lg">
                  <h3 className="text-2xl font-semibold mb-4">Claiming Rewards</h3>
                  <p>Access additional governance tokens and incentives from protocols.</p>
                </div>
              </div>
              <div className="md:w-2/3">
                <p className="text-lg mb-4">
                  Some yield strategies generate additional rewards beyond the base yield. OrbitYield makes it easy to claim these rewards:
                </p>
                <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
                  <li>Look for strategies with a "Rewards Available" indicator</li>
                  <li>Click on the "Claim Rewards" button</li>
                  <li>Choose whether to claim to your wallet or reinvest</li>
                  <li>Confirm the transaction in your wallet</li>
                </ol>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <p className="text-gray-700">
                    <strong>Benefit:</strong> Reinvesting rewards can significantly enhance your compounding effects, potentially leading to higher overall returns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tracking Performance */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Tracking Performance</h2>
          
          <p className="text-lg mb-8">
            OrbitYield provides comprehensive analytics to help you understand and optimize your investment performance.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div>
              <h3 className="text-xl font-semibold mb-4">Performance Metrics</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Total Value:</strong> Current value of your investments including earned yield</li>
                <li><strong>Net Profit:</strong> Total earnings across all strategies</li>
                <li><strong>Average APY:</strong> Weighted average yield of your portfolio</li>
                <li><strong>ROI:</strong> Return on investment as a percentage</li>
                <li><strong>Yield Sources:</strong> Breakdown of earnings by protocol</li>
                <li><strong>Risk Exposure:</strong> Analysis of portfolio risk distribution</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Viewing History</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Transaction History:</strong> Record of all deposits, withdrawals, and harvests</li>
                <li><strong>Yield Growth:</strong> Charts showing earnings over time</li>
                <li><strong>Strategy Changes:</strong> Log of rebalancing and optimization events</li>
                <li><strong>Historical APY:</strong> Tracking of yield rates over time</li>
                <li><strong>Rewards History:</strong> Record of claimed protocol incentives</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded">
            <h3 className="text-xl font-semibold mb-3">Performance Reports</h3>
            <p className="text-gray-700 mb-4">
              OrbitYield generates detailed performance reports that you can download in various formats:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold mb-2">Daily Reports</h4>
                <p className="text-sm text-gray-600">Quick snapshots of daily performance with key metrics and changes.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold mb-2">Monthly Summaries</h4>
                <p className="text-sm text-gray-600">Comprehensive monthly analysis with detailed performance breakdowns.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold mb-2">Tax Documents</h4>
                <p className="text-sm text-gray-600">Year-end reports with transaction data to simplify tax reporting.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Management */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Wallet and Security Management</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
            <div>
              <p className="text-lg mb-6">
                OrbitYield takes security seriously, offering robust wallet management features to 
                ensure your investments remain safe and under your control at all times.
              </p>
              <p className="text-lg">
                All MetaMask connections are securely stored and monitored, with additional
                safeguards in place to prevent unauthorized access to your funds.
              </p>
            </div>
            <div className="bg-gray-100 rounded-xl p-4 h-64 flex items-center justify-center">
              <p className="text-gray-500 text-sm">(Security Dashboard Screenshot)</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-3">Connected Wallets</h3>
              <p className="text-gray-700 mb-4">
                View and manage all wallets connected to your OrbitYield account. For each connected wallet, you can:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>View connection timestamps and activity history</li>
                <li>Set custom labels for easier identification</li>
                <li>Adjust permissions for specific operations</li>
                <li>Request disconnection when no longer needed</li>
              </ul>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-3">Wallet Disconnection Requests</h3>
              <p className="text-gray-700 mb-4">
                For enhanced security, wallet disconnection from OrbitYield requires administrative approval:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Submit a disconnection request with your reason and email</li>
                <li>Receive confirmation that your request is being processed</li>
                <li>Admin reviews and approves the disconnection request</li>
                <li>Receive email notification once disconnection is complete</li>
              </ol>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mt-4">
                <p className="text-gray-700">
                  <strong>Security Feature:</strong> This additional verification step helps prevent unauthorized removal of wallet connections, protecting your investments from potential attackers.
                </p>
              </div>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-3">Security Notifications</h3>
              <p className="text-gray-700 mb-4">
                Enable notifications to stay informed about important security events:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Large deposit or withdrawal alerts</li>
                <li>New wallet connection notifications</li>
                <li>Strategy migration warnings</li>
                <li>Protocol security updates</li>
                <li>Account login notifications</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Emergency Features</h3>
              <p className="text-gray-700 mb-4">
                OrbitYield includes emergency features to protect your funds in critical situations:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">Emergency Withdrawal</h4>
                  <p className="text-sm text-gray-700">
                    Quickly withdraw all funds across strategies to your wallet in case of security concerns.
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Account Freeze</h4>
                  <p className="text-sm text-gray-700">
                    Temporarily pause all activities on your account while investigating suspicious activity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Optimization Tips */}
      <section>
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-10 rounded-xl shadow-md text-white">
          <h2 className="text-3xl font-semibold mb-6">Portfolio Optimization Tips</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3">Diversification</h3>
              <p className="text-white text-opacity-90">
                Spread your investments across multiple strategies with varying risk profiles, chains, and protocols to reduce overall portfolio volatility.
              </p>
            </div>
            
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3">Compound Regularly</h3>
              <p className="text-white text-opacity-90">
                Reinvest yields when they reach significant amounts to maximize the compounding effect, while being mindful of gas costs.
              </p>
            </div>
            
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3">Monitor Trends</h3>
              <p className="text-white text-opacity-90">
                Stay informed about emerging yield opportunities and market trends to adjust your strategy allocation accordingly.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <Link href="/docs/advanced-strategies" className="inline-block bg-white text-purple-700 font-semibold px-8 py-3 rounded-lg text-lg hover:bg-gray-100 transition duration-200">
              Explore Advanced Strategies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
