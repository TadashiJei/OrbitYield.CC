import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Globe, Lock, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#07FFFF]/20 via-[#7916F3]/20 to-[#FF2670]/20"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 lg:py-32 lg:px-8">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-gray-900">
              Defy what&apos;s <span className="gradient-text">possible</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-700 animate-slide-in stagger-1">
              OrbitYield is a cross-chain yield aggregator that maximizes your returns by automatically allocating funds
              to the highest-yielding opportunities across multiple blockchains.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-x-4 gap-y-4 animate-slide-in stagger-2">
              <Button className="text-sm py-2 px-4 rounded-full bg-primary/90 hover:bg-primary text-white transition-colors">
                Launch App
              </Button>
              <Link
                href="/overview"
                className="flex items-center gap-1 text-sm font-semibold leading-6 text-gray-900 hover:text-primary transition-colors"
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="relative h-[400px] w-[400px]">
            <div className="absolute top-0 left-0 h-16 w-16 rounded-full bg-[#FF2670] opacity-40 animate-float"></div>
            <div
              className="absolute top-1/4 right-1/4 h-24 w-24 rounded-full bg-[#07FFFF] opacity-30 animate-float"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-1/3 left-1/3 h-20 w-20 rounded-full bg-[#E4FF07] opacity-30 animate-float"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute bottom-0 right-0 h-16 w-16 rounded-full bg-[#7916F3] opacity-40 animate-float"
              style={{ animationDelay: "1.5s" }}
            ></div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight lg:text-4xl text-gray-900">
              A future led by you
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600">
              OrbitYield is designed to maximize your returns while minimizing risks across multiple blockchains.
            </p>
          </div>
          <div className="mx-auto mt-12 sm:mt-16 lg:mt-20 max-w-2xl lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 sm:gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col animate-fade-in stagger-1">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Globe className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                  Cross-chain optimization
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-sm sm:text-base leading-6 sm:leading-7 text-gray-600">
                  <p className="flex-auto">
                    Automatically identifies and allocates funds to the best yield opportunities across multiple
                    blockchains.
                  </p>
                  <p className="mt-4 sm:mt-6">
                    <Link href="/features" className="text-sm font-semibold leading-6 text-primary transition-colors">
                      Learn more <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>
              <div className="flex flex-col animate-fade-in stagger-2">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Zap className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                  Auto-rebalancing strategies
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-sm sm:text-base leading-6 sm:leading-7 text-gray-600">
                  <p className="flex-auto">
                    Dynamically moves funds based on real-time APY changes to ensure your portfolio always achieves
                    optimal returns.
                  </p>
                  <p className="mt-4 sm:mt-6">
                    <Link href="/features" className="text-sm font-semibold leading-6 text-primary transition-colors">
                      Learn more <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>
              <div className="flex flex-col animate-fade-in stagger-3">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Lock className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                  Risk assessment scoring
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-sm sm:text-base leading-6 sm:leading-7 text-gray-600">
                  <p className="flex-auto">
                    AI-powered evaluation of liquidity pools to mitigate risks and protect your investments across all
                    chains.
                  </p>
                  <p className="mt-4 sm:mt-6">
                    <Link href="/features" className="text-sm font-semibold leading-6 text-primary transition-colors">
                      Learn more <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center animate-fade-in">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight lg:text-4xl text-gray-900">
                OrbitYield&apos;s unstoppable momentum
              </h2>
              <p className="mt-4 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600">
                Join thousands of users already maximizing their DeFi returns
              </p>
            </div>
            <dl className="mt-12 sm:mt-16 grid grid-cols-2 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col bg-white p-4 sm:p-8 animate-fade-in stagger-1">
                <dt className="text-xs sm:text-sm font-semibold leading-6 text-gray-600">Total Value Locked</dt>
                <dd className="order-first text-xl sm:text-3xl font-semibold tracking-tight">$149M+</dd>
              </div>
              <div className="flex flex-col bg-white p-4 sm:p-8 animate-fade-in stagger-2">
                <dt className="text-xs sm:text-sm font-semibold leading-6 text-gray-600">Supported Chains</dt>
                <dd className="order-first text-xl sm:text-3xl font-semibold tracking-tight">12+</dd>
              </div>
              <div className="flex flex-col bg-white p-4 sm:p-8 animate-fade-in stagger-3">
                <dt className="text-xs sm:text-sm font-semibold leading-6 text-gray-600">Yield Strategies</dt>
                <dd className="order-first text-xl sm:text-3xl font-semibold tracking-tight">150+</dd>
              </div>
              <div className="flex flex-col bg-white p-4 sm:p-8 animate-fade-in stagger-4">
                <dt className="text-xs sm:text-sm font-semibold leading-6 text-gray-600">Active Users</dt>
                <dd className="order-first text-xl sm:text-3xl font-semibold tracking-tight">25,000+</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight lg:text-4xl text-gray-900">
              Home to the bold and visionary
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600">
              Discover the innovative features that make OrbitYield the leading cross-chain yield aggregator
            </p>
          </div>
          <div className="mx-auto mt-12 sm:mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-6 sm:gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <Card className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-4 sm:px-8 pb-4 sm:pb-8 pt-40 sm:pt-80 animate-fade-in stagger-1 hover:shadow-lg transition-shadow">
              <img
                src="/placeholder.svg?height=1080&width=1920"
                alt="Abstract representation of cross-chain technology"
                className="absolute inset-0 -z-10 h-full w-full object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
              <h3 className="mt-3 text-xl sm:text-2xl font-bold leading-6 text-white">Cross-Chain Bridging</h3>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-5 sm:leading-6 text-gray-300">
                Seamlessly move assets between blockchains with our secure bridging technology
              </p>
            </Card>
            <Card className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-4 sm:px-8 pb-4 sm:pb-8 pt-40 sm:pt-80 animate-fade-in stagger-2 hover:shadow-lg transition-shadow">
              <img
                src="/placeholder.svg?height=1080&width=1920"
                alt="Dashboard analytics visualization"
                className="absolute inset-0 -z-10 h-full w-full object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
              <h3 className="mt-3 text-xl sm:text-2xl font-bold leading-6 text-white">Yield Analytics</h3>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-5 sm:leading-6 text-gray-300">
                Advanced analytics to track and optimize your yield farming performance
              </p>
            </Card>
            <Card className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-4 sm:px-8 pb-4 sm:pb-8 pt-40 sm:pt-80 animate-fade-in stagger-3 hover:shadow-lg transition-shadow">
              <img
                src="/placeholder.svg?height=1080&width=1920"
                alt="Smart contract security visualization"
                className="absolute inset-0 -z-10 h-full w-full object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
              <h3 className="mt-3 text-xl sm:text-2xl font-bold leading-6 text-white">Smart Vaults</h3>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-5 sm:leading-6 text-gray-300">
                Secure, automated vaults that implement complex yield strategies with minimal gas fees
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative isolate overflow-hidden bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 lg:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight lg:text-4xl text-gray-900">
              What are you waiting for?
            </h2>
            <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-base sm:text-lg leading-7 sm:leading-8 text-gray-600">
              Join thousands of users already maximizing their DeFi returns with OrbitYield's cross-chain yield
              aggregator.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 animate-slide-in stagger-1">
              <Button className="text-sm py-2 px-4 rounded-full bg-primary/90 hover:bg-primary text-white transition-colors">
                Get started
              </Button>
              <Button
                variant="outline"
                className="text-sm py-2 px-4 rounded-full border-gray-300 text-gray-900 hover:bg-gray-50 transition-colors"
              >
                Start building
              </Button>
              <Button
                variant="outline"
                className="text-sm py-2 px-4 rounded-full border-gray-300 text-gray-900 hover:bg-gray-50 transition-colors"
              >
                Explore Farming
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

