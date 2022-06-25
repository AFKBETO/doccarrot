import '../styles/globals.css'
import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import theme from '../styles/theme'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function MyApp ({ Component, pageProps }: AppProps) {
  const lightMode = useMediaQuery('(prefers-color-scheme: light)');

  return (
      <ThemeProvider theme={theme(lightMode)}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
  )
}

export default MyApp
