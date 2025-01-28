import "./globals.css";
import { Metadata } from 'next'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: {
    default: 'Product Store',
    template: '%s | Product Store'
  },
  description: 'Discover a wonderful collection of products with great prices and high quality.',
  keywords: ['online store', 'ecommerce', 'shopping', 'products'],
  authors: [{ name: 'GreyBall' }],
  creator: 'GreyBall',
  publisher: 'GreyBall',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Product Store',
    title: 'Product Store - Quality Products at Great Prices',
    description: 'Discover a wonderful collection of products with great prices and high quality.'
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
          <Providers>
          {children}
          </Providers>
      </body>
    </html>
  )
}
