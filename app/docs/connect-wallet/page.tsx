import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connecting Your Wallet | OrbitYield Documentation",
  description: "Learn how to connect your crypto wallet to the OrbitYield platform to start earning optimized yields.",
};

export default function ConnectWalletPage() {
  return (
    <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="mb-16">
        <Link href="/docs" className="text-blue-600 hover:text-blue-800 flex items-center mb-8">
          <span className="mr-2">←</span> Back to Documentation
        </Link>
        <h1 className="text-4xl font-bold mb-6">
          Connecting Your Wallet to <span className="gradient-text">OrbitYield</span>
        </h1>
        <p className="text-xl text-gray-600">
          Follow this guide to connect your cryptocurrency wallet to OrbitYield and start earning optimized yields.
        </p>
      </div>

      {/* Supported Wallets */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Supported Wallets</h2>
          <p className="text-lg mb-8">
            OrbitYield supports the following wallet providers:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="border border-gray-200 rounded-lg p-6 flex items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                {/* Placeholder for MetaMask icon */}
              </div>
              <div>
                <h3 className="font-semibold">MetaMask</h3>
                <p className="text-sm text-gray-600">Most popular Ethereum wallet</p>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 flex items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                {/* Placeholder for WalletConnect icon */}
              </div>
              <div>
                <h3 className="font-semibold">WalletConnect</h3>
                <p className="text-sm text-gray-600">Connect to mobile wallets</p>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 flex items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                {/* Placeholder for Coinbase Wallet icon */}
              </div>
              <div>
                <h3 className="font-semibold">Coinbase Wallet</h3>
                <p className="text-sm text-gray-600">Easy to use for Coinbase users</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Recommended Wallet</h3>
            <p className="text-gray-700">
              We recommend using MetaMask for the best experience with OrbitYield. Our platform has been extensively tested with MetaMask and provides the most seamless integration.
            </p>
          </div>
        </div>
      </section>

      {/* Connecting MetaMask */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Connecting MetaMask</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Prerequisites</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>MetaMask browser extension installed (<a href="https://metamask.io/download/" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">download here</a>)</li>
              <li>An Ethereum account set up in MetaMask</li>
              <li>ETH or other supported tokens for transaction fees</li>
            </ul>
          </div>
          
          <div className="space-y-12 mb-10">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="bg-gray-100 rounded-xl p-4 h-60 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">(Screenshot: OrbitYield homepage with Connect Wallet button)</p>
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold mb-3">Step 1: Navigate to OrbitYield</h3>
                <p className="text-gray-700 mb-4">
                  Go to <a href="https://app.orbityield.cc" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">app.orbityield.cc</a> in your web browser where you have MetaMask installed.
                </p>
                <p className="text-gray-700">
                  Look for the "Connect Wallet" button in the top right corner of the navigation bar. Click on this button to begin the connection process.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="bg-gray-100 rounded-xl p-4 h-60 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">(Screenshot: Wallet selection modal)</p>
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold mb-3">Step 2: Select MetaMask</h3>
                <p className="text-gray-700 mb-4">
                  After clicking "Connect Wallet," a modal will appear showing all available wallet options. Click on the MetaMask option.
                </p>
                <p className="text-gray-700">
                  This will trigger the MetaMask extension to open, asking for your permission to connect to OrbitYield.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="bg-gray-100 rounded-xl p-4 h-60 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">(Screenshot: MetaMask connection request)</p>
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold mb-3">Step 3: Approve the Connection</h3>
                <p className="text-gray-700 mb-4">
                  In the MetaMask popup, review the connection request. OrbitYield will request permission to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                  <li>View your wallet address</li>
                  <li>Request approval for transactions</li>
                </ul>
                <p className="text-gray-700">
                  Click "Connect" or "Approve" to allow OrbitYield to connect to your MetaMask wallet.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="bg-gray-100 rounded-xl p-4 h-60 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">(Screenshot: Connected wallet status)</p>
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold mb-3">Step 4: Verify Connection</h3>
                <p className="text-gray-700 mb-4">
                  Once connected, the "Connect Wallet" button will change to display a shortened version of your wallet address. This indicates a successful connection.
                </p>
                <p className="text-gray-700">
                  You can click on your account icon to see more details about your connected wallet and to access account-specific features.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Success!</h3>
            <p className="text-gray-700">
              Once connected, your wallet address is securely stored in our database. The connection will persist until you manually disconnect or request removal through the platform.
            </p>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <h3 className="text-lg font-semibold text-yellow-700 mb-2">Security Note</h3>
            <p className="text-gray-700">
              For your security, OrbitYield never has access to your private keys. All wallet connections require your explicit approval for every transaction.
            </p>
          </div>
        </div>
      </section>

      {/* Managing Your Wallet Connection */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Managing Your Wallet Connection</h2>
          
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Wallet Connection Management</h3>
            <p className="text-gray-700 mb-4">
              OrbitYield provides a comprehensive wallet connection management system that gives you control over your connected wallets while maintaining security.
            </p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold mb-3">How Your Connection is Stored</h4>
              <p className="text-gray-700 mb-4">
                When you connect your MetaMask wallet to OrbitYield, the following information is securely stored:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Your wallet address</li>
                <li>Your user ID</li>
                <li>Connection timestamp</li>
                <li>Status of the connection</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-3">Security Features</h4>
              <p className="text-gray-700 mb-4">
                Our wallet connection system includes several security features:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Role-based access control for sensitive operations</li>
                <li>Email notifications for important connection actions</li>
                <li>Connection removal requires administrative approval</li>
                <li>All connection activities are logged for security purposes</li>
              </ul>
            </div>
          </div>
          
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Viewing Connected Wallets</h3>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="bg-gray-100 rounded-xl p-4 h-60 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">(Screenshot: Profile settings page)</p>
                </div>
              </div>
              <div className="md:w-2/3">
                <p className="text-gray-700 mb-4">
                  To view your connected wallets:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Click on your account icon in the top right corner</li>
                  <li>Select "Profile Settings" from the dropdown menu</li>
                  <li>Navigate to the "Connected Wallets" tab</li>
                </ol>
                <p className="text-gray-700 mt-4">
                  Here you'll see all wallets currently connected to your account, along with connection dates and status indicators.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Requesting Wallet Disconnection</h3>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="bg-gray-100 rounded-xl p-4 h-60 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">(Screenshot: Disconnection request form)</p>
                </div>
              </div>
              <div className="md:w-2/3">
                <p className="text-gray-700 mb-4">
                  To request disconnection of a wallet:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Go to your "Connected Wallets" tab in Profile Settings</li>
                  <li>Find the wallet you want to disconnect</li>
                  <li>Click the "Request Disconnection" button</li>
                  <li>Complete the form with:
                    <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                      <li>Your email address (for notifications)</li>
                      <li>Reason for disconnection</li>
                    </ul>
                  </li>
                  <li>Submit your request</li>
                </ol>
                <p className="text-gray-700 mt-4">
                  After submission, your request will be reviewed by our admin team. You'll receive an email notification once your request is processed.
                </p>
                <p className="text-gray-700 mt-2">
                  While your request is pending, the wallet will show a "Disconnection Pending" status in your profile.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <h3 className="text-lg font-semibold text-red-700 mb-2">Important Security Information</h3>
            <p className="text-gray-700 mb-2">
              To protect your assets and ensure security, wallet disconnections require admin approval. This prevents unauthorized removal of wallet connections that could compromise your account.
            </p>
            <p className="text-gray-700">
              This additional security layer ensures that only you can request to disconnect your wallet, and that the process is properly documented and verified.
            </p>
          </div>
        </div>
      </section>

      {/* Switching Networks */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Switching Networks</h2>
          <p className="text-lg mb-8">
            OrbitYield operates across multiple blockchain networks. You may need to switch networks in your wallet to interact with different strategies.
          </p>
          
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="bg-gray-100 rounded-xl p-4 h-60 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">(Screenshot: Network switch prompt)</p>
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold mb-3">Automatic Network Switching</h3>
                <p className="text-gray-700">
                  When you select a yield strategy on a different network than the one you're currently connected to, OrbitYield will automatically prompt you to switch networks. Simply approve the network switch request in your MetaMask popup to continue.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="bg-gray-100 rounded-xl p-4 h-60 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">(Screenshot: Manual network selection)</p>
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold mb-3">Manual Network Switching</h3>
                <p className="text-gray-700 mb-4">
                  To manually switch networks in MetaMask:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Click on the network selector at the top of the MetaMask extension</li>
                  <li>Select the desired network from the dropdown list</li>
                  <li>If the network isn't listed, you may need to add it first (see below)</li>
                </ol>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Adding a New Network</h3>
              <p className="text-gray-700 mb-4">
                If you need to add a network that's not already in your MetaMask:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>In MetaMask, click on the network selector dropdown</li>
                <li>Click "Add Network"</li>
                <li>You can either:
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li>Select from popular networks in the "Networks" tab</li>
                    <li>Add a custom network by entering the RPC details manually</li>
                  </ul>
                </li>
              </ol>
              <p className="text-gray-700 mt-4">
                OrbitYield also provides a "Add to MetaMask" button next to supported networks that will automatically configure the network for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section>
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Troubleshooting</h2>
          
          <div className="space-y-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Common Connection Issues</h3>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-4">
                <h4 className="font-semibold mb-2">MetaMask Not Detecting</h4>
                <p className="text-gray-700 mb-3">
                  If the connect button doesn't detect MetaMask:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Ensure MetaMask extension is installed and enabled</li>
                  <li>Try refreshing the page</li>
                  <li>Check if you're using a supported browser (Chrome, Firefox, Brave, Edge)</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-4">
                <h4 className="font-semibold mb-2">Connection Request Not Appearing</h4>
                <p className="text-gray-700 mb-3">
                  If you click connect but no MetaMask popup appears:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Check if MetaMask is locked (you may need to enter your password)</li>
                  <li>Look for the MetaMask icon in your browser toolbar and click it</li>
                  <li>Check for blocked popups in your browser</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold mb-2">Network Switching Errors</h4>
                <p className="text-gray-700 mb-3">
                  If you encounter errors when switching networks:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Ensure you have the latest version of MetaMask</li>
                  <li>Try adding the network manually using RPC details</li>
                  <li>Refresh the page and try again</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 items-center bg-gray-50 p-6 rounded-lg">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6M6 12L12 18M6 12L12 6" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Still Having Issues?</h3>
              <p className="text-gray-700">
                If you're still experiencing problems connecting your wallet, please visit our <Link href="/docs/support" className="text-blue-600 hover:text-blue-800">Support Page</Link> or contact us directly at <a href="mailto:support@orbityield.cc" className="text-blue-600 hover:text-blue-800">support@orbityield.cc</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="mt-20">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-10 rounded-xl shadow-md text-white">
          <h2 className="text-3xl font-semibold mb-6">Next Steps</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <Link href="/docs/first-investment" className="bg-white bg-opacity-20 hover:bg-opacity-30 p-6 rounded-lg transition duration-200">
              <h3 className="text-xl font-semibold mb-3">Make Your First Investment</h3>
              <p className="text-white text-opacity-90">
                Learn how to deposit assets and start earning yields.
              </p>
            </Link>
            
            <Link href="/docs/yield-strategies" className="bg-white bg-opacity-20 hover:bg-opacity-30 p-6 rounded-lg transition duration-200">
              <h3 className="text-xl font-semibold mb-3">Explore Yield Strategies</h3>
              <p className="text-white text-opacity-90">
                Understand the different yield strategies available on OrbitYield.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
