import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Code, Database, FileCode, GitBranch, Globe, Terminal } from "lucide-react"

export const metadata: Metadata = {
  title: "Developers | OrbitYield",
  description: "Developer resources for integrating with OrbitYield's cross-chain yield aggregator platform.",
}

export default function Developers() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-purple-50"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              <span className="gradient-text">Developers</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Build on top of OrbitYield&apos;s cross-chain yield aggregator platform with our comprehensive developer
              resources.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button className="rounded-full">Get API Keys</Button>
              <Link
                href="/documentation"
                className="flex items-center gap-1 text-sm font-semibold leading-6 text-gray-900 hover:text-primary"
              >
                View Documentation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Resources Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Developer Resources</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to build</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our developer resources are designed to help you integrate with OrbitYield&apos;s platform quickly and
              easily.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
              <Card className="flex flex-col overflow-hidden border-0 shadow-lg">
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                    <Code className="h-6 w-6" />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">API Reference</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      Comprehensive API documentation with examples in multiple programming languages.
                    </p>
                    <div className="mt-6">
                      <Link href="/documentation/api" className="text-sm font-semibold leading-6 text-primary">
                        View API Docs <ArrowRight className="inline-block h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden border-0 shadow-lg">
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                    <GitBranch className="h-6 w-6" />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">SDKs & Libraries</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      Official SDKs and libraries for JavaScript, Python, Rust, and more to simplify integration.
                    </p>
                    <div className="mt-6">
                      <Link href="/developers/sdks" className="text-sm font-semibold leading-6 text-primary">
                        Explore SDKs <ArrowRight className="inline-block h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden border-0 shadow-lg">
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                    <FileCode className="h-6 w-6" />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">Smart Contracts</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      Documentation and examples for interacting with OrbitYield&apos;s smart contracts.
                    </p>
                    <div className="mt-6">
                      <Link href="/developers/contracts" className="text-sm font-semibold leading-6 text-primary">
                        View Contracts <ArrowRight className="inline-block h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Guides Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Integration Guides</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Step-by-step tutorials</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Learn how to integrate OrbitYield&apos;s platform into your applications with our detailed guides.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-3">
              {[
                {
                  title: "Integrating the OrbitYield API",
                  description: "Learn how to authenticate and make requests to the OrbitYield API.",
                  icon: <Globe className="h-6 w-6" />,
                  link: "/developers/guides/api-integration",
                },
                {
                  title: "Building a Yield Dashboard",
                  description: "Create a custom yield dashboard using our JavaScript SDK.",
                  icon: <Terminal className="h-6 w-6" />,
                  link: "/developers/guides/yield-dashboard",
                },
                {
                  title: "Working with Smart Contracts",
                  description: "Interact with OrbitYield's smart contracts using Web3.js or Ethers.js.",
                  icon: <Database className="h-6 w-6" />,
                  link: "/developers/guides/smart-contracts",
                },
              ].map((guide) => (
                <Card key={guide.title} className="flex flex-col overflow-hidden border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                      {guide.icon}
                    </div>
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold leading-8 text-gray-900">{guide.title}</h3>
                      <p className="mt-4 text-sm leading-6 text-gray-600">{guide.description}</p>
                      <div className="mt-6">
                        <Link href={guide.link} className="text-sm font-semibold leading-6 text-primary">
                          Read guide <ArrowRight className="inline-block h-4 w-4" />
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

      {/* Code Examples Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Code Examples</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">See it in action</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Explore code examples to help you get started with OrbitYield integration.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="rounded-xl bg-gray-900 p-4">
              <pre className="overflow-x-auto text-sm text-gray-100">
                <code>{`// Example: Fetching yield opportunities using the OrbitYield JavaScript SDK
import { OrbitYield } from '@orbityield/sdk';

// Initialize the SDK with your API key
const orbityield = new OrbitYield({
  apiKey: 'YOUR_API_KEY',
});

// Fetch all available yield opportunities
async function getYieldOpportunities() {
  try {
    const opportunities = await orbityield.getYieldOpportunities({
      chains: ['ethereum', 'binance-smart-chain', 'polygon'],
      minApy: 5.0,
      maxRiskScore: 3,
    });
    
    console.log(\`Found \${opportunities.length} yield opportunities\`);
    
    // Sort by APY (highest first)
    opportunities.sort((a, b) => b.apy - a.apy);
    
    // Display the top 5 opportunities
    opportunities.slice(0, 5).forEach(opportunity => {
      console.log(\`\${opportunity.protocol} on \${opportunity.chain}: \${opportunity.apy.toFixed(2)}% APY\`);
    });
  } catch (error) {
    console.error('Error fetching yield opportunities:', error);
  }
}

getYieldOpportunities();`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Community Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Developer Community</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Join our community</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Connect with other developers building on OrbitYield and get support from our team.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-3">
              {[
                {
                  title: "Discord",
                  description: "Join our Discord server to chat with other developers and get real-time support.",
                  link: "https://discord.gg/orbityield",
                },
                {
                  title: "GitHub",
                  description: "Explore our open-source repositories, report issues, and contribute to our codebase.",
                  link: "https://github.com/orbityield",
                },
                {
                  title: "Developer Forum",
                  description: "Ask questions, share knowledge, and discuss integration challenges with our community.",
                  link: "https://forum.orbityield.cc/developers",
                },
              ].map((community) => (
                <Card key={community.title} className="flex flex-col overflow-hidden border-0 shadow-md">
                  <CardContent className="p-6">
                    <div>
                      <h3 className="text-lg font-semibold leading-8 text-gray-900">{community.title}</h3>
                      <p className="mt-4 text-sm leading-6 text-gray-600">{community.description}</p>
                      <div className="mt-6">
                        <Link href={community.link} className="text-sm font-semibold leading-6 text-primary">
                          Join now <ArrowRight className="inline-block h-4 w-4" />
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to start building?</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Get your API keys and start integrating with OrbitYield today.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button className="rounded-full">Get API Keys</Button>
              <Button variant="outline" className="rounded-full">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

