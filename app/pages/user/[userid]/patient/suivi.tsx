import React from 'react'
import { styled } from '@mui/material/styles';
import Image from 'next/image'
import { Paper, InputBase, List, Typography, IconButton, Grid, ListItem, ListItemText } from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import RemoveIcon from '@mui/icons-material/Remove';
//import { text } from 'stream/consumers';
import RouteGuard from '../../../../components/RouteGuard'
import { useRouter } from 'next/router'

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

const Input = styled('input')({
  display: 'none',
});

const handleSubmission = () => {

}
const searchDoctor = () => {

}

const removeDoctor = () => {

}

const searchPharmacy = () => {

}

const removePharmacy = () => {

}

const doctors = [
  {
    id: 1,
    nom: 'Dupon',
    prenom: "Robert",
  },
  {
    id: 2,
    nom: 'Sanchez',
    prenom: `Tony`,
  }/*,
  {
    id: 3,
    nom: 'Ramirez',
    prenom: 'Isabella',
  },
  {
    id: 4,
    nom: 'Levalois',
    prenom: 'Monique',
  },*/
];

const pharmacies = [
  {
    id: 1,
    nom: 'Pharmacie des Allées',
    adresse: "32 Avenue Marx Dormoy",
  },
  {
    id: 2,
    nom: 'Xavier',
    adresse: `ZAC de la Gare`,
  }/*,
  {
    id: 3,
    nom: 'Mathieu André',
    adresse: '12 rue Eugène Pelletan',
  },
  {
    id: 4,
    nom: 'Pharmacie du progrès',
    adresse: '72 court Carnot',
  },*/
];




interface Props {

}

function Suivi({}: Props) {
  const router = useRouter()
  const { userid } = router.query

  return (
    <RouteGuard userId={userid as string}>
      <Grid container spacing={2} sx={{paddingLeft: 5, paddingRight:5, paddingBottom: 10}}>
        <Grid item xs={10}>
          <Typography><h1>Mon suivi de santé</h1></Typography>
        </Grid>
        <Grid item xs={5}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
            <Item sx={{background: '#ABBD98', borderRadius: 5}}>
              <Typography sx={{background: '#ABBD98', color:'white', fontSize: 25}}>Mes médecins</Typography>
              <List sx={{ mb: 2 }}>
            {doctors.map(({ id, nom, prenom }) => (
              <React.Fragment key={id}>
                <ListItem button>
                  <ListItemText primary={nom} secondary={prenom} />
                  <IconButton component="span" onClick={removeDoctor}>
                  <RemoveIcon />
                </IconButton>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
              <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Type in a doctor code"
                inputProps={{ 'aria-label': 'search' }}
                onChange={searchDoctor}
              />
            </Search>
            </Item>
            </Grid>
            <Grid item xs={10}>
            <Item sx={{background: '#ABBD98', borderRadius: 5}}>
              <Typography sx={{background: '#ABBD98', color: 'white', fontSize: 25}}>Mes pharmacies</Typography>
              <List sx={{ mb: 2 }}>
            {pharmacies.map(({ id, nom, adresse }) => (
              <React.Fragment key={id}>
                <ListItem button>
                  <ListItemText primary={nom} secondary={adresse} />
                  <IconButton component="span" onClick={removePharmacy}>
                    <RemoveIcon />
                  </IconButton>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
              <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Type in a pharmacy code"
                inputProps={{ 'aria-label': 'search' }}
                onChange={searchPharmacy}
              />
            </Search>
            </Item>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={7}>
          <Item sx={{borderRadius: 5}}>
            <Typography sx={{fontSize: 25, textAlign:'left'}}>Mes informations</Typography>
            <Grid direction='row' display='flex'>
              <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" multiple type="file" />
                <IconButton component="span" onClick={handleSubmission}>
                  <FileDownloadIcon />
                </IconButton>
              </label>
              <Typography sx={{fontSize: 20, textAlign: 'left'}}>Carte vitale</Typography>
            </Grid>
            <Image src='/carotte_assistant.png' width='100%' height='100%' alt='carte-vitale'></Image>
            <Grid direction='row' display='flex'>
              <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" multiple type="file" />
                <IconButton component="span" onClick={handleSubmission}>
                  <FileDownloadIcon />
                </IconButton>
              </label>
              <Typography sx={{fontSize: 20, textAlign: 'left'}}>Carte d'identité</Typography>
            </Grid>
            <Image src='/carotte_assistant.png' width='100%' height='100%' alt='carte-identite'></Image>
          </Item>
        </Grid>
      </Grid>
    </RouteGuard>
  )
}

export default Suivi
