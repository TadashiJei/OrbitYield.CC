import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Zap, Globe, Database, Shield, Code } from "lucide-react"

export const metadata: Metadata = {
  title: "Ecosystem | OrbitYield",
  description: "Explore the OrbitYield ecosystem of protocols, integrations, and partnerships.",
}

export default function Ecosystem() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#07FFFF]/10 via-[#7916F3]/10 to-[#FF2670]/10"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 lg:py-32 lg:px-8">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-gray-900">
              The <span className="gradient-text">Ecosystem</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-700 animate-slide-in stagger-1">
              Discover the interconnected network of protocols, chains, and partners that power OrbitYield's cross-chain
              yield optimization platform.
            </p>
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

      {/* Ecosystem Overview */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary animate-fade-in">Ecosystem Overview</h2>
            <p className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight lg:text-4xl text-gray-900 animate-fade-in stagger-1">
              A unified cross-chain experience
            </p>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 animate-fade-in stagger-2">
              OrbitYield connects multiple blockchains, protocols, and services to create a seamless yield optimization
              experience.
            </p>
          </div>
          <div className="mx-auto mt-12 sm:mt-16 lg:mt-20 max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="flex flex-col overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow animate-fade-in stagger-1">
                <CardContent className="flex flex-1 flex-col p-4 sm:p-6">
                  <div className="flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Globe className="h-5 sm:h-6 w-5 sm:w-6" />
                  </div>
                  <div className="mt-4 sm:mt-6">
                    <h3 className="text-base sm:text-lg font-semibold leading-7 sm:leading-8 text-gray-900">
                      Supported Blockchains
                    </h3>
                    <p className="mt-2 sm:mt-4 text-sm leading-6 sm:leading-7 text-gray-600">
                      OrbitYield operates across multiple blockchains, enabling users to access yield opportunities
                      wherever they exist.
                    </p>
                    <div className="mt-4 sm:mt-6">
                      <Link href="#blockchains" className="text-sm font-semibold leading-6 text-primary">
                        Explore blockchains <ArrowRight className="inline-block h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow animate-fade-in stagger-2">
                <CardContent className="flex flex-1 flex-col p-4 sm:p-6">
                  <div className="flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Database className="h-5 sm:h-6 w-5 sm:w-6" />
                  </div>
                  <div className="mt-4 sm:mt-6">
                    <h3 className="text-base sm:text-lg font-semibold leading-7 sm:leading-8 text-gray-900">
                      Integrated Protocols
                    </h3>
                    <p className="mt-2 sm:mt-4 text-sm leading-6 sm:leading-7 text-gray-600">
                      We integrate with leading DeFi protocols to source the best yield opportunities for our users.
                    </p>
                    <div className="mt-4 sm:mt-6">
                      <Link href="#protocols" className="text-sm font-semibold leading-6 text-primary">
                        Discover protocols <ArrowRight className="inline-block h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow animate-fade-in stagger-3">
                <CardContent className="flex flex-1 flex-col p-4 sm:p-6">
                  <div className="flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Shield className="h-5 sm:h-6 w-5 sm:w-6" />
                  </div>
                  <div className="mt-4 sm:mt-6">
                    <h3 className="text-base sm:text-lg font-semibold leading-7 sm:leading-8 text-gray-900">
                      Security Partners
                    </h3>
                    <p className="mt-2 sm:mt-4 text-sm leading-6 sm:leading-7 text-gray-600">
                      Our security partners help ensure the safety and reliability of the OrbitYield platform.
                    </p>
                    <div className="mt-4 sm:mt-6">
                      <Link href="#security" className="text-sm font-semibold leading-6 text-primary">
                        View partners <ArrowRight className="inline-block h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Blockchains Section */}
      <section id="blockchains" className="py-16 sm:py-24 lg:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary animate-fade-in">Supported Blockchains</h2>
            <p className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight lg:text-4xl text-gray-900 animate-fade-in stagger-1">
              Truly cross-chain
            </p>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 animate-fade-in stagger-2">
              OrbitYield supports a growing list of blockchains, allowing you to access yield opportunities across the
              entire DeFi ecosystem.
            </p>
          </div>
          <div className="mx-auto mt-12 sm:mt-16 lg:mt-20 max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {[
                { name: "Ethereum", logo: "/placeholder.svg?height=100&width=100", delay: 0.1 },
                { name: "Binance Smart Chain", logo: "/placeholder.svg?height=100&width=100", delay: 0.2 },
                { name: "Polkadot", logo: "/placeholder.svg?height=100&width=100", delay: 0.3 },
                { name: "Avalanche", logo: "/placeholder.svg?height=100&width=100", delay: 0.4 },
                { name: "Solana", logo: "/placeholder.svg?height=100&width=100", delay: 0.5 },
                { name: "Polygon", logo: "/placeholder.svg?height=100&width=100", delay: 0.6 },
                { name: "Fantom", logo: "/placeholder.svg?height=100&width=100", delay: 0.7 },
                { name: "Arbitrum", logo: "/placeholder.svg?height=100&width=100", delay: 0.8 },
                { name: "Optimism", logo: "/placeholder.svg?height=100&width=100", delay: 0.9 },
                { name: "Cosmos", logo: "/placeholder.svg?height=100&width=100", delay: 1.0 },
                { name: "Near", logo: "/placeholder.svg?height=100&width=100", delay: 1.1 },
                { name: "Harmony", logo: "/placeholder.svg?height=100&width=100", delay: 1.2 },
              ].map((chain) => (
                <div
                  key={chain.name}
                  className="flex flex-col items-center animate-fade-in"
                  style={{ animationDelay: `${chain.delay}s` }}
                >
                  <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-shadow">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <img src={chain.logo || "/placeholder.svg"} alt={chain.name} className="h-6 w-6 sm:h-8 sm:w-8" />
                    </div>
                  </div>
                  <p className="mt-2 sm:mt-4 text-xs sm:text-sm font-medium text-gray-900 text-center">{chain.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Protocols Section */}
      <section id="protocols" className="py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary animate-fade-in">Integrated Protocols</h2>
            <p className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight lg:text-4xl text-gray-900 animate-fade-in stagger-1">
              Best-in-class DeFi protocols
            </p>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 animate-fade-in stagger-2">
              OrbitYield integrates with leading DeFi protocols to provide a wide range of yield opportunities.
            </p>
          </div>
          <div className="mx-auto mt-12 sm:mt-16 lg:mt-20 max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="flex flex-col overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow animate-fade-in stagger-1">
                <CardContent className="flex flex-1 flex-col p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold leading-7 sm:leading-8 text-gray-900">
                    Lending Protocols
                  </h3>
                  <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                    {["Aave", "Compound", "MakerDAO", "Benqi", "Venus", "Solend"].map((protocol, index) => (
                      <div
                        key={protocol}
                        className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                          <span className="text-xs font-semibold text-primary">{protocol.substring(0, 2)}</span>
                        </div>
                        <span className="text-xs sm:text-sm">{protocol}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow animate-fade-in stagger-2">
                <CardContent className="flex flex-1 flex-col p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold leading-7 sm:leading-8 text-gray-900">
                    DEX Liquidity
                  </h3>
                  <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                    {["Uniswap", "SushiSwap", "PancakeSwap", "Curve", "Balancer", "TraderJoe"].map(
                      (protocol, index) => (
                        <div
                          key={protocol}
                          className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                            <span className="text-xs font-semibold text-primary">{protocol.substring(0, 2)}</span>
                          </div>
                          <span className="text-xs sm:text-sm">{protocol}</span>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow animate-fade-in stagger-3">
                <CardContent className="flex flex-1 flex-col p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold leading-7 sm:leading-8 text-gray-900">
                    Yield Aggregators
                  </h3>
                  <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                    {[
                      "Yearn Finance",
                      "Beefy Finance",
                      "Convex Finance",
                      "Harvest Finance",
                      "Badger DAO",
                      "Pickle Finance",
                    ].map((protocol, index) => (
                      <div
                        key={protocol}
                        className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                          <span className="text-xs font-semibold text-primary">{protocol.substring(0, 2)}</span>
                        </div>
                        <span className="text-xs sm:text-sm">{protocol}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Security Partners Section */}
      <section id="security" className="py-16 sm:py-24 lg:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary animate-fade-in">Security Partners</h2>
            <p className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight lg:text-4xl text-gray-900 animate-fade-in stagger-1">
              Verified by industry leaders
            </p>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 animate-fade-in stagger-2">
              Our smart contracts and platform have been audited by leading security firms in the blockchain industry.
            </p>
          </div>
          <div className="mx-auto mt-12 sm:mt-16 lg:mt-20 max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "CertiK",
                  logo: "/placeholder.svg?height=100&width=100",
                  description: "Comprehensive audit of all smart contracts and platform architecture.",
                  date: "January 2025",
                },
                {
                  name: "Trail of Bits",
                  logo: "/placeholder.svg?height=100&width=100",
                  description: "In-depth security assessment focusing on cross-chain operations and bridge security.",
                  date: "February 2025",
                },
                {
                  name: "Quantstamp",
                  logo: "/placeholder.svg?height=100&width=100",
                  description: "Specialized audit of yield optimization algorithms and risk assessment systems.",
                  date: "March 2025",
                },
              ].map((audit, index) => (
                <Card
                  key={audit.name}
                  className="flex flex-col overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow animate-fade-in"
                  style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center">
                      <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-white shadow-sm flex items-center justify-center">
                        <img
                          src={audit.logo || "/placeholder.svg"}
                          alt={audit.name}
                          className="h-8 w-8 sm:h-10 sm:w-10"
                        />
                      </div>
                      <div className="ml-3 sm:ml-4">
                        <h3 className="text-base sm:text-lg font-semibold leading-7 sm:leading-8 text-gray-900">
                          {audit.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500">{audit.date}</p>
                      </div>
                    </div>
                    <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-5 sm:leading-6 text-gray-600">
                      {audit.description}
                    </p>
                    <div className="mt-3 sm:mt-6">
                      <Link href="/security" className="text-xs sm:text-sm font-semibold leading-6 text-primary">
                        View Audit Report <ArrowRight className="inline-block h-3 w-3 sm:h-4 sm:w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Developer Ecosystem */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary animate-fade-in">Developer Ecosystem</h2>
            <p className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight lg:text-4xl text-gray-900 animate-fade-in stagger-1">
              Build with OrbitYield
            </p>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 animate-fade-in stagger-2">
              Developers can leverage OrbitYield's APIs, SDKs, and smart contracts to build innovative applications.
            </p>
          </div>
          <div className="mx-auto mt-12 sm:mt-16 lg:mt-20 max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="flex flex-col overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow animate-fade-in stagger-1">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Code className="h-5 sm:h-6 w-5 sm:w-6" />
                  </div>
                  <div className="mt-4 sm:mt-6">
                    <h3 />
                  </div>
                  <div className="mt-4 sm:mt-6">
                    <h3 className="text-base sm:text-lg font-semibold leading-7 sm:leading-8 text-gray-900">
                      API Reference
                    </h3>
                    <p className="mt-2 sm:mt-4 text-xs sm:text-sm leading-5 sm:leading-6 text-gray-600">
                      Comprehensive API documentation with examples in multiple programming languages.
                    </p>
                    <div className="mt-3 sm:mt-6">
                      <Link href="/api" className="text-xs sm:text-sm font-semibold leading-6 text-primary">
                        View API Docs <ArrowRight className="inline-block h-3 w-3 sm:h-4 sm:w-4" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow animate-fade-in stagger-2">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Zap className="h-5 sm:h-6 w-5 sm:w-6" />
                  </div>
                  <div className="mt-4 sm:mt-6">
                    <h3 className="text-base sm:text-lg font-semibold leading-7 sm:leading-8 text-gray-900">
                      SDKs & Libraries
                    </h3>
                    <p className="mt-2 sm:mt-4 text-xs sm:text-sm leading-5 sm:leading-6 text-gray-600">
                      Official SDKs and libraries for JavaScript, Python, Rust, and more to simplify integration.
                    </p>
                    <div className="mt-3 sm:mt-6">
                      <Link href="/developers/sdks" className="text-xs sm:text-sm font-semibold leading-6 text-primary">
                        Explore SDKs <ArrowRight className="inline-block h-3 w-3 sm:h-4 sm:w-4" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow animate-fade-in stagger-3">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Globe className="h-5 sm:h-6 w-5 sm:w-6" />
                  </div>
                  <div className="mt-4 sm:mt-6">
                    <h3 className="text-base sm:text-lg font-semibold leading-7 sm:leading-8 text-gray-900">
                      Smart Contracts
                    </h3>
                    <p className="mt-2 sm:mt-4 text-xs sm:text-sm leading-5 sm:leading-6 text-gray-600">
                      Documentation and examples for interacting with OrbitYield's smart contracts.
                    </p>
                    <div className="mt-3 sm:mt-6">
                      <Link
                        href="/developers/contracts"
                        className="text-xs sm:text-sm font-semibold leading-6 text-primary"
                      >
                        View Contracts <ArrowRight className="inline-block h-3 w-3 sm:h-4 sm:w-4" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Growth */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary animate-fade-in">Ecosystem Growth</h2>
            <p className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight lg:text-4xl text-gray-900 animate-fade-in stagger-1">
              Join our ecosystem
            </p>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 animate-fade-in stagger-2">
              We're always looking for new partners to expand our ecosystem and provide more value to our users.
            </p>
          </div>
          <div className="mx-auto mt-12 sm:mt-16 lg:mt-20 max-w-2xl lg:max-w-4xl">
            <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
              <div className="relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow animate-fade-in stagger-1">
                <div className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold leading-7 sm:leading-8 text-gray-900">
                    For Protocols
                  </h3>
                  <p className="mt-2 sm:mt-4 text-xs sm:text-sm leading-5 sm:leading-6 text-gray-600">
                    Integrate your protocol with OrbitYield to increase visibility, liquidity, and user adoption.
                  </p>
                  <div className="mt-4 sm:mt-6">
                    <Button
                      variant="outline"
                      className="text-xs sm:text-sm py-1 px-3 sm:py-2 sm:px-4 rounded-full text-primary border-primary hover:bg-primary/5"
                    >
                      Apply for Integration
                    </Button>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow animate-fade-in stagger-2">
                <div className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold leading-7 sm:leading-8 text-gray-900">
                    For Developers
                  </h3>
                  <p className="mt-2 sm:mt-4 text-xs sm:text-sm leading-5 sm:leading-6 text-gray-600">
                    Build on top of OrbitYield's infrastructure to create innovative DeFi applications.
                  </p>
                  <div className="mt-4 sm:mt-6">
                    <Button
                      variant="outline"
                      className="text-xs sm:text-sm py-1 px-3 sm:py-2 sm:px-4 rounded-full text-primary border-primary hover:bg-primary/5"
                    >
                      Join Developer Program
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 lg:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight lg:text-4xl text-gray-900">
              Ready to explore the OrbitYield ecosystem?
            </h2>
            <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 animate-fade-in stagger-1">
              Start maximizing your DeFi returns today with our advanced cross-chain yield aggregator.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 animate-fade-in stagger-2">
              <Button className="text-sm py-2 px-4 rounded-full bg-primary/90 hover:bg-primary text-white">
                Launch App
              </Button>
              <Button
                variant="outline"
                className="text-sm py-2 px-4 rounded-full border-gray-300 text-gray-900 hover:bg-gray-50"
              >
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

