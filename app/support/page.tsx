import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, HelpCircle, MessageSquare, FileText, BookOpen } from "lucide-react"

export const metadata: Metadata = {
  title: "Support | OrbitYield",
  description: "Get help and support for OrbitYield's cross-chain yield aggregator platform.",
}

export default function Support() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-purple-50"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              <span className="gradient-text">Support</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Get help with OrbitYield&apos;s cross-chain yield aggregator platform. Our support team and community are here to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* Support Options Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Support Options</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              How can we help you?
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Choose from our various support options to get the help you need.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
              <Card className="flex flex-col overflow-hidden border-0 shadow-lg">
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                    <HelpCircle className="h-6 w-6" />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">Help Center</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      Browse our comprehensive knowledge base with guides, tutorials, and FAQs to find answers to common questions.
                    </p>
                    <div className="mt-6">
                      <Button className="w-full rounded-full">Visit Help Center</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden border-0 shadow-lg">
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">Live Chat Support</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      Chat with our support team in real-time to get immediate assistance with your questions or issues.
                    </p>
                    <div className="mt-6">
                      <Button className="w-full rounded-full">Start Chat</Button>
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
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">Submit a Ticket</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      Submit a support ticket for more complex issues that require detailed investigation by our support team.
                    </p>
                    <div className="mt-6">
                      <Button className="w-full rounded-full">Submit Ticket</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Frequently Asked Questions</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Common questions
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Find answers to the most common questions about OrbitYield.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:gap-x-8">
              {[
                {
                  question: "What is OrbitYield?",
                  answer: "OrbitYield is a cross-chain yield aggregator that automatically allocates your funds to the highest-yielding opportunities across multiple blockchains, maximizing your returns while minimizing risks.",
                },
                {
                  question: "How does OrbitYield work?",
                  answer: "OrbitYield uses AI-powered algorithms to scan, evaluate, and allocate funds to the best yield opportunities across multiple blockchains. Our platform handles the complex cross-chain operations, gas optimization, and risk assessment for you.",
                },
                {
                  question: "Which blockchains does OrbitYield support?",
                  answer: "OrbitYield currently supports Ethereum, Binance Smart Chain, Polygon, Avalanche, Solana, Fantom, Arbitrum, Optimism, and more. We're continuously adding support for additional blockchains.",
                },
                {
                  question: "How does OrbitYield ensure the security of my funds?",\
                  answer: "OrbitYield employs a non-custodial architecture, meaning you maintain full control of your assets at all times. Our smart contracts are audited by leading security firms, and we implement multiple layers of security measures
 to protect your assets.",
                },
                {
                  question: "What are the fees for using OrbitYield?",
                  answer: "OrbitYield charges a performance fee of 10% on the yield generated, not on your principal. There are no deposit or withdrawal fees. ORBIT token holders receive discounts on performance fees based on the number of tokens held or staked.",
                },
                {
                  question: "How do I get started with OrbitYield?",
                  answer: "To get started, simply connect your wallet to the OrbitYield platform, deposit your assets into our smart vaults, and select your preferred yield strategy. Our platform will automatically allocate your funds to the best opportunities.",
                },
                {
                  question: "Can I withdraw my funds at any time?",
                  answer: "Yes, you can withdraw your funds at any time. There are no lock-up periods or withdrawal fees. However, some underlying protocols may have their own lock-up periods or withdrawal conditions.",
                },
                {
                  question: "What is the ORBIT token?",
                  answer: "ORBIT is the native utility token of the OrbitYield platform. It provides governance rights, fee discounts, and yield boosting capabilities. ORBIT token holders can participate in platform governance and earn additional rewards.",
                },
              ].map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-8">
                  <h3 className="text-lg font-semibold leading-7 text-gray-900">{faq.question}</h3>
                  <p className="mt-4 text-sm leading-6 text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
            <div className="mt-16 text-center">
              <Link href="/faq" className="text-base font-semibold leading-6 text-primary">
                View all FAQs <ArrowRight className="inline-block h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Documentation</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Explore our guides
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Browse our comprehensive documentation to learn more about OrbitYield.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-3">
              {[
                {
                  title: "Getting Started",
                  description: "Learn the basics of OrbitYield, how to connect your wallet, and make your first deposit.",
                  icon: <BookOpen className="h-6 w-6" />,
                  link: "/documentation/getting-started",
                },
                {
                  title: "Yield Strategies",
                  description: "Detailed explanations of our yield strategies, risk assessments, and optimization techniques.",
                  icon: <FileText className="h-6 w-6" />,
                  link: "/documentation/strategies",
                },
                {
                  title: "Security",
                  description: "Information about our security practices, audits, and how we protect your assets.",
                  icon: <HelpCircle className="h-6 w-6" />,
                  link: "/documentation/security",
                },
              ].map((doc) => (
                <Card key={doc.title} className="flex flex-col overflow-hidden border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                      {doc.icon}
                    </div>
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold leading-8 text-gray-900">{doc.title}</h3>
                      <p className="mt-4 text-sm leading-6 text-gray-600">{doc.description}</p>
                      <div className="mt-6">
                        <Link href={doc.link} className="text-sm font-semibold leading-6 text-primary">
                          Read guide <ArrowRight className="inline-block h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button className="rounded-full">
                <Link href="/documentation">View All Documentation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Community Support Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Community Support</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Join our community
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Connect with other OrbitYield users and get help from our community.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-2">
              <Card className="flex flex-col overflow-hidden border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                      <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold leading-8 text-gray-900">Discord Community</h3>
                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        Join our Discord server to chat with other users, get help from the community, and stay updated on the latest news.
                      </p>
                      <div className="mt-6">
                        <Button className="rounded-full">Join Discord</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                      <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold leading-8 text-gray-900">Telegram Group</h3>
                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        Join our Telegram group for community discussions, support, and updates on the go.
                      </p>
                      <div className="mt-6">
                        <Button className="rounded-full">Join Telegram</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Contact Us</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Get in touch
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Have a question or feedback? Send us a message and we&apos;ll get back to you as soon as possible.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
            <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                  First name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                  Last name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    className="block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-primary focus:ring-primary"
                  ></textarea>
                </div>
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" className="w-full rounded-full">
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

