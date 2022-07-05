import React from 'react'
import RouteGuard from '../../../../components/RouteGuard'
import { useRouter } from 'next/router'
import { UserType } from '../../../../config/types'
import { styled } from '@mui/material/styles'
import { Paper, Button, Typography, IconButton, Grid, TextField, FormControl,FormControlLabel,FormLabel,RadioGroup,Radio } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import SendIcon from '@mui/icons-material/Send'
import { MedicationTypes } from '../../../../config/types'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'black',
}));


function Prescription() {
  const [ medicines, setMedicines ] = React.useState<MedicationTypes>({id:'', name: ''})
  const [ reload, setReload ] = React.useState<boolean>(false)
  const router = useRouter()
  const { userid } = router.query

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    alert('handle input change')
  }

  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
  };

  const handleChangeSub = () => {
    alert('handle change sub')
  }

  React.useEffect(() => {
    alert('reload effect')
  }, [reload])

  return (
    <RouteGuard userId={userid as string} userType={UserType.doctor}>
      <Grid container spacing={2} sx={{paddingLeft: 5, paddingRight:5, paddingBottom: 10}}>
        <Grid item xs={10}>
          <Typography><h1>{'Création d\'une prescription'}</h1></Typography>
        </Grid>
        <Grid item xs={11}>
          <Item sx={{background: '#ABBD98', borderRadius: 5}}>
            <Typography><h1>Espace édition</h1></Typography>
            
            <FormControl onSubmit={handleSubmit}>
              <Grid container sx={{ paddingLeft: 5, textAlign: 'left', justify: 'center', direction: 'column' }} >
                <Grid item>
                  <Typography>Nom Médecin</Typography>
                </Grid>
                <Grid item textAlign="right" sx={{paddingRight: 5}}>
                  <Typography>Date et adresse du jour</Typography>
                </Grid>
                <Grid item>
                  <Typography>Nom Patient</Typography>
                </Grid>
                <Grid item>
                  <Typography><h3>Médicaments</h3></Typography>
                  <Grid container direction="column">
                    <Grid item>
                    <FormLabel id="nom">Nom médicament</FormLabel>
                    </Grid>
                    <Grid item>
                      <TextField
                      sx={{paddingBottom: 5}}
                      id="nom"
                      name="name"
                      label="Nom"
                      type="text"
                      value=""
                      onChange={handleInputChange}
                    />
                    </Grid>
                    <Grid item>
                    <FormLabel id="description">Description médicament</FormLabel>
                    </Grid>
                    <Grid item direction="row">
                        <TextField
                        sx={{paddingBottom: 5}}
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        value=""
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item>
                      <FormLabel id="substituable">Substituable ?</FormLabel>
                      <RadioGroup
                      sx={{paddingBottom: 5}}
                        aria-labelledby="substituable"
                        name="sub"
                        value="truc"
                        onChange={handleInputChange}
                      >
                        <FormControlLabel value="Substituable" control={<Radio />} label="Substituable" />
                        <FormControlLabel value="Non-Substituable" control={<Radio />} label="Non Substituable" />
                      </RadioGroup>
                    </Grid>
                    <Grid item>
                      <FormLabel id="renouvellement" sx={{paddingRight: 5}}>Nombre de renouvellement</FormLabel>
                      <TextField
                      id="renouvellement"
                      name="renouvellement"
                      label=""
                      type="number"
                      value="1"
                      onChange={handleInputChange}
                    />
                    </Grid>
                    <Grid item>
                    <FormLabel id="qsp">Mention QSP</FormLabel>
                      <RadioGroup
                      sx={{paddingBottom: 5}}
                        aria-labelledby="qsp"
                        name="qsp"
                        value=""
                        onChange={handleInputChange}
                      >
                        <FormControlLabel value="QSP" control={<Radio />} label="oui" />
                        <FormControlLabel value="Non-QSP" control={<Radio />} label="Non" />
                      </RadioGroup>
                    </Grid>
                    <Grid item>
                    <FormLabel id="nr">Mention NR</FormLabel>
                      <RadioGroup
                      sx={{paddingBottom: 5}}
                        aria-labelledby="nr"
                        name="nr"
                        value=""
                        onChange={handleInputChange}
                      >
                        <FormControlLabel value="NR" control={<Radio />} label="oui" />
                        <FormControlLabel value="Non-NR" control={<Radio />} label="Non" />
                      </RadioGroup>
                    </Grid>
                    <Grid item>
                    <Button >Ajouter médicament</Button>
                    </Grid>
                    <Grid item>
                    <FormLabel id="information">Informations complémentaires</FormLabel>
                    </Grid>
                    <Grid item direction="row">
                        <TextField
                        sx={{paddingBottom: 5}}
                        id="information"
                        name="information"
                        label=""
                        type="text"
                        value=""
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item>
                    <FormLabel id="signature">Signature</FormLabel>
                    </Grid>
                    <Grid item>
                    <Button variant="contained" type="submit">
                      Submit
                    </Button>
                  </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </FormControl>
           
          </Item>
        </Grid>
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
