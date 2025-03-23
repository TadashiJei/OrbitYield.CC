import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation | OrbitYield",
  description: "Documentation for OrbitYield - the AI-powered cross-chain yield aggregator that maximizes your returns.",
};

export default function DocsPage() {
  return (
    <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-purple-50"></div>
      <div className="relative">
        <h1 className="text-4xl font-bold mb-8">
          <span className="gradient-text">OrbitYield</span> Documentation
        </h1>
        
        <p className="text-lg mb-12">
          Welcome to the OrbitYield documentation portal. Here you&apos;ll find comprehensive guides and documentation to help you start working with OrbitYield as quickly as possible, as well as support if you get stuck.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Getting Started */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
            <p className="text-gray-600 mb-6">New to OrbitYield? Start here to learn the basics and get up and running quickly.</p>
            <ul className="space-y-3">
              <li>
                <Link href="/docs/introduction" className="text-blue-600 hover:text-blue-800 flex items-center">
                  <span className="mr-2">→</span> Introduction to OrbitYield
                </Link>
              </li>
              <li>
                <Link href="/docs/how-it-works" className="text-blue-600 hover:text-blue-800 flex items-center">
                  <span className="mr-2">→</span> How OrbitYield Works
                </Link>
              </li>
              <li>
                <Link href="/docs/connect-wallet" className="text-blue-600 hover:text-blue-800 flex items-center">
                  <span className="mr-2">→</span> Connecting Your Wallet
                </Link>
              </li>
              <li>
                <Link href="/docs/first-investment" className="text-blue-600 hover:text-blue-800 flex items-center">
                  <span className="mr-2">→</span> Making Your First Investment
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Core Concepts */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Core Concepts</h2>
            <p className="text-gray-600 mb-6">Learn about the key concepts and technologies behind OrbitYield.</p>
            <ul className="space-y-3">
              <li>
                <Link href="/docs/yield-strategies" className="text-blue-600 hover:text-blue-800 flex items-center">
                  <span className="mr-2">→</span> Yield Strategies Explained
                </Link>
              </li>
              <li>
                <Link href="/docs/cross-chain-farming" className="text-blue-600 hover:text-blue-800 flex items-center">
                  <span className="mr-2">→</span> Cross-Chain Yield Farming
                </Link>
              </li>
              <li>
                <Link href="/docs/risk-assessment" className="text-blue-600 hover:text-blue-800 flex items-center">
                  <span className="mr-2">→</span> Risk Assessment Framework
                </Link>
              </li>
              <li>
                <Link href="/docs/ai-optimization" className="text-blue-600 hover:text-blue-800 flex items-center">
                  <span className="mr-2">→</span> AI Optimization Technology
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Platform Guides */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Platform Guides</h2>
            <p className="text-gray-600 mb-6">Detailed guides to using the OrbitYield platform effectively.</p>
            <ul className="space-y-3">
              <li>
                <Link href="/docs/dashboard" className="text-blue-600 hover:text-blue-800 flex items-center">
                  <span className="mr-2">→</span> Navigating the Dashboard
                </Link>
              </li>
              <li>
                <Link href="/docs/portfolio-management" className="text-blue-600 hover:text-blue-800 flex items-center">
                  <span className="mr-2">→</span> Portfolio Management
                </Link>
              </li>
              <li>
                <Link href="/docs/wallet-management" className="text-blue-600 hover:text-blue-800 flex items-center">
                  <span className="mr-2">→</span> Wallet Management
                </Link>
              </li>
              <li>
                <Link href="/docs/transaction-history" className="text-blue-600 hover:text-blue-800 flex items-center">
                  <span className="mr-2">→</span> Transaction History
                </Link>
              </li>
            </ul>
          </div>
          
          {/* API Reference */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">API Reference</h2>
            <p className="text-gray-600 mb-6">Integrate with OrbitYield using our comprehensive API.</p>
            <ul className="space-y-3">
              <li>
                <Link href="/docs/api/overview" className="text-blue-600 hover:text-blue-800 flex items-center">
                  <span className="mr-2">→</span> API Overview
                </Link>
              </li>
              <li>
                <Link href="/docs/api/authentication" className="text-blue-600 hover:text-blue-800 flex items-center">
                  <span className="mr-2">→</span> Authentication
                </Link>
              </li>
              <li>
                <Link href="/docs/api/endpoints" className="text-blue-600 hover:text-blue-800 flex items-center">
                  <span className="mr-2">→</span> API Endpoints
                </Link>
              </li>
              <li>
                <Link href="/docs/api/guides" className="text-blue-600 hover:text-blue-800 flex items-center">
                  <span className="mr-2">→</span> Integration Guides
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Security */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Security</h2>
            <p className="text-gray-600 mb-6">Learn about our security practices and how to keep your assets safe.</p>
            <ul className="space-y-3">
              <li>
                <Link href="/docs/security-practices" className="text-blue-600 hover:text-blue-800 flex items-center">
                  <span className="mr-2">→</span> Security Practices
                </Link>
              </li>
              <li>
                <Link href="/docs/smart-contract-security" className="text-blue-600 hover:text-blue-800 flex items-center">
                  <span className="mr-2">→</span> Smart Contract Security
                </Link>
              </li>
              <li>
                <Link href="/docs/emergency-features" className="text-blue-600 hover:text-blue-800 flex items-center">
                  <span className="mr-2">→</span> Emergency Features
                </Link>
              </li>
              <li>
                <Link href="/docs/best-practices" className="text-blue-600 hover:text-blue-800 flex items-center">
                  <span className="mr-2">→</span> User Best Practices
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support & Community */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Support & Community</h2>
            <p className="text-gray-600 mb-6">Get help and connect with other OrbitYield users.</p>
            <ul className="space-y-3">
              <li>
                <Link href="/docs/faq" className="text-blue-600 hover:text-blue-800 flex items-center">
                  <span className="mr-2">→</span> Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/docs/troubleshooting" className="text-blue-600 hover:text-blue-800 flex items-center">
                  <span className="mr-2">→</span> Troubleshooting Guide
                </Link>
              </li>
              <li>
                <a href="https://discord.gg/orbityield" className="text-blue-600 hover:text-blue-800 flex items-center" target="_blank" rel="noopener noreferrer">
                  <span className="mr-2">→</span> Community Discord
                </a>
              </li>
              <li>
                <a href="https://forum.orbityield.cc" className="text-blue-600 hover:text-blue-800 flex items-center" target="_blank" rel="noopener noreferrer">
                  <span className="mr-2">→</span> Forum
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
