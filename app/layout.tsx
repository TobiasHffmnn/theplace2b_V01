import type { Metadata } from 'next'
import './globals.css'
import { Manrope } from 'next/font/google'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700'], // vier Gewichtsstufen reichen
})

export const metadata: Metadata = {
  title: 'theplace2b – Psychologische Beratung & Coaching',
  description:
    'Psychologische Beratung, Coaching, Workshops & Therapie für mehr Klarheit, Balance und Entwicklung.',
  openGraph: {
    title: 'theplace2b | the place to become',
    description:
      'Workshops, Coaching & Beratung – psychologisch fundiert und praxisnah.',
    url: 'https://theplace2b.org',
    siteName: 'theplace2b',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${manrope.className} bg-black text-neutral-100 antialiased`}>
        {children}
      </body>
    </html>
  )
}
