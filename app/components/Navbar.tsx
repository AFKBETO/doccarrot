import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getAuth, signOut } from 'firebase/auth'
import { UserContext } from '../config/userContext'
import { UserType } from '../config/types'
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Grid, Popper } from '@mui/material'

interface Props {

}

function Navbar({ }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [usertype, setUserType] = React.useState<null | UserType>(null)
  const userContext = React.useContext(UserContext)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }

  const auth = getAuth()
  
  const logout = () => {
    userContext.updateUsername?.(null)
    signOut(auth)
    setAnchorEl(null)
  }

  const switchType = () => {
    if (usertype == null) {
      setUserType(UserType.patient)
    }
    else if (usertype == UserType.patient) {
      setUserType(UserType.medecin)
    }
    else if (usertype == UserType.medecin){
      setUserType(UserType.pharmacien)
    }
    else if (usertype == UserType.pharmacien) {
      setUserType(null)
    }
  }

  const openMenuPatient = Boolean(anchorEl);
  const idMenuPatient = openMenuPatient ? 'simple-popper' : undefined;

  /* const user : string | null = null */
  /*const username : string | null = null */
  /*const usertype : UserType | null = null */

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid
            container
            direction='row'
            justifyContent='flex-start'
            alignItems='center'
            sx={{ flexShrink: 3 }}
          >
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              onClick={switchType}
              sx={{ width: '40%', height: '40%' }}
            >
              <Image
              src='/favicon.png'
              width='100%'
              height='100%'
              alt='Ormeli'
              />
            </IconButton>
            <Link href='/'>
              <Typography variant='h4' component='div' sx={{color: 'text.secondary'}}>
                Ormeli
              </Typography>
            </Link>
          </Grid>
          <Grid
            container
            direction='row'
            justifyContent='flex-end'
            alignItems='center'
          >
            <Link href='/common/pourquoi'>
              <Button color='inherit'><Typography noWrap={true}>Pourquoi Ormeli ?</Typography></Button>
            </Link>
            <Link href='/common/solutions'>
              <Button color='inherit'><Typography noWrap={true}>Solutions</Typography></Button>
            </Link>
              { userContext.user != null ?
                <>
                  <Button
                    color='inherit'
                    aria-describedby={idMenuPatient}
                    type='button'
                    onClick={handleClick}
                  >
                    <Typography noWrap={true}>Mon Espace</Typography>
                  </Button>
                  <Popper id={idMenuPatient} open={openMenuPatient} anchorEl={anchorEl}>
                    <Box sx={{ border: 1, p: 1, bgcolor: 'action.active' }}> 
                      <Link href={`/${userContext.username}`}>
                        <Button color='primary'>
                          <Typography noWrap={true}>Mon Compte</Typography>
                        </Button>
                      </Link>
                    </Box>
                    { usertype == UserType.patient ? 
                    <> {/* navbar patient */}
                      <Box sx={{ border: 1, p: 1, bgcolor: 'action.active' }}> 
                        <Link href={`/${userContext.username}/patient/prescriptions`}>
                          <Button color='primary'>
                            <Typography noWrap={true}>Prescriptions</Typography>
                          </Button>
                        </Link>
                      </Box>
                      <Box sx={{ border: 1, p: 1, bgcolor: 'action.active' }}>
                        <Link href={`/${userContext.username}/patient/suivi`}>
                          <Button color='primary'>
                            <Typography noWrap={true}>Suivi Santé</Typography>
                          </Button>
                        </Link>
                      </Box>
                    </> : 
                    usertype == UserType.medecin ?
                    <> {/* navbar medecin */}
                    </> :
                    <> {/* navbar pharmacien */}
                    </>}
                    <Box sx={{ border: 1, p: 1, bgcolor: 'action.active' }}> 
                        <Button color='inherit' onClick={logout}>
                          <Typography noWrap={true}>Déconnecter</Typography>
                        </Button>
                    </Box>
                  </Popper>
                </>
              :
              <Link href='/login'> 
                <Button color='inherit'>{/* navbar non-connecté */}
                  <Typography noWrap={true}>Connexion</Typography>
                </Button>
              </Link>
            }
            <Box sx={{position: 'relative'}}>
              {
                userContext.username == null ?
                <></> :
                <Typography sx={{position: 'absolute', right: '120%', bottom: '70%', color: 'text.secondary'}} noWrap={true}>Bonjour, {userContext.username}</Typography>
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
