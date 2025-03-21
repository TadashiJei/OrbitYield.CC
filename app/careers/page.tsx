import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Globe, Code, Users, ArrowUpRight, Heart, Brain, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Careers | OrbitYield",
  description: "Join our team at OrbitYield and help build the future of cross-chain yield optimization.",
}

export default function CareersPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-purple-50"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              <span className="gradient-text">Join</span> Our Team
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We're looking for passionate individuals who want to revolutionize DeFi and make yield farming accessible to everyone.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button className="rounded-full">
                <Link href="#open-positions">View Open Positions</Link>
              </Button>
              <Link
                href="mailto:careers@orbityield.cc"
                className="flex items-center gap-1 text-sm font-semibold leading-6 text-gray-900 hover:text-primary"
              >
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Why Join Us</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Be part of the DeFi revolution
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              At OrbitYield, we're dedicated to building the best cross-chain yield optimization platform. We offer a collaborative
              environment where you can grow, innovate, and make a real impact on the future of finance.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Zap className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Cutting-edge technology
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Work with the latest blockchain technologies, AI algorithms, and cross-chain protocols while solving complex challenges.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Globe className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Remote-first culture
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  We embrace a global, remote-first approach, enabling you to work from anywhere while connecting with team members worldwide.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Brain className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Growth opportunities
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  We invest in your professional development with learning resources, conference opportunities, and a clear career path.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Heart className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Competitive benefits
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Enjoy competitive compensation, equity options, flexible work hours, and comprehensive health benefits.
                </dd>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-base font-semibold leading-7 text-primary">Our Values</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              What drives us forward
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our values define who we are and guide our decisions. They're the foundation of our culture and the
              principles we live by every day.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-7xl">
            <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-white p-8 shadow-sm ring-1 ring-gray-200">
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900">
                  <Users className="h-6 w-6 flex-none text-primary" aria-hidden="true" />
                  User-Centric
                </dt>
                <dd className="mt-4 text-base leading-7 text-gray-600">
                  We put our users first in everything we do, creating products that simplify complex DeFi processes and deliver value.
                </dd>
              </div>
              <div className="rounded-lg bg-white p-8 shadow-sm ring-1 ring-gray-200">
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900">
                  <Shield className="h-6 w-6 flex-none text-primary" aria-hidden="true" />
                  Security & Trust
                </dt>
                <dd className="mt-4 text-base leading-7 text-gray-600">
                  We prioritize security and build trust through rigorous testing, audits, and transparent operations.
                </dd>
              </div>
              <div className="rounded-lg bg-white p-8 shadow-sm ring-1 ring-gray-200">
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900">
                  <Code className="h-6 w-6 flex-none text-primary" aria-hidden="true" />
                  Technical Excellence
                </dt>
                <dd className="mt-4 text-base leading-7 text-gray-600">
                  We strive for excellence in our code, algorithms, and systems, constantly learning and improving.
                </dd>
              </div>
              <div className="rounded-lg bg-white p-8 shadow-sm ring-1 ring-gray-200">
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900">
                  <Zap className="h-6 w-6 flex-none text-primary" aria-hidden="true" />
                  Innovation
                </dt>
                <dd className="mt-4 text-base leading-7 text-gray-600">
                  We embrace new ideas and technologies, pushing boundaries to create better solutions for yield optimization.
                </dd>
              </div>
              <div className="rounded-lg bg-white p-8 shadow-sm ring-1 ring-gray-200">
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900">
                  <Globe className="h-6 w-6 flex-none text-primary" aria-hidden="true" />
                  Global Impact
                </dt>
                <dd className="mt-4 text-base leading-7 text-gray-600">
                  We're building for a global audience, democratizing access to yield opportunities across borders and chains.
                </dd>
              </div>
              <div className="rounded-lg bg-white p-8 shadow-sm ring-1 ring-gray-200">
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900">
                  <Users className="h-6 w-6 flex-none text-primary" aria-hidden="true" />
                  Team Collaboration
                </dt>
                <dd className="mt-4 text-base leading-7 text-gray-600">
                  We value diverse perspectives and collaborate across disciplines to solve complex problems together.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="open-positions" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-base font-semibold leading-7 text-primary">Open Positions</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Join our growing team
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We're looking for talented individuals to help us build the future of cross-chain yield optimization.
              Check out our open positions below.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Senior Smart Contract Developer",
                  type: "Full-time",
                  location: "Remote",
                  description: "Design and implement secure smart contracts for our cross-chain yield aggregation platform."
                },
                {
                  title: "Front-end Engineer",
                  type: "Full-time",
                  location: "Remote",
                  description: "Build beautiful, intuitive user interfaces for our DeFi platform using React and Next.js."
                },
                {
                  title: "Blockchain Researcher",
                  type: "Full-time",
                  location: "Remote",
                  description: "Research and evaluate yield opportunities across multiple blockchains to inform our strategy."
                },
                {
                  title: "Product Manager",
                  type: "Full-time",
                  location: "Remote",
                  description: "Lead product development for our cross-chain yield aggregation platform."
                },
                {
                  title: "DevOps Engineer",
                  type: "Full-time",
                  location: "Remote",
                  description: "Build and maintain our infrastructure for high availability and security."
                },
                {
                  title: "Community Manager",
                  type: "Full-time",
                  location: "Remote",
                  description: "Grow and nurture our community across various platforms and channels."
                }
              ].map((job, index) => (
                <div key={index} className="rounded-lg bg-white p-8 shadow-sm ring-1 ring-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">{job.title}</h3>
                  </div>
                  <div className="mt-2 flex items-center gap-x-2 text-sm leading-6 text-gray-500">
                    <span>{job.type}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-gray-600">{job.description}</p>
                  <div className="mt-6">
                    <Link
                      href={`mailto:careers@orbityield.cc?subject=Application for ${job.title}`}
                      className="inline-flex items-center gap-x-1 text-sm font-medium leading-6 text-primary hover:text-primary/80"
                    >
                      Apply now <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Not seeing a position section */}
      <section className="bg-primary/5 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Not seeing a position that fits?</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              We're always looking for talented people to join our team. Send us your resume and tell us how you can contribute.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button className="rounded-full">
                <Link href="mailto:careers@orbityield.cc?subject=General Application">Send Open Application</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
