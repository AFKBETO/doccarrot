import '../styles/globals.css'
import React from 'react'
import theme from '../styles/theme'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'

import Navbar from '../components/Navbar'
<<<<<<< HEAD
import Footer from '../components/Footer'
import { UserContext } from '../config/userContext'
=======
import { USER_CONTEXT } from '../config/userContext'
>>>>>>> dev
import { useUserData } from '../config/userDataHooks'
import { Toaster } from 'react-hot-toast'

function MyApp ({ Component, pageProps }: AppProps) {

<<<<<<< HEAD
  return (
    <ThemeProvider theme={theme()}>
      <UserContext.Provider value={{user: user, username: username}}>
        <Navbar />
        <Component {...pageProps} />
      </UserContext.Provider>
      <Toaster />
      <Footer />
    </ThemeProvider>
  )
=======
    // récupération des données actuellement en cache depuis Firebase
    const { userId, userName, firebaseUser } = useUserData()
    const userContext = React.useContext(USER_CONTEXT);

    if (userId != null) userContext.updateUserId(userId);
    if (userName != null) userContext.updateUserName(userName);
    if (firebaseUser != null) userContext.updateFirebaseUser(firebaseUser);

    return (
        <ThemeProvider theme={theme()}>
            <USER_CONTEXT.Provider value={userContext}>
                <Navbar />
                <Component {...pageProps} />
            </USER_CONTEXT.Provider>
            <Toaster />
        </ThemeProvider>
    )
>>>>>>> dev
}


export default MyApp
