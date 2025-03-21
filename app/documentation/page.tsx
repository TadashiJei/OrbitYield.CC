import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, BookOpen, Code, FileText, Layers, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Documentation | OrbitYield",
  description: "Documentation for OrbitYield's cross-chain yield aggregator platform.",
}

export default function Documentation() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-purple-50"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              <span className="gradient-text">Documentation</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Comprehensive guides and resources to help you get the most out of OrbitYield&apos;s cross-chain yield
              aggregator.
            </p>
          </div>
        </div>
      </section>

      {/* Documentation Categories Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Documentation</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to know</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our documentation is organized into categories to help you find what you&apos;re looking for quickly and
              easily.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
              <Card className="flex flex-col overflow-hidden border-0 shadow-lg">
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">Getting Started</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      Learn the basics of OrbitYield, how to connect your wallet, and make your first deposit.
                    </p>
                    <div className="mt-6">
                      <Link
                        href="/documentation/getting-started"
                        className="text-sm font-semibold leading-6 text-primary"
                      >
                        Learn more <ArrowRight className="inline-block h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden border-0 shadow-lg">
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                    <Layers className="h-6 w-6" />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">Yield Strategies</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      Detailed explanations of our yield strategies, risk assessments, and optimization techniques.
                    </p>
                    <div className="mt-6">
                      <Link href="/documentation/strategies" className="text-sm font-semibold leading-6 text-primary">
                        Learn more <ArrowRight className="inline-block h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden border-0 shadow-lg">
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">Security</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      Information about our security practices, audits, and how we protect your assets.
                    </p>
                    <div className="mt-6">
                      <Link href="/documentation/security" className="text-sm font-semibold leading-6 text-primary">
                        Learn more <ArrowRight className="inline-block h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden border-0 shadow-lg">
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">Guides & Tutorials</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      Step-by-step guides and tutorials to help you navigate the OrbitYield platform.
                    </p>
                    <div className="mt-6">
                      <Link href="/documentation/guides" className="text-sm font-semibold leading-6 text-primary">
                        Learn more <ArrowRight className="inline-block h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden border-0 shadow-lg">
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                    <Code className="h-6 w-6" />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">API Reference</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      Technical documentation for developers integrating with the OrbitYield API.
                    </p>
                    <div className="mt-6">
                      <Link href="/documentation/api" className="text-sm font-semibold leading-6 text-primary">
                        Learn more <ArrowRight className="inline-block h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden border-0 shadow-lg">
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">Whitepaper</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      Our technical whitepaper detailing the OrbitYield protocol, tokenomics, and vision.
                    </p>
                    <div className="mt-6">
                      <Link href="/documentation/whitepaper" className="text-sm font-semibold leading-6 text-primary">
                        Learn more <ArrowRight className="inline-block h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Updates Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Recent Updates</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Stay up to date</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our documentation is regularly updated to reflect the latest features and improvements.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-3">
              {[
                {
                  title: "New Yield Strategy Documentation",
                  date: "March 15, 2025",
                  description: "Documentation for our new multi-chain liquidity mining strategy has been added.",
                  link: "/documentation/strategies/multi-chain-liquidity-mining",
                },
                {
                  title: "Updated Security Practices",
                  date: "March 10, 2025",
                  description:
                    "Our security documentation has been updated with the latest audit results and security practices.",
                  link: "/documentation/security/audits",
                },
                {
                  title: "API v2 Reference",
                  date: "March 5, 2025",
                  description: "The API reference has been updated to include the new v2 endpoints and features.",
                  link: "/documentation/api/v2",
                },
              ].map((update) => (
                <Card key={update.title} className="flex flex-col overflow-hidden border-0 shadow-md">
                  <CardContent className="p-6">
                    <div>
                      <p className="text-sm text-gray-500">{update.date}</p>
                      <h3 className="mt-2 text-lg font-semibold leading-8 text-gray-900">{update.title}</h3>
                      <p className="mt-4 text-sm leading-6 text-gray-600">{update.description}</p>
                      <div className="mt-6">
                        <Link href={update.link} className="text-sm font-semibold leading-6 text-primary">
                          Read more <ArrowRight className="inline-block h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Can&apos;t find what you&apos;re looking for?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Our support team is here to help you with any questions you may have about OrbitYield.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button className="rounded-full">Contact Support</Button>
              <Button variant="outline" className="rounded-full">
                Join Discord
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

