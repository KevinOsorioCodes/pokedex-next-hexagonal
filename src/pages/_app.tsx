import { Inter } from 'next/font/google'
import { Fragment, useState } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import PokedexHeader from '~/infrastructure/react/ui/layout/Header'
import { labels } from '~/shared/labels/labels'
import { PokemonProvider } from '~/infrastructure/react/context/PokemonContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '~/shared/styles/globals.css'
import TeamFooter from '~/infrastructure/react/ui/components/PokemonTeam/TeamFooter'

const inter = Inter({
  subsets: ['latin'],
})

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  )
  return (
    <Fragment>
      <Head>
        <title>{labels.APP_NAME}</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <PokemonProvider>
          <div className={`flex flex-col  ${inter.className}`}>
            <PokedexHeader />
            <div className={'mt-16 '}>
              <Component {...pageProps} />
              <TeamFooter />
            </div>
          </div>
        </PokemonProvider>
      </QueryClientProvider>
    </Fragment>
  )
}

export default MyApp
