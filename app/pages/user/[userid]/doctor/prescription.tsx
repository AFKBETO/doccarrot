import React from 'react'
import RouteGuard from '../../../../components/RouteGuard'
import { useRouter } from 'next/router'
import { UserType } from '../../../../config/types'
import { styled } from '@mui/material/styles'
import { Paper, Button, Typography, IconButton, Grid, TextField, FormControl,FormControlLabel,FormLabel,RadioGroup,Radio } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import SendIcon from '@mui/icons-material/Send'
import AddIcon from '@mui/icons-material/Add';
import { getMedicines } from '../../../../config/api'
import { MedicationTypes } from '../../../../config/types'
import PrescriptionForm from '../../../../components/PrescriptionForm'


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

const addMedicament = () => {

}


function Prescription() {
  const [ medicines, setMedicines ] = React.useState<MedicationTypes>({id:'', name: ''})
  const [ reload, setReload ] = React.useState<boolean>(false)
  const router = useRouter()
  const { userid } = router.query

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
  }

  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
  };

  const handleChangeSub = () => {}

  React.useEffect(() => {

  }, [reload])

  return (
    <RouteGuard userId={userid as string} userType={UserType.doctor}>
      <Grid>
        <Typography variant='h2'>{'Création d\'une prescription'}</Typography>
      </Grid>
      <Grid container spacing={2} sx={{px: 5, pb: 10, width: '100%'}}>
        <PrescriptionForm item xs={11} />
        <Grid item xs={1}>
          <Item sx={{background: '#ABBD98', borderRadius: 5}}>
            <Grid container spacing={2} direction='column'>
              <Grid item xs={1}>
                <IconButton component="span" onClick={editPrescri}>
                  <EditIcon />
                </IconButton>
              </Grid>
              <Grid item xs={1}>
                <IconButton component="span" onClick={sharePrescri}>
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
