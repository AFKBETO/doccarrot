import React, {useState} from 'react'
import RouteGuard from '../../../../components/RouteGuard'
import { useRouter } from 'next/router'
import { styled } from '@mui/material/styles';
import {Paper, Typography, Grid, ListItem, ListItemText, List, IconButton, Container} from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import QrCodeIcon from '@mui/icons-material/QrCode';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useUserData} from "../../../../config/userDataHooks";
import {usePrescriptions} from "../../../../config/prescriptionsHooks";
import moment from "moment";
import {PrescriptionData} from "../../../../config/types";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'black',
}))

const downloadPrescri = () => {
  console.log("download")
}

const generateQRCode = () => {
  console.log("QRCode")
}

const hidePrescri = () => {
  console.log("hide")
}

const deletePrescri = () => {
  console.log("delete")
}

function Prescriptions() {
  const router = useRouter()
  const { userid } = router.query

  const { userId } = useUserData()
  const { prescriptions } = usePrescriptions(userId)

  const [ selectedPrescription, setSelectedPrescription ] = useState<PrescriptionData | null>(null);

  return (
    <RouteGuard userId={userid as string}>

      <Grid container spacing={2} sx={{ paddingLeft: 5, paddingRight: 5, paddingBottom: 10 }}>

        {/*---------- TITRE TOP ----------*/}
        <Grid item xs={10}>
          <Typography variant="h2">Mes prescriptions</Typography>
        </Grid>

        {/*---------- PARTIE GAUCHE : LISTE DES PRESCRIPTIONS ----------*/}
        <Grid item xs={4}>
          <Item sx={{ background: '#ABBD98', borderRadius: 5 }}>
            <Typography variant="h3">Historique</Typography>

            <List sx={{ mb: 2, maxHeight: '100%', overflow: 'auto' }}>
              { prescriptions.map((prescription) => (

                  /*---------- Une prescription dans la liste de gauche ----------*/
                  <React.Fragment key={prescription.idPrescription}>
                    <ListItem button onClick={() => setSelectedPrescription(prescription) }>
                      <ListItemText
                          primary={ moment(prescription.date.seconds * 1000).format("[Le] DD/MM/YYYY [à] HH:mm") }
                          secondary={prescription.location}
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

          <Typography sx={{background: '#ABBD98', color:'white', fontSize: 25}}>Prescription détaillée</Typography>

          { selectedPrescription ?
              <>
                <Container sx={{ margin: 2 }}>
                  <span>Prescription </span>
                  <Typography>{ moment(selectedPrescription.date.seconds * 1000).format("[Le] DD/MM/YYYY [à] HH:mm") }</Typography>
                  Selected : {selectedPrescription.location}
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
          <Item sx={{background: '#ABBD98', borderRadius: 5}}>
            <Grid container spacing={2} direction='column'>
              <Grid item xs={1}>
                <IconButton component="span" onClick={downloadPrescri}>
                  <FileDownloadIcon />
                </IconButton>
              </Grid>
              <Grid item xs={1}>
                <IconButton component="span" onClick={generateQRCode}>
                  <QrCodeIcon />
                </IconButton>
              </Grid>
              <Grid item xs={1}>
                <IconButton component="span" onClick={hidePrescri}>
                  <VisibilityOffIcon />
                </IconButton>
              </Grid>
              <Grid item xs={1}>
                <IconButton component="span" onClick={deletePrescri}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Item>
        </Grid>
      </Grid>
    </RouteGuard>
    )
}

export default Prescriptions
