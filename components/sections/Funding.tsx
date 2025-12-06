'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function Funding() {
  const { t } = useLanguage()

  return (
    <section id="funding" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title">{t('funding.title')}</h2>
        <p className="section-subtitle">{t('funding.subtitle')}</p>
        
        <div className="max-w-4xl mx-auto mt-12">
          <div className="card">
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-gray-600 mb-2">Total Goal</div>
                <div className="text-3xl font-bold text-primary-700">€ 85,000</div>
              </div>
              <div className="text-center">
                <div className="text-gray-600 mb-2">Raised</div>
                <div className="text-3xl font-bold text-secondary-500">€ 32,450</div>
              </div>
              <div className="text-center">
                <div className="text-gray-600 mb-2">Supporters</div>
                <div className="text-3xl font-bold text-primary-700">147</div>
              </div>
              <div className="text-center">
                <div className="text-gray-600 mb-2">Days Left</div>
                <div className="text-3xl font-bold text-secondary-500">68</div>
              </div>
            </div>
            
            <div className="bg-gray-200 rounded-full h-6 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-primary-600 to-secondary-500 h-full rounded-full transition-all duration-500"
                style={{ width: '38%' }}
              />
            </div>
            <div className="text-center mt-2 text-gray-600">38% funded</div>
          </div>
        </div>
      </div>
    </section>
  )
}
