import '../styles/globals.css'
import React from 'react'
import theme from '../styles/theme'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'

import Navbar from '../components/Navbar'
<<<<<<< HEAD
import Footer from '../components/Footer'
=======
import { UserContext } from '../config/userContext'
import { useUserData } from '../config/userDataHooks'
import { Toaster } from 'react-hot-toast'
>>>>>>> dev

function MyApp ({ Component, pageProps }: AppProps) {
  const {user, username} = useUserData()

  return (
    <ThemeProvider theme={theme()}>
      <UserContext.Provider value={{user: user, username: username}}>
        <Navbar />
        <Component {...pageProps} />
<<<<<<< HEAD
        <Footer />
       
      </ThemeProvider>
=======
      </UserContext.Provider>
      <Toaster />
    </ThemeProvider>
>>>>>>> dev
  )
}

export default MyApp
