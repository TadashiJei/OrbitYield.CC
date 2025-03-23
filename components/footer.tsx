import Link from "next/link"
import { Twitter, Github, MessageSquare } from "lucide-react"

const navigation = {
  ecosystem: [
    { name: "Overview", href: "/overview" },
    { name: "Features", href: "/features" },
    { name: "Roadmap", href: "/roadmap" },
    { name: "Tokenomics", href: "/tokenomics" },
    { name: "Team", href: "/team" },
  ],
  platform: [
    { name: "Documentation", href: "/docs" },
    { name: "Developers", href: "/developers" },
    { name: "API", href: "/api" },
    { name: "Integrations", href: "/integrations" },
    { name: "Security", href: "/security" },
  ],
  resources: [
    { name: "Blog", href: "/blog" },
    { name: "Community", href: "/community" },
    { name: "Support", href: "/support" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
    { name: "Changelog", href: "/changelog" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Partners", href: "/partners" },
    { name: "Media Kit", href: "/media-kit" },
  ],
  legal: [
    { name: "Legal Disclosures", href: "/legal/disclosures" },
    { name: "Privacy Policy", href: "/legal/privacy-policy" },
    { name: "Cookie Policy", href: "/legal/cookie-policy" },
    { name: "Terms & Conditions", href: "/legal/terms" },
  ],
  social: [
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: (props: any) => <Twitter {...props} />,
    },
    {
      name: "GitHub",
      href: "https://github.com",
      icon: (props: any) => <Github {...props} />,
    },
    {
      name: "Discord",
      href: "https://discord.com",
      icon: (props: any) => <MessageSquare {...props} />,
    },
    {
      name: "Telegram",
      href: "https://telegram.org",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
    },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-8 pt-12 sm:pt-16 lg:px-8 lg:pt-24">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary"></div>
              <span className="text-xl font-bold">OrbitYield</span>
            </div>
            <p className="text-sm leading-6 text-gray-600">
              Maximize your returns with our AI-powered cross-chain yield aggregator.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <Link key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500 transition-colors">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-10 sm:mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="animate-fade-in stagger-1">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Ecosystem</h3>
                <ul role="list" className="mt-4 sm:mt-6 space-y-2 sm:space-y-4">
                  {navigation.ecosystem.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-xs sm:text-sm leading-6 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 md:mt-0 animate-fade-in stagger-2">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Platform</h3>
                <ul role="list" className="mt-4 sm:mt-6 space-y-2 sm:space-y-4">
                  {navigation.platform.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-xs sm:text-sm leading-6 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="animate-fade-in stagger-3">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Resources</h3>
                <ul role="list" className="mt-4 sm:mt-6 space-y-2 sm:space-y-4">
                  {navigation.resources.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-xs sm:text-sm leading-6 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 md:mt-0 animate-fade-in stagger-4">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Company</h3>
                <ul role="list" className="mt-4 sm:mt-6 space-y-2 sm:space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-xs sm:text-sm leading-6 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 sm:mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-4 md:order-2">
              {navigation.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-xs leading-6 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <p className="mt-6 md:mt-0 text-xs leading-5 text-gray-500 md:order-1">
              &copy; {new Date().getFullYear()} OrbitYield. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

