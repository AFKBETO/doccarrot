import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router'

import {
  addSharingCode,
  addSharingCodeSharedWith,
  getPharmacyById,
  getPharmacyByPublicId,
  getSharingCodeByPublicID, setPrescriptionUses
} from '../../../../config/api'
import useViewport from '../../../../config/viewportHook'
import { PrescriptionData, SharedWithData, UserType} from '../../../../config/types'
import { USER_CONTEXT } from '../../../../config/userContext'
import RouteGuard from '../../../../components/RouteGuard'

import { styled } from '@mui/material/styles'
import {
  Paper, Typography, Grid, Container, Box, Modal,
  ListItem, ListItemText, List,
  IconButton, FormControl, TextField, Button,
} from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import AddTaskIcon from '@mui/icons-material/AddTask'
import QrCodeIcon from '@mui/icons-material/QrCode'
import CloseIcon from '@mui/icons-material/Close'

import moment from 'moment'
import toast from 'react-hot-toast'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'black',
}))

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  background: '#ABBD98'
}

const prescriptionPropsStyle = {
  display: 'flex',
  flexDirection: 'row',
  marginBottom: 1
}

function describeSharedWith(sharedWith: SharedWithData[]) {
  if (sharedWith.length == 0) return "non partagé"
  let shared = "partagé avec "
  for (let i = 0; i < sharedWith.length; ++i) {
    shared += sharedWith[i].pharmacyName != null ? sharedWith[i].pharmacyName : (sharedWith[i].doctorFirstName + ' ' + sharedWith[i].doctorLastName)
    if (i + 1 < sharedWith.length) shared += ", "
  }
  return shared
}

