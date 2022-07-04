import '../styles/globals.css'
import React, {useState} from 'react'
//import useMediaQuery from '@mui/material/useMediaQuery'
import theme from '../styles/theme'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { PRESCRIPTIONS_CONTEXT, USER_CONTEXT } from '../config/dataContexts'
import { Toaster } from 'react-hot-toast'
import { Box } from "@mui/material"
import { useHooks } from "../config/dataHooks";

const bodyStyle = {
  'maxHeight': '90vh',
  'margin': 0,
  'display': 'flex',
  'flex-direction': 'column'
}

function MyApp ({ Component, pageProps }: AppProps) {
  //const lightMode = useMediaQuery('(prefers-color-scheme: light)');

  const userContext = React.useContext(USER_CONTEXT)
  const prescriptionContext = React.useContext(PRESCRIPTIONS_CONTEXT)
  const { firebaseUser, firebaseLoading, firebaseError, userId, userName, userType, userPrescriptions } = useHooks();

  userContext.updateFirebase(firebaseUser, firebaseLoading, firebaseError)
  userContext.updateUserId(userId)
  userContext.updateUserName(userName)
  userContext.updateUserType(userType)
  prescriptionContext.updatePrescriptions(userPrescriptions)

  return (
      <ThemeProvider theme={theme()}>
        <Box sx={{
          position:'relative',
          maxHeight: '70vh'
        }}>
          <Box sx={bodyStyle}>
            <USER_CONTEXT.Provider value={userContext}>
              <PRESCRIPTIONS_CONTEXT.Provider value={prescriptionContext}>
                <Navbar />
                <Component {...pageProps} />
              </PRESCRIPTIONS_CONTEXT.Provider>
            </USER_CONTEXT.Provider>
            <Toaster />
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
  )
}

export default MyApp
