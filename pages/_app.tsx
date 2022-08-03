import React from 'react'
import Head from 'next/head'
import '../src/App.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Onboarding Process</title>
      </Head>
      <div className="background">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
