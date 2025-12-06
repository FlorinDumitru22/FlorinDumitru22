'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🌲</span>
            <span className="text-xl font-display font-bold text-primary-700">
              Carpathian Timber Frame
            </span>
          </div>
          
          <div className="hidden md:flex space-x-6">
            <Link href="#home" className="hover:text-primary-600 transition">
              {t('nav.home')}
            </Link>
            <Link href="#about" className="hover:text-primary-600 transition">
              {t('nav.about')}
            </Link>
            <Link href="#funding" className="hover:text-primary-600 transition">
              {t('nav.funding')}
            </Link>
            <Link href="#progress" className="hover:text-primary-600 transition">
              {t('nav.progress')}
            </Link>
            <Link href="#volunteer" className="hover:text-primary-600 transition">
              {t('nav.volunteer')}
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setLanguage(language === 'en' ? 'ro' : 'en')}
              className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 transition"
              aria-label="Switch language"
            >
              {language === 'en' ? '🇷🇴 RO' : '🇬🇧 EN'}
            </button>
            <Link href="#support" className="btn-primary text-sm px-4 py-2">
              {t('nav.support')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
