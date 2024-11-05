import { createI18n } from 'vue-i18n'

// Locales
import deDE from './locales/de.json'
import enUS from './locales/en.json'
import nlNL from './locales/nl.json'

// Type-define 'en-US' as the master schema for the resource
type MessageSchema = typeof enUS

const availableLocales = ['nl-NL', 'en-US', 'de-DE'] as const
const defaultLocale = 'nl-NL'

const storedLocale = localStorage.getItem('locale') as
    | (typeof availableLocales)[number]
    | null
const selectedLocale =
    storedLocale && availableLocales.includes(storedLocale)
        ? storedLocale
        : defaultLocale

const i18n = createI18n<[MessageSchema], (typeof availableLocales)[number]>({
    legacy: false,
    globalInjection: true,
    locale: selectedLocale,
    messages: {
        'en-US': enUS,
        'nl-NL': nlNL,
        'de-DE': deDE,
    },
})

export default i18n
