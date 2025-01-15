import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { ApolloProvider } from '@apollo/client'
import apolloClient from '../lib/apollo'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </RecoilRoot>
  )
}
