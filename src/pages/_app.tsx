import React, { FunctionComponent } from 'react';
import type { AppProps /*, AppContext */ } from 'next/app'
import Head from "next/head"
import Nav from '../components/Nav';
import '../styles/main.css';
import '../styles/tailwind.css';

const App:FunctionComponent<AppProps> = ({
  Component,
  pageProps
}: AppProps
) => {
  return (
          <>
            <Head>
              <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
            </Head>
            <Nav />
            <div className="app">
              <Component {...pageProps} />
            </div>
          </>
      )
}

export default App;