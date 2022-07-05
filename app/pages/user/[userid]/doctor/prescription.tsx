import React from 'react'
import RouteGuard from '../../../../components/RouteGuard'
import { useRouter } from 'next/router'
import { UserType } from '../../../../config/types'
import { styled } from '@mui/material/styles'
import {
  Paper,
  Typography,
  IconButton,
  Grid,
  List, ListItem, MenuItem, Select, TextField
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import SendIcon from '@mui/icons-material/Send'
import RemoveIcon from "@mui/icons-material/Remove";
import {USER_CONTEXT} from "../../../../config/userContext";
import AddIcon from "@mui/icons-material/Add";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: 'black',
}))

interface PrescriptionMedication {
  index: number
  indexMedicationType: number
  quantity: number
}

function Prescription() {
  const router = useRouter()
  const { userid } = router.query

  const userContext = React.useContext(USER_CONTEXT)

  const [ medications, setMedications ] = React.useState<PrescriptionMedication[]>([])

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

  return (
      <RouteGuard userId={userid as string} userType={UserType.doctor}>
        <Grid container spacing={2} sx={{paddingLeft: 5, paddingRight:5, paddingBottom: 10}}>

          {/*---------- TITRE TOP ----------*/}
          <Grid item xs={10}>
            <Typography variant="h2">Création de prescription</Typography>
          </Grid>

          {/*---------- PARTIE GAUCHE/CENTRE : ESPACE EDITION ----------*/}
          <Grid item xs={11}>
            <Item sx={{background: '#ABBD98', borderRadius: 5, padding: 3}}>

              {/*---------- INFORMATIONS NOM MEDECIN, PATIENT, ... ----------*/}
              <Typography variant="h3">Généralités</Typography>
              <Grid container>
                <Grid>
                  <Typography>Nom Médecin</Typography>
                  <Typography>Date et adresse du jour</Typography>
                  <Typography>Nom Patient</Typography>
                </Grid>
                <Grid textAlign="right" sx={{paddingLeft: 5}}>
                </Grid>
                <Grid sx={{paddingLeft: 5}}>
                </Grid>
              </Grid>

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
                                   InputProps={{ inputProps: { min: 0, max: 10 } }}
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

            </Item>
          </Grid>

          {/*---------- PARTIE DROITE : BOUTONS D'ACTION ----------*/}
          <Grid item xs={1}>
            <Item sx={{background: '#ABBD98', borderRadius: 5}}>
              <Grid container spacing={2} direction='column'>
                <Grid item xs={1}>
                  <IconButton component="span" >
                    <EditIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={1}>
                  <IconButton component="span" >
                    <SendIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Item>
          </Grid>

        </Grid>
      </RouteGuard>
  )
}

export default Prescription
