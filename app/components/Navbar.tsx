import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { auth } from '../config/firebase'
import { signOut } from 'firebase/auth'
import { USER_CONTEXT } from '../config/userContext'
import { UserType } from '../config/types'
import { useRouter } from 'next/router'
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Grid, ClickAwayListener, Container, Menu, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import {NEXT_PROJECT_ROOT} from "next/dist/lib/constants";


function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [openMenu, setOpenMenu] = React.useState<boolean>(false)
  const userContext = React.useContext(USER_CONTEXT)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

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
    <AppBar position='static'>
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', zIndex: 10 }} disableGutters>

          {/*---------- PARTIE GAUCHE : LOGO LAPIN + TITRE ORMELI ----------*/}
          <Grid container direction='row' justifyContent='flex-start' alignItems='center' sx={{ flexShrink: 3 }}>
            <Link href='/'>
              <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ width: '40%', height: '40%' }}>
                <Image src={ `${NEXT_PROJECT_ROOT}/favicon.png` } width='80%' height='90%' alt='Ormeli' />
              </IconButton>
            </Link>
            <Link href='/'>
              <Typography component='div' variant='h1'>Ormeli</Typography>
            </Link>
          </Grid>

          {/*---------- PARTIE DROITE : LIENS DES PAGES + UTILISATEUR ----------*/}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              <MenuItem key='pourquoi'>
                <Link href='/common/pourquoi'>
                  <Typography color='black' component='div' variant="h4" noWrap={true}>Pourquoi Ormeli ?</Typography>
                </Link>
              </MenuItem>
              <MenuItem key='solutions'>
                <Link href='/common/solutions'>
                  <Typography color='black' component='div' variant="h4" noWrap={true}>Solutions</Typography>
                </Link>
              </MenuItem>
              {/*---------- MENU CONNEXION OU UTILISATEUR ----------*/}
              { userContext.userId != null && userContext.firebaseUser != null && userContext.firebaseUser.emailVerified ?
                /*---------- Utilisateur connecté ----------*/
                <Box>
                  <MenuItem key='user'>
                    <Link href={`/user/${userContext.userId}`}>
                      <Typography color='black' component='div' variant="h4" noWrap={true}>Mon Compte</Typography>
                    </Link>
                  </MenuItem>
                  { userContext.userType == UserType.patient ?
                    /*---------- Navbar patient ----------*/
                    <>
                      <MenuItem key='patPrescript'>
                        <Link href={`/user/${userContext.userId}/patient/prescriptions`}>
                          <Typography color='black' component='div' variant="h4" noWrap={true}>Mes Prescriptions</Typography>
                        </Link>
                      </MenuItem>
                      <MenuItem key='patSuivi'>
                        <Link href={`/user/${userContext.userId}/patient/suivi`}>
                          <Typography color='black' component='div' variant="h4" noWrap={true}>Mon Suivi de Santé</Typography>
                        </Link>
                      </MenuItem>
                    </>
                    /*---------- Navbar doctor ----------*/
                    : userContext.userType == UserType.doctor ?
                    <>
                      <MenuItem key='docPatient'>
                        <Link href={`/user/${userContext.userId}/doctor/patients`}>
                          <Typography color='black' component='div' variant="h4" noWrap={true}>Mes Patients</Typography>
                        </Link>
                      </MenuItem>
                    </>
                    /*---------- Navbar pharmacien ----------*/
                    :
                    <>
                      <MenuItem key='pharmaPrescript'>
                        <Link href={`/user/${userContext.userId}/pharmacist/prescriptions`}>
                          <Typography color='black' component='div' variant="h4" noWrap={true}>Prescriptions</Typography>
                        </Link>
                      </MenuItem>
                    </>
                  }
                  <MenuItem key='login' onClick={logout}>
                    <Typography color='black' component='div' variant="h4" noWrap={true}>Déconnecter</Typography>
                  </MenuItem>
                </Box>
              :
              <MenuItem key='login'>
                <Link href='/login'>
                  <Typography color='black' component='div' variant="h4" noWrap={true}>Connexion</Typography>
                </Link>
              </MenuItem>
              }
            </Menu>
            {/*---------- Nom d'utilisateur ----------*/}
            <Box sx={{position: 'relative'}}>
              {
                userContext.userId == null || (userContext.firebaseUser != null && !userContext.firebaseUser.emailVerified) ?
                <></> :
                <Typography component='div' sx={{position: 'absolute', right: '120%', bottom: '70%', color: 'text.secondary'}} noWrap={true}>Bonjour, { userContext.userName }</Typography>
              }
            </Box>
            <Image src={ `${NEXT_PROJECT_ROOT}/carotte_assistant.png` } width='72vw' height='100vh' alt='Carotte Assistant' />
          </Box>
          
          <Grid container direction='row' justifyContent='flex-end' alignItems='center' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link href='/common/pourquoi'>
              <Button color='inherit'><Typography component='div' variant="h4" noWrap={true}>Pourquoi Ormeli ?</Typography></Button>
            </Link>
            <Link href='/common/solutions'>
              <Button color='inherit'><Typography component='div' variant="h4" noWrap={true}>Solutions</Typography></Button>
            </Link>

            {/*---------- MENU CONNEXION OU UTILISATEUR ----------*/}
            { userContext.userId != null && userContext.firebaseUser != null && userContext.firebaseUser.emailVerified ?
              /*---------- Utilisateur connecté ----------*/
              <ClickAwayListener onClickAway={handleClickAway}>
                <Box sx={{ position: 'relative' }}>
                  <Button color='primary' type='button' onClick={handleClick}>
                    <Typography component='div' variant="h4" noWrap={true}>Mon Espace</Typography>
                  </Button>
                  <Box zIndex='tooltip'>
                    {/*---------- Menu dropdown utilisateur ----------*/}
                    { openMenu ?
                      <Box id='popout-menu' sx={{ position: 'absolute', right: '0px' }}>
                        <Box sx={{ border: 1, p: 1, bgcolor: 'action.active' }}>
                          <Link href={`/user/${userContext.userId}`}>
                            <Button color='primary'>
                              <Typography component='div' variant="h4" noWrap={true}>Mon Compte</Typography>
                            </Button>
                          </Link>
                        </Box>
                        { userContext.userType == UserType.patient ?
                          /*---------- Navbar patient ----------*/
                          <>
                            <Box sx={{ border: 1, p: 1, bgcolor: 'action.active' }}>
                              <Link href={`/user/${userContext.userId}/patient/prescriptions`}>
                                <Button color='primary'>
                                  <Typography component='div' variant="h4" noWrap={true}>Mes Prescriptions</Typography>
                                </Button>
                              </Link>
                            </Box>
                            <Box sx={{ border: 1, p: 1, bgcolor: 'action.active' }}>
                              <Link href={`/user/${userContext.userId}/patient/suivi`}>
                                <Button color='primary'>
                                  <Typography component='div' variant="h4" noWrap={true}>Mon Suivi de Santé</Typography>
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
                                  <Typography component='div' variant="h4" noWrap={true}>Mes Patients</Typography>
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
                                  <Typography component='div' variant="h4" noWrap={true}>Prescriptions</Typography>
                                </Button>
                              </Link>
                            </Box>
                          </>
                        }
                        <Box sx={{ border: 1, p: 1, bgcolor: 'action.active' }}>
                            <Button color='inherit' onClick={logout}>
                              <Typography component='div' variant="h4" noWrap={true}>Déconnecter</Typography>
                            </Button>
                        </Box>
                      </Box>
                    : <></>}
                  </Box>
                </Box>
              </ClickAwayListener>
            :
            <Link href='/login'>
              <Button color='inherit'>{/* navbar non-connecté */}
                <Typography component='div' variant="h4" noWrap={true}>Connexion</Typography>
              </Button>
            </Link>
            }

            {/*---------- Nom d'utilisateur ----------*/}
            <Box sx={{position: 'relative'}}>
              {
                userContext.userId == null || (userContext.firebaseUser != null && !userContext.firebaseUser.emailVerified) ?
                <></> :
                <Typography component='div' sx={{position: 'absolute', right: '120%', bottom: '70%', color: 'text.secondary'}} noWrap={true}>Bonjour, { userContext.userName }</Typography>
              }
              <Image src={ `${NEXT_PROJECT_ROOT}/carotte_assistant.png` } width='72vw' height='100vh' alt='Carotte Assistant' />
            </Box>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
