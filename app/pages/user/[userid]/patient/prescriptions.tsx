import React, {useEffect, useState} from 'react'
import RouteGuard from '../../../../components/RouteGuard'
import { useRouter } from 'next/router'
import { styled } from '@mui/material/styles';
import {
  Paper,
  Typography,
  Grid,
  ListItem,
  ListItemText,
  List,
  IconButton,
  Container,
  Box,
  Modal,
  FormControl, Select, MenuItem, InputLabel, TextField, Button
} from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import QrCodeIcon from '@mui/icons-material/QrCode';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import moment from "moment";
import {PharmacyData, PrescriptionData, SharedWithData, UserType} from "../../../../config/types";
import { USER_CONTEXT } from "../../../../config/userContext";
import {addSharingCode, getPharmacyByPublicId} from "../../../../config/api";
import toast from "react-hot-toast";

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
  width: 400,
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

  const [selectedPrescription, setSelectedPrescription] = useState<PrescriptionData | null | undefined>(null);
  const [sharingSelectedPharmacy, setSharingSelectedPharmacy] = useState<PharmacyData | null>(null);
  const [sharingPharmacyID, setSharingPharmacyID] = useState<string>('');
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

  useEffect(() => {
    setSelectedPrescription(userContext.patientPrescriptions.find(p => p.idPrescription == selectedPrescription?.idPrescription))
  }, [userContext.patientPrescriptions]);

  const shareToPharmacy = async () => {
    let shareWithPharmacyId = null

    // find pharmacy to share with
    if (sharingPharmacyID != null) {
      try {
        const pharmacy = await getPharmacyByPublicId(sharingPharmacyID);
        shareWithPharmacyId = pharmacy.idPharmacy
      } catch (error) {
        toast.error(`Aucune pharmacie n'a été trouvée avec l'ID ${sharingPharmacyID}.`)
        return
      }
    } else if (sharingSelectedPharmacy) {
      shareWithPharmacyId = sharingSelectedPharmacy.idPharmacy
    }

    // close modal
    setOpenCreateModal(false)

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
          <Grid item xs={4}>
            <Item sx={{ background: '#ABBD98', borderRadius: 5 }}>
              <Typography variant="h3" sx={{ textDecoration: 'underline' }}>Historique</Typography>

              <List sx={{ mb: 2, maxHeight: '100%', overflow: 'auto' }}>
                { userContext.patientPrescriptions.map((prescription) => (

                    /*---------- Une prescription dans la liste de gauche ----------*/
                    <React.Fragment key={prescription.idPrescription}>
                      <ListItem button onClick={() => setSelectedPrescription(prescription) }>
                        <ListItemText
                            primary={ moment(prescription.date.seconds * 1000).format("[Le] DD/MM/YYYY [à] HH:mm") }
                            secondary={ prescription.location }
                        />
                        <IconButton component="span"><RemoveRedEyeIcon /></IconButton>
                      </ListItem>
                    </React.Fragment>

                )) }
              </List>
            </Item>
          </Grid>

          {/*---------- PARTIE CENTRE : PRESCRIPTION ACTIVE ----------*/}
          <Grid item xs={7}>
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
                        <Typography variant='h5'>&nbsp;{ moment(selectedPrescription.date.seconds * 1000).format("[le] DD/MM/YYYY [à] HH:mm") }</Typography>
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
          <Grid item xs={1}>
            { selectedPrescription ?

                <Item sx={{background: '#ABBD98', borderRadius: 5}}>
                  <Grid container spacing={2} direction='column'>

                    {/*---------- SHARE PRESCRIPTION ----------*/}
                    <Grid item xs={1}>
                      <IconButton component="span" onClick={ () => { if (selectedPrescription != null) setOpenCreateModal(true) } }>
                        <QrCodeIcon />
                      </IconButton>
                      <Modal open={openCreateModal} onClose={ () => setOpenCreateModal(false) }>
                        <Box sx={modalStyle}>
                          <Typography id="modal-modal-title" variant="h3">Partager la prescription</Typography>
                          <Typography id="modal-modal-description" sx={{ mt: 2 }} component="div">

                            <FormControl fullWidth>
                            </FormControl>

                            {/*---------- ... WITH KNOWN PHARMACY ... ----------*/}
                            { userContext.patientPharmacies.length != 0 ?
                                <>
                                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                  <Select labelId="select-pharmacy-label" id="select-pharmacy" label="Avec votre pharmacie"
                                          value={ 0 }
                                          onChange={ event => setSharingSelectedPharmacy(userContext.patientPharmacies[event.target.value as number]) }
                                  >
                                    { userContext.patientPharmacies.map((pharmacy, idx) => (
                                        <MenuItem value={idx} key={idx}>{ pharmacy.name }</MenuItem>
                                    )) }
                                  </Select>
                                </>
                                : <></>
                            }

                            {/*---------- ... WITH NEW PHARMACY ... ----------*/}
                            <TextField id="id-pharmacy" label="Avec une nouvelle pharmacie" variant="outlined"
                                       value={sharingPharmacyID}
                                       onChange={ event => setSharingPharmacyID(event.target.value) }
                            />

                            {/*---------- ... VALIDATE BUTTON ... ----------*/}
                            <Button variant='contained' sx={{ bgcolor: 'primary.dark', marginTop: 5 }} focusRipple={false} onClick={ shareToPharmacy }>
                              <Typography sx={{ color: 'text.primary' }}>Générer code de partage</Typography>
                            </Button>

                          </Typography>
                        </Box>
                      </Modal>
                    </Grid>

                    {/*---------- DOWNLOAD PRESCRIPTION ----------*/}
                    <Grid item xs={1}>
                      <IconButton component="span" onClick={downloadPrescri}>
                        <FileDownloadIcon />
                      </IconButton>
                    </Grid>

                    {/*---------- HIDE PRESCRIPTION ----------*/}
                    <Grid item xs={1}>
                      <IconButton component="span" onClick={hidePrescri}>
                        <VisibilityOffIcon />
                      </IconButton>
                    </Grid>

                    {/*---------- DELETE PRESCRIPTION ----------*/}
                    <Grid item xs={1}>
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
