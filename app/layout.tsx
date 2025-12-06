import '@/app/globals.css'
import type { Metadata } from 'next'
import { Montserrat, Playfair_Display } from 'next/font/google'
import { LanguageProvider } from '@/contexts/LanguageContext'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Carpathian Timber Frame | Crowdfunded Off-Grid Home',
  description: 'Join us in building a sustainable off-grid timber frame house in the Carpathian Mountains',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
