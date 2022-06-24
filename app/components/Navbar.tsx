import React, {Dispatch, SetStateAction} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {User, UserType} from '../config/types';
import {AppBar, Box, Button, Grid, IconButton, Popper, Toolbar, Typography} from '@mui/material'

interface Props {
  user: User | null;
  setUser: Dispatch<SetStateAction<User>>;
}

function Navbar({ user, setUser }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }

  const switchType = () => {
    if (user == null) {
      setUser(() => new User(0, UserType.patient, 'Test', 'Patient', null));
      // TODO : also change route
    }
    else if (user.type == UserType.patient) {
      setUser(prevUser => ({
        ...prevUser,
        type: UserType.medecin,
        firstName: 'Test',
        lastName: 'Médecin'
      }));
      // TODO : also change route
    }
    else if (user.type == UserType.medecin) {
      setUser(prevUser => ({
        ...prevUser,
        type: UserType.pharmacien,
        firstName: 'Test',
        lastName: 'Pharmacien'
      }));
      // TODO : also change route
    }
    else if (user.type == UserType.pharmacien) {
      setUser(null);
      // TODO : also change route
    }
  }

  const openMenuPatient = Boolean(anchorEl);
  const idMenuPatient = openMenuPatient ? 'simple-popper' : undefined;

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
              <Typography variant='h4' component='div'>
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
              { user != null ?
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
                      <Link href={`/user/${user.id}`}>
                        <Button color='primary'>
                          <Typography noWrap={true}>Mon Compte</Typography>
                        </Button>
                      </Link>
                    </Box>
                    { user.type == UserType.patient ?
                    <> {/* navbar patient */}
                      <Box sx={{ border: 1, p: 1, bgcolor: 'action.active' }}> 
                        <Link href={`/user/${user.id}/patient/prescriptions`}>
                          <Button color='primary'>
                            <Typography noWrap={true}>Prescriptions</Typography>
                          </Button>
                        </Link>
                      </Box>
                      <Box sx={{ border: 1, p: 1, bgcolor: 'action.active' }}>
                        <Link href={`/user/${user.id}/patient/suivi`}>
                          <Button color='primary'>
                            <Typography noWrap={true}>Suivi Santé</Typography>
                          </Button>
                        </Link>
                      </Box>
                    </> : 
                    user.type == UserType.medecin ?
                    <> {/* navbar medecin */}
                    </> :
                    <> {/* navbar pharmacien */}
                    </>}
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
                user == null ?
                <></> :
                <Typography sx={{position: 'absolute', right: '120%', bottom: '70%'}} noWrap={true}>Bonjour, {user.firstName} {user.lastName}</Typography>
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
