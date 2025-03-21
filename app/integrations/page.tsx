import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import styles from "../styles/scrollbar.module.css"

export const metadata: Metadata = {
  title: "Integrations",
  description: "Connect your favorite DeFi protocols with OrbitYield",
}

export default function Integrations() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-purple-50">
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Integrations
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              OrbitYield integrates with leading blockchain networks, DeFi protocols, and wallets to provide a seamless
              cross-chain yield optimization experience.
            </p>
          </div>
        </div>
      </section>

      {/* Blockchain Integrations Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Blockchain Integrations</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Supported blockchains</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              OrbitYield supports a growing list of blockchain networks, allowing users to access yield opportunities
              across the entire DeFi ecosystem.
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
                    <img src={chain.logo || "/placeholder.svg"} alt={chain.name} className="h-10 w-10" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-gray-900">{chain.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Protocol Integrations Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Protocol Integrations</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Supported DeFi protocols</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              OrbitYield integrates with leading DeFi protocols to provide a wide range of yield opportunities.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
              <Card className="flex flex-col overflow-hidden border-0 shadow-lg">
                <CardContent className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold leading-8 text-gray-900">Lending Protocols</h3>
                  <ul className="mt-6 space-y-4">
                    {["Aave", "Compound", "MakerDAO", "Benqi", "Venus", "Solend"].map((protocol) => (
                      <li key={protocol} className="flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                        <span>{protocol}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden border-0 shadow-lg">
                <CardContent className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold leading-8 text-gray-900">DEX Liquidity</h3>
                  <ul className="mt-6 space-y-4">
                    {["Uniswap", "SushiSwap", "PancakeSwap", "Curve", "Balancer", "TraderJoe"].map((protocol) => (
                      <li key={protocol} className="flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                        <span>{protocol}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden border-0 shadow-lg">
                <CardContent className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold leading-8 text-gray-900">Yield Aggregators</h3>
                  <ul className="mt-6 space-y-4">
                    {[
                      "Yearn Finance",
                      "Beefy Finance",
                      "Convex Finance",
                      "Harvest Finance",
                      "Badger DAO",
                      "Pickle Finance",
                    ].map((protocol) => (
                      <li key={protocol} className="flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                        <span>{protocol}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Wallet Integrations Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Wallet Integrations</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Supported wallets</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Connect your preferred wallet to OrbitYield and start earning optimized yields.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className={`relative overflow-x-auto pb-6 ${styles.scrollbarHide}`}>
              <div className="flex space-x-4 md:space-x-6 pb-4">
                {[
                  "MetaMask",
                  "WalletConnect",
                  "Coinbase Wallet",
                  "Trust Wallet",
                  "Ledger",
                  "Trezor",
                  "Phantom",
                  "Brave Wallet",
                  "Rainbow",
                  "Argent",
                  "Gnosis Safe",
                  "Exodus",
                ].map((wallet) => (
                  <div key={wallet} className="flex-none">
                    <div className="h-16 flex items-center justify-center px-5 py-3 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                      <p className="font-medium text-gray-900 whitespace-nowrap">{wallet}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute pointer-events-none inset-y-0 right-0 w-12 bg-gradient-to-l from-white"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Partners Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Integration Partners</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Strategic partnerships</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              OrbitYield partners with leading projects in the blockchain and technology space to provide enhanced
              functionality and user experience.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-4">
              {[
                {
                  name: "Main Partner",
                  description:
                    "Polkadot provides the blockchain infrastructure and interoperability solutions that power OrbitYield's cross-chain capabilities.",
                  partners: ["Polkadot"],
                  logo: "/blockchain-logos/polkadot.svg"
                },
                {
                  name: "Web Hosting",
                  description: "JavaCraftHosting provides reliable and scalable web hosting services for the OrbitYield platform.",
                  partners: ["JavaCraftHosting"],
                  logo: "/partner-logos/javacraft.svg"
                },
                {
                  name: "Service Hosting",
                  description: "DataChuck delivers premium backend service hosting to ensure the OrbitYield platform remains fast and responsive.",
                  partners: ["DataChuck"],
                  logo: "/partner-logos/datachuck.svg"
                },
                {
                  name: "Graphics & Design",
                  description: "ShiftSolv3D is responsible for creating the professional graphics and logo design elements throughout the OrbitYield platform.",
                  partners: ["ShiftSolv3D"],
                  logo: "/partner-logos/shiftsolv3d.svg"
                },
              ].map((integration) => (
                <Card key={integration.name} className="flex flex-col overflow-hidden border-0 shadow-md h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex-1 flex flex-col">
                      <div className="mb-4 h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                        <img src={integration.logo} alt={integration.partners[0]} className="h-10 w-10" />
                      </div>
                      <h3 className="text-lg font-semibold leading-8 text-gray-900">{integration.name}</h3>
                      <p className="mt-4 text-sm leading-6 text-gray-600 flex-grow">{integration.description}</p>
                      <div className="mt-6">
                        <ul className="space-y-2">
                          {integration.partners.map((partner) => (
                            <li key={partner} className="flex items-center">
                              <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                              <span className="text-base font-medium">{partner}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Become a Partner Section */}
      <section className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Become an integration partner</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Interested in integrating with OrbitYield? We&apos;re always looking for new partners to expand our
              ecosystem.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button className="rounded-full">Apply for Partnership</Button>
              <Link
                href="/developers"
                className="flex items-center gap-1 text-sm font-semibold leading-6 text-gray-900 hover:text-primary"
              >
                Developer Resources <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
