import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Code, Database, Globe } from "lucide-react"

export const metadata: Metadata = {
  title: "API | OrbitYield",
  description: "API documentation for OrbitYield's cross-chain yield aggregator platform.",
}

export default function API() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-purple-50"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              <span className="gradient-text">API</span> Reference
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Comprehensive documentation for the OrbitYield API, enabling developers to integrate our cross-chain yield
              aggregator into their applications.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button className="rounded-full">Get API Keys</Button>
              <Link
                href="/developers"
                className="flex items-center gap-1 text-sm font-semibold leading-6 text-gray-900 hover:text-primary"
              >
                Developer Resources <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* API Overview Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">API Overview</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">RESTful API for yield optimization</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our API provides programmatic access to OrbitYield&apos;s cross-chain yield aggregator, allowing
              developers to integrate our platform into their applications.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
              <Card className="flex flex-col overflow-hidden border-0 shadow-lg">
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                    <Globe className="h-6 w-6" />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">RESTful Endpoints</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      Our API follows RESTful principles, making it easy to integrate with any programming language or
                      framework.
                    </p>
                    <div className="mt-6">
                      <Link href="/api/endpoints" className="text-sm font-semibold leading-6 text-primary">
                        View Endpoints <ArrowRight className="inline-block h-4 w-4" />
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
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">Authentication</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      Secure your API requests with API keys and JWT tokens for authenticated access to our platform.
                    </p>
                    <div className="mt-6">
                      <Link href="/api/authentication" className="text-sm font-semibold leading-6 text-primary">
                        Learn More <ArrowRight className="inline-block h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="flex flex-col overflow-hidden border-0 shadow-lg">
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                    <Database className="h-6 w-6" />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">Rate Limits</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      Understand our rate limits and how to optimize your API usage for the best performance.
                    </p>
                    <div className="mt-6">
                      <Link href="/api/rate-limits" className="text-sm font-semibold leading-6 text-primary">
                        View Limits <ArrowRight className="inline-block h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* API Endpoints Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">API Endpoints</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Key endpoints</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Explore the main endpoints available in the OrbitYield API.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-2">
              {[
                {
                  method: "GET",
                  endpoint: "/v1/opportunities",
                  description: "Retrieve all available yield opportunities across supported blockchains.",
                  link: "/api/endpoints/opportunities",
                },
                {
                  method: "GET",
                  endpoint: "/v1/opportunities/{id}",
                  description: "Get detailed information about a specific yield opportunity.",
                  link: "/api/endpoints/opportunities/id",
                },
                {
                  method: "GET",
                  endpoint: "/v1/chains",
                  description: "List all supported blockchains and their current status.",
                  link: "/api/endpoints/chains",
                },
                {
                  method: "GET",
                  endpoint: "/v1/protocols",
                  description: "List all supported DeFi protocols and their current status.",
                  link: "/api/endpoints/protocols",
                },
                {
                  method: "POST",
                  endpoint: "/v1/deposits",
                  description: "Create a new deposit transaction to a yield opportunity.",
                  link: "/api/endpoints/deposits",
                },
                {
                  method: "POST",
                  endpoint: "/v1/withdrawals",
                  description: "Create a new withdrawal transaction from a yield opportunity.",
                  link: "/api/endpoints/withdrawals",
                },
              ].map((endpoint) => (
                <Card key={endpoint.endpoint} className="flex flex-col overflow-hidden border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div
                        className={`px-2 py-1 rounded-md text-xs font-medium ${
                          endpoint.method === "GET"
                            ? "bg-blue-100 text-blue-800"
                            : endpoint.method === "POST"
                              ? "bg-green-100 text-green-800"
                              : endpoint.method === "PUT"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                        }`}
                      >
                        {endpoint.method}
                      </div>
                      <div className="ml-2">
                        <h3 className="text-base font-semibold leading-7 text-gray-900 font-mono">
                          {endpoint.endpoint}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-gray-600">{endpoint.description}</p>
                        <div className="mt-4">
                          <Link href={endpoint.link} className="text-sm font-semibold leading-6 text-primary">
                            View Documentation <ArrowRight className="inline-block h-4 w-4" />
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
                <Link href="/api/endpoints">View All Endpoints</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Code Examples Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Code Examples</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">API in action</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              See how to use the OrbitYield API with code examples in various programming languages.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="rounded-xl bg-gray-900 p-4">
              <div className="flex border-b border-gray-700">
                <button className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-t-lg">
                  JavaScript
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-400">Python</button>
                <button className="px-4 py-2 text-sm font-medium text-gray-400">Rust</button>
              </div>
              <pre className="overflow-x-auto text-sm text-gray-100 p-4">
                <code>{`// Example: Fetching yield opportunities
const axios = require('axios');

async function getYieldOpportunities() {
  try {
    const response = await axios.get('https://api.orbityield.cc/v1/opportunities', {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
      },
      params: {
        chains: ['ethereum', 'binance-smart-chain', 'polygon'],
        minApy: 5.0,
        maxRiskScore: 3,
        limit: 10
      }
    });
    
    console.log(\`Found \${response.data.length} yield opportunities\`);
    
    // Sort by APY (highest first)
    response.data.sort((a, b) => b.apy - a.apy);
    
    // Display the top 5 opportunities
    response.data.slice(0, 5).forEach(opportunity => {
      console.log(\`\${opportunity.protocol} on \${opportunity.chain}: \${opportunity.apy.toFixed(2)}% APY\`);
    });
  } catch (error) {
    console.error('Error fetching yield opportunities:', error.response ? error.response.data : error.message);
  }
}

getYieldOpportunities();`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* SDKs Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">SDKs & Libraries</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Simplified integration</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Use our official SDKs to simplify integration with the OrbitYield API.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-3">
              {[
                {
                  language: "JavaScript",
                  description: "Official JavaScript SDK for Node.js and browser applications.",
                  link: "/api/sdks/javascript",
                },
                {
                  language: "Python",
                  description: "Official Python SDK for backend applications and data analysis.",
                  link: "/api/sdks/python",
                },
                {
                  language: "Rust",
                  description: "Official Rust SDK for high-performance applications.",
                  link: "/api/sdks/rust",
                },
              ].map((sdk) => (
                <Card key={sdk.language} className="flex flex-col overflow-hidden border-0 shadow-md">
                  <CardContent className="p-6">
                    <div>
                      <h3 className="text-lg font-semibold leading-8 text-gray-900">{sdk.language} SDK</h3>
                      <p className="mt-4 text-sm leading-6 text-gray-600">{sdk.description}</p>
                      <div className="mt-6">
                        <Link href={sdk.link} className="text-sm font-semibold leading-6 text-primary">
                          View Documentation <ArrowRight className="inline-block h-4 w-4" />
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to integrate?</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Get your API keys and start building with OrbitYield today.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button className="rounded-full">Get API Keys</Button>
              <Button variant="outline" className="rounded-full">
                Join Developer Community
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

