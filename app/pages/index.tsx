import Head from 'next/head'
import { auth } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import {Box, Grid, Typography} from '@mui/material'
import React from 'react'


function Home() {
  const [user, loading, error] = useAuthState(auth)

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    )
  }
  if (error) {
    return (
      <div>
        {`Error: ${error}`}
      </div>
    )
  }
  if (user) {
    return (
        <Grid container sx={{ paddingLeft: 5, paddingRight:5, paddingBottom: 10 }}>
            <Grid item>
                <Typography variant="h2">Logged in as { user.email }</Typography>
                <p style={{ textAlign: 'justify' }}>
                  {'... page d\'accueil ...'}
                </p>
            </Grid>
        </Grid>
    )
  }

  return (
    <Box> 
      <Head>
        <title>Ormeli</title>
        <meta name='description' content='Ormeli App' />
        <link rel='icon' href='/favicon.png' />
      </Head>

      <main>
          <Typography variant='h2' align='center'>Bienvenue sur Ormeli.</Typography>
      </main>
    </Box>
  )
}

export default Home
