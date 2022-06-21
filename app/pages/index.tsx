import Head from 'next/head'
import Image from 'next/image'
import { Box, Typography } from '@mui/material'

function Home() {
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
