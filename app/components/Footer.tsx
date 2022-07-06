import React from 'react'
import Image from 'next/image'
//import Link from 'next/link'
import { Modal, AppBar, Box, Toolbar, Typography, Button, Grid } from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  background: '#ABBD98'
}

function Footer() {
  const [open, setOpen] = React.useState({
    modalMentions: false,
    modalCredits: false,
    modalAbout: false,
    modalTutorial: false
  })

  const handleOpen = (event: React.MouseEvent, field: string) => setOpen({...open, [field]: true})
  const handleClose = (event: React.MouseEvent, field: string) => setOpen({...open, [field]: false})

  return (
      <Box sx={{
        flexGrow: 1,
        position : 'sticky',
        bottom: '0vh',
        width: '100%'
      }}>
        <AppBar position='static'>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{position: 'relative'}}>
              <Image src='/carotte_assistant.png' width='72vw' height='100vh' alt='Carotte Assistant' />
            </Box>

            <Grid container direction='row' justifyContent='flex-end' alignItems='center'>

              {/*---------- BOUTON ET MODAL : MENTIONS LEGALES ----------*/}
              <Grid item xs={3}>
                <Button onClick={event => handleOpen(event, 'modalMentions')}>
                  <Typography component='div' variant="h4">Mentions légales</Typography>
                </Button>
                <Modal
                    open={open.modalMentions}
                    onClose={(event: React.MouseEvent<Element, MouseEvent>) => handleClose(event, 'modalMentions')}
                >
                  <Box sx={style}>
                    <Typography component='div' id="modal-modal-title" variant="h3">
                      Mentions légales
                    </Typography>
                    <Typography component='div' id="modal-modal-description" sx={{ mt: 2 }}>
                      Mentions légales ici
                    </Typography>
                  </Box>
                </Modal>
              </Grid>

              {/*---------- BOUTON ET MODAL : CREDITS ----------*/}
              <Grid item xs={2}>
                <Button onClick={event => handleOpen(event, 'modalCredits')}>
                  <Typography component='div' variant="h4">Crédits</Typography>
                </Button>
                <Modal
                    open={open.modalCredits}
                    onClose={(event: React.MouseEvent<Element, MouseEvent>) => handleClose(event, 'modalCredits')}
                >
                  <Box sx={style}>
                    <Typography component='div' id="modal-modal-title" variant="h3">Crédits</Typography>
                    <Grid container direction='column'>
                      <Typography component='div' variant='h3'>Notre équipe {'Doc\'Carrot'}</Typography>
                      <Grid item xs={5}>
                        <Image src='/viet.jpg' width='100%' height='100%' alt='Ormeli' />
                        <Typography component='div'>Quang Viet Nguyen</Typography>
                      </Grid>
                      <Grid item xs={5}>
                        <Image src='/guillaume.jpeg' width='100%' height='100%' alt='Ormeli' />
                        <Typography component='div'>Guillaume Vandenneucker</Typography>
                      </Grid>
                      <Grid item xs={5}>
                        <Image src='/maya.jpeg' width='100%' height='100%' alt='Ormeli' />
                        <Typography component='div'>Maya Gawinowski</Typography>
                      </Grid>
                      <Grid item xs={5}>
                        <Image src='/maxime.jpeg' width='100%' height='100%' alt='Ormeli' />
                        <Typography component='div'>Maxime Larroze</Typography>
                      </Grid>
                      <Grid item xs={5}>
                        <Image src='/brahim.jpeg' width='100%' height='100%' alt='Ormeli' />
                        <Typography component='div'>Brahim Hda</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Modal>
              </Grid>

              {/*---------- BOUTON ET MODAL : A PROPOS ----------*/}
              <Grid item xs={2}>
                <Button onClick={event => handleOpen(event, 'modalAbout')}>
                  <Typography component='div' variant="h4">A propos</Typography>
                </Button>
                <Modal
                    open={open.modalAbout}
                    onClose={(event: React.MouseEvent<Element, MouseEvent>) => handleClose(event, 'modalAbout')}
                >
                  <Box sx={style}>
                    <Typography component='div' id="modal-modal-title" variant="h3">
                      A propos
                    </Typography>
                    <Typography component='div' id="modal-modal-description" sx={{ mt: 2 }}>
                      Efrei Paris
                    </Typography>
                    <Typography component='div'>
                      Promotion 2024
                    </Typography>
                  </Box>
                </Modal>
              </Grid>

              {/*---------- BOUTON ET MODAL : TUTORIEL ----------*/}
              <Grid item xs={3} >
                <Button onClick={event => handleOpen(event, 'modalTutorial')}>
                  <Typography component='div' variant="h4">Tutoriel</Typography>
                </Button>
                <Modal
                    open={open.modalTutorial}
                    onClose={(event: React.MouseEvent<Element, MouseEvent>) => handleClose(event, 'modalTutorial')}
                >
                  <Box sx={style}>
                    <Typography component='div' id="modal-modal-title" variant="h3">
                      Besoin d&apos;aide ?
                    </Typography>
                    <Typography component='div' id="modal-modal-description" sx={{ mt: 2 }}>
                      Tutoriel ici
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
