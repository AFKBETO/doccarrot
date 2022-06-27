import Head from 'next/head'
import { auth } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Box, Typography } from '@mui/material'
import { getUser } from '../config/api'
import React from 'react'
import { GetStaticProps } from 'next'

interface Props {
  name: string
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const res = await getUser('tSrhkhKUpURe8VMaL6L487K6z0u1')
    return {
      props: {
        name: res.firstName + ' ' + res.lastName
      }
    }
  } catch (error) {
    return {
      props: {
        name: error.message
      }
    }
  }
}

function Home({ name }: Props) {
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
        <p>Current User: {name}</p>
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
          Welcome to Ormeli {name}
        </Typography>
      </main>
    </Box>
  )
}

export default Home
