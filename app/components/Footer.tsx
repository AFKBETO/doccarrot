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
  const [open, setOpen] = React.useState({
    modalMentions: false,
    modalCredits: false,
    modalAbout: false
  })

  const handleOpen = (event: React.MouseEvent, field: string) => setOpen({...open, [field]: true}) 
  const handleClose = (event: React.MouseEvent, field: string) => setOpen({...open, [field]: false}) 

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{position: 'relative'}}>
          <Image src='/carotte_assistant.png' width='72vw' height='100vh' alt='Carotte Assistant' />
        </Box>

        <Grid container direction='row' justifyContent='flex-end' alignItems='center'>
          <Grid item xs={3}>
            <Button onClick={event => handleOpen(event, 'modalMentions')}>Mentions légales</Button>
            <Modal
              open={open.modalMentions}
              onClose={(event: React.MouseEvent<Element, MouseEvent>) => handleClose(event, 'modalMentions')}
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
            <Button onClick={event => handleOpen(event, 'modalCredits')}>Crédits</Button>
            <Modal
              open={open.modalCredits}
              onClose={(event: React.MouseEvent<Element, MouseEvent>) => handleClose(event, 'modalCredits')}
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Crédits
                </Typography>
                <Grid container direction='column'>
                  <Typography><h3>Notre équipe Doc'Carrot</h3></Typography>
                  <Grid item xs={5}>
                    <Image src='/viet.jpg' width='100%' height='100%' alt='Ormeli' />
                    <Typography>Quang Viet Nguyen</Typography>
                  </Grid>
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
            <Button onClick={event => handleOpen(event, 'modalAbout')}>A propos</Button>
            <Modal
              open={open.modalAbout}
              onClose={(event: React.MouseEvent<Element, MouseEvent>) => handleClose(event, 'modalAbout')}
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
