'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section id="home" className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
          {t('hero.title')}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
          {t('hero.subtitle')}
        </p>
        <button className="bg-white text-primary-700 font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-lg">
          {t('hero.cta')}
        </button>
      </div>
    </section>
  )
}
