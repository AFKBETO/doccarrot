import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getAuth, signOut } from 'firebase/auth'
import { USER_CONTEXT } from '../config/userContext'
import { UserType } from '../config/types'
import { useRouter } from 'next/router'
import { Dialog, Modal, AppBar, Box, Toolbar, Typography, Button, Grid } from '@mui/material'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface Props {}

function Footer({ }: Props) {
  const [openMenu, setOpenMenu] = React.useState<boolean>(false)
  const userContext = React.useContext(USER_CONTEXT)
  const [open, setOpen] = React.useState({
    modal1: false,
    modal2: false,
    modal3: false
  })

  const handleOpen = (event: React.MouseEvent, field: string) => setOpen({...open, [field]: true}) 
  const handleClose = (event: React.MouseEvent, field: string) => setOpen({...open, [field]: false}) 

  const handleClick = () => {
    setOpenMenu((prev) => !prev);
  }

  const handleClickAway = () => {
    setOpenMenu(false);
  }

  const auth = getAuth()
  const router = useRouter()
  
  const logout = () => {
    userContext.updateUserId(null)
    userContext.updateUserName(null)
    userContext.updateFirebaseUser(null)
    signOut(auth)
    setOpenMenu(false)
    router.push({ pathname: '/', query: { returnUrl: router.asPath } })
  }

  const switchType = () => {
    if (userContext.userType == null) {
      if (userContext.userId == null) {
        userContext.updateUserId(0)
        userContext.updateUserName("Default User")
      }
      userContext.updateUserType(UserType.patient)
      router.push({ pathname: `/user/${userContext.userId}/patient` })
    }
    else if (userContext.userType == UserType.patient) {
      userContext.updateUserType(UserType.medecin)
      router.push({ pathname: `/user/${userContext.userId}/medecin` })
    }
    else if (userContext.userType == UserType.medecin) {
      userContext.updateUserType(UserType.pharmacien)
      router.push({ pathname: `/user/${userContext.userId}/pharmacien` })
    }
    else if (userContext.userType == UserType.pharmacien) {
      if (userContext.userId == 0) {
        userContext.updateUserId(null)
        userContext.updateUserName(null)
      }
      userContext.updateUserType(null)
      router.push({ pathname: `/` })
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{position: 'relative'}}>
          <Image src='/carotte_assistant.png' width='72vw' height='100vh' alt='Carotte Assistant' />
        </Box>

        <Grid container direction='row' justifyContent='flex-end' alignItems='center'>
          <Grid item xs={3}>
            <Button onClick={event => handleOpen(event, 'modal1')}>Mentions légales</Button>
            <Modal
              open={open.modal1}
              onClose={event => handleClose(event, 'modal1')}
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Mentions légales
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Mentions légales
                </Typography>
              </Box>
            </Modal>
          </Grid>
          <Grid item xs={3}>
            <Button onClick={event => handleOpen(event, 'modal2')}>Crédits</Button>
            <Modal
              open={open.modal2}
              onClose={event => handleClose(event, 'modal2')}
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Crédits
                </Typography>
                <Grid container direction='column'>
                  <Typography><h3>Notre équipe Doc'Carrot</h3></Typography>
                  <Grid item xs={5}>
                    <Image src='/guillaume.jpeg' width='100%' height='100%' alt='Ormeli' />
                    <Typography>Guillaume Vandenneucker</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Image src='/maya.jpeg' width='100%' height='100%' alt='Ormeli' />
                    <Typography>Maya Gawinowski</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Image src='/maxime.jpeg' width='100%' height='100%' alt='Ormeli' />
                    <Typography>Maxime Larroze</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Image src='/brahim.jpeg' width='100%' height='100%' alt='Ormeli' />
                    <Typography>Brahim Hda</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Modal>
          </Grid>
          <Grid item xs={3}>
            <Button onClick={event => handleOpen(event, 'modal3')}>A propos</Button>
            <Modal
              open={open.modal3}
              onClose={event => handleClose(event, 'modal3')}
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  A propos
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Efrei Paris
                </Typography>
                <Typography>
                  Promotion 2024
                </Typography>
              </Box>
            </Modal>
          </Grid>
        </Grid>
          <Box sx={{position: 'relative'}}>
            <Image src='/carotte_assistant.png' width='72vw' height='100vh' alt='Carotte Assistant' />
          </Box>
        </Toolbar>
        </AppBar>
    </Box>
  )
}

export default Footer
