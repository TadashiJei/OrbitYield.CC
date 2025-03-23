import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wallet Management | OrbitYield Documentation",
  description: "Learn about OrbitYield's secure wallet connection system, including MetaMask integration, disconnection requests, and security best practices.",
};

export default function WalletManagementPage() {
  return (
    <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="mb-16">
        <Link href="/docs" className="text-blue-600 hover:text-blue-800 flex items-center mb-8">
          <span className="mr-2">←</span> Back to Documentation
        </Link>
        <h1 className="text-4xl font-bold mb-6">
          Wallet <span className="gradient-text">Management</span>
        </h1>
        <p className="text-xl text-gray-600">
          OrbitYield utilizes a secure wallet connection system to protect your assets and ensure only authorized access to your funds. Learn how our wallet management system works and how to use it safely.
        </p>
      </div>

      {/* Wallet Connection Overview */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Wallet Connection Overview</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
            <div>
              <p className="text-lg mb-6">
                OrbitYield is a non-custodial platform, meaning we never take control of your funds. 
                Instead, our smart contracts interact with your wallet only when you explicitly authorize transactions.
              </p>
              <p className="text-lg mb-6">
                Connecting your wallet to OrbitYield allows our platform to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-lg mb-6">
                <li>Display your balances and portfolio information</li>
                <li>Prepare transactions for your approval</li>
                <li>Monitor your positions and provide relevant updates</li>
                <li>Personalize your experience based on your assets</li>
              </ul>
              <p className="text-lg">
                At no point does OrbitYield have the ability to move your funds without your explicit approval through your wallet's transaction signing interface.
              </p>
            </div>
            <div className="relative h-80 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 mb-2">Wallet connection flow illustration</p>
                <p className="text-sm text-gray-400">(Interactive illustration coming soon)</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Supported Wallets</h3>
              <p className="text-gray-700 mb-4">
                OrbitYield currently supports these wallet types:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>MetaMask</li>
                <li>WalletConnect</li>
                <li>Coinbase Wallet</li>
                <li>Trust Wallet</li>
                <li>Ledger (via MetaMask)</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Connection Storage</h3>
              <p className="text-gray-700">
                OrbitYield securely stores wallet connection information in our database to provide a seamless experience. This includes your wallet address, connection timestamps, and connection status. We never store private keys or seed phrases.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Enhanced Security</h3>
              <p className="text-gray-700">
                Our wallet connection system includes enhanced security features like administrative approval for disconnection requests, email notifications for important actions, and detailed connection logs to protect against unauthorized access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MetaMask Connection System */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">MetaMask Connection System</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
            <div>
              <p className="text-lg mb-6">
                OrbitYield features a comprehensive MetaMask connection management system designed to enhance security and user control. This system provides detailed tracking and management of all wallet connections.
              </p>
              <p className="text-lg">
                When you connect your MetaMask wallet to OrbitYield, we create a secure connection record that helps protect your account and assets from unauthorized access while ensuring you can monitor all connections.
              </p>
            </div>
            <div className="bg-gray-100 rounded-xl p-6 h-64 flex items-center justify-center">
              <p className="text-gray-500 text-sm">(MetaMask connection interface)</p>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-4">Connection Record Storage</h3>
              <p className="text-gray-700 mb-4">
                Each MetaMask connection to OrbitYield is recorded with the following information:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded">
                  <h4 className="font-semibold mb-2">Connection Details</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                    <li>Wallet address (public address only)</li>
                    <li>User ID association</li>
                    <li>Initial connection timestamp</li>
                    <li>Last activity timestamp</li>
                    <li>Connection status</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded">
                  <h4 className="font-semibold mb-2">Removal Request Information</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                    <li>Request status (pending/approved/rejected)</li>
                    <li>Reason for disconnection request</li>
                    <li>Contact email for notifications</li>
                    <li>Request timestamp</li>
                    <li>Admin action details (when applicable)</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-4">API Endpoints</h3>
              <p className="text-gray-700 mb-4">
                OrbitYield's backend includes dedicated endpoints for wallet connection management:
              </p>
              <div className="bg-gray-50 p-4 rounded overflow-x-auto">
                <pre className="text-sm text-gray-800">
                  <code>
{`// Save new MetaMask connection
POST /api/metamask

// Retrieve user's MetaMask connections
GET /api/metamask

// Submit wallet disconnection request
POST /api/metamask/removal-request

// Admin endpoints for managing removal requests
GET /api/admin/metamask
PUT /api/admin/metamask/:id`}
                  </code>
                </pre>
              </div>
              <p className="text-gray-700 mt-4">
                These endpoints are protected by authentication and authorization mechanisms to ensure only authorized users can access them.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Connection Status Monitoring</h3>
              <p className="text-gray-700 mb-4">
                OrbitYield provides real-time status monitoring of all your wallet connections:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded">
                  <div className="flex items-center mb-2">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <h4 className="font-semibold">Active</h4>
                  </div>
                  <p className="text-sm text-gray-700">
                    The wallet is currently connected and functioning normally with OrbitYield.
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded">
                  <div className="flex items-center mb-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                    <h4 className="font-semibold">Pending Removal</h4>
                  </div>
                  <p className="text-sm text-gray-700">
                    A disconnection request has been submitted and is awaiting admin approval.
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded">
                  <div className="flex items-center mb-2">
                    <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                    <h4 className="font-semibold">Disconnected</h4>
                  </div>
                  <p className="text-sm text-gray-700">
                    The wallet has been disconnected from OrbitYield following approval.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disconnection Request Process */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Wallet Disconnection Process</h2>
          
          <p className="text-lg mb-8">
            For enhanced security, OrbitYield implements a controlled disconnection process for wallet connections. 
            Unlike most platforms that allow instant disconnection, we require administrative approval to prevent unauthorized disconnection attempts by potential attackers.
          </p>
          
          <div className="space-y-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Step-by-Step Disconnection Request</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 font-bold h-8 w-8 rounded-full flex items-center justify-center shrink-0 mr-4 mt-1">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Initiate Disconnection Request</h4>
                    <p className="text-gray-700">
                      In your account settings, locate the wallet connection you wish to disconnect and click the "Request Disconnection" button.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 font-bold h-8 w-8 rounded-full flex items-center justify-center shrink-0 mr-4 mt-1">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Provide Required Information</h4>
                    <p className="text-gray-700">
                      Complete the disconnection request form, providing:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 mt-2">
                      <li>Your contact email (for notifications)</li>
                      <li>Reason for disconnection</li>
                      <li>Optional additional details</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 font-bold h-8 w-8 rounded-full flex items-center justify-center shrink-0 mr-4 mt-1">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Request Confirmation</h4>
                    <p className="text-gray-700">
                      Review your request details and submit it. You'll receive an email confirmation that your request has been received and is pending review.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 font-bold h-8 w-8 rounded-full flex items-center justify-center shrink-0 mr-4 mt-1">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Admin Review</h4>
                    <p className="text-gray-700">
                      OrbitYield administrators will review your request, typically within 24-48 hours. During this time, your connection status will show as "Pending Removal."
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 font-bold h-8 w-8 rounded-full flex items-center justify-center shrink-0 mr-4 mt-1">
                    5
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Approval and Disconnection</h4>
                    <p className="text-gray-700">
                      Once approved, your wallet will be disconnected from OrbitYield, and you'll receive an email confirmation of the completed disconnection.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Why Administrative Approval?</h3>
                <p className="text-gray-700 mb-4">
                  Our admin approval process for wallet disconnections provides an additional security layer:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Protects against unauthorized disconnection attempts by attackers</li>
                  <li>Prevents account takeovers by removing legitimate wallet connections</li>
                  <li>Creates an audit trail of connection management activities</li>
                  <li>Allows verification of the disconnection requestor's identity</li>
                  <li>Reduces the risk of social engineering attacks</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">During the Review Period</h3>
                <p className="text-gray-700 mb-4">
                  While your disconnection request is pending approval:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Your wallet remains connected to OrbitYield</li>
                  <li>You can continue to view your portfolio and positions</li>
                  <li>All transaction signing still requires your explicit approval</li>
                  <li>You can cancel the disconnection request if needed</li>
                  <li>Status indicators show the pending state across the platform</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Interface */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Admin Management Interface</h2>
          
          <p className="text-lg mb-8">
            OrbitYield features a dedicated administrative interface for managing wallet connections and disconnection requests. This section is for informational purposes to help users understand the review process.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
            <div>
              <h3 className="text-xl font-semibold mb-4">Admin Dashboard Features</h3>
              <ul className="list-disc pl-6 space-y-3 text-gray-700">
                <li>
                  <strong>Request Queue Management</strong>
                  <p className="mt-1">Administrators can view, sort, and filter all pending disconnection requests with detailed information about each request.</p>
                </li>
                <li>
                  <strong>User Verification Tools</strong>
                  <p className="mt-1">Tools to verify the identity of users requesting disconnections through various authentication methods.</p>
                </li>
                <li>
                  <strong>Activity Monitoring</strong>
                  <p className="mt-1">Real-time monitoring of wallet activities to detect suspicious patterns that might indicate security concerns.</p>
                </li>
                <li>
                  <strong>Notification System</strong>
                  <p className="mt-1">Automated email notifications to both users and administrators about request status changes and approvals.</p>
                </li>
              </ul>
            </div>
            <div className="bg-gray-100 rounded-xl p-6 h-64 flex items-center justify-center">
              <p className="text-gray-500 text-sm">(Admin dashboard interface)</p>
            </div>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Security and Access Controls</h3>
            <p className="text-gray-700 mb-4">
              The admin management interface is protected by multiple security layers:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-semibold mb-2">Role-Based Access</h4>
                <p className="text-sm text-gray-700">
                  Only authorized administrators with specific role permissions can access the wallet management interface.
                </p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-semibold mb-2">Multi-Factor Authentication</h4>
                <p className="text-sm text-gray-700">
                  Administrators must complete MFA verification before approving disconnection requests.
                </p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-semibold mb-2">Audit Logging</h4>
                <p className="text-sm text-gray-700">
                  All administrative actions are logged with timestamps, action details, and admin identification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Best Practices */}
      <section>
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-10 rounded-xl shadow-md text-white">
          <h2 className="text-3xl font-semibold mb-6">Wallet Security Best Practices</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3">Protect Your Private Keys</h3>
              <ul className="list-disc list-inside space-y-2 text-white text-opacity-90">
                <li>Never share your seed phrase or private keys with anyone</li>
                <li>Store your recovery phrase offline in a secure location</li>
                <li>Consider using a hardware wallet for additional security</li>
                <li>Be cautious of phishing attempts requesting wallet information</li>
              </ul>
            </div>
            
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3">Verify Transactions</h3>
              <ul className="list-disc list-inside space-y-2 text-white text-opacity-90">
                <li>Always check transaction details before signing</li>
                <li>Verify wallet addresses and token amounts</li>
                <li>Be wary of unexpected transaction requests</li>
                <li>Set spending limits when possible</li>
              </ul>
            </div>
            
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3">Monitor Your Connections</h3>
              <ul className="list-disc list-inside space-y-2 text-white text-opacity-90">
                <li>Regularly review connected dApps in your wallet</li>
                <li>Request disconnection for wallets you no longer use</li>
                <li>Enable notifications for connection activities</li>
                <li>Use different wallets for different purposes</li>
              </ul>
            </div>
            
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3">Secure Your Devices</h3>
              <ul className="list-disc list-inside space-y-2 text-white text-opacity-90">
                <li>Keep your device's operating system and wallet software updated</li>
                <li>Use strong, unique passwords for wallet access</li>
                <li>Enable biometric authentication when available</li>
                <li>Install reputable security software</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center">
            <Link href="/docs/security" className="inline-block bg-white text-purple-700 font-semibold px-8 py-3 rounded-lg text-lg hover:bg-gray-100 transition duration-200">
              Learn More About Security
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
