import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Circle, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Roadmap | OrbitYield",
  description: "The development roadmap for OrbitYield's cross-chain yield aggregator platform.",
}

export default function Roadmap() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-purple-50"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Our <span className="gradient-text">roadmap</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Explore our development journey and upcoming milestones as we build the future of cross-chain yield
              optimization.
            </p>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Development Timeline</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Building the future of DeFi</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our roadmap outlines our vision for OrbitYield and the key milestones we aim to achieve.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-3 lg:gap-x-16">
              {/* Phase 1 */}
              <div className="relative lg:col-span-1">
                <div className="sticky top-0 pt-10">
                  <h3 className="text-2xl font-bold tracking-tight text-gray-900">Phase 1: Foundation</h3>
                  <p className="mt-4 text-base leading-7 text-gray-600">Q1 2025 - Q2 2025</p>
                  <div className="mt-6 flex items-center">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="ml-2 text-sm text-green-600">Completed</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <ul role="list" className="space-y-8">
                  <Card className="overflow-hidden border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 mt-1">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-base font-semibold leading-7 text-gray-900">
                            Platform Architecture Design
                          </h4>
                          <p className="mt-2 text-sm leading-6 text-gray-600">
                            Design and development of the core platform architecture, including smart contracts, backend
                            systems, and user interface.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="overflow-hidden border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 mt-1">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-base font-semibold leading-7 text-gray-900">
                            Initial Blockchain Integration
                          </h4>
                          <p className="mt-2 text-sm leading-6 text-gray-600">
                            Integration with Ethereum, Binance Smart Chain, and Polkadot ecosystems, establishing the
                            foundation for cross-chain operations.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="overflow-hidden border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 mt-1">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-base font-semibold leading-7 text-gray-900">Security Audits</h4>
                          <p className="mt-2 text-sm leading-6 text-gray-600">
                            Comprehensive security audits by leading blockchain security firms to ensure the safety and
                            reliability of our platform.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="overflow-hidden border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 mt-1">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-base font-semibold leading-7 text-gray-900">Beta Launch</h4>
                          <p className="mt-2 text-sm leading-6 text-gray-600">
                            Launch of the beta version of OrbitYield to a limited number of users for testing and
                            feedback, with initial yield strategies across three blockchains.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ul>
              </div>

              {/* Phase 2 */}
              <div className="relative lg:col-span-1">
                <div className="sticky top-0 pt-10">
                  <h3 className="text-2xl font-bold tracking-tight text-gray-900">Phase 2: Expansion</h3>
                  <p className="mt-4 text-base leading-7 text-gray-600">Q3 2025 - Q4 2025</p>
                  <div className="mt-6 flex items-center">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <p className="ml-2 text-sm text-blue-600">In Progress</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <ul role="list" className="space-y-8">
                  <Card className="overflow-hidden border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 mt-1">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-base font-semibold leading-7 text-gray-900">Public Launch</h4>
                          <p className="mt-2 text-sm leading-6 text-gray-600">
                            Full public launch of the OrbitYield platform with support for multiple yield strategies
                            across five blockchains.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="overflow-hidden border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 mt-1">
                          <Clock className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-base font-semibold leading-7 text-gray-900">
                            Additional Blockchain Integration
                          </h4>
                          <p className="mt-2 text-sm leading-6 text-gray-600">
                            Expansion to additional blockchains including Avalanche, Solana, Polygon, and Fantom,
                            increasing the range of yield opportunities.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="overflow-hidden border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 mt-1">
                          <Clock className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-base font-semibold leading-7 text-gray-900">
                            Advanced Analytics Dashboard
                          </h4>
                          <p className="mt-2 text-sm leading-6 text-gray-600">
                            Development of a comprehensive analytics dashboard with detailed performance metrics,
                            historical yields, and portfolio analysis.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="overflow-hidden border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 mt-1">
                          <Clock className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-base font-semibold leading-7 text-gray-900">Mobile App Development</h4>
                          <p className="mt-2 text-sm leading-6 text-gray-600">
                            Development of iOS and Android mobile applications to provide users with on-the-go access to
                            their yield farming portfolios.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ul>
              </div>

              {/* Phase 3 */}
              <div className="relative lg:col-span-1">
                <div className="sticky top-0 pt-10">
                  <h3 className="text-2xl font-bold tracking-tight text-gray-900">Phase 3: Innovation</h3>
                  <p className="mt-4 text-base leading-7 text-gray-600">Q1 2026 - Q4 2026</p>
                  <div className="mt-6 flex items-center">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
                      <Circle className="h-4 w-4 text-gray-600" />
                    </div>
                    <p className="ml-2 text-sm text-gray-600">Planned</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <ul role="list" className="space-y-8">
                  <Card className="overflow-hidden border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 mt-1">
                          <Circle className="h-4 w-4 text-gray-600" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-base font-semibold leading-7 text-gray-900">
                            AI-Powered Risk Assessment
                          </h4>
                          <p className="mt-2 text-sm leading-6 text-gray-600">
                            Implementation of advanced AI algorithms for real-time risk assessment and prediction of
                            yield opportunities.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="overflow-hidden border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 mt-1">
                          <Circle className="h-4 w-4 text-gray-600" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-base font-semibold leading-7 text-gray-900">Decentralized Governance</h4>
                          <p className="mt-2 text-sm leading-6 text-gray-600">
                            Launch of the OrbitYield DAO, enabling token holders to participate in platform governance
                            and decision-making.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="overflow-hidden border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 mt-1">
                          <Circle className="h-4 w-4 text-gray-600" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-base font-semibold leading-7 text-gray-900">Custom Strategy Builder</h4>
                          <p className="mt-2 text-sm leading-6 text-gray-600">
                            Development of a tool allowing users to create and customize their own yield farming
                            strategies based on their risk preferences and investment goals.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="overflow-hidden border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 mt-1">
                          <Circle className="h-4 w-4 text-gray-600" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-base font-semibold leading-7 text-gray-900">Institutional Services</h4>
                          <p className="mt-2 text-sm leading-6 text-gray-600">
                            Development of specialized services and features for institutional investors, including
                            enhanced security, reporting, and compliance tools.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative isolate overflow-hidden bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Join us on our journey</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Be part of the OrbitYield community and help shape the future of cross-chain yield optimization.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button className="rounded-full">Join Community</Button>
              <Button variant="outline" className="rounded-full">
                Subscribe to Updates
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

