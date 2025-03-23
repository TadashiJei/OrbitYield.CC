import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Endpoints | OrbitYield Documentation",
  description: "Detailed documentation for all OrbitYield API endpoints, including request parameters, responses, and examples.",
};

export default function ApiEndpointsPage() {
  return (
    <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="mb-16">
        <Link href="/docs/api/overview" className="text-blue-600 hover:text-blue-800 flex items-center mb-8">
          <span className="mr-2">←</span> Back to API Overview
        </Link>
        <h1 className="text-4xl font-bold mb-6">
          <span className="gradient-text">OrbitYield</span> API Endpoints
        </h1>
        <p className="text-xl text-gray-600">
          Complete reference documentation for all available OrbitYield API endpoints.
        </p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {/* User & Authentication */}
        <Link 
          href="/docs/api/endpoints/authentication" 
          className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-semibold mb-4">User & Authentication</h2>
          <p className="text-gray-600 mb-6">
            Endpoints for user management, authentication, and wallet connections.
          </p>
          <div className="text-sm text-gray-500">
            <p>POST /auth/login</p>
            <p>GET /auth/logout</p>
            <p>GET /user/profile</p>
            <p>GET /wallet/connections</p>
          </div>
        </Link>

        {/* Strategies */}
        <Link 
          href="/docs/api/endpoints/strategies" 
          className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-semibold mb-4">Yield Strategies</h2>
          <p className="text-gray-600 mb-6">
            Endpoints for viewing and interacting with yield strategies.
          </p>
          <div className="text-sm text-gray-500">
            <p>GET /strategies</p>
            <p>GET /strategies/{"{id}"}</p>
            <p>GET /strategies/performance</p>
            <p>GET /strategies/recommended</p>
          </div>
        </Link>

        {/* Investments */}
        <Link 
          href="/docs/api/endpoints/investments" 
          className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-semibold mb-4">Investments</h2>
          <p className="text-gray-600 mb-6">
            Endpoints for managing investments and tracking performance.
          </p>
          <div className="text-sm text-gray-500">
            <p>GET /investments</p>
            <p>POST /investments/deposit</p>
            <p>POST /investments/withdraw</p>
            <p>GET /investments/history</p>
          </div>
        </Link>

        {/* Wallet Management */}
        <Link 
          href="/docs/api/endpoints/wallet" 
          className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-semibold mb-4">Wallet Management</h2>
          <p className="text-gray-600 mb-6">
            Endpoints for managing wallet connections and metamask integration.
          </p>
          <div className="text-sm text-gray-500">
            <p>GET /wallet/balances</p>
            <p>POST /api/metamask</p>
            <p>GET /api/metamask</p>
            <p>POST /api/metamask/removal-request</p>
          </div>
        </Link>

        {/* Market Data */}
        <Link 
          href="/docs/api/endpoints/market" 
          className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-semibold mb-4">Market Data</h2>
          <p className="text-gray-600 mb-6">
            Endpoints for retrieving market data and analytics.
          </p>
          <div className="text-sm text-gray-500">
            <p>GET /market/prices</p>
            <p>GET /market/trends</p>
            <p>GET /market/tvl</p>
            <p>GET /market/apy-comparison</p>
          </div>
        </Link>

        {/* Admin */}
        <Link 
          href="/docs/api/endpoints/admin" 
          className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-semibold mb-4">Admin APIs</h2>
          <p className="text-gray-600 mb-6">
            Administrative endpoints for platform management (authorized users only).
          </p>
          <div className="text-sm text-gray-500">
            <p>GET /admin/users</p>
            <p>GET /admin/statistics</p>
            <p>GET /admin/metamask</p>
            <p>PUT /admin/metamask/{"{id}"}</p>
          </div>
        </Link>
      </div>

      {/* Example Endpoint Documentation */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Sample Endpoint Documentation</h2>
          <p className="text-lg mb-8">
            Below is an example of the detailed documentation provided for each endpoint in the category pages.
            Click on a category above to see comprehensive documentation for all endpoints.
          </p>

          <div className="border-b border-gray-200 pb-8 mb-8">
            <div className="bg-gray-100 p-4 rounded-lg flex items-center mb-6">
              <span className="bg-green-500 text-white font-bold py-1 px-3 rounded mr-3">GET</span>
              <code className="text-gray-800 font-mono">/strategies</code>
            </div>

            <h3 className="text-2xl font-semibold mb-4">List All Strategies</h3>
            <p className="text-gray-600 mb-6">
              Returns a paginated list of available yield strategies, with filters for various parameters.
            </p>

            <h4 className="text-xl font-semibold mb-3">Query Parameters</h4>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-6 py-3 text-left">Parameter</th>
                    <th className="border border-gray-200 px-6 py-3 text-left">Type</th>
                    <th className="border border-gray-200 px-6 py-3 text-left">Required</th>
                    <th className="border border-gray-200 px-6 py-3 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-6 py-4"><code>chain</code></td>
                    <td className="border border-gray-200 px-6 py-4">string</td>
                    <td className="border border-gray-200 px-6 py-4">No</td>
                    <td className="border border-gray-200 px-6 py-4">Filter by blockchain: ethereum, arbitrum, optimism, etc.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-6 py-4"><code>asset</code></td>
                    <td className="border border-gray-200 px-6 py-4">string</td>
                    <td className="border border-gray-200 px-6 py-4">No</td>
                    <td className="border border-gray-200 px-6 py-4">Filter by asset: ETH, USDC, WBTC, etc.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-6 py-4"><code>min_apy</code></td>
                    <td className="border border-gray-200 px-6 py-4">number</td>
                    <td className="border border-gray-200 px-6 py-4">No</td>
                    <td className="border border-gray-200 px-6 py-4">Minimum APY percentage (e.g., 5.0 for 5%)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-6 py-4"><code>risk_level</code></td>
                    <td className="border border-gray-200 px-6 py-4">string</td>
                    <td className="border border-gray-200 px-6 py-4">No</td>
                    <td className="border border-gray-200 px-6 py-4">Filter by risk level: low, medium, high</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-6 py-4"><code>page</code></td>
                    <td className="border border-gray-200 px-6 py-4">integer</td>
                    <td className="border border-gray-200 px-6 py-4">No</td>
                    <td className="border border-gray-200 px-6 py-4">Page number (default: 1)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-6 py-4"><code>per_page</code></td>
                    <td className="border border-gray-200 px-6 py-4">integer</td>
                    <td className="border border-gray-200 px-6 py-4">No</td>
                    <td className="border border-gray-200 px-6 py-4">Items per page (default: 10, max: 100)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 className="text-xl font-semibold mb-3">Response Format</h4>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
              <pre className="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto">
{`{
  "success": true,
  "data": [
    {
      "id": "strat_eth_aave_lending",
      "name": "ETH Aave Lending",
      "description": "Earn yield by lending ETH on Aave v3",
      "chain": "ethereum",
      "asset": "ETH",
      "protocol": "aave",
      "strategy_type": "lending",
      "current_apy": 3.45,
      "historical_apy": {
        "7d": 3.42,
        "30d": 3.38,
        "90d": 3.51
      },
      "risk_level": "low",
      "tvl": 24500000,
      "min_deposit": 0.1,
      "created_at": "2025-01-15T12:00:00Z",
      "updated_at": "2025-03-23T08:15:22Z"
    },
    // More strategies...
  ],
  "meta": {
    "pagination": {
      "total": 45,
      "count": 10,
      "per_page": 10,
      "current_page": 1,
      "total_pages": 5
    }
  }
}`}
              </pre>
            </div>

            <h4 className="text-xl font-semibold mb-3">Example Request</h4>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
              <code className="block bg-gray-800 text-green-400 p-4 rounded-md">
                GET https://api.orbityield.cc/v1/strategies?chain=ethereum&min_apy=3.0&risk_level=low
              </code>
            </div>

            <h4 className="text-xl font-semibold mb-3">Error Codes</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-6 py-3 text-left">Status Code</th>
                    <th className="border border-gray-200 px-6 py-3 text-left">Error Code</th>
                    <th className="border border-gray-200 px-6 py-3 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-6 py-4"><code>400</code></td>
                    <td className="border border-gray-200 px-6 py-4"><code>invalid_chain</code></td>
                    <td className="border border-gray-200 px-6 py-4">The specified chain is not supported</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-6 py-4"><code>400</code></td>
                    <td className="border border-gray-200 px-6 py-4"><code>invalid_risk_level</code></td>
                    <td className="border border-gray-200 px-6 py-4">The risk level value is not valid</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-6 py-4"><code>401</code></td>
                    <td className="border border-gray-200 px-6 py-4"><code>unauthorized</code></td>
                    <td className="border border-gray-200 px-6 py-4">Authentication is required</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-6 py-4"><code>429</code></td>
                    <td className="border border-gray-200 px-6 py-4"><code>rate_limit_exceeded</code></td>
                    <td className="border border-gray-200 px-6 py-4">Too many requests, please try again later</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Creating the Wallet Management Section */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Wallet Management API</h2>
          <p className="text-lg mb-8">
            Below is a preview of the wallet management API documentation. These endpoints allow you to programmatically 
            manage wallet connections, particularly MetaMask wallets.
          </p>

          <div className="border-b border-gray-200 pb-8 mb-8">
            <div className="bg-blue-100 p-4 rounded-lg flex items-center mb-6">
              <span className="bg-blue-500 text-white font-bold py-1 px-3 rounded mr-3">POST</span>
              <code className="text-gray-800 font-mono">/api/metamask</code>
            </div>

            <h3 className="text-2xl font-semibold mb-4">Create MetaMask Connection</h3>
            <p className="text-gray-600 mb-6">
              Stores a new MetaMask wallet connection for a user in the database.
            </p>

            <h4 className="text-xl font-semibold mb-3">Request Body</h4>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-6 py-3 text-left">Parameter</th>
                    <th className="border border-gray-200 px-6 py-3 text-left">Type</th>
                    <th className="border border-gray-200 px-6 py-3 text-left">Required</th>
                    <th className="border border-gray-200 px-6 py-3 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-6 py-4"><code>walletAddress</code></td>
                    <td className="border border-gray-200 px-6 py-4">string</td>
                    <td className="border border-gray-200 px-6 py-4">Yes</td>
                    <td className="border border-gray-200 px-6 py-4">Ethereum wallet address</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-6 py-4"><code>userId</code></td>
                    <td className="border border-gray-200 px-6 py-4">string</td>
                    <td className="border border-gray-200 px-6 py-4">Yes</td>
                    <td className="border border-gray-200 px-6 py-4">User ID to associate with this wallet</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Link href="/docs/api/endpoints/wallet" className="text-blue-600 hover:text-blue-800">
              View complete wallet management API documentation →
            </Link>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section>
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-10 rounded-xl shadow-md text-white">
          <h2 className="text-3xl font-semibold mb-6">Get Started with the API</h2>
          <p className="text-xl mb-8">
            Ready to integrate OrbitYield into your application? Select a category above to explore
            detailed endpoint documentation, or visit our guides section for step-by-step tutorials.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/docs/api/guides" className="bg-white bg-opacity-20 hover:bg-opacity-30 p-6 rounded-lg transition duration-200">
              <h3 className="text-xl font-semibold mb-3">Integration Guides</h3>
              <p className="text-white text-opacity-90">
                Step-by-step tutorials for common integration scenarios.
              </p>
            </Link>
            
            <Link href="/docs/api/playground" className="bg-white bg-opacity-20 hover:bg-opacity-30 p-6 rounded-lg transition duration-200">
              <h3 className="text-xl font-semibold mb-3">API Playground</h3>
              <p className="text-white text-opacity-90">
                Interactive environment to test API calls and view responses.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
