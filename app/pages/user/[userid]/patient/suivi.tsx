import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Image from 'next/image'
import { Paper, InputBase, List, Typography, IconButton, Grid, ListItem, ListItemText } from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SearchIcon from '@mui/icons-material/Search';
//import MoreIcon from '@mui/icons-material/MoreVert';
import RemoveIcon from '@mui/icons-material/Remove';
//import { text } from 'stream/consumers';
import RouteGuard from '../../../../components/RouteGuard'
import { useRouter } from 'next/router'
import {USER_CONTEXT} from "../../../../config/userContext";
import {UserType} from "../../../../config/types";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'black',
}))

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
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

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
}))

const Input = styled('input')({
  display: 'none',
});

function Suivi() {
  const [searchDoc, setSearchDoc] = useState<string>('')
  const [searchPhar, setSearchPhar] = useState<string>('')
  const router = useRouter()
  const { userid } = router.query

  const userContext = React.useContext(USER_CONTEXT);

  const searchDoctor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchDoc(event.target.value.toLowerCase())
  }

  const searchPharmacy = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPhar(event.target.value.toLowerCase())
  }

  return (
      <RouteGuard userId={userid as string} userType={UserType.patient}>
        <Grid container spacing={2} sx={{paddingLeft: 5, paddingRight:5, paddingBottom: 10}}>
          {/*---------- TITRE ----------*/}
          <Grid item xs={10}>
            <Typography variant='h2'>Mon suivi de santé</Typography>
          </Grid>

          {/*---------- PARTIE GAUCHE : MEDECINS ET PHARMACIES ----------*/}
          <Grid item xs={5}>
            <Grid container spacing={2}>

              {/*---------- MEDECINS ----------*/}
              <Grid item xs={10}>
                <Item sx={{background: '#ABBD98', borderRadius: 5}}>
                  <Typography sx={{background: '#ABBD98', color: 'white', fontSize: 25}}>Mes médecins</Typography>
                  <List sx={{ mb: 2 }}>
                    { userContext.patientDoctors
                        .filter(doctor => searchDoc.length == 0 || doctor.firstName.toLowerCase().includes(searchDoc) || doctor.lastName.toLowerCase().includes(searchDoc))
                        .map((doctor) => (
                            <React.Fragment key={doctor.idUser}>
                              <ListItem button>
                                <ListItemText primary={doctor.firstName} secondary={doctor.lastName} />
                                <IconButton component="span" >
                                  <RemoveIcon />
                                </IconButton>
                              </ListItem>
                            </React.Fragment>
                        )) }
                  </List>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Filtrer"
                        inputProps={{ 'aria-label': 'search' }}
                        onInput={searchDoctor}
                    />
                  </Search>
                </Item>
              </Grid>

              {/*---------- PHARMACIES ----------*/}
              <Grid item xs={10}>
                <Item sx={{background: '#ABBD98', borderRadius: 5}}>
                  <Typography sx={{background: '#ABBD98', color: 'white', fontSize: 25}}>Mes pharmacies</Typography>
                  <List sx={{ mb: 2 }}>
                    { userContext.patientPharmacies
                        .filter(pharmacy => searchPhar.length == 0 || pharmacy.name.toLowerCase().includes(searchPhar) || pharmacy.address.toLowerCase().includes(searchPhar))
                        .map((pharmacy) => (
                            <React.Fragment key={pharmacy.idPharmacy}>
                              <ListItem button>
                                <ListItemText primary={pharmacy.name} secondary={pharmacy.address} />
                                <IconButton component="span" >
                                  <RemoveIcon />
                                </IconButton>
                              </ListItem>
                            </React.Fragment>
                        )) }
                  </List>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Filtrer"
                        inputProps={{ 'aria-label': 'search' }}
                        onInput={searchPharmacy}
                    />
                  </Search>
                </Item>
              </Grid>
            </Grid>
          </Grid>

          {/*---------- PARTIE DROITE : INFORMATIONS (CARTE VITALE + CARTE IDENTITE) ----------*/}
          <Grid item xs={7}>
            <Item sx={{borderRadius: 5}}>
              <Typography sx={{fontSize: 25, textAlign:'left'}}>Mes informations</Typography>
              <Grid container direction='row' display='flex'>
                <label htmlFor="contained-button-file">
                  <Input accept="image/*" id="contained-button-file" multiple type="file" />
                  <IconButton component="span" >
                    <FileDownloadIcon />
                  </IconButton>
                </label>
                <Typography sx={{fontSize: 20, textAlign: 'left'}}>Carte vitale</Typography>
              </Grid>
              <Image src='/carotte_assistant.png' width='100%' height='100%' alt='carte-vitale'></Image>
              <Grid container direction='row' display='flex'>
                <label htmlFor="contained-button-file">
                  <Input accept="image/*" id="contained-button-file" multiple type="file" />
                  <IconButton component="span" >
                    <FileDownloadIcon />
                  </IconButton>
                </label>
                <Typography sx={{fontSize: 20, textAlign: 'left'}}>{'Carte d\'identité'}</Typography>
              </Grid>
              <Image src='/carotte_assistant.png' width='100%' height='100%' alt='carte-identite'></Image>
            </Item>
          </Grid>
        </Grid>
      </RouteGuard>
  )
}

export default Suivi
