import React from 'react'
import {USER_CONTEXT} from "../../../../config/userContext";
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link'
import { Paper, InputBase, Typography, List, IconButton, Grid, ListItem, ListItemText } from '@mui/material'

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

const searchPatient = () => {

}

const removePatient = () => {

}

const newPrescription = () => {

}

var id_patient: number;
const seePatient = (event, value: number) => {
  id_patient=value;
  console.log(value);
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
];
interface Props {
}

function IndexMedecin({}: Props) {
  const userContext = React.useContext(USER_CONTEXT)

  return (
    <Grid container spacing={2} sx={{paddingLeft: 5, paddingRight:5, paddingBottom: 10}}>
    <Grid item xs={10}>
      <Typography><h1>Mon espace médecin</h1></Typography>
    </Grid>
    <Grid item xs={5}>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Item sx={{background: '#ABBD98', borderRadius: 5}}>
          <Typography sx={{background: '#ABBD98', color: 'white', fontSize: 25}}>Mes patients</Typography>
        <List sx={{ mb: 2 }}>
          {patients.map(({ id, nom, prenom}) => (
            <React.Fragment key={id}>
              <ListItem button onClick={event => seePatient(event, id)}>
                <ListItemText primary={nom} secondary={prenom} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Type in patient"
            inputProps={{ 'aria-label': 'search' }}
            onChange={searchPatient}
          />
        </Search>
          </Item>
        </Grid>
      </Grid>
      
    </Grid>
    <Grid item xs={7}>
        <Item sx={{background: '#ABBD98', borderRadius: 5}}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography><h1>Patient X</h1></Typography>
            </Grid>
            <Grid item xs={2}>
              <Link href={`/user/${userContext.userId}/medecin/prescription`}>
              <IconButton variant="contained" component="span" onClick={newPrescription}>
                  <AddIcon />
                </IconButton>
              </Link>
            </Grid>
          </Grid>
        </Item>
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
  )
}

export default IndexMedecin
