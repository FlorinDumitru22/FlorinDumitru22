'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-display font-bold mb-4">
              Carpathian Timber Frame
            </h3>
            <p className="text-gray-400">
              {t('footer.tagline') || 'Community-driven off-grid sustainable living since 2024'}
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">{t('footer.quicklinks') || 'Quick Links'}</h4>
            <ul className="space-y-2">
              <li><Link href="#home" className="text-gray-400 hover:text-white transition">{t('nav.home')}</Link></li>
              <li><Link href="#about" className="text-gray-400 hover:text-white transition">{t('nav.about')}</Link></li>
              <li><Link href="#funding" className="text-gray-400 hover:text-white transition">{t('nav.funding')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">{t('footer.resources') || 'Resources'}</h4>
            <ul className="space-y-2">
              <li><Link href="#updates" className="text-gray-400 hover:text-white transition">Updates</Link></li>
              <li><Link href="#progress" className="text-gray-400 hover:text-white transition">Build Progress</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">{t('footer.connect') || 'Connect'}</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Facebook">FB</a>
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Instagram">IG</a>
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="YouTube">YT</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>{t('footer.copyright') || '© 2024 Carpathian Timber Frame Project. Open Source & Community Driven.'}</p>
        </div>
      </div>
    </footer>
  )
}
