import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Grid, Popper } from '@mui/material'

interface Props {

}

enum UserType {
  patient,
  medecin,
  pharmacien
}

function Navbar({}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [usertype, setUserType] = React.useState<null | UserType>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }

  const switchType = () => {
    if (usertype == null) setUserType(UserType.patient)
    else if (usertype == UserType.patient) setUserType(UserType.medecin)
    else if (usertype == UserType.medecin) setUserType(UserType.pharmacien)
    else if (usertype == UserType.pharmacien) setUserType(null)
  }

  const openMenuPatient = Boolean(anchorEl);
  const idMenuPatient = openMenuPatient ? 'simple-popper' : undefined;

  const user : String | null = null
  const username : String | null = null
  /*const usertype : UserType | null = null */

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
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
            <Link href='/common/pourquoi'>
              <Button color='inherit'><Typography noWrap={true}>Pourquoi Ormeli ?</Typography></Button>
            </Link>
            <Link href='/common/solutions'>
              <Button color='inherit'><Typography noWrap={true}>Solutions</Typography></Button>
            </Link>
            {
              usertype == UserType.patient ? 
              <> 
                <Button
                  color='inherit'
                  aria-describedby={idMenuPatient}
                  type="button"
                  onClick={handleClick}
                > {/* navbar patient */}
                  <Typography noWrap={true}>Mon Espace</Typography>
                </Button>
                <Popper id={idMenuPatient} open={openMenuPatient} anchorEl={anchorEl}>
                  <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                    The content of the Popper.
                  </Box>
                </Popper>
              </> : 
              usertype == UserType.medecin ?
              <Link href='/'>
                <Button color='inherit'> {/* navbar medecin */}
                  <Typography noWrap={true}>Mon Espace</Typography>
                </Button>
              </Link> :
              usertype == UserType.pharmacien ?
              <Link href='/'>
                <Button color='inherit'> {/* navbar pharmacien */}
                  <Typography noWrap={true}>Mon Espace</Typography>
                </Button>
              </Link> :
              <Link href='/login'> 
                <Button color='inherit'>{/* navbar non-connecté */}
                  <Typography noWrap={true}>Connexion</Typography>
                </Button>
              </Link>
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
