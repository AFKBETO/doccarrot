import React from 'react'
import RouteGuard from '../../../../components/RouteGuard'
import { useRouter } from 'next/router'
import { UserType } from '../../../../config/types'
import { styled } from '@mui/material/styles';
import { Paper, Typography, IconButton, Grid } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'black',
}));

const editPrescri = () => {

}

const sharePrescri = () => {

}

interface Props {
  
}

function Prescription({}: Props) {
  const router = useRouter()
  const { userid } = router.query

  return (
    <>
    <RouteGuard userId={parseInt(userid as string)} userType={UserType.medecin}>
      prescriptions
    </RouteGuard>
    <Grid container spacing={2} sx={{paddingLeft: 5, paddingRight:5, paddingBottom: 10}}>
      <Grid item xs={10}>
        <Typography><h1>Création d'une prescription</h1></Typography>
      </Grid>
      <Grid item xs={11}>
        <Item sx={{background: '#ABBD98', borderRadius: 5}}>
          <Typography><h1>Espace édition</h1></Typography>
        </Item>
      </Grid>
      <Grid item xs={1}>
        <Item sx={{background: '#ABBD98', borderRadius: 5}}>
          <Grid container spacing={2} direction='column'>
            <Grid item xs={1}>
              <IconButton variant="contained" component="span" onClick={editPrescri}>
                <EditIcon />
              </IconButton>
            </Grid>
            <Grid item xs={1}>
              <IconButton variant="contained" component="span" onClick={sharePrescri}>
                <SendIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Item>
      </Grid>
      
    </Grid>
    </>
  )
}

export default Prescription
