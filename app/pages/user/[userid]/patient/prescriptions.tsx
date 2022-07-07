import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router'

import { PrescriptionData, SharedWithData, UserType } from '../../../../config/types'
import { USER_CONTEXT } from '../../../../config/userContext'
import { addSharingCode, getPharmacyByPublicId } from '../../../../config/api'
import useViewport from '../../../../config/viewportHook'
import RouteGuard from '../../../../components/RouteGuard'

import { styled } from '@mui/material/styles';
import {
  Typography, Box, Grid, Container,Paper, Modal,
  ListItem, ListItemText, List,
  FormControl, Select, MenuItem, TextField, Button, SelectChangeEvent, IconButton
} from '@mui/material'
import CloseIcon from "@mui/icons-material/Close"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import QrCodeIcon from '@mui/icons-material/QrCode'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import moment from 'moment'
import toast from "react-hot-toast"



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

const downloadPrescri = () => {
  alert('Téléchargement de la prescription')
}

const hidePrescri = () => {
  alert('Masquer la prescription')
}

const deletePrescri = () => {
  alert('Supprimer la prescription')
}

function makeid(length: number) {  // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  let result = '';
  const characters = '0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
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
  const [sharingSelectedPharmacyIndex, setSharingSelectedPharmacyIndex] = useState<string>('');
  const [sharingPharmacyID, setSharingPharmacyID] = useState<string>('');
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

  const selectOtherPharmacy = (event: SelectChangeEvent<string>) => {
    setSharingSelectedPharmacyIndex(event.target.value as string)
  }

  useEffect(() => {
    setSelectedPrescription(userContext.patientPrescriptions.find(p => p.idPrescription == selectedPrescription?.idPrescription))
  }, [userContext.patientPrescriptions]);

  const shareToPharmacy = async () => {
    let shareWithPharmacyId = null

    // find pharmacy to share with
    if (sharingPharmacyID !== '') {
      try {
        const pharmacy = await getPharmacyByPublicId(sharingPharmacyID);
        shareWithPharmacyId = pharmacy.idPharmacy
      } catch (error) {
        toast.error(`Aucune pharmacie n'a été trouvée avec l'ID ${sharingPharmacyID}.`)
        return
      }
    } else if (sharingSelectedPharmacyIndex !== '') {
      shareWithPharmacyId = userContext.patientPharmacies[parseInt(sharingSelectedPharmacyIndex)]?.idPharmacy
    }

    // close modal
    setOpenCreateModal(false)
    setSharingSelectedPharmacyIndex('')

    // generate code
    await addSharingCode(
        userContext.userId as string,
        selectedPrescription?.idPrescription as string,
        makeid(10),
        shareWithPharmacyId != null ? [{ idPharmacy: shareWithPharmacyId }] : []
    )

    // refresh user data
    userContext.refreshUserData()
  }

  return (
      <RouteGuard userId={userid as string} userType={UserType.patient}>
        <Grid container spacing={2} sx={{ paddingLeft: 5, paddingRight: 5, paddingBottom: 10 }}>

          {/*---------- TITRE TOP ----------*/}
          <Grid item xs={10}>
            <Typography variant="h2">Mes prescriptions</Typography>
          </Grid>

          {/*---------- PARTIE GAUCHE : HISTORIQUE DES PRESCRIPTIONS ----------*/}
          <Grid item xs={(width > medSize ? 4: 12)}>
            <Item sx={{ background: '#ABBD98', borderRadius: 5 }}>
              <Typography variant="h3" sx={{ textDecoration: 'underline' }}>Historique</Typography>

              <List sx={{ mb: 2, maxHeight: '100%', overflow: 'auto' }}>
                { userContext.patientPrescriptions.map((prescription) => (

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

                    {/*---------- SHARE PRESCRIPTION ----------*/}
                    <Grid item xs={(width > medSize ? 1: 3)}>
                      <IconButton component="span" onClick={ () => { if (selectedPrescription != null) setOpenCreateModal(true) } }>
                        <QrCodeIcon />
                      </IconButton>

                      <Modal open={openCreateModal} onClose={ () => setOpenCreateModal(false) }>
                        <Box sx={modalStyle}>

                          {/*---------- Titre modal et bouton de fermeture ----------*/}
                          <div style={{ float: 'left' }}>
                            <Typography id="modal-modal-title" variant="h3">Partager la prescription</Typography>
                          </div>
                          <div style={{ float: 'right' }}>
                            <Button size="small" onClick={ event => setOpenCreateModal(false) }>
                              <CloseIcon></CloseIcon>
                            </Button>
                          </div>

                          <Box id="modal-modal-description" sx={{ mt: 2 }} component="div">

                            {/*---------- ... WITH KNOWN PHARMACY ... ----------*/}
                            { userContext.patientPharmacies.length != 0 ?
                                <FormControl fullWidth>
                                  <Typography variant="h5" id="id-pharmacy-label">Partager directement avec votre pharmacie (optionnel)</Typography>
                                  <Typography variant="h6" id="id-pharmacy-label">Pratique : vous n&apos;aurez pas besoin d&apos;indiquer le code au pharmacien.</Typography>
                                  <Select id="select-pharmacy"
                                          value={ sharingSelectedPharmacyIndex }
                                          onChange={ event => selectOtherPharmacy(event) }
                                  >
                                    { userContext.patientPharmacies.map((pharmacy, idx) => (
                                        <MenuItem value={idx} key={idx}>{ pharmacy.name }</MenuItem>
                                    )) }
                                  </Select>
                                </FormControl>
                                : <></>
                            }

                            {/*---------- ... WITH NEW PHARMACY ... ----------*/}
                            <FormControl fullWidth sx={{ marginTop: 5 }}>
                              <Typography variant="h5" id="id-pharmacy-label">Partager directement avec une nouvelle pharmacie (optionnel)</Typography>
                              <Typography variant="h6" id="id-pharmacy-label">Pour vous faciliter la tâche, demandez le code pharmacie à votre pharmacien. Dans le futur, vous pourrez directement partager vos prescriptions à cette pharmacie.</Typography>
                              <TextField id="id-pharmacy" variant="outlined"
                                         value={sharingPharmacyID}
                                         onChange={ event => setSharingPharmacyID(event.target.value) }
                              />
                            </FormControl>

                            {/*---------- ... VALIDATE BUTTON ... ----------*/}
                            <FormControl fullWidth>
                              <Button variant='contained' sx={{ bgcolor: 'primary.dark', marginTop: 5 }} focusRipple={false} onClick={ shareToPharmacy }>
                                <Typography sx={{ color: 'text.secondary' }}>Partager</Typography>
                              </Button>
                            </FormControl>

                          </Box>
                        </Box>
                      </Modal>
                    </Grid>

                    {/*---------- DOWNLOAD PRESCRIPTION ----------*/}
                    <Grid item xs={(width > medSize ? 1: 3)}>
                      <IconButton component="span" onClick={downloadPrescri}>
                        <FileDownloadIcon />
                      </IconButton>
                    </Grid>

                    {/*---------- HIDE PRESCRIPTION ----------*/}
                    <Grid item xs={(width > medSize ? 1: 3)}>
                      <IconButton component="span" onClick={hidePrescri}>
                        <VisibilityOffIcon />
                      </IconButton>
                    </Grid>

                    {/*---------- DELETE PRESCRIPTION ----------*/}
                    <Grid item xs={(width > medSize ? 1: 3)}>
                      <IconButton component="span" onClick={deletePrescri}>
                        <DeleteIcon />
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
