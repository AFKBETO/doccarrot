import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material'

interface Props {

}

function Navbar({}: Props) {
  const user : String | null = null
  const username : String | null = null
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between}' }}>
          <Box sx={{ display: 'flex' }}>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
            >
            </IconButton>
            <Link href='/'>
              <Typography variant="h3" component="div">
                Ormeli
              </Typography>
            </Link>
          </Box>
          <Box sx={{ display: 'flex', alignContent: 'center' }}>
            <Image
              src='/carotte_assistant.png'
              width='72vw'
              height='100vh'
              alt='Carotte Assistant'
            />
            <Link href='/login'>
              <Button color='inherit'><strong>Login</strong></Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
