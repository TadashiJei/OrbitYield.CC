import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Twitter } from "lucide-react"

export const metadata: Metadata = {
  title: "Team | OrbitYield",
  description: "Meet the team behind OrbitYield's cross-chain yield aggregator platform.",
}

const teamMembers = [
  {
    name: "Andrea Faith Alimorng",
    role: "Founder",
    bio: "Cloud Engineer / Software Engineer specializing in cloud infrastructure and distributed systems.",
    image: "https://dafi.hacktivators.com/team/dev2.jpg?height=400&width=400",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    name: "Java Jay Bartolome",
    role: "Software Engineer / Network Engineer",
    bio: "Full-stack developer with expertise in blockchain technology.",
    image: "https://dafi.hacktivators.com/team/dev1.jpg?height=400&width=400",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
]

export default function Team() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-purple-50"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Meet our <span className="gradient-text">team</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              The passionate individuals behind OrbitYield who are dedicated to revolutionizing cross-chain yield
              optimization.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Our Team</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Experts in blockchain and DeFi</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our team combines deep expertise in blockchain technology, cloud infrastructure, and networking
              to create the best cross-chain yield aggregator.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-2">
              {teamMembers.map((member) => (
                <Card key={member.name} className="flex flex-col overflow-hidden border-0 shadow-lg">
                  <CardContent className="flex flex-1 flex-col p-6">
                    <div className="aspect-[4/5] overflow-hidden rounded-lg">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold leading-8 text-gray-900">{member.name}</h3>
                      <p className="text-base leading-7 text-primary">{member.role}</p>
                      <p className="mt-4 text-sm leading-6 text-gray-600">{member.bio}</p>
                      <div className="mt-6 flex gap-4">
                        {member.social.twitter && (
                          <a href={member.social.twitter} className="text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Twitter</span>
                            <Twitter className="h-5 w-5" />
                          </a>
                        )}
                        {member.social.linkedin && (
                          <a href={member.social.linkedin} className="text-gray-400 hover:text-gray-500">
                            <span className="sr-only">LinkedIn</span>
                            <Linkedin className="h-5 w-5" />
                          </a>
                        )}
                        {member.social.github && (
                          <a href={member.social.github} className="text-gray-400 hover:text-gray-500">
                            <span className="sr-only">GitHub</span>
                            <Github className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Our Vision & Mission</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Building the future of DeFi</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We are dedicated to making cross-chain yield optimization accessible, secure, and efficient for everyone.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="rounded-xl bg-white p-8 shadow-lg ring-1 ring-gray-200">
                <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
                  Our Vision
                </h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  We envision a DeFi ecosystem where users can seamlessly optimize their yields across multiple blockchains
                  without having to navigate complex protocols or pay excessive fees. We're building the infrastructure
                  to make this vision a reality.
                </p>
              </div>
              <div className="rounded-xl bg-white p-8 shadow-lg ring-1 ring-gray-200">
                <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
                  Our Mission
                </h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  Our mission is to solve the fragmentation problem in DeFi by providing an intelligent, secure platform
                  that helps users maximize their returns while minimizing risk across the blockchain ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Join Our Team</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              We're always looking for talented individuals who share our passion for building the future of cross-chain DeFi.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button className="rounded-full">
                <a href="/careers">View Open Positions</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
