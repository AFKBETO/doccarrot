import React, { useState} from 'react'
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
  Box, Modal, FormControl, Select, MenuItem, TextField, Button,
} from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {MedicationData, UserData, UserType} from "../../../../config/types";
import { USER_CONTEXT } from "../../../../config/userContext";
import {addPrescription, getUserByPublicID} from "../../../../config/api";
import toast from "react-hot-toast";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import moment from "moment";
import useViewport from '../../../../config/viewportHook';
import CloseIcon from "@mui/icons-material/Close";

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

interface PrescriptionMedication {
  index: number
  indexMedicationType: number
  quantity: number
}

function Prescriptions() {
  const router = useRouter()
  const { userid } = router.query
  const userContext = React.useContext(USER_CONTEXT)
  const { width } = useViewport()
  const medSize = 900

  const [selectedPatient, setSelectedPatient] = useState<UserData | null>(null);
  const [newPatientPublicID, setNewPatientPublicID] = useState<string>('');
  const [openPatientModal, setOpenPatientModal] = useState<boolean>(false);

  const [medications, setMedications] = React.useState<PrescriptionMedication[]>([])
  const [location, setLocation] = React.useState<string>('')
  const [signature, setSignature] = React.useState<string>('')
  const [maxUses, setMaxUses] = React.useState<number>(1)

  const selectPatientFromNewID = async () => {
    if (newPatientPublicID != '') {
      try {
        const patientData = await getUserByPublicID(newPatientPublicID)
        if (userContext.doctorPatients.find(p => p.publicID == newPatientPublicID)) {
          toast.error(`Le patient au numéro ${newPatientPublicID} est déjà dans votre système.`)
          return
        }
        setOpenPatientModal(false)
        setSelectedPatient({
          idUser: patientData.idUser,
          publicID: patientData.publicID,
          firstName: patientData.firstName,
          lastName: patientData.lastName,
          userType: patientData.userType
        })
      } catch (error) {
        toast.error(`Aucun patient n'a été trouvé avec le numéro ${newPatientPublicID}.`)
      }
    }
  }

  const addMedication = () => {
    const meds = [...medications]
    meds.push({
      index: medications.length + 1,
      indexMedicationType: 0,
      quantity: 1
    })
    setMedications(meds)
  }

  const updateMedicationType = (medication: PrescriptionMedication, indexMedicationType: number) => {
    const meds = [...medications]
    medication.indexMedicationType = indexMedicationType
    meds[meds.indexOf(medication)] = medication
    setMedications(meds)
  }

  const updateMedicationQuantity = (medication: PrescriptionMedication, quantity: number) => {
    const meds = [...medications]
    medication.quantity = quantity
    meds[meds.indexOf(medication)] = medication
    setMedications(meds)
  }

  const removeMedication = (index: number) => {
    const meds = medications.filter(m => m.index != index)
    let idx = 0
    for (const med of meds) {
      med.index = ++idx
    }
    setMedications(meds)
  }

  const sendPrescription = async () => {
    try {
      await addPrescription(
        selectedPatient!.idUser,
        userContext.userId as string,
        moment().valueOf(),
        location,
        signature,
        maxUses,
        medications.map(m => {
          const med: MedicationData = {
            idMedication: '' + m.index,
            idMedicationType: userContext.doctorMedicationTypes[m.indexMedicationType].idMedicationType,
            quantity: m.quantity
          }
          return med
        })
      )
      setOpenPatientModal(false)
      toast.success(`La prescription a été créée.`)
      setSelectedPatient(null)
      userContext.refreshUserData()
    } catch (error) {
      console.log(error)
      toast.error(`Une erreur a empêché de créer la prescription.`)
    }
  }

  return (
      <RouteGuard userId={userid as string} userType={UserType.doctor}>
        <Grid container spacing={2} sx={{ paddingLeft: 5, paddingRight: 5, paddingBottom: 10 }}>

          {/*---------- TITRE TOP ----------*/}
          <Grid item xs={10}>
            <Typography variant="h2">Mes prescriptions</Typography>
          </Grid>

          {/*---------- PARTIE GAUCHE : LISTE DES PATIENTS ----------*/}
          <Grid item xs={(width > medSize ? 4: 12)}>
            <Item sx={{ background: '#ABBD98', borderRadius: 5 }}>
              <Typography variant="h3" sx={{ textDecoration: 'underline' }}>Mes patients</Typography>

              {/*---------- Liste de patients ----------*/}
              <List sx={{ mb: 2, maxHeight: '100%', overflow: 'auto' }}>
                { userContext.doctorPatients.map((patient) => (
                    <React.Fragment key={patient.idUser}>
                      <ListItem button onClick={() => setSelectedPatient(patient) }>
                        <ListItemText
                            primary={ patient.firstName + " " + patient.lastName }
                        />
                        <IconButton component="span"><RemoveRedEyeIcon /></IconButton>
                      </ListItem>
                    </React.Fragment>
                )) }
              </List>

              {/*---------- Bouton d'ajout pour un nouveau patient ----------*/}
              <IconButton component="span" onClick={ () => setOpenPatientModal(true) }>
                <AddIcon />
              </IconButton>

              <Modal open={openPatientModal} onClose={ () => setOpenPatientModal(false) }>
                <Box sx={modalStyle}>

                  {/*---------- Titre modal et bouton de fermeture ----------*/}
                  <div style={{ float: 'left' }}>
                    <Typography id="modal-modal-title" variant="h3">Nouveau patient</Typography>
                  </div>
                  <div style={{ float: 'right' }}>
                    <Button size="small" onClick={ event => setOpenPatientModal(false) }>
                      <CloseIcon></CloseIcon>
                    </Button>
                  </div>

                  <Box id="modal-modal-description" sx={{ mt: 2 }} component="div">

                    {/*---------- Entrer le code ----------*/}
                    <FormControl fullWidth sx={{ marginTop: 5 }}>
                      <Typography variant="h5" id="id-pharmacy-label">Numéro du patient</Typography>
                      <Typography variant="h6" id="id-pharmacy-label">Demandez à votre patient son numéro dans le système.</Typography>
                      <TextField id="id-pharmacy" variant="outlined"
                                 value={newPatientPublicID}
                                 onChange={ event => setNewPatientPublicID(event.target.value) }
                      />
                    </FormControl>

                    {/*---------- Valider ----------*/}
                    <FormControl fullWidth>
                      <Button variant='contained' sx={{ bgcolor: 'primary.dark', marginTop: 5 }} focusRipple={false} onClick={ selectPatientFromNewID }>
                        <Typography sx={{ color: 'text.secondary' }}>Rédiger une prescription</Typography>
                      </Button>
                    </FormControl>

                  </Box>
                </Box>
              </Modal>

            </Item>
          </Grid>

          {/*---------- PARTIE CENTRE : ESPACE EDITION ----------*/}
          <Grid item xs={(width > medSize ? 7: 12)}>
            <Item sx={{ background: '#ABBD98', borderRadius: 5 }}>

              <Typography variant='h3' sx={{ textDecoration: 'underline' }}>Nouvelle prescription</Typography>

              { selectedPatient ?
                  <>

                    {/*---------- INFORMATIONS NOM MEDECIN, PATIENT, ... ----------*/}
                    <Container sx={{ margin: 2, textAlign: 'left' }}>

                      {/*---------- INFORMATIONS GENERALES ----------*/}
                      <Typography variant="h3" sx={{ marginBottom: 2 }}>Généralités</Typography>
                      <Box sx={prescriptionPropsStyle}>
                        <Typography variant='h4'>Médecin : </Typography>
                        <Typography variant='h5'>&nbsp;{ userContext.userName }</Typography>
                      </Box>
                      <Box sx={prescriptionPropsStyle}>
                        <Typography variant='h4'>Patient : </Typography>
                        <Typography variant='h5'>&nbsp;{ selectedPatient.firstName } { selectedPatient.lastName }</Typography>
                      </Box>
                      <Box sx={prescriptionPropsStyle}>
                        <Typography variant='h4'>Lieu : </Typography>
                        <TextField id="location" type="text" variant="outlined" sx={{marginLeft: 1}}
                                   value={ location }
                                   onChange={ event => setLocation(event.target.value) }
                        />
                      </Box>
                      <Box sx={prescriptionPropsStyle}>
                        <Typography variant='h4'>Nombre d&apos;utilisations : </Typography>
                        <TextField id="quantity" type="number" variant="outlined" sx={{marginLeft: 1}}
                                   InputProps={{ inputProps: { min: 1} }}
                                   value={ maxUses }
                                   onChange={ event => setMaxUses(parseInt(event.target.value)) }
                        />
                      </Box>

                      {/*---------- MEDICAMENTS : LISTE ----------*/}
                      <Typography variant="h3" sx={{marginTop: 3}}>Médicaments</Typography>
                      <List sx={{ maxHeight: '100%', overflow: 'auto' }}>
                        { medications.map((medication) => (
                            <React.Fragment key={ medication.index }>
                              <ListItem>
                                {/*---------- Type de médicament ----------*/}
                                <Select id="select-type"
                                        value={ medication.indexMedicationType }
                                        onChange={ event => updateMedicationType(medication, event.target.value as number) }
                                >
                                  { userContext.doctorMedicationTypes.map((medicationType, idx) => (
                                      <MenuItem value={idx} key={idx}>{ medicationType.name }</MenuItem>
                                  )) }
                                </Select>

                                {/*---------- Quantité du médicament ----------*/}
                                <TextField id="quantity" type="number" variant="outlined" label="Quantité" sx={{marginLeft: 1}}
                                           InputProps={{ inputProps: { min: 0 } }}
                                           value={ medication.quantity }
                                           onChange={ event => updateMedicationQuantity(medication, parseInt(event.target.value)) }
                                />

                                {/*---------- Icône de suppression ----------*/}
                                <IconButton component="span" onClick={ () => removeMedication(medication.index) }>
                                  <RemoveIcon />
                                </IconButton>
                              </ListItem>
                            </React.Fragment>
                        )) }
                      </List>

                      {/*---------- MEDICAMENTS : AJOUT ----------*/}
                      <IconButton component="span" onClick={ () => addMedication() }>
                        <AddIcon />
                      </IconButton>

                      {/*---------- SIGNATURE ----------*/}
                      <Typography variant="h3" sx={{marginTop: 3}}>Signature</Typography>
                      <Box sx={prescriptionPropsStyle}>
                        <TextField id="location" type="text" variant="outlined" sx={{marginLeft: 1}}
                                   value={ signature }
                                   onChange={ event => setSignature(event.target.value) }
                        />
                      </Box>

                    </Container>
                  </>
                  :
                  <>
                    <Container sx={{ margin: 2 }}>
                      Cliquez sur une patient pour rédiger une prescription.
                    </Container>
                  </>
              }

            </Item>
          </Grid>

          {/*---------- PARTIE DROITE : BOUTONS D'ACTION ----------*/}
          <Grid item xs={(width > medSize ? 1: 12)}>
            { selectedPatient ?

                <Item sx={{background: '#ABBD98', borderRadius: 5}}>
                  <Grid container spacing={2} direction={(width > medSize ? 'column': 'row')}>

                    {/*---------- SEND PRESCRIPTION ----------*/}
                    <Grid item xs={(width > medSize ? 1: 12)}>
                      <IconButton component="span" onClick={ () => sendPrescription() }>
                        <SendIcon />
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
