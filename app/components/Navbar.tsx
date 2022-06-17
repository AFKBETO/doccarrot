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
          >
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
            >
              <Image
              src='/favicon.png'
              width='100%'
              height='100%'
              alt='Carotte Assistant'
              />
            </IconButton>
            <Link href='/'>
              <Typography variant="h3" component="div">
                Ormeli
              </Typography>
            </Link>
          </Grid>
          {usertype == UserType.patient ?
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Link href='/'>
              <Button color='inherit'><Typography noWrap={true}>Solutions</Typography></Button>
            </Link>
            <Link href='/login'>
              <Button color='inherit'><Typography noWrap={true}>Mon Espace</Typography></Button>
            </Link>
            <Image
              src='/carotte_assistant.png'
              width='72vw'
              height='100vh'
              alt='Carotte Assistant'
            />
          </Grid> : 
          usertype == UserType.medecin ?
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Link href='/'>
              <Button color='inherit'><Typography noWrap={true}>Solutions</Typography></Button>
            </Link>
            <Link href='/login'>
              <Button color='inherit'><Typography noWrap={true}>Mon Espace</Typography></Button>
            </Link>
            <Image
              src='/carotte_assistant.png'
              width='72vw'
              height='100vh'
              alt='Carotte Assistant'
            />
          </Grid> :
          usertype == UserType.pharmacien ?
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Link href='/'>
              <Button color='inherit'><Typography noWrap={true}>Solutions</Typography></Button>
            </Link>
            <Link href='/login'>
              <Button color='inherit'><Typography noWrap={true}>Mon Espace</Typography></Button>
            </Link>
            <Image
              src='/carotte_assistant.png'
              width='72vw'
              height='100vh'
              alt='Carotte Assistant'
            />
          </Grid> :
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Link href='/'>
              <Button color='inherit'><Typography noWrap={true}>Solutions</Typography></Button>
            </Link>
            <Link href='/login'>
              <Button color='inherit'><Typography noWrap={true}>Mon Espace</Typography></Button>
            </Link>
            <Image
              src='/carotte_assistant.png'
              width='72vw'
              height='100vh'
              alt='Carotte Assistant'
            />
          </Grid>
          }
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
