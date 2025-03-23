import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security Practices | OrbitYield Documentation",
  description: "Learn about OrbitYield's comprehensive security practices and how to keep your assets safe.",
};

export default function SecurityPage() {
  return (
    <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="mb-16">
        <Link href="/docs" className="text-blue-600 hover:text-blue-800 flex items-center mb-8">
          <span className="mr-2">←</span> Back to Documentation
        </Link>
        <h1 className="text-4xl font-bold mb-6">
          <span className="gradient-text">OrbitYield</span> Security Practices
        </h1>
        <p className="text-xl text-gray-600">
          Learn about our comprehensive security measures and best practices to keep your assets safe.
        </p>
      </div>

      {/* Platform Security Overview */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Platform Security Overview</h2>
          
          <p className="text-lg mb-8">
            At OrbitYield, security is our highest priority. Our platform is built with multiple layers of protection to safeguard your assets and data.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Non-Custodial Architecture</h3>
              </div>
              <p className="text-gray-700">
                OrbitYield operates on a non-custodial model, meaning we never take control of your private keys or assets. All transactions require your explicit approval through your connected wallet.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Security Audits</h3>
              </div>
              <p className="text-gray-700">
                All smart contracts deployed by OrbitYield undergo rigorous security audits by leading blockchain security firms. Audit reports are publicly available for complete transparency.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Risk Assessment Framework</h3>
              </div>
              <p className="text-gray-700">
                Our proprietary risk assessment framework evaluates all integrated protocols and yield strategies based on 50+ security factors before they're added to the platform.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Emergency Safety Mechanisms</h3>
              </div>
              <p className="text-gray-700">
                OrbitYield implements emergency circuit breakers, pausable contracts, and other safety mechanisms that can be activated in case of detected exploits or vulnerabilities.
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Security by Design</h3>
            <p className="text-gray-700">
              Security isn't an afterthought at OrbitYield—it's built into every aspect of our platform from the ground up. Our development process follows security by design principles with multiple review stages and checks before any code is deployed to production.
            </p>
          </div>
        </div>
      </section>

      {/* Smart Contract Security */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Smart Contract Security</h2>
          
          <p className="text-lg mb-8">
            Smart contracts are the backbone of OrbitYield's functionality. We implement industry-leading practices to ensure their security.
          </p>
          
          <div className="space-y-8 mb-10">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4">
                <div className="h-full bg-gray-50 p-6 rounded-lg flex flex-col justify-center">
                  <h3 className="text-xl font-semibold mb-3">Audited Code</h3>
                </div>
              </div>
              <div className="md:w-3/4">
                <p className="text-gray-700 mb-4">
                  All OrbitYield smart contracts undergo comprehensive security audits by multiple independent security firms, including:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>CertiK</li>
                  <li>ChainSecurity</li>
                  <li>OpenZeppelin</li>
                  <li>Trail of Bits</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Audit reports are published on our <Link href="/security/audits" className="text-blue-600 hover:text-blue-800">Security Audits</Link> page for complete transparency.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4">
                <div className="h-full bg-gray-50 p-6 rounded-lg flex flex-col justify-center">
                  <h3 className="text-xl font-semibold mb-3">Code Quality</h3>
                </div>
              </div>
              <div className="md:w-3/4">
                <p className="text-gray-700 mb-4">
                  Our smart contract development follows strict quality standards:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Use of battle-tested libraries like OpenZeppelin</li>
                  <li>Strict adherence to ERC standards</li>
                  <li>Comprehensive test coverage (95%+)</li>
                  <li>Formal verification of critical components</li>
                  <li>Gas optimization without compromising security</li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4">
                <div className="h-full bg-gray-50 p-6 rounded-lg flex flex-col justify-center">
                  <h3 className="text-xl font-semibold mb-3">Security Features</h3>
                </div>
              </div>
              <div className="md:w-3/4">
                <p className="text-gray-700 mb-4">
                  Key security features in our smart contracts include:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Reentrancy protection for all fund-handling functions</li>
                  <li>Circuit breakers to pause operations in emergencies</li>
                  <li>Role-based access control for administrative functions</li>
                  <li>Protection against common attack vectors (front-running, sandwich attacks, etc.)</li>
                  <li>Secure randomness implementation where required</li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4">
                <div className="h-full bg-gray-50 p-6 rounded-lg flex flex-col justify-center">
                  <h3 className="text-xl font-semibold mb-3">Transparent Governance</h3>
                </div>
              </div>
              <div className="md:w-3/4">
                <p className="text-gray-700 mb-4">
                  Our governance model ensures secure and transparent protocol management:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Multi-signature wallets for all treasury and critical operations</li>
                  <li>Timelock delays on all parameter changes</li>
                  <li>On-chain governance for protocol upgrades</li>
                  <li>Emergency Council for rapid response to security incidents</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-purple-800 mb-3">Continuous Monitoring</h3>
            <p className="text-gray-700">
              Our security team maintains 24/7 monitoring of all deployed contracts and integrated protocols. We use advanced anomaly detection systems to identify unusual activity patterns that could indicate potential security issues, allowing for immediate response.
            </p>
          </div>
        </div>
      </section>

      {/* User Data Security */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">User Data & Wallet Security</h2>
          
          <p className="text-lg mb-8">
            We take the security of your personal data and wallet connections seriously, implementing robust measures to protect your information.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Secure Connection Storage</h3>
              <p className="text-gray-700 mb-4">
                When you connect your MetaMask wallet to OrbitYield, your connection information is securely stored in our database:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Wallet addresses are associated with user IDs</li>
                <li>Connection timestamps are recorded for security audit purposes</li>
                <li>We never store or have access to your private keys</li>
                <li>All sensitive data is encrypted at rest and in transit</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Controlled Disconnection</h3>
              <p className="text-gray-700 mb-4">
                Our wallet management system includes a secure disconnection process:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Wallet disconnection requires explicit user request</li>
                <li>Administrative approval for wallet removal prevents unauthorized disconnection</li>
                <li>Email notifications for all connection status changes</li>
                <li>Comprehensive audit trail of all connection activities</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Role-Based Access Control</h3>
              <p className="text-gray-700 mb-4">
                Our platform implements strict role-based access control:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Regular users can only access their own wallet data</li>
                <li>Administrative functions are strictly limited to authorized personnel</li>
                <li>Principle of least privilege applied throughout the system</li>
                <li>Multi-factor authentication for administrative access</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Data Protection</h3>
              <p className="text-gray-700 mb-4">
                Your personal data is protected through:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>End-to-end encryption for all communications</li>
                <li>HTTPS-only connections with modern TLS protocols</li>
                <li>Regular security assessments and penetration testing</li>
                <li>Compliance with relevant data protection regulations</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-yellow-800 mb-3">Connection Security Notice</h3>
            <p className="text-gray-700">
              For your security, wallet connections on OrbitYield can only be removed through our formal removal request process, which requires administrative approval. This prevents unauthorized actors from disconnecting your wallet and potentially compromising your assets or account access.
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Features */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Emergency Features</h2>
          
          <p className="text-lg mb-8">
            OrbitYield includes robust emergency features to protect user funds in case of detected security threats.
          </p>
          
          <div className="space-y-10">
            <div>
              <h3 className="text-xl font-semibold mb-4">Emergency Pause</h3>
              <p className="text-gray-700 mb-4">
                All critical smart contracts include an emergency pause mechanism that can:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Temporarily halt deposits and strategy migrations</li>
                <li>Be activated by the security council if a vulnerability is detected</li>
                <li>Protect user funds while allowing withdrawals to continue</li>
              </ul>
              <p className="text-gray-700 mt-4">
                The emergency pause can only be activated by a multi-signature process requiring approval from multiple security council members, ensuring it cannot be triggered maliciously.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Emergency Withdrawal</h3>
              <p className="text-gray-700 mb-4">
                In extreme situations, OrbitYield provides an emergency withdrawal function that:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Allows users to withdraw their funds directly from strategies</li>
                <li>Bypasses standard withdrawal processes if they're compromised</li>
                <li>Prioritizes fund security over gas efficiency</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Instructions for using the emergency withdrawal feature would be provided through official communication channels in case it's ever needed.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Strategy Isolation</h3>
              <p className="text-gray-700 mb-4">
                OrbitYield's architecture isolates strategies from each other to:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Prevent contagion effects if one strategy is compromised</li>
                <li>Allow for granular pausing of specific strategies</li>
                <li>Maintain overall platform stability even if individual components face issues</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Security Incident Response</h3>
              <p className="text-gray-700 mb-4">
                Our security team follows a comprehensive incident response plan that includes:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>24/7 monitoring for unusual activity</li>
                <li>Predefined response procedures for different threat levels</li>
                <li>Clear communication protocols to keep users informed</li>
                <li>Coordination with external security researchers and audit firms</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* User Best Practices */}
      <section>
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">User Security Best Practices</h2>
          
          <p className="text-lg mb-8">
            While OrbitYield implements robust security measures, users play a critical role in maintaining the security of their assets. Follow these best practices to enhance your security:
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Wallet Security</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Use a hardware wallet (like Ledger or Trezor) for large investments</li>
                <li>Never share your seed phrase or private keys with anyone</li>
                <li>Store your recovery phrase offline in a secure location</li>
                <li>Consider using a separate dedicated wallet for DeFi activities</li>
                <li>Keep your wallet software and firmware updated</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Account Security</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Use a strong, unique password for your OrbitYield account</li>
                <li>Enable two-factor authentication when available</li>
                <li>Use a secure email address for platform communications</li>
                <li>Regularly review your connected applications and revoke unused connections</li>
                <li>Log out from your account when not using the platform</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Transaction Safety</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Always verify transaction details before confirming</li>
                <li>Check smart contract addresses against official sources</li>
                <li>Start with small amounts when using new features</li>
                <li>Be wary of unusually high gas fees, which may indicate malicious transactions</li>
                <li>Never rush transactions—take time to review what you're approving</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Phishing Prevention</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Always double-check the URL (orbityield.cc) before connecting your wallet</li>
                <li>Bookmark the official OrbitYield website instead of using search engines</li>
                <li>Be suspicious of unsolicited messages, emails, or offers</li>
                <li>OrbitYield team will never ask for your seed phrase or private keys</li>
                <li>Verify information through official channels before taking action</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-10">
            <h3 className="text-xl font-semibold text-red-800 mb-3">Warning Signs</h3>
            <p className="text-gray-700 mb-4">
              Be alert for these potential security red flags:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Requests to share your seed phrase or private keys (legitimate DApps never need these)</li>
              <li>Unusual wallet connection requests or permission requests</li>
              <li>Transactions that appear without your initiation</li>
              <li>Website interfaces that look different from normal</li>
              <li>Unusually high fees or unexpected token approvals</li>
            </ul>
            <p className="text-gray-700 mt-4">
              If you notice any of these warning signs, disconnect your wallet immediately and contact our support team.
            </p>
          </div>
          
          <div className="text-center">
            <Link href="/docs/security/guides" className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-200">
              View Detailed Security Guides
            </Link>
          </div>
        </div>
      </section>

      {/* Stay Informed */}
      <section className="mt-20">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-10 rounded-xl shadow-md text-white">
          <h2 className="text-3xl font-semibold mb-6">Stay Informed</h2>
          <p className="text-xl mb-8">
            Security is an ongoing process. Stay updated with the latest security information and best practices:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-20 hover:bg-opacity-30 p-6 rounded-lg transition duration-200">
              <h3 className="text-xl font-semibold mb-3">Security Newsletter</h3>
              <p className="text-white text-opacity-90 mb-4">
                Subscribe to our security newsletter for updates on our security measures and best practices.
              </p>
              <a href="#subscribe" className="text-white font-semibold underline">Subscribe Now</a>
            </div>
            
            <div className="bg-white bg-opacity-20 hover:bg-opacity-30 p-6 rounded-lg transition duration-200">
              <h3 className="text-xl font-semibold mb-3">Audit Reports</h3>
              <p className="text-white text-opacity-90 mb-4">
                Review our latest smart contract audit reports and security assessments.
              </p>
              <Link href="/security/audits" className="text-white font-semibold underline">View Audits</Link>
            </div>
            
            <div className="bg-white bg-opacity-20 hover:bg-opacity-30 p-6 rounded-lg transition duration-200">
              <h3 className="text-xl font-semibold mb-3">Security Blog</h3>
              <p className="text-white text-opacity-90 mb-4">
                Read our latest articles on DeFi security and how we're improving our platform.
              </p>
              <Link href="/blog/category/security" className="text-white font-semibold underline">Read Articles</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
