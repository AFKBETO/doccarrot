import '../styles/globals.css'
import React from 'react'
import theme from '../styles/theme'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'

import { firebaseConfig } from '../config/firebase'
import { getApp, initializeApp } from '@firebase/app'
import Navbar from '../components/Navbar'

function MyApp ({ Component, pageProps }: AppProps) {

  try {
    getApp()
  } catch (e) {
    initializeApp(firebaseConfig)
  }

  return (
      <ThemeProvider theme={theme()}>
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
  )
}

export default MyApp
