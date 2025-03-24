import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TokenAllocationChart } from "./TokenAllocationChart"
import { ArrowRight, Award, Gem, BarChart3, ShieldCheck, Zap, Layers, Target } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Tokenomics | OrbitYield",
  description: "Tokenomics of the OrbitYield platform and ORBIT token.",
}

export default function Tokenomics() {
  const tokenAllocation = [
    { name: "Community Rewards", value: 40, color: "#FF2670" },
    { name: "Team & Advisors", value: 20, color: "#7916F3" },
    { name: "Treasury", value: 15, color: "#E4FF07" },
    { name: "Ecosystem Growth", value: 15, color: "#07FFFF" },
    { name: "Initial Liquidity", value: 10, color: "#6E7391" },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section with 3D Token Visual */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50"></div>
        <div className="absolute opacity-30 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-primary/20 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-secondary/20 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-accent/20 animate-pulse"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 flex flex-col lg:flex-row items-center">
          <div className="max-w-2xl lg:max-w-lg lg:pr-8">
            <div className="mb-6">
              <span className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <Gem className="mr-1 h-3 w-3" /> ORBIT Token
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              <span className="gradient-text">Power</span> your DeFi journey
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              The ORBIT token powers the OrbitYield ecosystem, providing governance rights, fee discounts, and yield
              boosting capabilities.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link 
                href="#token-utility" 
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full"
                )}
              >
                Explore Token Utility
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                href="https://docs.orbityield.cc/tokenomics" 
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary transition"
              >
                Read the docs <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="mt-16 lg:mt-0 lg:flex-shrink-0 flex justify-center lg:justify-end w-full lg:w-1/2">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-20 blur-2xl"></div>
              <div className="relative h-full w-full flex items-center justify-center">
                <div className="h-40 w-40 md:h-60 md:w-60 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-white">
                  <div className="h-36 w-36 md:h-52 md:w-52 rounded-full bg-gradient-to-br from-primary via-purple-500 to-secondary flex items-center justify-center text-white font-bold text-2xl md:text-4xl">
                    ORBIT
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Token Stats Banner */}
      <section className="bg-gradient-to-r from-primary/90 to-secondary/90 text-white py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-2xl md:text-3xl font-bold">100M</p>
              <p className="text-sm mt-1 text-white/80">Total Supply</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold">40%</p>
              <p className="text-sm mt-1 text-white/80">Community Rewards</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold">2.5x</p>
              <p className="text-sm mt-1 text-white/80">Max Yield Boost</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold">10+</p>
              <p className="text-sm mt-1 text-white/80">Utility Functions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Token Overview Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Token Overview</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Powering the OrbitYield ecosystem</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              The ORBIT token is designed to align the interests of all stakeholders in the OrbitYield ecosystem.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <Card className="flex flex-col overflow-hidden border-0 shadow-lg group hover:shadow-xl transition duration-300">
                <div className="h-2 w-full bg-primary"></div>
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary">
                    <Award className="h-6 w-6" />
                  </div>
                  <div className="mt-2">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">Governance</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      ORBIT token holders can participate in platform governance, voting on key decisions such as
                      protocol upgrades, fee structures, and new feature implementations.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden border-0 shadow-lg group hover:shadow-xl transition duration-300">
                <div className="h-2 w-full bg-secondary"></div>
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-secondary/10 text-secondary">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div className="mt-2">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">Yield Boosting</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      Staking ORBIT tokens allows users to boost their yield farming returns, with higher stakes
                      resulting in greater boosts up to a maximum of 2.5x.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden border-0 shadow-lg group hover:shadow-xl transition duration-300">
                <div className="h-2 w-full bg-accent"></div>
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-accent/10 text-accent">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <div className="mt-2">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">Fee Discounts</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      ORBIT token holders receive discounts on platform fees, with the discount percentage based on the
                      number of tokens held or staked.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </dl>
          </div>
        </div>
      </section>

      {/* Token Allocation Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Token Allocation</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Fair distribution model</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              The ORBIT token has a total supply of 100,000,000 tokens, distributed as follows:
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-8">
              <div className="flex flex-col justify-center">
                <TokenAllocationChart tokenAllocation={tokenAllocation} />
              </div>
              <div>
                <ul role="list" className="space-y-8">
                  {tokenAllocation.map((item) => (
                    <li key={item.name} className="flex gap-x-4">
                      <div className="flex-none mt-1">
                        <div className="h-8 w-8 rounded-lg shadow-md flex items-center justify-center" style={{ backgroundColor: item.color }}>
                          <span className="text-xs font-bold text-white">{item.value}%</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold leading-7 text-gray-900">
                          {item.name}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-gray-600">
                          {item.name === "Community Rewards" &&
                            "Allocated to reward users for participating in the OrbitYield ecosystem through yield farming, liquidity provision, and other activities."}
                          {item.name === "Team & Advisors" &&
                            "Allocated to the founding team and advisors, with a 2-year vesting period and 6-month cliff to ensure long-term alignment."}
                          {item.name === "Treasury" &&
                            "Reserved for future development, partnerships, and ecosystem growth initiatives as determined by governance."}
                          {item.name === "Ecosystem Growth" &&
                            "Dedicated to incentivizing ecosystem growth through grants, partnerships, and developer incentives."}
                          {item.name === "Initial Liquidity" &&
                            "Provided as initial liquidity on decentralized exchanges to ensure sufficient trading depth from launch."}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Token Utility Section */}
      <section id="token-utility" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Token Utility</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Multiple use cases</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              The ORBIT token has been designed with multiple utilities to create a sustainable ecosystem.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="flex flex-col overflow-hidden border-0 shadow-md hover:shadow-lg transition">
                <CardContent className="p-6">
                  <div className="mb-4 rounded-full w-10 h-10 flex items-center justify-center bg-primary/10 text-primary">
                    <Layers className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold leading-8 text-gray-900">Staking Rewards</h3>
                  <p className="mt-4 text-base leading-7 text-gray-600">
                    Stake ORBIT tokens to earn a share of platform fees, with rewards distributed proportionally to
                    staked amounts.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden border-0 shadow-md hover:shadow-lg transition">
                <CardContent className="p-6">
                  <div className="mb-4 rounded-full w-10 h-10 flex items-center justify-center bg-secondary/10 text-secondary">
                    <Target className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold leading-8 text-gray-900">Access to Premium Features</h3>
                  <p className="mt-4 text-base leading-7 text-gray-600">
                    Holding ORBIT tokens grants access to premium features such as advanced analytics, custom
                    strategies, and early access to new yield opportunities.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden border-0 shadow-md hover:shadow-lg transition">
                <CardContent className="p-6">
                  <div className="mb-4 rounded-full w-10 h-10 flex items-center justify-center bg-accent/10 text-accent">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold leading-8 text-gray-900">Insurance Pool Participation</h3>
                  <p className="mt-4 text-base leading-7 text-gray-600">
                    ORBIT token holders can participate in insurance pools to protect against smart contract risks and
                    earn additional rewards.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden border-0 shadow-md hover:shadow-lg transition">
                <CardContent className="p-6">
                  <div className="mb-4 rounded-full w-10 h-10 flex items-center justify-center bg-primary/10 text-primary">
                    <Award className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold leading-8 text-gray-900">Protocol Revenue Sharing</h3>
                  <p className="mt-4 text-base leading-7 text-gray-600">
                    A portion of all protocol revenue is used to buy back and distribute ORBIT tokens to long-term
                    stakers and liquidity providers.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden border-0 shadow-md hover:shadow-lg transition">
                <CardContent className="p-6">
                  <div className="mb-4 rounded-full w-10 h-10 flex items-center justify-center bg-secondary/10 text-secondary">
                    <Zap className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold leading-8 text-gray-900">Cross-Chain Bridge Fee Reduction</h3>
                  <p className="mt-4 text-base leading-7 text-gray-600">
                    ORBIT token holders receive reduced fees when using OrbitYield's cross-chain bridges to move assets
                    between supported blockchains.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden border-0 shadow-md hover:shadow-lg transition">
                <CardContent className="p-6">
                  <div className="mb-4 rounded-full w-10 h-10 flex items-center justify-center bg-accent/10 text-accent">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold leading-8 text-gray-900">Auto-Compounding Priority</h3>
                  <p className="mt-4 text-base leading-7 text-gray-600">
                    Staking ORBIT tokens provides priority in auto-compounding services, ensuring your yields are
                    reinvested promptly and efficiently.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to power your DeFi journey?</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Join the OrbitYield ecosystem and unlock the full potential of your crypto assets with the ORBIT token.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link 
                href="/app"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full"
                )}
              >
                Enter App
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                href="/blog/polkadot-philippines-hackathon-2025"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-full"
                )}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
