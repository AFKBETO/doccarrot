import React from 'react'
import Image from 'next/image'
//import Link from 'next/link'
import {Modal, AppBar, Box, Typography, Button, Grid} from '@mui/material'
import {USER_CONTEXT} from "../config/userContext"
import CloseIcon from '@mui/icons-material/Close'
import useViewport from '../config/viewportHook'
import PolicyIcon from '@mui/icons-material/Policy'
import PeopleIcon from '@mui/icons-material/People'
import InfoIcon from '@mui/icons-material/Info'
import HelpIcon from '@mui/icons-material/Help'

const medSize = 900
const smallSize = 600

const style = (width: number) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: ((width > medSize) ? 500 : ((width > smallSize) ? '50%' : '70%')),
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  background: '#ABBD98',
  zIndex: 1500
})

const userTypeNames = ['patient', 'médecin', 'pharmacien']

function Footer() {
  const userContext = React.useContext(USER_CONTEXT)
  const { width, height } = useViewport()
  const smallSize = 600

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
        position : height > 500 ? 'sticky' : 'relative',
        bottom: '0vh',
        width: '100%'
      }}>
        <AppBar position='static'>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{position: 'relative'}}>
              <Image src='/lapin.png' width={ width > smallSize ?'100vw': '0'} height={ width > smallSize ?'100vh': '83vh'} alt='Docteur Lapin' />
            </Box>
            <Grid container direction='row' justifyContent='flex-end' alignItems='center'>
              {/*---------- BOUTON ET MODAL : MENTIONS LEGALES ----------*/}
              <Grid item xs={userContext.userId != null ? 3 : 4} textAlign='center'>
                <Button onClick={event => handleOpen(event, 'modalMentions')}>
                  <Typography component='div' variant="h4">
                    { width > smallSize ?
                        'Mentions légales'
                        : <PolicyIcon /> }
                  </Typography>
                </Button>
                <Modal
                    open={open.modalMentions}
                    onClose={(event: React.MouseEvent<Element, MouseEvent>) => handleClose(event, 'modalMentions')}
                >
                  <Box sx={style(width)}>

                    <div style={{ float: 'left' }}>
                      <Typography component='div' id="modal-modal-title" variant="h3">Mentions légales</Typography>
                    </div>
                    <div style={{ float: 'right' }}>
                      <Button size="small" onClick={ event => handleClose(event, 'modalMentions') }>
                        <CloseIcon></CloseIcon>
                      </Button>
                    </div>

                    <Grid container direction='column' sx={{ maxHeight: '70vh', overflow: 'auto' }}>
                      <Typography component='div' id="modal-modal-description" sx={{ mt: 2 }}>
                        <Typography variant="h5">Éditeurs</Typography>
                        <p style={{ textAlign: 'justify' }}>
                          Association Doc’carrot
                          <br />
                          Siège social : 13 allées de la Carotte
                          <br />
                          Standard : xx-xx-xx-xx-xx
                          <br />
                          Email : <u>doccarrot@gmail.com</u>
                        </p>

                        <Typography variant="h5" sx={{ mt: 2 }}>Droits d’auteur</Typography>
                        <p style={{ textAlign: 'justify' }}>
                          L’ensemble de ce site relève de la législation française et internationale sur le droit d’auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques. La reproduction de tout ou partie de ce site sur quelque support que ce soit est formellement interdite sauf autorisation préalable.
                        </p>

                        <Typography variant="h5" sx={{ mt: 2 }}>Exactitude de l’information</Typography>
                        <p style={{ textAlign: 'justify' }}>
                          Nous remercions tout utilisateur qui constaterait des inexactitudes, des informations erronées ou incomplètes d’en informer le responsable de la publication : Monsieur Carotte.
                        </p>

                      </Typography>
                    </Grid>
                  </Box>
                </Modal>
              </Grid>

              {/*---------- BOUTON ET MODAL : CREDITS ----------*/}
              <Grid item xs={userContext.userId != null ? 3 : 4} textAlign='center'>
                <Button onClick={event => handleOpen(event, 'modalCredits')}>
                  <Typography component='div' variant="h4">
                    { width > smallSize ?
                        'Crédits'
                        : <PeopleIcon />}
                  </Typography>
                </Button>
                <Modal
                    open={open.modalCredits}
                    onClose={(event: React.MouseEvent<Element, MouseEvent>) => handleClose(event, 'modalCredits')}
                >
                  <Box sx={style(width)}>

                    <div style={{ float: 'left' }}>
                      <Typography component='div' id="modal-modal-title" variant="h3">Crédits</Typography>
                    </div>
                    <div style={{ float: 'right' }}>
                      <Button size="small" onClick={ event => handleClose(event, 'modalCredits') }>
                        <CloseIcon />
                      </Button>
                    </div>

                    <Grid container sx={{ maxHeight: '70vh', overflow: 'auto' }}>
                      <Typography component='div' variant='h3'>{'Notre équipe Doc\'Carrot'}</Typography>
                      <Grid item xs={6}>
                        <Image src='/viet.jpg' width='100%' height='100%' alt='QVNguyen' />
                        <Typography component='div'>Quang Viet Nguyen</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Image src='/guillaume.jpeg' width='100%' height='100%' alt='GVandenneucker' />
                        <Typography component='div'>Guillaume Vandenneucker</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Image src='/maya.jpeg' width='100%' height='100%' alt='MGawinowski' />
                        <Typography component='div'>Maya Gawinowski</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Image src='/maxime.jpeg' width='100%' height='100%' alt='MLarroze' />
                        <Typography component='div'>Maxime Larroze</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Image src='/brahim.jpeg' width='100%' height='100%' alt='BHda' />
                        <Typography component='div'>Brahim Hda</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Modal>
              </Grid>

              {/*---------- BOUTON ET MODAL : A PROPOS ----------*/}
              <Grid item xs={userContext.userId  != null ? 3 : 4} textAlign='center'>
                <Button onClick={event => handleOpen(event, 'modalAbout')}>
                  <Typography component='div' variant="h4">
                    { width > smallSize ?
                        'A propos'
                        : <InfoIcon />}
                  </Typography>
                </Button>
                <Modal
                    open={open.modalAbout}
                    onClose={(event: React.MouseEvent<Element, MouseEvent>) => handleClose(event, 'modalAbout')}
                >
                  <Box sx={style(width)}>

                    <div style={{ float: 'left' }}>
                      <Typography component='div' id="modal-modal-title" variant="h3">A propos</Typography>
                    </div>
                    <div style={{ float: 'right' }}>
                      <Button size="small" onClick={ event => handleClose(event, 'modalAbout') }>
                        <CloseIcon></CloseIcon>
                      </Button>
                    </div>

                    <Grid container direction='column' sx={{ maxHeight: '70vh', overflow: 'auto' }}>
                      <Typography component='div' id="modal-modal-description" sx={{ mt: 2 }}>
                        Efrei Paris
                      </Typography>
                      <Typography component='div'>
                        Promotion 2024
                      </Typography>
                    </Grid>
                  </Box>
                </Modal>
              </Grid>

              {/*---------- BOUTON ET MODAL : TUTORIEL ----------*/}
              { userContext.userId  != null ?
                  <Grid item xs={3} textAlign='center' >
                    <Button onClick={event => handleOpen(event, 'modalTutorial')}>
                      <Typography component='div' variant="h4">
                        { width > smallSize ?
                            'Tutoriel'
                            : <HelpIcon />}
                      </Typography>
                    </Button>
                    <Modal
                        open={open.modalTutorial}
                        onClose={(event: React.MouseEvent<Element, MouseEvent>) => handleClose(event, 'modalTutorial')}
                    >
                      <Box sx={style(width)} textAlign='center' alignItems='center' justifyContent='center'>

                        <div style={{ float: 'left' }}>
                          <Typography component='div' id="modal-modal-title" variant="h3">Besoin d&apos;aide ?</Typography>
                        </div>
                        <div style={{ float: 'right' }}>
                          <Button size="small" onClick={ event => handleClose(event, 'modalTutorial') }>
                            <CloseIcon></CloseIcon>
                          </Button>
                        </div>

                        <Grid container direction='column' sx={{ maxHeight: '70vh', overflow: 'auto' }}>
                          <Typography component='div' id="modal-modal-description" sx={{ mt: 2 }}>
                            <Typography sx={{ mt: 2 }}>
                              Vous êtes sur le point de commencer le tutoriel ! Il va vous introduire à l&apos;utilisation de votre espace { userTypeNames[userContext.userType as number] }.
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                              Vous allez pouvoir suivre le Doc et son fidèle assistant &quot;carotte&quot;.
                            </Typography>
                            <Typography component='div' sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', mt: 2 }}>
                              <Image src='/lapin.png' width='100vw' height='100vh' alt='Docteur Lapin' />
                              <Button variant='contained' sx={{ bgcolor: 'primary.dark', marginTop: 5 }} focusRipple={false}>
                                <Typography sx={{ color: 'text.secondary' }}>Commencer</Typography>
                              </Button>
                              <Image src='/carotte_assistant.png' width='72vw' height='100vh' alt='Carotte Assistant' />
                            </Typography>
                          </Typography>
                        </Grid>
                      </Box>
                    </Modal>
                  </Grid>
                  : null
              }

            </Grid>
            { width > smallSize ?
                <Box sx={{position: 'relative'}}>
                  <Image src='/carotte_assistant.png' width='72vw' height='100vh' alt='Carotte Assistant' />
                </Box>
                : null
            }
          </Box>
        </AppBar>
      </Box>
  )
}

export default Footer
