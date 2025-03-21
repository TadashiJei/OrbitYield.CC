import { blogPosts } from "../data"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

// Define blog post type
type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  role: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  slug: string;
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((post: BlogPost) => post.slug === params.slug)
  
  if (!post) {
    return {
      title: "Blog Post Not Found | OrbitYield",
      description: "The requested blog post could not be found.",
    }
  }
  
  return {
    title: `${post.title} | OrbitYield Blog`,
    description: post.excerpt,
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((post: BlogPost) => post.slug === params.slug)
  
  if (!post) {
    notFound()
  }
  
  return (
    <div className="flex flex-col">
      <div className="bg-white px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <Link 
            href="/blog" 
            className="inline-flex items-center rounded-md text-sm font-medium text-primary hover:text-primary/80 mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to blog
          </Link>
          
          <p className="text-base font-semibold leading-7 text-primary">{post.category}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{post.title}</h1>
          
          <div className="mt-6 flex items-center gap-x-4">
            <div className="h-10 w-10 rounded-full bg-gray-100"></div>
            <div className="text-sm leading-6">
              <p className="font-semibold text-gray-900">
                <span>{post.author}</span>
              </p>
              <p className="text-gray-600">{post.role}</p>
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-x-4 text-xs">
            <time dateTime={post.date} className="text-gray-500">
              {post.date}
            </time>
            <span className="text-gray-500">{post.readTime}</span>
          </div>
          
          <figure className="mt-16">
            <img
              className="aspect-video rounded-xl bg-gray-50 object-contain"
              src={post.image}
              alt={post.title}
            />
          </figure>
          
          {post.slug === "polkadot-philippines-hackathon-2025" && (
            <div className="mt-10 space-y-6">
              <p>
                We're thrilled to announce that the Hacktivators team is officially participating in the 
                Polkadot Philippines Hackathon 2025! This exciting event brings together the best blockchain 
                talents in the Philippines and beyond to build innovative solutions on the Polkadot ecosystem.
              </p>
              
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">About the Hackathon</h2>
              <p>
                The Polkadot Philippines Hackathon 2025 is a collaborative event organized by OpenGuild and Web3 Bulacan.
                OpenGuild is a Web 3.0 builder-driven community elevating Polkadot across Southeast Asia, including Vietnam, 
                Thailand, Malaysia, Singapore, and the Philippines. Their mission is to provide comprehensive resources and 
                engaging activities for builders and organizations interested in the Polkadot blockchain.
              </p>
              
              <div className="my-8 overflow-hidden rounded-xl bg-gray-50 p-6">
                <h3 className="text-lg font-semibold text-gray-900">Event Details</h3>
                <ul className="mt-4 list-disc pl-6 space-y-2">
                  <li><strong>Hackathon URL:</strong> <a href="https://dorahacks.io/hackathon/polkadot-philippine-2025/detail" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">DoraHacks - Polkadot Philippine 2025</a></li>
                  <li><strong>Focus Area:</strong> DeFi (Decentralized Finance)</li>
                  <li><strong>Organizers:</strong> OpenGuild and Web3 Bulacan</li>
                </ul>
              </div>
              
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Our DeFi Focus</h2>
              <p>
                For this hackathon, our team has chosen to focus on the DeFi (Decentralized Finance) track. 
                This aligns perfectly with our OrbitYield platform's mission of optimizing yields across multiple 
                blockchain networks. We believe that the Polkadot ecosystem, with its interoperability features, 
                provides the ideal infrastructure for building next-generation DeFi applications.
              </p>
              
              <p>
                Our hackathon project will leverage Polkadot's unique cross-chain capabilities to create 
                an innovative DeFi solution that addresses current market challenges and provides real 
                value to users. We're excited to apply our expertise in cross-chain yield optimization 
                to build something truly innovative on Polkadot.
              </p>
              
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">About the Organizers</h2>
              <h3 className="mt-8 text-xl font-semibold text-gray-900">OpenGuild</h3>
              <p>
                OpenGuild is a Web 3.0 builder-driven community focused on elevating Polkadot. They find and 
                connect talents to become part of the Polkadot ecosystem to create value, products, and culture 
                in the Southeast Asian market. Their primary focus is to cater to builders and organizations 
                seeking a comprehensive understanding of the Polkadot blockchain, providing curated, in-depth 
                resources, engaging activities, and events.
              </p>
              
              <h3 className="mt-8 text-xl font-semibold text-gray-900">Web3 Bulacan</h3>
              <p>
                Web3 Bulacan is a local community focused on promoting blockchain and Web3 technologies 
                in the Bulacan region of the Philippines. They work to educate, engage, and empower local 
                talents to participate in the global blockchain ecosystem, with a particular focus on Polkadot.
              </p>
              
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">What's Next</h2>
              <p>
                Over the coming weeks, our team will be hard at work developing our hackathon submission. 
                We'll be posting regular updates on our progress, challenges, and learnings along the way. 
                Stay tuned to our blog for more information about our hackathon journey and insights into 
                the DeFi landscape on Polkadot.
              </p>
              
              <p>
                We're excited about this opportunity to contribute to the Polkadot ecosystem and showcase 
                our skills in the DeFi space. If you're also participating in the hackathon or have 
                experience building on Polkadot, we'd love to connect and share ideas!
              </p>
              
              <div className="my-8 overflow-hidden rounded-xl bg-primary/5 p-6">
                <h3 className="text-lg font-semibold text-gray-900">Connect With Us</h3>
                <p className="mt-2">
                  Interested in our hackathon project or want to learn more about OrbitYield? 
                  Reach out to us through our <Link href="/contact" className="text-primary hover:underline">contact page</Link> or
                  follow our progress on our social media channels.
                </p>
              </div>
            </div>
          )}
          
          {post.slug !== "polkadot-philippines-hackathon-2025" && (
            <div className="mt-10 space-y-6">
              <p>
                <i>This is a placeholder for the full blog post content. In a real implementation, this would be pulled from a CMS or database.</i>
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
