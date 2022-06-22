import React from 'react'
import { auth, emailAuthProvider } from '../../config/firebase'
import { Box, Typography } from '@mui/material'

interface Props {
  
}

function Login({}: Props) {
  return (
    <Box sx={{ width: '25%', margin: 'auto', mt: 4, border: 1, borderRadius: '20px', backgroundColor: 'primary.dark' }}>
      <Typography variant='h4' align='center'>Connexion</Typography>
    </Box>
  )
}

export default Login
