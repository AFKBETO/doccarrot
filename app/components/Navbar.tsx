import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Grid } from '@mui/material'

interface Props {

}

enum UserType {
  patient,
  medecin,
  pharmacien
}

function Navbar({}: Props) {
  const user : String | null = null
  const username : String | null = null
  const usertype : UserType | null = null
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            sx={{ border : 1, flexShrink: 3 }}
          >
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ width: '40%', height: '40%' }}
            >
              <Image
              src='/favicon.png'
              width='100%'
              height='100%'
              alt='Carotte Assistant'
              />
            </IconButton>
            <Link href='/'>
              <Typography variant="h4" component="div">
                Ormeli
              </Typography>
            </Link>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            {
              usertype == UserType.patient ?
              <>
                <Link href='/'>
                  <Button color='inherit'><Typography noWrap={true}>Solutions</Typography></Button>
                </Link>
                <Link href='/login'>
                  <Button color='inherit'><Typography noWrap={true}>Mon Espace</Typography></Button>
                </Link>
              </> : 
              usertype == UserType.medecin ?
              <>
                <Link href='/'>
                  <Button color='inherit'><Typography noWrap={true}>Solutions</Typography></Button>
                </Link>
                <Link href='/login'>
                  <Button color='inherit'><Typography noWrap={true}>Mon Espace</Typography></Button>
                </Link>
              </> :
              usertype == UserType.pharmacien ?
              <>
                <Link href='/'>
                  <Button color='inherit'><Typography noWrap={true}>Solutions</Typography></Button>
                </Link>
                <Link href='/login'>
                  <Button color='inherit'><Typography noWrap={true}>Mon Espace</Typography></Button>
                </Link>
              </> :
              <>
                <Link href='/'>
                  <Button color='inherit'><Typography noWrap={true}>Pourquoi Ormeli ?</Typography></Button>
                </Link>
                <Link href='/'>
                  <Button color='inherit'><Typography noWrap={true}>Solutions</Typography></Button>
                </Link>
                <Link href='/login'>
                  <Button color='inherit'><Typography noWrap={true}>Connexion</Typography></Button>
                </Link>
              </>
            }
            <Box sx={{position: 'relative'}}>
              {
                username == null ?
                <></> :
                <Typography sx={{position: 'absolute', right: '120%', bottom: '70%'}} noWrap={true}>Bonjour, {username}</Typography>
              }
              <Image
                src='/carotte_assistant.png'
                width='72vw'
                height='100vh'
                alt='Carotte Assistant'
              />
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
