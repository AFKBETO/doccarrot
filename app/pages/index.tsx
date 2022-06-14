import Head from 'next/head'
import Image from 'next/image'
import { Box, Typography } from '@mui/material'

export default function Home() {
  return (
    <Box> 
      <Head>
        <title>Ormeli</title>
        <meta name='description' content='Ormeli App' />
        <link rel='icon' href='/carotte_assistant.png' />
      </Head>

      <main>
        <Typography variant='h1' component='div' align='center'>
          Welcome to Ormeli
        </Typography>
      </main>
    </Box>
  )
}
