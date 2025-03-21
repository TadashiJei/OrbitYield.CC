import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { blogPosts } from "./data"

export const metadata: Metadata = {
  title: "Blog | OrbitYield",
  description: "Latest news, updates, and insights from the OrbitYield team.",
}

export default function Blog() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-purple-50"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              <span className="gradient-text">Blog</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Latest news, updates, and insights from the OrbitYield team.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Featured Post</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{blogPosts[0].title}</p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={blogPosts[0].image || "/placeholder.svg"}
                alt={blogPosts[0].title}
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                <div>
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {blogPosts[0].category}
                  </span>
                  <p className="mt-2 text-xl font-semibold leading-6 text-white">{blogPosts[0].title}</p>
                  <p className="mt-2 text-base text-gray-300">{blogPosts[0].excerpt}</p>
                  <div className="mt-4 flex items-center gap-x-4">
                    <div className="h-10 w-10 rounded-full bg-gray-100"></div>
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-white">
                        <span>{blogPosts[0].author}</span>
                      </p>
                      <p className="text-gray-300">
                        {blogPosts[0].date} · {blogPosts[0].readTime}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link href={`/blog/${blogPosts[0].slug}`} className="text-sm font-semibold leading-6 text-white">
                      Read more <ArrowRight className="inline-block h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Categories</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Browse by topic</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Explore our content organized by category to find exactly what you&apos;re looking for.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { name: "Hackathon", count: 1, color: "bg-violet" },
              ].map((category) => (
                <Card key={category.name} className="flex flex-col overflow-hidden border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className={`h-2 w-16 ${category.color} rounded-full mb-4`}></div>
                    <h3 className="text-lg font-semibold leading-8 text-gray-900">{category.name}</h3>
                    <p className="mt-2 text-sm text-gray-600">{category.count} articles</p>
                    <div className="mt-4">
                      <Link
                        href={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-sm font-semibold leading-6 text-primary"
                      >
                        View all <ArrowRight className="inline-block h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative isolate overflow-hidden bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Subscribe to our newsletter</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Stay up to date with the latest news, updates, and insights from the OrbitYield team.
            </p>
            <div className="mt-10">
              <form className="mx-auto mt-10 flex max-w-md gap-x-4">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="min-w-0 flex-auto rounded-md border-0 bg-white px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  placeholder="Enter your email"
                />
                <Button type="submit" className="rounded-md">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
