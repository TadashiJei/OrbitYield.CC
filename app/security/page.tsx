import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, CheckCircle2, Lock, Shield, ShieldCheck, ShieldAlert } from "lucide-react"

export const metadata: Metadata = {
  title: "Security | OrbitYield",
  description: "Learn about the security measures implemented by OrbitYield to protect your assets.",
}

export default function Security() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-purple-50"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              <span className="gradient-text">Security</span> first
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              At OrbitYield, security is our top priority. We implement industry-leading security measures to protect
              your assets and ensure the integrity of our platform.
            </p>
          </div>
        </div>
      </section>

      {/* Security Overview Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Security Overview</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Multi-layered security approach</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our security strategy employs multiple layers of protection to safeguard user assets and platform
              integrity.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
              <Card className="flex flex-col overflow-hidden border-0 shadow-lg">
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">Smart Contract Security</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      All smart contracts undergo rigorous auditing by leading security firms and implement best
                      practices for secure code development.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden border-0 shadow-lg">
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                    <Lock className="h-6 w-6" />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">Non-Custodial Architecture</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      OrbitYield operates on a non-custodial model, meaning users maintain full control of their assets
                      at all times.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden border-0 shadow-lg">
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                    <ShieldAlert className="h-6 w-6" />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">Risk Assessment System</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      Our AI-powered risk assessment system continuously monitors protocols and yield opportunities to
                      identify and mitigate potential risks.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Audit Partners Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Audit Partners</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Verified by industry leaders</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our smart contracts and platform have been audited by leading security firms in the blockchain industry.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-3">
              {[
                {
                  name: "CertiK",
                  logo: "/placeholder.svg?height=100&width=100",
                  description: "Comprehensive audit of all smart contracts and platform architecture.",
                  date: "January 2025",
                  link: "/security/audits/certik",
                },
                {
                  name: "Trail of Bits",
                  logo: "/placeholder.svg?height=100&width=100",
                  description: "In-depth security assessment focusing on cross-chain operations and bridge security.",
                  date: "February 2025",
                  link: "/security/audits/trail-of-bits",
                },
                {
                  name: "Quantstamp",
                  logo: "/placeholder.svg?height=100&width=100",
                  description: "Specialized audit of yield optimization algorithms and risk assessment systems.",
                  date: "March 2025",
                  link: "/security/audits/quantstamp",
                },
              ].map((audit) => (
                <Card key={audit.name} className="flex flex-col overflow-hidden border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                        <img src={audit.logo || "/placeholder.svg"} alt={audit.name} className="h-10 w-10" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold leading-8 text-gray-900">{audit.name}</h3>
                        <p className="text-sm text-gray-500">{audit.date}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-gray-600">{audit.description}</p>
                    <div className="mt-6">
                      <Link href={audit.link} className="text-sm font-semibold leading-6 text-primary">
                        View Audit Report <ArrowRight className="inline-block h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security Measures Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Security Measures</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Comprehensive protection</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              OrbitYield implements a wide range of security measures to protect user assets and ensure platform
              integrity.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-12">
              {[
                {
                  title: "Multi-Signature Wallets",
                  description:
                    "Critical operations require approval from multiple authorized signers, preventing single points of failure.",
                },
                {
                  title: "Timelock Mechanisms",
                  description:
                    "Changes to smart contracts are subject to a time delay, allowing users to review and exit if necessary.",
                },
                {
                  title: "Formal Verification",
                  description:
                    "Critical smart contract components undergo formal verification to mathematically prove their correctness.",
                },
                {
                  title: "Bug Bounty Program",
                  description:
                    "We maintain an active bug bounty program to incentivize the responsible disclosure of security vulnerabilities.",
                },
                {
                  title: "Real-time Monitoring",
                  description: "24/7 monitoring of platform activity to detect and respond to suspicious behavior.",
                },
                {
                  title: "Emergency Shutdown",
                  description:
                    "Ability to pause specific functions or the entire platform in case of a critical security incident.",
                },
                {
                  title: "Regular Security Audits",
                  description:
                    "Ongoing security audits by leading firms to ensure the continued security of our platform.",
                },
                {
                  title: "Open Source Code",
                  description: "Core smart contracts are open source, allowing for community review and transparency.",
                },
              ].map((measure) => (
                <div key={measure.title} className="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white sm:shrink-0">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div className="sm:min-w-0 sm:flex-1">
                    <p className="text-lg font-semibold leading-8 text-gray-900">{measure.title}</p>
                    <p className="mt-2 text-base leading-7 text-gray-600">{measure.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Risk Assessment Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Risk Assessment</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Intelligent risk management</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our AI-powered risk assessment system evaluates yield opportunities across multiple dimensions to protect
              user assets.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-3">
              {[
                {
                  title: "Protocol Risk",
                  factors: [
                    "Smart contract audit status",
                    "Time in production",
                    "Historical vulnerabilities",
                    "Team reputation",
                    "Governance structure",
                  ],
                },
                {
                  title: "Market Risk",
                  factors: [
                    "Liquidity depth",
                    "Token volatility",
                    "Correlation with market trends",
                    "Impermanent loss potential",
                    "Market manipulation resistance",
                  ],
                },
                {
                  title: "Operational Risk",
                  factors: [
                    "Gas cost efficiency",
                    "Cross-chain bridge security",
                    "Oracle reliability",
                    "Dependency risks",
                    "Regulatory considerations",
                  ],
                },
              ].map((risk) => (
                <Card key={risk.title} className="flex flex-col overflow-hidden border-0 shadow-md">
                  <CardContent className="p-6">
                    <div>
                      <h3 className="text-lg font-semibold leading-8 text-gray-900">{risk.title}</h3>
                      <ul className="mt-6 space-y-4">
                        {risk.factors.map((factor) => (
                          <li key={factor} className="flex items-center">
                            <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                            <span className="text-sm">{factor}</span>
                          </li>
                        ))}
                      </ul>
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Security is a shared responsibility</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              While we implement industry-leading security measures, we encourage users to follow best practices for
              securing their wallets and accounts.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button className="rounded-full">Security Best Practices</Button>
              <Link
                href="/documentation/security"
                className="flex items-center gap-1 text-sm font-semibold leading-6 text-gray-900 hover:text-primary"
              >
                Learn More <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

