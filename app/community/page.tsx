import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Users,
  MessageSquare,
  Award,
  Calendar,
  Globe,
  Twitter,
  Github,
  DiscIcon as Discord,
  TextIcon as Telegram,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Community | OrbitYield",
  description: "Join the OrbitYield community and connect with other yield farmers and DeFi enthusiasts.",
}

export default function Community() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-purple-50"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Join our <span className="gradient-text">community</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Connect with other yield farmers, DeFi enthusiasts, and the OrbitYield team to share knowledge, get
              support, and help shape the future of cross-chain yield optimization.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button className="rounded-full">Join Discord</Button>
              <Link
                href="#social"
                className="flex items-center gap-1 text-sm font-semibold leading-6 text-gray-900 hover:text-primary"
              >
                All Channels <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Community Stats</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">A growing global community</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Join thousands of DeFi enthusiasts from around the world who are already part of the OrbitYield ecosystem.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col bg-white p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600">Discord Members</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight">25,000+</dd>
              </div>
              <div className="flex flex-col bg-white p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600">Twitter Followers</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight">42,000+</dd>
              </div>
              <div className="flex flex-col bg-white p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600">Telegram Subscribers</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight">18,000+</dd>
              </div>
              <div className="flex flex-col bg-white p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600">Countries Represented</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight">120+</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Social Channels Section */}
      <section id="social" className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Social Channels</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Connect with us</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Join our community on your preferred platform to stay updated and engage with other members.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-4">
              <Card className="flex flex-col overflow-hidden border-0 shadow-lg">
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                    <Discord className="h-6 w-6" />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">Discord</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      Join our Discord server for real-time discussions, support, and community events.
                    </p>
                    <div className="mt-6">
                      <Button className="w-full rounded-full">Join Discord</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden border-0 shadow-lg">
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                    <Twitter className="h-6 w-6" />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">Twitter</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      Follow us on Twitter for the latest news, updates, and announcements.
                    </p>
                    <div className="mt-6">
                      <Button className="w-full rounded-full">Follow on Twitter</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden border-0 shadow-lg">
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                    <Telegram className="h-6 w-6" />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">Telegram</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      Join our Telegram group for community discussions and updates on the go.
                    </p>
                    <div className="mt-6">
                      <Button className="w-full rounded-full">Join Telegram</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden border-0 shadow-lg">
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                    <Github className="h-6 w-6" />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">GitHub</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      Explore our open-source repositories and contribute to our codebase.
                    </p>
                    <div className="mt-6">
                      <Button className="w-full rounded-full">View GitHub</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Community Programs Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Community Programs</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Get involved</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Participate in our community programs to contribute to the OrbitYield ecosystem and earn rewards.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
              <Card className="flex flex-col overflow-hidden border-0 shadow-lg">
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                    <Users className="h-6 w-6" />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">Ambassador Program</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      Become an OrbitYield ambassador and help grow our community while earning rewards.
                    </p>
                    <div className="mt-6">
                      <Link
                        href="/community/ambassador-program"
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
                    <Globe className="h-6 w-6" />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">Translation Program</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      Help translate OrbitYield content into your native language and make our platform more accessible.
                    </p>
                    <div className="mt-6">
                      <Link
                        href="/community/translation-program"
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
                    <Award className="h-6 w-6" />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">Bug Bounty Program</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      Help improve the security of our platform by finding and reporting bugs and vulnerabilities.
                    </p>
                    <div className="mt-6">
                      <Link href="/community/bug-bounty" className="text-sm font-semibold leading-6 text-primary">
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

      {/* Community Events Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Community Events</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Upcoming events</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Join our virtual and in-person events to learn more about OrbitYield and connect with the community.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-3">
              {[
                {
                  title: "OrbitYield Community Call",
                  date: "March 25, 2025",
                  time: "3:00 PM UTC",
                  location: "Discord",
                  description:
                    "Join our monthly community call to get updates on the latest developments and ask questions to the team.",
                  link: "/community/events/community-call",
                },
                {
                  title: "DeFi Yield Farming Workshop",
                  date: "April 5, 2025",
                  time: "2:00 PM UTC",
                  location: "YouTube Live",
                  description:
                    "Learn advanced yield farming strategies and how to maximize your returns using OrbitYield.",
                  link: "/community/events/yield-farming-workshop",
                },
                {
                  title: "OrbitYield at ETH Denver",
                  date: "April 15-17, 2025",
                  time: "All Day",
                  location: "Denver, CO",
                  description:
                    "Meet the OrbitYield team in person at ETH Denver and learn about our latest developments.",
                  link: "/community/events/eth-denver",
                },
              ].map((event) => (
                <Card key={event.title} className="flex flex-col overflow-hidden border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                        <Calendar className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold leading-8 text-gray-900">{event.title}</h3>
                        <p className="mt-2 text-sm text-gray-500">
                          {event.date} • {event.time}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">{event.location}</p>
                        <p className="mt-4 text-sm leading-6 text-gray-600">{event.description}</p>
                        <div className="mt-6">
                          <Link href={event.link} className="text-sm font-semibold leading-6 text-primary">
                            Learn more <ArrowRight className="inline-block h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button variant="outline" className="rounded-full">
                View All Events
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Community Forum Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Community Forum</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Join the discussion</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Participate in discussions, share ideas, and get help from other community members on our forum.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-2">
              {[
                {
                  category: "General Discussion",
                  topics: 156,
                  posts: 1243,
                  description: "General discussions about OrbitYield and cross-chain yield farming.",
                },
                {
                  category: "Strategy Sharing",
                  topics: 89,
                  posts: 742,
                  description: "Share and discuss yield farming strategies with the community.",
                },
                {
                  category: "Technical Support",
                  topics: 112,
                  posts: 876,
                  description: "Get help with technical issues and questions about the platform.",
                },
                {
                  category: "Feature Requests",
                  topics: 67,
                  posts: 523,
                  description: "Suggest new features and improvements for OrbitYield.",
                },
              ].map((forum) => (
                <Card key={forum.category} className="flex flex-col overflow-hidden border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                        <MessageSquare className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold leading-8 text-gray-900">{forum.category}</h3>
                        <p className="mt-2 text-sm text-gray-500">
                          {forum.topics} topics • {forum.posts} posts
                        </p>
                        <p className="mt-4 text-sm leading-6 text-gray-600">{forum.description}</p>
                        <div className="mt-6">
                          <Link
                            href={`/community/forum/${forum.category.toLowerCase().replace(/\s+/g, "-")}`}
                            className="text-sm font-semibold leading-6 text-primary"
                          >
                            View Forum <ArrowRight className="inline-block h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button className="rounded-full">Visit Forum</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative isolate overflow-hidden bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Join our community today</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Connect with thousands of DeFi enthusiasts, learn from experts, and help shape the future of cross-chain
              yield optimization.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button className="rounded-full">Join Discord</Button>
              <Button variant="outline" className="rounded-full">
                Follow on Twitter
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

