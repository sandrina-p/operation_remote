import React from 'react'
import Head from 'next/head'
import Header from '../components/header'

import employees from '../data/employees.js'

import { EmployeesProvider } from '../store/employees-context'

const TheApp = ({ Component, pageProps }) => {
  return (
    <EmployeesProvider>
      <Header />
      <Component {...pageProps} />
    </EmployeesProvider>
  )
}

export default TheApp
