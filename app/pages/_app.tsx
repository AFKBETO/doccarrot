import '../styles/globals.css'
import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import theme from '../styles/theme'
import { AppProps } from 'next/app'
import { User } from '../config/types';
import { ThemeProvider } from '@mui/material/styles'

import Navbar from '../components/Navbar'

function MyApp ({ Component, pageProps }: AppProps) {
    const lightMode = useMediaQuery('(prefers-color-scheme: light)');

    const [user, setUser] = React.useState<User | null>(null)

    return (
      <ThemeProvider theme={theme(lightMode)}>
        <Navbar user={user} setUser={setUser} />
        <Component {...pageProps} />
      </ThemeProvider>
    )
}

export default MyApp
