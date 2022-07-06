import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { auth } from '../config/firebase'
import { signOut } from 'firebase/auth'
import { USER_CONTEXT } from '../config/userContext'
import { UserType } from '../config/types'
import { useRouter } from 'next/router'
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Grid, ClickAwayListener } from '@mui/material'


function Navbar() {
  const [openMenu, setOpenMenu] = React.useState<boolean>(false)
  const userContext = React.useContext(USER_CONTEXT)

  const handleClick = () => {
    setOpenMenu((prev) => !prev);
  }

  const handleClickAway = () => {
    setOpenMenu(false)
  }

  const router = useRouter()
  
  const logout = async () => {
    await signOut(auth)
    setOpenMenu(false)
    router.push({ pathname: '/', query: { returnUrl: router.asPath } })
  }

  return (
    <Box>
      <AppBar position='static'>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

          {/*---------- PARTIE GAUCHE : LOGO LAPIN + TITRE ORMELI ----------*/}
          <Grid container direction='row' justifyContent='flex-start' alignItems='center' sx={{ flexShrink: 3 }}>
            <Link href='/'>
              <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ width: '40%', height: '40%' }}>
                <Image src='/favicon.png' width='100%' height='100%' alt='Ormeli' />
              </IconButton>
            </Link>
            <Link href='/'>
              <Typography variant='h1'>Ormeli</Typography>
            </Link>
          </Grid>

          {/*---------- PARTIE DROITE : LIENS DES PAGES + UTILISATEUR ----------*/}
          <Grid container direction='row' justifyContent='flex-end' alignItems='center'>
            <Link href='/common/pourquoi'>
              <Button color='inherit'><Typography variant="h4" noWrap={true}>Pourquoi Ormeli ?</Typography></Button>
            </Link>
            <Link href='/common/solutions'>
              <Button color='inherit'><Typography variant="h4" noWrap={true}>Solutions</Typography></Button>
            </Link>

            {/*---------- MENU CONNEXION OU UTILISATEUR ----------*/}
            { userContext.userId != null ?
              /*---------- Utilisateur connecté ----------*/
              <ClickAwayListener onClickAway={handleClickAway}>
                <Box sx={{ position: 'relative' }} zIndex='tooltip'>
                  <Button color='primary' type='button' onClick={handleClick}>
                    <Typography variant="h4" noWrap={true}>Mon Espace</Typography>
                  </Button>

                  {/*---------- Menu dropdown utilisateur ----------*/}
                  { openMenu ?
                    <Box id='popout-menu' sx={{ position: 'absolute', right: '0px' }}>
                      <Box sx={{ border: 1, p: 1, bgcolor: 'action.active' }}>
                        <Link href={`/user/${userContext.userId}`}>
                          <Button color='primary'>
                            <Typography variant="h4" noWrap={true}>Mon Compte</Typography>
                          </Button>
                        </Link>
                      </Box>
                      {/* userContext.userType !== null ?
                        <Box sx={{ border: 1, p: 1, bgcolor: 'action.active' }}>
                          <Link href={`/user/${userContext.userId}/${UserType[userContext.userType]}`}>
                            <Button color='primary'>
                              <Typography variant="h4" noWrap={true}>Mon Espace {userContext.userType === 0 ? 'Patient' : userContext.userType === 1 ? 'Médecin' : 'Pharmacien'}</Typography>
                            </Button>
                          </Link>
                        </Box>
                        :
                        <></>
                      */}
                      { userContext.userType == UserType.patient ?
                        /*---------- Navbar patient ----------*/
                        <>
                          <Box sx={{ border: 1, p: 1, bgcolor: 'action.active' }}>
                            <Link href={`/user/${userContext.userId}/patient/prescriptions`}>
                              <Button color='primary'>
                                <Typography variant="h4" noWrap={true}>Mes Prescriptions</Typography>
                              </Button>
                            </Link>
                          </Box>
                          <Box sx={{ border: 1, p: 1, bgcolor: 'action.active' }}>
                            <Link href={`/user/${userContext.userId}/patient/suivi`}>
                              <Button color='primary'>
                                <Typography variant="h4" noWrap={true}>Mon Suivi de Santé</Typography>
                              </Button>
                            </Link>
                          </Box>
                        </>
                        /*---------- Navbar doctor ----------*/
                        : userContext.userType == UserType.doctor ?
                        <>
                          <Box sx={{ border: 1, p: 1, bgcolor: 'action.active' }}>
                            <Link href={`/user/${userContext.userId}/doctor/patients`}>
                              <Button color='primary'>
                                <Typography variant="h4" noWrap={true}>Patients</Typography>
                              </Button>
                            </Link>
                          </Box>
                        </>
                        /*---------- Navbar pharmacien ----------*/
                        :
                        <>
                          <Box sx={{ border: 1, p: 1, bgcolor: 'action.active' }}>
                            <Link href={`/user/${userContext.userId}/pharmacist/prescriptions`}>
                              <Button color='primary'>
                                <Typography variant="h4" noWrap={true}>Prescriptions</Typography>
                              </Button>
                            </Link>
                          </Box>
                        </>
                      }
                      <Box sx={{ border: 1, p: 1, bgcolor: 'action.active' }}>
                          <Button color='inherit' onClick={logout}>
                            <Typography variant="h4" noWrap={true}>Déconnecter</Typography>
                          </Button>
                      </Box>
                    </Box>
                  : <></>}
                </Box>
              </ClickAwayListener>
            :
            <Link href='/login'>
              <Button color='inherit'>{/* navbar non-connecté */}
                <Typography variant="h4" noWrap={true}>Connexion</Typography>
              </Button>
            </Link>
            }

            {/*---------- BOUTON DE CONNEXION ----------*/}
            <Box sx={{position: 'relative'}}>
              {
                userContext.userId == null ?
                <></> :
                <Typography sx={{position: 'absolute', right: '120%', bottom: '70%', color: 'text.secondary'}} noWrap={true}>Bonjour, { userContext.userName }</Typography>
              }
              <Image src='/carotte_assistant.png' width='72vw' height='100vh' alt='Carotte Assistant' />
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
