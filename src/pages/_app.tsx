import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Fragment } from 'react'
import '~/shared/styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <title>asd</title>
      </Head>
      <div className="flex flex-col">
        <Component {...pageProps} />
      </div>
    </Fragment>
  )
}
export default MyApp
