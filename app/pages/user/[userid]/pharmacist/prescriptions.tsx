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
  FormControl, Select, MenuItem, InputLabel, OutlinedInput, TextField, Button
} from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import QrCodeIcon from '@mui/icons-material/QrCode';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import moment from "moment";
import {PharmacyData, PrescriptionData, SharedWithData, UserType} from "../../../../config/types";
import { USER_CONTEXT } from "../../../../config/userContext";
import {
  addSharingCode,
  addSharingCodeSharedWith,
  getPharmacyById,
  getPharmacyByPublicId,
  getSharingCodeByPublicID
} from "../../../../config/api";
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

function makeid(length: number) {  // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  let result = '';
  let characters = '0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function describeSharedWith(sharedWith: SharedWithData[]) {
  if (sharedWith.length == 0) return "non partagé"
  let shared = "partagé avec "
  for (let i = 0; i < sharedWith.length; ++i) {
    shared += sharedWith[i].pharmacyName || (sharedWith[i].doctorFirstName + ' ' + sharedWith[i].doctorLastName)
    if (i + 1 < sharedWith.length) shared += ", "
  }
  return shared
}

function Prescriptions() {
  const router = useRouter()
  const { userid } = router.query
  const userContext = React.useContext(USER_CONTEXT)

  const [selectedPrescription, setSelectedPrescription] = useState<PrescriptionData | null | undefined>(null);
  const [sharingCodeID, setSharingCodeID] = useState<string>('');
  const [openScanModal, setOpenScanModal] = useState<boolean>(false);

  useEffect(() => {
    setSelectedPrescription(userContext.pharmacistPrescriptions.find(p => p.idPrescription == selectedPrescription?.idPrescription))
  }, [userContext.pharmacistPrescriptions]);

  const shareWithMyPharmacy = async () => {
    if (sharingCodeID) {
      try {
        const sharingCode = await getSharingCodeByPublicID(sharingCodeID);

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
        toast.error(`Aucune prescription n'a été trouvé avec le code ${sharingCodeID}.`)
      }
    }
  }

  const usePrescription = async () => {
    alert('Use prescription')
  }

  return (
      <RouteGuard userId={userid as string} userType={UserType.pharmacist}>
        <Grid container spacing={2} sx={{ paddingLeft: 5, paddingRight: 5, paddingBottom: 10 }}>

          {/*---------- TITRE TOP ----------*/}
          <Grid item xs={10}>
            <Typography variant="h2">Mes prescriptions</Typography>
          </Grid>

          {/*---------- PARTIE GAUCHE : LISTE DES PRESCRIPTIONS ----------*/}
          <Grid item xs={4}>
            <Item sx={{ background: '#ABBD98', borderRadius: 5 }}>
              <Typography variant="h3" sx={{ textDecoration: 'underline' }}>Prescriptions partagées</Typography>

              <List sx={{ mb: 2, maxHeight: '100%', overflow: 'auto' }}>
                { userContext.pharmacistPrescriptions.map((prescription) => (

                    /*---------- Une prescription dans la liste de gauche ----------*/
                    <React.Fragment key={prescription.idPrescription}>
                      <ListItem button onClick={() => setSelectedPrescription(prescription) }>
                        <ListItemText
                            primary={ "Prescription pour " + prescription.patientFirstName + " " + prescription.patientLastName }
                            secondary={ "Par Dr. " + prescription.doctorLastName + " " + moment(prescription.date.seconds * 1000).format("[le] DD/MM/YYYY [à] HH:mm") }
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

                    {/*---------- USE PRESCRIPTION ----------*/}
                    <Grid item xs={1}>
                      <IconButton component="span" onClick={usePrescription}>
                        <FileDownloadIcon />
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
