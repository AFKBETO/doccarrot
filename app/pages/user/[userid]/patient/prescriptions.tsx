import React from 'react'
import RouteGuard from '../../../../components/RouteGuard'
import { useRouter } from 'next/router'
import { styled } from '@mui/material/styles';
import { Paper, Typography, Grid, ListItem, ListItemText, List, IconButton } from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import QrCodeIcon from '@mui/icons-material/QrCode';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useUserData} from "../../../../config/userDataHooks";
import {usePrescriptions} from "../../../../config/prescriptionsHooks";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'black',
}))

let id_selection = 0
const selectPrescription = (event: React.MouseEvent, value: number) => {
  id_selection=value
  console.log(value)
  diplayPrescription()
}

const diplayPrescription = () => {
  console.log("display prescription")
}

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

  return (
    <RouteGuard userId={userid as string}>
      <Grid container spacing={2} sx={{paddingLeft: 5, paddingRight:5, paddingBottom: 10}}>
        <Grid item xs={10}>
          <Typography><h1>Mes prescriptions</h1></Typography>
        </Grid>
        <Grid item xs={4}>
          <Item sx={{background: '#ABBD98', borderRadius: 5}}>
          <Typography sx={{background: '#ABBD98', color:'white', fontSize: 25}}>Historique</Typography>
          <List sx={{ mb: 2, maxHeight: '100%', overflow: 'auto'}}>
            { prescriptions.map((prescription) => (
                <>
                  {prescription.idPatient}
                  {prescription.location}
                  { /* <React.Fragment key={id}>
                <ListItem button>
                  <ListItemText primary={date} secondary={title} />
                  <IconButton component="span" onClick={(event: React.MouseEvent<Element, MouseEvent>) => selectPrescription(event, id)}>
                    <RemoveRedEyeIcon />
                  </IconButton>
                </ListItem>
              </React.Fragment> */ }
                </>
            )) }
          </List>
          </Item>
        </Grid>
        <Grid item xs={7}>
        <Item sx={{background: '#ABBD98', borderRadius: 5}}>
          <Typography sx={{background: '#ABBD98', color:'white', fontSize: 25}}>Historique</Typography>
          </Item>
        </Grid>
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
