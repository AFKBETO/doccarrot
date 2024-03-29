import React from 'react'
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from 'firebase/auth'

import { auth } from '../config/firebase'
import { AuthData, UserData, UserType } from '../config/types'
import { addUser } from '../config/api'
import { validateEmail, validatePassword } from '../config/validators'

import { Box, Button, FilledInput, FormControl, FormControlLabel, FormGroup, FormHelperText, IconButton, InputAdornment, InputLabel, Stack, Tab, Tabs, TextField, Typography, Switch } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import CloseIcon from "@mui/icons-material/Close";

import toast from 'react-hot-toast'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface RegisterProps {
  closeModal: () => void
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  
  return (
  <Box
    role='tabpanel'
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
    {...other}
    >
    {value === index && (
      <Box
        component='form'
        sx={{ py: 3 }}
        noValidate
        autoComplete='off'
      >
        {children}
      </Box>
    )}
  </Box>
  )
}

function labelProps (index: number) {
  return {
    id: `tab-${index}`,
    //'aria-control': `tabpanel-${index}`
  }
}

function Register ({ closeModal }: RegisterProps) {
  const [tabValue, setTabValue] = React.useState<number>(0)
  const [userData, setUserData] = React.useState<AuthData & UserData>({
    idUser: "",
    tokenCarteVitale: "",
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    userType: UserType.patient,
    nss: '',
    rpps: '',
    publicID: ''
  })
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const [errorValidator, setErrorValidator] = React.useState({
    email: false,
    emailConfirm: false,
    freshEmail: true,
    password: [] as React.ReactNode[],
    passwordConfirm: false,
    freshPassword: true
  })

  const changeTab = (event: React.SyntheticEvent, newTabValue: number) => {
    setTabValue(newTabValue)
    setUserData({
      ...userData,
      userType: newTabValue === 0 ? UserType.patient : UserType.doctor
    })
  }
  const modifyForm = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setUserData({
      ...userData,
      [field]: event.target.value
    })
  }
  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const togglePharmacien = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      userType: event.target.checked ? UserType.pharmacist : UserType.doctor
    })
  }
  const verifyEmail = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setErrorValidator({
      ...errorValidator,
      email: validateEmail(event.target.value)
    })
  }
  const verifyConfirmEmail = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setErrorValidator({
      ...errorValidator,
      emailConfirm: (userData.email !== event.target.value),
      freshEmail: false
    })
  }
  const verifyPassword = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setErrorValidator({
      ...errorValidator,
      password: validatePassword(event.target.value)
    })
  }
  const verifyConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setErrorValidator({
      ...errorValidator,
      passwordConfirm: (userData.password !== event.target.value),
      freshPassword: false
    })
  }
  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
      await addUser(userCredential.user.uid, userData)
      sendEmailVerification(userCredential.user)
      signOut(auth)
      toast.success('Un message de vérification a été envoyé à votre adresse email. Vérifiez votre boîte SPAM.')
      closeModal()
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <Box>
      <Typography variant='h4' align='center'>Inscription</Typography>
      <div style={{ float: 'right' }}>
        <Button size="small" onClick={ () => closeModal() }>
          <CloseIcon></CloseIcon>
        </Button>
      </div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs textColor='secondary' indicatorColor='secondary' value={tabValue} onChange={changeTab} aria-label='basic tabs example' variant='scrollable' selectionFollowsFocus>
          <Tab label='Patient' {...labelProps(0)} />
          <Tab label='Médecin Pharmacien' {...labelProps(1)} />
        </Tabs>
      </Box>
      <Stack spacing={1} justifyContent="center" alignItems="center" sx={{ mt: 2}}>
        <TextField id='email-required' variant='filled' label='Email' type='email' color='secondary' size='small' required
          error={errorValidator.email}
          helperText={errorValidator.email ? 'Email invalide' : ''}
          value={userData.email}
          onInput={event => modifyForm(event as React.ChangeEvent<HTMLInputElement>, 'email')}
          onChange={verifyEmail}
          sx={{
            width: '70%',
            color: 'text.primary'
          }}
        />
        <TextField id='email-confirm-required' variant='filled' label='Confirmation d&apos;email' type='email' color='secondary' size='small' required
          error={errorValidator.emailConfirm}
          helperText={errorValidator.emailConfirm ? 'La confirmation d\'email n\'est pas identique' : ''}
          onChange={verifyConfirmEmail}
          sx={{
            width: '70%',
            color: 'text.primary'
          }}
        />
        <FormControl variant="filled" size='small' required
          error={errorValidator.password.length > 0}
          sx={{ m: 1, width: '70%'}}
        >
          <InputLabel color='secondary' htmlFor="password-required">Mot de passe</InputLabel>
          <FilledInput id='password-required' color='primary'
            type={showPassword ? 'text' : 'password'}
            value={userData.password}
            onInput={event => modifyForm(event as React.ChangeEvent<HTMLInputElement>, 'password')}
            onChange={verifyPassword}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton aria-label="toggle password visibility" edge="end"
                  onClick={toggleShowPassword}
                  onMouseDown={toggleShowPassword}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText id="password-required-error-text">{errorValidator.password}</FormHelperText>
        </FormControl>
        <TextField id='password-confirm-required' variant='filled' label='Confirmation de mot de passe' color='secondary' size='small' required
          error={errorValidator.passwordConfirm}
          helperText={errorValidator.passwordConfirm ? 'La confirmation de mot de passe n\'est pas identique' : ''}
          type={showPassword ? 'text' : 'password'}
          onChange={verifyConfirmPassword}
          sx={{
            width: '70%',
            color: 'text.primary'
          }}
        />
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          <TextField id='firstname' variant='filled' label='Prénom' type='text' color='secondary' size='small'
            value={userData.firstName}
            onInput={event => modifyForm(event as React.ChangeEvent<HTMLInputElement>, 'firstName')}
            sx={{
              width: '34%',
              color: 'text.primary'
            }}
          />
          <TextField id='lastname' variant='filled' label='Nom' type='text' color='secondary' size='small'
            value={userData.lastName}
            onInput={event => modifyForm(event as React.ChangeEvent<HTMLInputElement>, 'lastName')}
            sx={{
              width: '34%',
              color: 'text.primary'
            }}
          />
        </Stack>
      </Stack>
      {/*---------Création compte patient---------*/}
      <TabPanel value={tabValue} index={0}>
        <Stack spacing={1} justifyContent="center" alignItems="center">
          <TextField id='nss' variant='filled' label='Numéro NSS' type='text' color='secondary' size='small'
            value={userData.nss}
            onInput={event => modifyForm(event as React.ChangeEvent<HTMLInputElement>, 'nss')}
            sx={{
              width: '70%',
              color: 'text.primary'
            }}
          />
        </Stack>
      </TabPanel>
      {/*---------Création compte médecin---------*/}
      <TabPanel value={tabValue} index={1}>
        <Stack spacing={1} justifyContent="center" alignItems="center">
          <FormGroup>
            <FormControlLabel control={
              <Switch size='small' inputProps={{ 'aria-label': 'controlled' }}
                checked={userData.userType == UserType.pharmacist}
                onChange={togglePharmacien}
              />
            } label="Vous etes pharmacien ?" />
          </FormGroup>
          <TextField id='rpps' variant='filled' label='Numéro RPPS' type='text' color='secondary' size='small'
            value={userData.rpps}
            onInput={event => modifyForm(event as React.ChangeEvent<HTMLInputElement>, 'rpps')}
            sx={{
              width: '70%',
              color: 'text.primary'
            }}
          />
        </Stack>
      </TabPanel>
      <Box textAlign='center' sx={{ my: 1 }}>
        <Button variant="contained"
          disabled={
            errorValidator.email || 
            errorValidator.password.length > 0 || 
            errorValidator.emailConfirm || 
            errorValidator.passwordConfirm ||
            errorValidator.freshEmail ||
            errorValidator.freshPassword
          }
          sx={{ bgcolor: 'primary.dark' }}
          focusRipple={false}
          onClick={register}
        >
          <Typography sx={{ color: 'text.primary' }}>Valider</Typography>
        </Button>
      </Box>
    </Box>
  )
}

export default Register
