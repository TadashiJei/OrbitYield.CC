import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, ArrowUpRight, Zap, Globe, Shield, Star } from "lucide-react"

export const metadata: Metadata = {
  title: "Partners | OrbitYield",
  description: "Partner with OrbitYield to build the future of cross-chain yield optimization together.",
}

export default function PartnersPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-purple-50"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              <span className="gradient-text">Partner</span> With Us
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Join the OrbitYield ecosystem and help build the future of cross-chain yield optimization.
              We collaborate with blockchain protocols, DeFi projects, and service providers to create
              a more connected and efficient DeFi landscape.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button className="rounded-full">
                <Link href="#become-partner">Become a Partner</Link>
              </Button>
              <Link
                href="mailto:partnerships@orbityield.cc"
                className="flex items-center gap-1 text-sm font-semibold leading-6 text-gray-900 hover:text-primary"
              >
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Current Partners Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Our Partners</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Building together
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We're proud to work with leading projects and companies across the blockchain and technology ecosystem.
              Our partners help us deliver the best experience to our users.
            </p>
          </div>
          
          {/* Partners Grid */}
          <div className="mx-auto mt-20 grid max-w-lg grid-cols-1 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-2 lg:max-w-4xl lg:grid-cols-4">
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <div className="mb-4 h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                <img
                  className="h-10 w-10 object-contain"
                  src="/blockchain-logos/polkadot.svg"
                  alt="Polkadot"
                />
              </div>
              <h3 className="text-lg font-semibold">Polkadot</h3>
              <p className="text-sm text-gray-600 mt-2">Main Partner</p>
            </div>
            
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <div className="mb-4 h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                <img
                  className="h-10 w-10 object-contain"
                  src="/partner-logos/javacraft.svg"
                  alt="JavaCraftHosting"
                />
              </div>
              <h3 className="text-lg font-semibold">JavaCraftHosting</h3>
              <p className="text-sm text-gray-600 mt-2">Web Hosting</p>
            </div>
            
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <div className="mb-4 h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                <img
                  className="h-10 w-10 object-contain"
                  src="/partner-logos/datachuck.svg"
                  alt="DataChuck"
                />
              </div>
              <h3 className="text-lg font-semibold">DataChuck</h3>
              <p className="text-sm text-gray-600 mt-2">Service Hosting</p>
            </div>
            
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <div className="mb-4 h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                <img
                  className="h-10 w-10 object-contain"
                  src="/partner-logos/shiftsolv3d.svg"
                  alt="ShiftSolv3D"
                />
              </div>
              <h3 className="text-lg font-semibold">ShiftSolv3D</h3>
              <p className="text-sm text-gray-600 mt-2">Graphics & Design</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Types Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-base font-semibold leading-7 text-primary">Partnership Types</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              How we collaborate
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We offer various partnership opportunities tailored to different types of projects and goals.
              Explore how we can work together to create value for both our ecosystems.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
                <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
                  Protocol Integrations
                </h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  For blockchain protocols and DeFi platforms looking to expand their ecosystem
                  and provide their users with optimized yield opportunities.
                </p>
                <ul className="mt-8 space-y-3">
                  {[
                    "Cross-chain deposits and withdrawals",
                    "Smart contract integrations",
                    "Liquidity provision",
                    "Yield strategy collaboration",
                  ].map((feature, index) => (
                    <li key={index} className="flex gap-x-3">
                      <CheckCircle className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                      <span className="text-sm leading-6 text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    href="mailto:protocols@orbityield.cc"
                    className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-primary hover:text-primary/80"
                  >
                    Learn more <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
                <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
                  Service Providers
                </h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  For security auditors, data providers, and other service companies looking
                  to contribute to the OrbitYield ecosystem.
                </p>
                <ul className="mt-8 space-y-3">
                  {[
                    "Security audits and reviews",
                    "Data and analytics partnerships",
                    "User experience enhancements",
                    "Infrastructure support",
                  ].map((feature, index) => (
                    <li key={index} className="flex gap-x-3">
                      <CheckCircle className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                      <span className="text-sm leading-6 text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    href="mailto:services@orbityield.cc"
                    className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-primary hover:text-primary/80"
                  >
                    Learn more <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
                <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
                  Strategic Alliances
                </h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  For projects looking to form deep, long-term partnerships to
                  co-develop innovative cross-chain yield solutions.
                </p>
                <ul className="mt-8 space-y-3">
                  {[
                    "Joint product development",
                    "Co-marketing opportunities",
                    "Technical resource sharing",
                    "Ecosystem fund collaborations",
                  ].map((feature, index) => (
                    <li key={index} className="flex gap-x-3">
                      <CheckCircle className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                      <span className="text-sm leading-6 text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    href="mailto:alliances@orbityield.cc"
                    className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-primary hover:text-primary/80"
                  >
                    Learn more <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Benefits Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Partner Benefits</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Why partner with OrbitYield
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our partnerships are designed to create mutual value and drive innovation in the DeFi space.
              Here's what you can expect when partnering with us.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Zap className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Access to our user base
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Tap into our growing community of yield-seeking users across multiple blockchains.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Globe className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Cross-chain exposure
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Extend your project's reach across multiple blockchains through our interoperable platform.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Shield className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Technical collaboration
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Work with our experienced team to develop innovative solutions and overcome technical challenges.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Star className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Co-marketing opportunities
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Joint marketing campaigns, content creation, and community events to increase visibility.
                </dd>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Partner Section */}
      <section id="become-partner" className="bg-primary/5 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Get Started</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Become a partner
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Ready to explore partnership opportunities with OrbitYield? Get in touch with our team to discuss
              how we can collaborate and create value together.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button className="rounded-full">
                <Link href="mailto:partnerships@orbityield.cc">Contact Partnership Team</Link>
              </Button>
              <Link
                href="/ecosystem"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Explore Ecosystem <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
