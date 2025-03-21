import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Search } from "lucide-react"

export const metadata: Metadata = {
  title: "FAQ | OrbitYield",
  description: "Frequently asked questions about OrbitYield's cross-chain yield aggregator platform.",
}

export default function FAQ() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-purple-50"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              <span className="gradient-text">FAQ</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Find answers to frequently asked questions about OrbitYield&apos;s cross-chain yield aggregator platform.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                name="search"
                id="search"
                className="block w-full rounded-md border-0 py-4 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                placeholder="Search for answers..."
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories Section */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">FAQ Categories</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Browse by topic
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { name: "Getting Started", count: 12, link: "#getting-started" },
                { name: "Platform Features", count: 8, link: "#platform-features" },
                { name: "Yield Strategies", count: 10, link: "#yield-strategies" },
                { name: "Security", count: 6, link: "#security" },
                { name: "Fees & Rewards", count: 5, link: "#fees-rewards" },
                { name: "ORBIT Token", count: 7, link: "#orbit-token" },
                { name: "Technical Issues", count: 9, link: "#technical-issues" },
                { name: "Governance", count: 4, link: "#governance" },
              ].map((category) => (
                <Card key={category.name} className="flex flex-col overflow-hidden border-0 shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">{category.name}</h3>
                    <p className="mt-2 text-sm text-gray-600">{category.count} questions</p>
                    <div className="mt-4">
                      <Link href={category.link} className="text-sm font-semibold leading-6 text-primary">
                        View all <ArrowRight className="inline-block h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started FAQs */}
      <section id="getting-started" className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Getting Started</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Basic questions
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl lg:max-w-4xl">
            <div className="grid grid-cols-1 gap-y-8">
              {[
                {
                  question: "What is OrbitYield?",
                  answer: "OrbitYield is a cross-chain yield aggregator that automatically allocates your funds to the highest-yielding opportunities across multiple blockchains, maximizing your returns while minimizing risks.",
                },
                {
                  question: "How does OrbitYield work?",
                  answer: "OrbitYield uses AI-powered algorithms to scan, evaluate, and allocate funds to the best yield opportunities across multiple blockchains. Our platform handles the complex cross-chain operations, gas optimization, and risk assessment for you.",
                },
                {
                  question: "How do I get started with OrbitYield?",
                  answer: "To get started, simply connect your wallet to the OrbitYield platform, deposit your assets into our smart vaults, and select your preferred yield strategy. Our platform will automatically allocate your funds to the best opportunities.",
                },
                {
                  question: "Which wallets are supported?",
                  answer: "OrbitYield supports a wide range of wallets, including MetaMask, WalletConnect, Coinbase Wallet, Trust Wallet, Ledger, Trezor, Phantom, and more. You can connect your preferred wallet with just a few clicks.",
                },
                {
                  question: "Which cryptocurrencies can I deposit?",
                  answer: "OrbitYield supports a wide range of cryptocurrencies, including major assets like ETH, BTC (wrapped), USDC, USDT, DAI, and many more. The list of supported assets is continuously expanding.",
                },
              ].map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-8">
                  <h3 className="text-lg font-semibold leading-7 text-gray-900">{faq.question}</h3>
                  <p className="mt-4 text-sm leading-6 text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features FAQs */}
      <section id="platform-features" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Platform Features</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Features and capabilities
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl lg:max-w-4xl">
            <div className="grid grid-cols-1 gap-y-8">
              {[
                {
                  question: "Which blockchains does OrbitYield support?",
                  answer: "OrbitYield currently supports Ethereum, Binance Smart Chain, Polygon, Avalanche, Solana, Fantom, Arbitrum, Optimism, and more. We're continuously adding support for additional blockchains.",
                },
                {
                  question: "How does cross-chain yield optimization work?",
                  answer: "OrbitYield's cross-chain yield optimization works by continuously monitoring yield opportunities across all supported blockchains, comparing risk-adjusted returns, and automatically allocating funds to the best opportunities. Our platform handles all the complex cross-chain operations, including bridging assets between blockchains when necessary.",
                },
                {
                  question: "What is auto-rebalancing and how does it work?",
                  answer: "Auto-rebalancing is a feature that automatically adjusts your portfolio allocation based on changing market conditions and yield opportunities. When yields change significantly or new opportunities emerge, OrbitYield will automatically rebalance your portfolio to maintain optimal returns, taking into account gas costs and other factors.",
                },
                {
                  question: "Can I customize my yield strategies?",
                  answer: "Yes, OrbitYield offers customizable yield strategies based on your risk tolerance and investment goals. You can choose from pre-defined strategies ranging from conservative to aggressive, or create your own custom strategy by setting specific parameters like minimum APY, maximum risk score, preferred blockchains, and more.",
                },
                {
                  question: "How does OrbitYield minimize gas fees?",
                  answer: "OrbitYield minimizes gas fees through several techniques, including transaction batching, optimal timing of transactions during periods of low network congestion, and gas-efficient smart contract design. Our platform also factors in gas costs when evaluating yield opportunities to ensure that the net returns after gas fees are maximized.",
                },
              ].map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-8">
                  <h3 className="text-lg font-semibold leading-7 text-gray-900">{faq.question}</h3>
                  <p className="mt-4 text-sm leading-6 text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Yield Strategies FAQs */}
      <section id="yield-strategies" className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Yield Strategies</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Understanding yield optimization
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl lg:max-w-4xl">
            <div className="grid grid-cols-1 gap-y-8">
              {[
                {
                  question: "What types of yield strategies does OrbitYield offer?",
                  answer: "OrbitYield offers various yield strategies, including lending, liquidity provision, staking, yield farming, and more. These strategies are categorized based on risk levels (conservative, moderate, aggressive) and asset types (stablecoins, blue-chip cryptocurrencies, etc.).",
                },
                {
                  question: "How are yields calculated?",
                  answer: "Yields are calculated based on the annual percentage yield (APY) of the underlying protocols, taking into account compounding effects, token rewards, and other factors. Our platform provides real-time APY data for all supported yield opportunities.",
                },
                {
                  question: "What is impermanent loss and how does OrbitYield handle it?",
                  answer: "Impermanent loss occurs in liquidity pools when the price ratio of the paired assets changes. OrbitYield's risk assessment system factors in potential impermanent loss when evaluating liquidity provision opportunities, and our auto-rebalancing feature can help mitigate impermanent loss by adjusting allocations based on market conditions.",
                },
                {
                  question: "How often are yields updated?",
                  answer: "Yields are updated in real-time on our platform, with our algorithms continuously monitoring and evaluating yield opportunities across all supported blockchains and protocols.",
                },
                {
                  question: "Can I withdraw my funds at any time?",
                  answer: "Yes, you can withdraw your funds at any time. However, some yield strategies may have specific withdrawal conditions or timeframes set by the underlying protocols. Our platform clearly indicates any such conditions before you deposit your funds.",
                },
              ].map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-8">
                  <h3 className="text-lg font-semibold leading-7 text-gray-900">{faq.question}</h3>
                  <p className="mt-4 text-sm leading-6 text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security FAQs */}
      <section id="security" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Security</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Keeping your assets safe
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl lg:max-w-4xl">
            <div className="grid grid-cols-1 gap-y-8">
              {[
                {
                  question: "How does OrbitYield ensure the security of my funds?",
                  answer: "OrbitYield employs a non-custodial architecture, meaning you maintain full control of your assets at all times. Our smart contracts are audited by leading security firms, and we implement multiple layers of security measures to protect your funds.",
                },
                {
                  question: "What measures does OrbitYield take to prevent hacking and other security threats?",
                  answer: "OrbitYield has implemented multiple security measures to prevent hacking and other security threats, including regular security audits, penetration testing, and bug bounty programs. We also use secure communication protocols and encryption to protect user data.",
                },
                {
                  question: "How does OrbitYield handle private keys and sensitive user information?",
                  answer: "OrbitYield does not store private keys or sensitive user information on our servers. Instead, we use secure, decentralized storage solutions to protect user data and ensure that it remains confidential.",
                },
                {
                  question: "What happens if I lose access to my wallet or private keys?",
                  answer: "If you lose access to your wallet or private keys, you can contact our support team for assistance. We will work with you to recover your funds and restore access to your account.",
                },
                {
                  question: "How does OrbitYield comply with regulatory requirements?",
                  answer: "OrbitYield complies with all relevant regulatory requirements, including anti-money laundering (AML) and know-your-customer (KYC) regulations. We also work with regulatory bodies to ensure that our platform is compliant with all applicable laws and regulations.",
                },
              ].map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-8">
                  <h3 className="text-lg font-semibold leading-7 text-gray-900">{faq.question}</h3>
                  <p className="mt-4 text-sm leading-6 text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
