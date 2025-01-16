import { i18nTranslations } from '@todo-turborepo/i18n'
import i18n from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ja: {
        translation: i18nTranslations.ja,
      },
      en: {
        translation: i18nTranslations.en,
      },
    },
    fallbackLng: 'ja',
    interpolation: {
      escapeValue: false,
    },
    nsSeparator: false,
  })

export const I18nProvider = ({ children }: { children: JSX.Element }) => (
  <I18nextProvider i18n={i18n} defaultNS={'translation'}>
    {children}
  </I18nextProvider>
)