function Prescriptions() {
  const router = useRouter()
  const { userid } = router.query
  const userContext = React.useContext(USER_CONTEXT)
  const { width } = useViewport()
  const medSize = 900

  const [selectedPrescription, setSelectedPrescription] = useState<PrescriptionData | null | undefined>(null);
  const [sharingCodeID, setSharingCodeID] = useState<string>('');
  const [openScanModal, setOpenScanModal] = useState<boolean>(false);

  useEffect(() => {
    setSelectedPrescription(userContext.pharmacistPrescriptions.find(p => p.idPrescription == selectedPrescription?.idPrescription))
  }, [userContext.pharmacistPrescriptions]);

  const usePrescription = async () => {
    if (selectedPrescription!.currentUses < selectedPrescription!.maxUses) {
      await setPrescriptionUses(selectedPrescription!.idPrescription, selectedPrescription!.currentUses + 1)
      userContext.refreshUserData()
      if (selectedPrescription!.currentUses + 1 < selectedPrescription!.maxUses) {
        toast.success(`Vous avez ajouté une utilisation à cette prescription.`)
      } else {
        toast.success(`Vous avez marqué cette prescription comme utilisée.`)
      }
    } else {
      toast.error(`Cette prescription ne peut plus être utilisée.`)
    }
  }

  const shareWithMyPharmacy = async () => {
    if (sharingCodeID != '') {
      try {
        const sharingCode = await getSharingCodeByPublicID(sharingCodeID);

        // make sure it's not already known by us
        if (userContext.pharmacistPrescriptions.find(p => p.idPrescription == sharingCode.idPrescription)) {
          toast.error(`La prescription associée au code de partage ${sharingCodeID} est déjà dans votre système.`)
          return
        }

        // close modal
        setOpenScanModal(false)

        // add shared with
        await addSharingCodeSharedWith(
            sharingCode.idSharingCode,
            [{ idPharmacy: userContext.pharmacistPharmacyId }]
        )

        // refresh user data
        userContext.refreshUserData()
      } catch (error) {
        toast.error(`Aucune prescription n'a été trouvée avec le code de partage ${sharingCodeID}.`)
      }
    }
  }

  return (
      <RouteGuard userId={userid as string} userType={UserType.pharmacist}>
        <Grid container spacing={2} sx={{ paddingLeft: 5, paddingRight: 5, paddingBottom: 10 }}>

          {/*---------- TITRE TOP ----------*/}
          <Grid item xs={10}>
            <Typography variant="h2">Mes prescriptions</Typography>
          </Grid>

          {/*---------- PARTIE GAUCHE : LISTE DES PRESCRIPTIONS ----------*/}
          <Grid item xs={(width > medSize ? 4: 12)}>
            <Item sx={{ background: '#ABBD98', borderRadius: 5 }}>
              <Typography variant="h3" sx={{ textDecoration: 'underline' }}>Prescriptions partagées</Typography>

              {/*---------- Liste de prescriptions ----------*/}
              <List sx={{ mb: 2, maxHeight: '100%', overflow: 'auto' }}>
                { userContext.pharmacistPrescriptions.map((prescription) => (

                    /*---------- Une prescription dans la liste de gauche ----------*/
                    <React.Fragment key={prescription.idPrescription}>
                      <ListItem button onClick={() => setSelectedPrescription(prescription) }>
                        <ListItemText
                            primary={ "Prescription pour " + prescription.patientFirstName + " " + prescription.patientLastName }
                            secondary={ "Par Dr. " + prescription.doctorLastName + " " + moment(prescription.date).format("[le] DD/MM/YYYY [à] HH:mm") }
                        />
                        <IconButton component="span"><RemoveRedEyeIcon /></IconButton>
                      </ListItem>
                    </React.Fragment>

                )) }
              </List>

              {/*---------- Bouton de scan ----------*/}
              <IconButton component="span" onClick={ () => setOpenScanModal(true) }>
                <QrCodeIcon />
              </IconButton>

              <Modal open={openScanModal} onClose={ () => setOpenScanModal(false) }>
                <Box sx={modalStyle}>

                  {/*---------- Titre modal et bouton de fermeture ----------*/}
                  <div style={{ float: 'left' }}>
                    <Typography id="modal-modal-title" variant="h3">Récupérer une prescription</Typography>
                  </div>
                  <div style={{ float: 'right' }}>
                    <Button size="small" onClick={ event => setOpenScanModal(false) }>
                      <CloseIcon></CloseIcon>
                    </Button>
                  </div>

                  <Box id="modal-modal-description" sx={{ mt: 2 }} component="div">
                    {/*---------- Entrer le code ----------*/}
                    <FormControl fullWidth sx={{ marginTop: 5 }}>
                      <Typography variant="h5" id="id-pharmacy-label">Code de la prescription</Typography>
                      <Typography variant="h6" id="id-pharmacy-label">Demandez un code de partage à votre client.</Typography>
                      <TextField id="id-pharmacy" variant="outlined"
                                 value={sharingCodeID}
                                 onChange={ event => setSharingCodeID(event.target.value) }
                      />
                    </FormControl>

                    {/*---------- Valider ----------*/}
                    <FormControl fullWidth>
                      <Button variant='contained' sx={{ bgcolor: 'primary.dark', marginTop: 5 }} focusRipple={false} onClick={ shareWithMyPharmacy }>
                        <Typography sx={{ color: 'text.secondary' }}>Récuperer la prescription</Typography>
                      </Button>
                    </FormControl>

                  </Box>
                </Box>
              </Modal>
            </Item>
          </Grid>

          {/*---------- PARTIE CENTRE : PRESCRIPTION ACTIVE ----------*/}
          <Grid item xs={(width > medSize ? 7: 12)}>
            <Item sx={{background: '#ABBD98', borderRadius: 5}}>

              <Typography variant='h3' sx={{ textDecoration: 'underline' }}>Détails de la prescription</Typography>

              { selectedPrescription ?
                  <>
                    <Container sx={{ margin: 2, textAlign: 'left' }}>
                      {/*---------- INFORMATIONS GENERALES ----------*/}
                      <Box sx={prescriptionPropsStyle}>
                        <Typography variant='h4'>Rédigée par : </Typography>
                        <Typography variant='h5'>&nbsp;{ selectedPrescription.doctorFirstName } { selectedPrescription.doctorLastName }</Typography>
                      </Box>
                      <Box sx={prescriptionPropsStyle}>
                        <Typography variant='h4'>Date : </Typography>
                        <Typography variant='h5'>&nbsp;{ moment(selectedPrescription.date).format("[le] DD/MM/YYYY [à] HH:mm") }</Typography>
                      </Box>
                      <Box sx={prescriptionPropsStyle}>
                        <Typography variant='h4'>Lieu : </Typography>
                        <Typography variant='h5'>&nbsp;{ selectedPrescription.location }</Typography>
                      </Box>
                      <Box sx={prescriptionPropsStyle}>
                        <Typography variant='h4'>Utilisations : </Typography>
                        <Typography variant='h5'>&nbsp;{ selectedPrescription.currentUses } / { selectedPrescription.maxUses }</Typography>
                      </Box>
                      <Box sx={{ marginBottom: 2 }}>
                        <Typography variant='h4'>Liste de médicaments : </Typography>
                        { selectedPrescription.medications.map(medication => (
                            <React.Fragment key={medication.idMedication}>
                              <Typography variant='h5'>- { medication.name } x{ medication.quantity }</Typography>
                            </React.Fragment>
                        )) }
                      </Box>
                      { selectedPrescription.sharingCodes.length != 0 ?
                          <Box>
                            <Typography variant='h4'>Codes de partage : </Typography>
                            { selectedPrescription.sharingCodes.map(sharingCode => (
                                <React.Fragment key={sharingCode.idSharingCode}>
                                  <Typography variant='h5' component='div'>- { sharingCode.code }, {describeSharedWith(sharingCode.sharedWith)}</Typography>
                                </React.Fragment>
                            )) }
                          </Box>
                          : <></>
                      }
                    </Container>
                  </>
                  :
                  <>
                    <Container sx={{ margin: 2 }}>
                      Cliquez sur une prescription pour en voir les détails.
                    </Container>
                  </>
              }

            </Item>
          </Grid>

          {/*---------- PARTIE DROITE : BOUTONS D'ACTION ----------*/}
          <Grid item xs={(width > medSize ? 1: 12)}>
            { selectedPrescription ?

                <Item sx={{background: '#ABBD98', borderRadius: 5}}>
                  <Grid container spacing={2} direction={(width > medSize ? 'column': 'row')}>

                    {/*---------- USE PRESCRIPTION ----------*/}
                    <Grid item xs={(width > medSize ? 1: 12)}>
                      <IconButton component="span" onClick={usePrescription}>
                        <AddTaskIcon />
                      </IconButton>
                    </Grid>

                  </Grid>
                </Item>
                : <></>
            }
          </Grid>
        </Grid>
      </RouteGuard>
  )
}

export default Prescriptions
