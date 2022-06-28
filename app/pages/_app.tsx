import '../styles/globals.css'
import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import theme from '../styles/theme'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { USER_CONTEXT } from '../config/userContext'
import { useUserData } from '../config/userDataHooks'
import { Toaster } from 'react-hot-toast'
import { Box } from "@mui/material";

const bodyStyle = {
    'height': '90vh',
    'margin': 0,
    'display': 'flex',
    'flex-direction': 'column'
};
const footerStyle = {
    'height': '10vh',
    'margin-top': 'auto'
};

function MyApp ({ Component, pageProps }: AppProps) {
    //const lightMode = useMediaQuery('(prefers-color-scheme: light)');

    // récupération des données actuellement en cache depuis Firebase
    const { userId, userName, userType, firebaseUser } = useUserData()
    const userContext = React.useContext(USER_CONTEXT)
    
    userContext.updateUserId(userId)
    userContext.updateUserName(userName)
    userContext.updateFirebaseUser(firebaseUser)
    userContext.updateUserType(userType)

    return (
        <ThemeProvider theme={theme()}>
            <Box sx={bodyStyle}>
                <USER_CONTEXT.Provider value={userContext}>
                    <Navbar />
                    <Component {...pageProps} />
                </USER_CONTEXT.Provider>
                <Toaster />
            </Box>
            <Box sx={footerStyle}>
                <Footer />
            </Box>
        </ThemeProvider>
    )
}

export default MyApp
