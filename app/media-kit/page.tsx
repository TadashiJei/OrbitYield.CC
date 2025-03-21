import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Copy, FileType, Info, Award, Shield, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Media Kit | OrbitYield",
  description: "OrbitYield's official brand assets, guidelines, and press materials.",
}

export default function MediaKit() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-purple-50"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              <span className="gradient-text">Media Kit</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Official brand assets and resources for OrbitYield. Use these materials when featuring OrbitYield in your publications, presentations, or other media.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Assets Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Brand Assets</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Logos & Graphics</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Download our official logos and brand assets for use in your publications.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Logo Card - Light */}
              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="bg-white p-8 flex items-center justify-center h-48">
                  <Image 
                    src="/Light-Logo.svg" 
                    alt="OrbitYield Light Logo" 
                    width={200} 
                    height={80} 
                    className="object-contain"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">Light Logo</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    For use on dark or colored backgrounds.
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/Light-Logo.svg" download>
                        <Download className="mr-2 h-4 w-4" />
                        SVG
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/Light-Logo.png" download>
                        <Download className="mr-2 h-4 w-4" />
                        PNG
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Logo Card - Dark */}
              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="bg-gray-900 p-8 flex items-center justify-center h-48">
                  <Image 
                    src="/Dark-Logo.svg" 
                    alt="OrbitYield Dark Logo" 
                    width={200} 
                    height={80} 
                    className="object-contain"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">Dark Logo</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    For use on light backgrounds.
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/Dark-Logo.svg" download>
                        <Download className="mr-2 h-4 w-4" />
                        SVG
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/Dark-Logo.png" download>
                        <Download className="mr-2 h-4 w-4" />
                        PNG
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Logo Card - Original */}
              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-8 flex items-center justify-center h-48">
                  <Image 
                    src="/Original-Logo.svg" 
                    alt="OrbitYield Original Logo" 
                    width={200} 
                    height={80} 
                    className="object-contain"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">Original Logo</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Full-color version for general use.
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/Original-Logo.svg" download>
                        <Download className="mr-2 h-4 w-4" />
                        SVG
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/Original-Logo.png" download>
                        <Download className="mr-2 h-4 w-4" />
                        PNG
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Banner Image Card */}
              <Card className="overflow-hidden border-0 shadow-lg sm:col-span-2 lg:col-span-3">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-8 flex items-center justify-center h-48">
                  <Image 
                    src="/RBITYIELD.png" 
                    alt="OrbitYield Banner" 
                    width={800} 
                    height={200} 
                    className="object-contain"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">Social Media Banner</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    For use on social media profiles and marketing materials.
                  </p>
                  <div className="mt-4">
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/RBITYIELD.png" download>
                        <Download className="mr-2 h-4 w-4" />
                        PNG
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Guidelines Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Brand Guidelines</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Using Our Brand</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Follow these guidelines when representing OrbitYield in your content.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Logo Usage Guidelines */}
              <Card className="overflow-hidden border-0 shadow-md">
                <CardContent className="p-6">
                  <FileType className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900">Logo Usage</h3>
                  <ul className="mt-4 space-y-3 text-sm text-gray-600">
                    <li>• Maintain clear space around the logo</li>
                    <li>• Don't alter the logo colors</li>
                    <li>• Don't stretch or distort the logo</li>
                    <li>• Don't add effects or elements to the logo</li>
                    <li>• Use the appropriate version for your background</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Color Guidelines */}
              <Card className="overflow-hidden border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="mb-4 flex gap-2">
                    <div className="h-10 w-10 rounded-full bg-primary"></div>
                    <div className="h-10 w-10 rounded-full bg-secondary"></div>
                    <div className="h-10 w-10 rounded-full bg-accent"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Brand Colors</h3>
                  <ul className="mt-4 space-y-3 text-sm text-gray-600">
                    <li>• Primary: <span className="text-primary font-mono">#FF4785</span></li>
                    <li>• Secondary: <span className="text-secondary font-mono">#1EA7FD</span></li>
                    <li>• Accent: <span className="text-accent font-mono">#37D5D3</span></li>
                    <li>• Background: <span className="font-mono">#F8F9FA</span></li>
                    <li>• Text: <span className="font-mono">#333333</span></li>
                  </ul>
                </CardContent>
              </Card>

              {/* Naming Guidelines */}
              <Card className="overflow-hidden border-0 shadow-md">
                <CardContent className="p-6">
                  <Info className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900">Naming Conventions</h3>
                  <ul className="mt-4 space-y-3 text-sm text-gray-600">
                    <li>• Always spell as "OrbitYield" (one word, capital O and Y)</li>
                    <li>• Don't abbreviate to "OY" in first mentions</li>
                    <li>• Always include the full name in headlines</li>
                    <li>• When describing, refer as "OrbitYield, the cross-chain yield aggregator"</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Company Overview</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">About OrbitYield</p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {/* Company Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Description</h3>
                <p className="text-gray-600 mb-4">
                  OrbitYield is an AI-powered cross-chain yield aggregator that automatically allocates funds to the highest-yielding opportunities across multiple blockchains. Our platform combines advanced algorithms with real-time data analysis to optimize investment strategies for both retail and institutional users.
                </p>
                <p className="text-gray-600">
                  Founded in 2024, OrbitYield is committed to making DeFi more accessible, efficient, and secure for users worldwide.
                </p>
              </div>

              {/* Key Facts */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Facts</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <Award className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Supporting over 20 blockchain networks and 300+ DeFi protocols</span>
                  </li>
                  <li className="flex items-start">
                    <Award className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>AI-powered risk assessment to safeguard user investments</span>
                  </li>
                  <li className="flex items-start">
                    <Award className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Founding team with experience from top blockchain projects</span>
                  </li>
                  <li className="flex items-start">
                    <Award className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Secured $12M in seed funding from leading crypto venture firms</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Smart contracts audited by Certik, Quantstamp, and OpenZeppelin</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Press Kit Download Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Download Complete Press Kit</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Get all of our brand assets, high-resolution images, and company information in a single package.
            </p>
            <div className="mt-10 flex justify-center">
              <Button size="lg" className="rounded-full" asChild>
                <a href="#download-press-kit">
                  <Download className="mr-2 h-5 w-5" />
                  Download Press Kit
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Media Inquiries</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              For press inquiries, interview requests, or additional information, please contact our media relations team.
            </p>
            <div className="mt-10">
              <p className="text-lg font-semibold">press@orbityield.cc</p>
              <p className="mt-2 text-gray-600">We typically respond within 24 hours.</p>
            </div>
            <div className="mt-8">
              <Button asChild>
                <Link href="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
