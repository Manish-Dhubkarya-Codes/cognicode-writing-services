import type { Metadata, Viewport } from 'next'
import { Inter, Merriweather } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const merriweather = Merriweather({ 
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
  display: "swap"
});

export const metadata: Metadata = {
  title: 'CogniCodeWrite | Academic Research Writing Services',
  description: 'Professional academic research writing services for PhD thesis, research papers, dissertations, and more. Expert guidance for your scholarly success.',
  keywords: 'academic writing, research papers, PhD thesis, dissertation, academic support, scholarly writing',
  generator: 'v0.app',
  icons: {
    icon: '/CogniCode_TitleLogo.png',  // Use your custom PNG as the primary icon
    apple: '/CogniCode_TitleLogo.png',  // Optionally use it for Apple touch icon too
  },
}

export const viewport: Viewport = {
  themeColor: '#0d9488',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${merriweather.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}