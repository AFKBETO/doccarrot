import React from 'react'
import Image from 'next/image'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

interface Props {

}

function Navbar({}: Props) {
  const user : String | null = null
  const username : String | null = null
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Ormeli
          </Typography>
          <Image
            src='/../public/carotte_assistant.png'
            width='72vw'
            height='100vh'
            alt='Carrotte Assistant'
          />
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
