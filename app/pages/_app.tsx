import '../styles/globals.css'
import React from 'react'
import theme from '../styles/theme'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { USER_CONTEXT } from '../config/userContext'
import { Toaster } from 'react-hot-toast'
import { Box } from "@mui/material"
import { useHooks } from "../config/dataHooks";

const bodyStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh'
}
const contentWrapStyle = {
  flex: 1,
  minHeight: '90vh'
}

function MyApp ({ Component, pageProps }: AppProps) {
  //const lightMode = useMediaQuery('(prefers-color-scheme: light)');

  const userContext = React.useContext(USER_CONTEXT)
  const { firebaseUser, firebaseLoading, firebaseError, userId, userName, userType, patientPrescriptions, patientDoctors, patientPharmacies, pharmacistPharmacyId, pharmacistPrescriptions, refreshUserData } = useHooks();

  userContext.updateFirebase(firebaseUser, firebaseLoading, firebaseError)
  userContext.updateUserId(userId)
  userContext.updateUserName(userName)
  userContext.updateUserType(userType)
  userContext.updatePatientPrescriptions(patientPrescriptions)
  userContext.updatePatientDoctors(patientDoctors)
  userContext.updatePatientPharmacies(patientPharmacies)
  userContext.updatePharmacistPharmacyId(pharmacistPharmacyId)
  userContext.updatePharmacistPrescriptions(pharmacistPrescriptions)
  userContext.updateRefreshUserDataFunction(refreshUserData)

  return (
      <ThemeProvider theme={theme()}>
        <Box sx={bodyStyle}>
          <Box sx={contentWrapStyle}>
            <USER_CONTEXT.Provider value={userContext}>
              <Navbar />
              <Component {...pageProps} />
            </USER_CONTEXT.Provider>
            <Toaster />
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
  )
}

export default MyApp
