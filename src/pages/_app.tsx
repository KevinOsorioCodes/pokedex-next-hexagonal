import { Inter } from 'next/font/google'
import { Fragment } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import PokedexHeader from '~/infrastructure/react/ui/layout/Header'
import { labels } from '~/shared/labels/labels'
import { PokemonProvider } from '~/infrastructure/react/context/PokemonContext'
import '~/shared/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <title>{labels.APP_NAME}</title>
      </Head>
      <PokemonProvider>
        <div className={`flex flex-col w-screen h-screen ${inter.className}`}>
          <PokedexHeader />
          <Component {...pageProps} />
        </div>
      </PokemonProvider>
    </Fragment>
  )
}

export default MyApp
