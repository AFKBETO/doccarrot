import '../styles/globals.css'
import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import theme from '../styles/theme'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'

import Navbar from '../components/Navbar'

function MyApp ({ Component, pageProps }: AppProps) {
  const lightMode = useMediaQuery('(prefers-color-scheme: light)');

  return (
      <ThemeProvider theme={theme(lightMode)}>
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
  )
}

export default MyApp
