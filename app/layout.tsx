import type React from "react"
import type { Metadata } from "next"
import { Unbounded } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
})

export const metadata: Metadata = {
  title: "OrbitYield | Cross-Chain Yield Aggregator",
  description:
    "Maximize your returns with our AI-powered cross-chain yield aggregator. Automatically allocate funds to the highest-yielding opportunities across multiple blockchains.",
  generator: 'orbityield.cc',
  metadataBase: new URL('https://orbityield.cc'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://orbityield.cc',
    title: 'OrbitYield | Cross-Chain Yield Aggregator',
    description: 'Maximize your returns with our AI-powered cross-chain yield aggregator. Automatically allocate funds to the highest-yielding opportunities across multiple blockchains.',
    siteName: 'OrbitYield',
    images: [
      {
        url: '/RBITYIELD.png',
        width: 1200,
        height: 630,
        alt: 'OrbitYield | Cross-Chain Yield Aggregator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OrbitYield | Cross-Chain Yield Aggregator',
    description: 'Maximize your returns with our AI-powered cross-chain yield aggregator.',
    images: ['/RBITYIELD.png'],
    creator: '@orbityield',
  },
  icons: {
    icon: '/favicon.ico',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${unbounded.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col bg-gray-50">
            {" "}
            {/* Changed background color */}
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}