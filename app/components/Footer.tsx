import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getAuth, signOut } from 'firebase/auth'
import { USER_CONTEXT } from '../config/userContext'
import { UserType } from '../config/types'
import { useRouter } from 'next/router'
import { Modal, AppBar, Box, Toolbar, Typography, Button, IconButton, Grid, ClickAwayListener } from '@mui/material'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Props {}

function Footer({ }: Props) {
  const [openMenu, setOpenMenu] = React.useState<boolean>(false)
  const userContext = React.useContext(USER_CONTEXT)
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              <Button onClick={handleOpen}>Mentions légales</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
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
            <Button onClick={handleOpen}>Crédits</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                  Crédits
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Crédits
                  </Typography>
                </Box>
              </Modal>
            </Grid>
            <Grid item xs={3}>
            <Button onClick={handleOpen}>A propos</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                  A propos
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  A propos
                  </Typography>
                </Box>
              </Modal>
            </Grid>
           
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Footer
