import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { ApolloProvider } from '@apollo/client'
import apolloClient from '../lib/apollo'
import { I18nProvider } from '../providers/I18nProvider'
import dynamic from 'next/dynamic'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <ApolloProvider client={apolloClient}>
        <I18nProvider>
          <Component {...pageProps} />
        </I18nProvider>
      </ApolloProvider>
    </RecoilRoot>
  )
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
})
