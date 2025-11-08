import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Quick - Lightning Fast Solutions",
  description: "Quick provides lightning-fast solutions for modern businesses. Streamline your workflow and boost productivity with our innovative platform.",
  keywords: "quick, fast, solutions, productivity, business, workflow",
  authors: [{ name: "Quick Team" }],
  creator: "Quick",
  publisher: "Quick",
  openGraph: {
    title: "Quick - Lightning Fast Solutions",
    description: "Quick provides lightning-fast solutions for modern businesses. Streamline your workflow and boost productivity with our innovative platform.",
    url: "https://quick.com",
    siteName: "Quick",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quick - Lightning Fast Solutions",
    description: "Quick provides lightning-fast solutions for modern businesses. Streamline your workflow and boost productivity with our innovative platform.",
    creator: "@quick",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  )
}