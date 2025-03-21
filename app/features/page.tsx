import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, Globe, Lock, Layers, RefreshCw, Shield, TrendingUp, Wallet, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "Features | OrbitYield",
  description: "Explore the features of OrbitYield's cross-chain yield aggregator platform.",
}

export default function Features() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-purple-50"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Powerful <span className="gradient-text">features</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover the innovative features that make OrbitYield the leading cross-chain yield aggregator in the DeFi
              space.
            </p>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Core Features</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Designed for optimal performance</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our platform combines cutting-edge technology with user-friendly design to deliver the best yield farming
              experience.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <Card className="flex flex-col overflow-hidden border-0 shadow-lg">
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                    <Globe className="h-6 w-6" />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">Cross-Chain Yield Optimization</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      Automatically identifies and allocates funds to the best yield opportunities across multiple
                      blockchains, including Ethereum, Binance Smart Chain, Polkadot, and more.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden border-0 shadow-lg">
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                    <RefreshCw className="h-6 w-6" />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">Auto-Rebalancing Strategies</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      Dynamically moves funds based on real-time APY changes to ensure your portfolio always achieves
                      optimal returns while minimizing impermanent loss.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden border-0 shadow-lg">
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">Risk Assessment Scoring</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      AI-powered evaluation of liquidity pools to mitigate risks and protect your investments across all
                      chains, with customizable risk tolerance settings.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </dl>
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Additional Features</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to succeed</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              OrbitYield offers a comprehensive suite of features designed to enhance your yield farming experience.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Layers className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                  Multi-Layer Security
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Our platform employs multiple security layers, including audited smart contracts, multi-sig wallets,
                    and real-time monitoring.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <TrendingUp className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                  Advanced Analytics
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Comprehensive dashboard with detailed performance metrics, historical yields, and portfolio
                    analysis.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Wallet className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                  Gas Fee Optimization
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Intelligent transaction batching and timing to minimize gas fees across all supported blockchains.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Lock className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                  Non-Custodial Architecture
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    You maintain full control of your assets at all times. OrbitYield never takes custody of your funds.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <BarChart3 className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                  Yield Comparison Tools
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Side-by-side comparison of different yield strategies across protocols and blockchains.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Award className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                  Loyalty Rewards
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Earn additional rewards through our loyalty program, including boosted yields and governance rights.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Supported Chains Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Supported Blockchains</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Truly cross-chain</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              OrbitYield supports a growing list of blockchains, allowing you to access yield opportunities across the
              entire DeFi ecosystem.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {[
                { name: "Ethereum", logo: "/blockchain-logos/ethereum.svg" },
                { name: "Binance Smart Chain", logo: "/blockchain-logos/binance.svg" },
                { name: "Polkadot", logo: "/blockchain-logos/polkadot.svg" },
                { name: "Avalanche", logo: "/blockchain-logos/avalanche.svg" },
                { name: "Solana", logo: "/blockchain-logos/solana.svg" },
                { name: "Polygon", logo: "/blockchain-logos/polygon.svg" },
                { name: "Fantom", logo: "/blockchain-logos/fantom.svg" },
                { name: "Arbitrum", logo: "/blockchain-logos/arbitrum.svg" },
                { name: "Optimism", logo: "/blockchain-logos/optimism.svg" },
                { name: "Cosmos", logo: "/blockchain-logos/cosmos.svg" },
                { name: "Near", logo: "/blockchain-logos/near.svg" },
                { name: "Harmony", logo: "/blockchain-logos/harmony.svg" },
              ].map((chain) => (
                <div key={chain.name} className="flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                    <img src={chain.logo} alt={chain.name} className="h-10 w-10" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-gray-900">{chain.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative isolate overflow-hidden bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Experience the power of OrbitYield</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Start maximizing your DeFi returns today with our advanced cross-chain yield aggregator.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button className="rounded-full">Launch App</Button>
              <Button variant="outline" className="rounded-full">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
