'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'ro'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, replacements?: Record<string, string | number>) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language
    if (saved && (saved === 'en' || saved === 'ro')) {
      setLanguage(saved)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string, replacements?: Record<string, string | number>): string => {
    let text = translations[language][key] || key
    
    if (replacements) {
      Object.keys(replacements).forEach((placeholder) => {
        text = text.replace(`{${placeholder}}`, String(replacements[placeholder]))
      })
    }
    
    return text
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.funding': 'Funding',
    'nav.updates': 'Updates',
    'nav.progress': 'Progress',
    'nav.volunteer': 'Volunteer',
    'nav.support': 'Support',
    'hero.title': 'Crowdsourced Off-Grid Timber Frame House',
    'hero.subtitle': 'Join us in building a sustainable off-grid home in the Carpathian Mountains',
    'hero.cta': 'Support Our Project',
    'funding.title': 'Crowdfunding Progress',
    'funding.subtitle': 'Help us build this sustainable off-grid timber frame home',
    // Add all other translations...
  },
  ro: {
    'nav.home': 'Acasă',
    'nav.about': 'Despre',
    'nav.funding': 'Finanțare',
    'nav.updates': 'Noutăți',
    'nav.progress': 'Progres',
    'nav.volunteer': 'Voluntariat',
    'nav.support': 'Susține',
    'hero.title': 'Casă din Lemn Off-Grid Finanțată de Comunitate',
    'hero.subtitle': 'Alătură-te nouă în construirea unei case sustenabile off-grid în Munții Carpați',
    'hero.cta': 'Susține Proiectul',
    'funding.title': 'Progres Finanțare',
    'funding.subtitle': 'Ajută-ne să construim această casă sustenabilă din lemn off-grid',
    // Add all other translations...
  },
}
