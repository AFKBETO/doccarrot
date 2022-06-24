import Head from 'next/head'
import { auth } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Box, Typography } from '@mui/material'

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
      <div>
        <p>Current User: {user.email}</p>
      </div>
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
        <Typography variant='h1' component='div' align='center'>
          Welcome to Ormeli
        </Typography>
      </main>
    </Box>
  )
}

export default Home
