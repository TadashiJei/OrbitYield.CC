import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Rocket, Award, Shield, LineChart, Globe } from "lucide-react"

export const metadata: Metadata = {
  title: "About | OrbitYield",
  description: "Learn about OrbitYield, the cross-chain yield aggregator that maximizes your returns across multiple blockchains.",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-purple-50"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              <span className="gradient-text">About</span> OrbitYield
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              OrbitYield is a revolutionary cross-chain yield aggregator that helps you maximize your returns
              while minimizing risk across multiple blockchain networks.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button className="rounded-full">
                <Link href="/features">Explore Features</Link>
              </Button>
              <Link
                href="/ecosystem"
                className="flex items-center gap-1 text-sm font-semibold leading-6 text-gray-900 hover:text-primary"
              >
                View Ecosystem <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Our Mission</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Empowering DeFi users with optimal yields
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our mission is to solve the fragmentation problem in DeFi yield farming by providing a secure, 
              intelligent platform that automatically finds and allocates funds to the best yield opportunities
              across multiple blockchains.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Users className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  For Everyone
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Our platform is designed for everyone from DeFi beginners to experienced yield farmers,
                  making complex yield optimization accessible and easy to use.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <LineChart className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Data-Driven
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Our AI-powered algorithms continuously analyze and evaluate yield opportunities
                  across multiple blockchains to find the best risk-adjusted returns.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Shield className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Security First
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  We prioritize security with rigorous smart contract audits, risk assessments for each yield opportunity,
                  and transparent operations.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Globe className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Cross-Chain
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  We seamlessly connect multiple blockchains including Polkadot, Ethereum, Binance Smart Chain, and more,
                  allowing you to access the best yields regardless of chain.
                </dd>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-base font-semibold leading-7 text-primary">Our Story</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              From idea to innovation
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              OrbitYield was founded by a team of DeFi enthusiasts and blockchain experts who recognized the fragmentation 
              problem in yield farming across multiple blockchains. We set out to build a platform that would make it easy 
              for anyone to access the best yield opportunities regardless of which blockchain they reside on.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Built on Polkadot's interoperable architecture, OrbitYield leverages cutting-edge technology to provide a seamless, 
              secure, and efficient yield optimization experience. Our team is committed to continuous innovation and improvement, 
              constantly expanding our supported chains and yield opportunities.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base leading-7 text-gray-600 sm:grid-cols-2 md:flex lg:gap-x-10">
              {[
                { text: "Founded in 2025, icon: Rocket },
                { text: "Supporting 10+ blockchains", icon: Globe },
                { text: "Industry-leading security", icon: Shield },
                { text: "Award-winning platform", icon: Award },
              ].map((item, index) => (
                <div key={index} className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <item.icon className="absolute left-1 top-1 h-5 w-5 text-primary" aria-hidden="true" />
                  </dt>{" "}
                  <dd className="inline">{item.text}</dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-base font-semibold leading-7 text-primary">Our Team</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Meet the experts behind OrbitYield
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our team brings together expertise in blockchain technology, cloud infrastructure, and
              networking to create the most powerful cross-chain yield aggregator.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {[
              {
                name: "Andrea Faith Alimorng",
                role: "Founder / Cloud Engineer / Software Engineer",
                image: "https://dafi.hacktivators.com/team/dev2.jpg?height=400&width=400",
                bio: "Cloud Engineer / Software Engineer specializing in cloud infrastructure and distributed systems.",
              },
              {
                name: "Java Jay Bartolome",
                role: "Co-Founder / Software Engineer / Network Engineer",
                image: "https://dafi.hacktivators.com/team/dev1.jpg?height=400&width=400",
                bio: "Full-stack developer with expertise in blockchain technology.",
              },
            ].map((person) => (
              <div key={person.name} className="flex flex-col items-start">
                <div className="aspect-[4/5] w-full flex-none rounded-2xl bg-gray-100 overflow-hidden">
                  <Image
                    className="w-full object-cover"
                    src={person.image}
                    alt={person.name}
                    width={300}
                    height={375}
                  />
                </div>
                <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{person.name}</h3>
                <p className="text-base leading-7 text-primary">{person.role}</p>
                <p className="mt-4 text-base leading-7 text-gray-600">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to optimize your yields?</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Join thousands of users who are already maximizing their returns with OrbitYield.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button className="rounded-full">Launch App</Button>
              <Link href="/ecosystem" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
