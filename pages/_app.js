import React from 'react'
import Head from 'next/head'
import Header from '../components/header'

import { EmployeesProvider } from '../store/employees-context'

import StylesReset from '../components/Theme/Reset.css'
import StylesGlobal from '../components/Theme/Global.css'

const TheApp = ({ Component, pageProps }) => {
  return (
    <EmployeesProvider>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Inter:400,500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <Component {...pageProps} />
    </EmployeesProvider>
  )
}

export default TheApp
