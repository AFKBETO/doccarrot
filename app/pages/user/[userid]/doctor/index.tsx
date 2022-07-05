import React from 'react'
import { styled } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import Link from 'next/link'
import { Paper, InputBase, Typography, List, IconButton, Grid, ListItem, ListItemText } from '@mui/material'
import { USER_CONTEXT } from "../../../../config/userContext";
import RouteGuard from '../../../../components/RouteGuard'
import { useRouter } from 'next/router'
import { UserType } from '../../../../config/types'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'black',
}));


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 20,
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: 'lightgrey',
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


const removePatient = () => {
  console.log('remove')
}

const newPrescription = () => {
  console.log('newPres')
}

let id_patient: number
const seePatient = (event: React.MouseEvent, value: number) => {
  id_patient=value
  console.log(value)
}

const patients = [
  {
    id: 1,
    nom: 'Dupon',
    prenom: "Robert",
  },
  {
    id: 2,
    nom: 'Sanchez',
    prenom: `Tony`,
  },
  {
    id: 3,
    nom: 'Ramirez',
    prenom: 'Isabella',
  },
  {
    id: 4,
    nom: 'Levalois',
    prenom: 'Monique',
  },
  {
    id: 4,
    nom: 'Levalois',
    prenom: 'Monique',
  },
  {
    id: 4,
    nom: 'Levalois',
    prenom: 'Monique',
  },
]


function IndexMedecin() {
  const [searchPat, setSearchPat] = React.useState<string>('')
  const userContext = React.useContext(USER_CONTEXT)
  const router = useRouter()
  const { userid } = router.query

  const searchPatient = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPat(event.target.value.toLowerCase())
  }
  
  return (
    <RouteGuard userId={userid as string} userType={UserType.doctor}>
      <Grid container spacing={2} sx={{px: 5, pb: 10}}>
        <Grid item xs={10}>
          <Typography><h1>Mon espace médecin</h1></Typography>
        </Grid>
        <Grid item container xs={5} spacing={2} sx={{p: 2}}>
          <Grid item xs={12} sx={{background: '#ABBD98', borderRadius: 5, px: 2, pb: 2}}>
            <Typography sx={{color: 'white', fontSize: 25 }}>Mes patients</Typography>
            <List component='div' sx={{ minHeight: '300px', maxHeight: '300px', overflow: 'auto'}}>
              {patients.map(({ id, nom, prenom}) => (((searchPat.length > 0) && !(`${nom.toLowerCase()} ${prenom.toLowerCase()}`.includes(searchPat))) ? <></> :
                <ListItem button onClick={event => seePatient(event, id)}>
                  <ListItemText primary={nom} secondary={prenom} />
                </ListItem>
              ))}
            </List>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Type in patient"
                inputProps={{ 'aria-label': 'search' }}
                onInput={searchPatient}
              />
            </Search>
          </Grid>
        </Grid>
        <Grid item xs={7}>
          <Grid container spacing={2} sx={{background: '#ABBD98', borderRadius: 5}}>
            <Grid item xs={8}>
              <Typography><h1>Patient X</h1></Typography>
            </Grid>
            <Grid item xs={2}>
              <Link href={`/user/${userContext.userId}/doctor/prescription`}>
                <IconButton component="span" onClick={newPrescription}>
                  <AddIcon />
                </IconButton>
              </Link>
            </Grid>
          </Grid>
          <Grid item xs={10}>
            <List sx={{ mb: 2 }}>
              {patients.map(({ id, nom, prenom}) => (
                <React.Fragment key={id}>
                  {id==id_patient && (
                    <ListItem button onClick={event => seePatient(event, id)}>
                    <ListItemText primary={nom} secondary={prenom} />
                  </ListItem>
                  )}
                </React.Fragment>
              ))}
            </List>
          </Grid>
        </Grid>
      </Grid>
    </RouteGuard>
  )
}

export default IndexMedecin
