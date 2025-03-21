import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Overview | OrbitYield",
  description: "Overview of OrbitYield's cross-chain yield aggregator platform.",
}

export default function Overview() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-purple-50"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Maximize your <span className="gradient-text">DeFi returns</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              OrbitYield is a revolutionary cross-chain yield aggregator that automatically allocates your funds to the
              highest-yielding opportunities across multiple blockchains.
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">The Problem</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">DeFi opportunities are fragmented</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Yield farming opportunities are scattered across various blockchains, requiring users to manually monitor,
              compare, and shift funds between platforms. This leads to inefficiencies, high transaction fees, and
              increased security risks.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Our Solution</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Automated cross-chain yield optimization
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              OrbitYield automatically scans, evaluates, and reallocates funds based on yield potential and risk
              factors, leveraging AI, oracles, and smart contracts for optimal performance across multiple blockchains.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-5 w-5 flex-none rounded-full bg-primary" />
                  Intelligent Allocation
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Our AI-powered algorithms continuously analyze yield opportunities across all supported blockchains
                    to find the best returns.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-5 w-5 flex-none rounded-full bg-primary" />
                  Risk Assessment
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    We evaluate each protocol for security, liquidity, and sustainability to protect your investments.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-5 w-5 flex-none rounded-full bg-primary" />
                  Gas Optimization
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Our smart rebalancing minimizes transaction costs by timing operations when gas fees are low.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">How It Works</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Simple, secure, and efficient</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              OrbitYield makes cross-chain yield farming accessible to everyone, from DeFi beginners to experienced
              users.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-12">
              <div className="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white sm:shrink-0">
                  1
                </div>
                <div className="sm:min-w-0 sm:flex-1">
                  <p className="text-lg font-semibold leading-8 text-gray-900">Connect your wallet</p>
                  <p className="mt-2 text-base leading-7 text-gray-600">
                    Link your preferred wallet to OrbitYield with a simple click. We support MetaMask, WalletConnect,
                    and more.
                  </p>
                </div>
              </div>
              <div className="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white sm:shrink-0">
                  2
                </div>
                <div className="sm:min-w-0 sm:flex-1">
                  <p className="text-lg font-semibold leading-8 text-gray-900">Deposit your assets</p>
                  <p className="mt-2 text-base leading-7 text-gray-600">
                    Deposit your crypto assets into our smart vaults. We support a wide range of tokens across multiple
                    blockchains.
                  </p>
                </div>
              </div>
              <div className="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white sm:shrink-0">
                  3
                </div>
                <div className="sm:min-w-0 sm:flex-1">
                  <p className="text-lg font-semibold leading-8 text-gray-900">Choose your strategy</p>
                  <p className="mt-2 text-base leading-7 text-gray-600">
                    Select from our range of yield strategies based on your risk tolerance and investment goals.
                  </p>
                </div>
              </div>
              <div className="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white sm:shrink-0">
                  4
                </div>
                <div className="sm:min-w-0 sm:flex-1">
                  <p className="text-lg font-semibold leading-8 text-gray-900">Earn optimized yields</p>
                  <p className="mt-2 text-base leading-7 text-gray-600">
                    Our platform automatically allocates your funds to the highest-yielding opportunities and rebalances
                    as market conditions change.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative isolate overflow-hidden bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to maximize your yields?</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Join thousands of users already benefiting from OrbitYield's cross-chain yield optimization.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button className="rounded-full">Launch App</Button>
              <Link
                href="/features"
                className="flex items-center gap-1 text-sm font-semibold leading-6 text-gray-900 hover:text-primary"
              >
                Explore Features <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

