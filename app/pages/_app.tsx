import '../styles/globals.css'
import React, { useEffect } from 'react'
import theme from '../styles/theme'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'

import Navbar from '../components/Navbar'
import { USER_CONTEXT } from '../config/userContext'
import { useUserData } from '../config/userDataHooks'
import { Toaster } from 'react-hot-toast'

function MyApp ({ Component, pageProps }: AppProps) {

    // récupération des données actuellement en cache depuis Firebase
    const { userId, userName, userType, firebaseUser } = useUserData()
    const userContext = React.useContext(USER_CONTEXT)
    
    userContext.updateUserId(userId)
    userContext.updateUserName(userName)
    userContext.updateFirebaseUser(firebaseUser)
    userContext.updateUserType(userType)

    return (
        <ThemeProvider theme={theme()}>
            <USER_CONTEXT.Provider value={userContext}>
                <Navbar />
                <Component {...pageProps} />
            </USER_CONTEXT.Provider>
            <Toaster />
        </ThemeProvider>
    )
}

export default MyApp
