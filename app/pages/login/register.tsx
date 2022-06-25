import React from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Box, Button, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, Stack, Tab, Tabs, TextField, Typography } from '@mui/material'
import { AuthData, PatientData, MedecinData } from '../../config/types'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { auth } from '../../config/firebase'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

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
        sx={{ p: 3 }}
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
    'aria-control': `tabpanel-${index}` 
  }
}

function Register ({ closeModal }: RegisterProps) {
  const [tabValue, setTabValue] = React.useState<number>(0)
  const [userData, setUserData] = React.useState<AuthData>({
    email: '',
    password: ''
  })
  const [medecinData, setMedecinData] = React.useState<MedecinData>({
    rpps: ''
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
  const router = useRouter()
  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, userData.email, userData.password)
      closeModal()
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <Box sx={{
      margin: 'auto',
      mt: 4,
      pt: 2,
      border: 1,
      borderRadius: '20px',
      backgroundColor: 'primary.dark' }}>
      <Typography variant='h4' align='center'>Inscription</Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          textColor='secondary'
          indicatorColor='secondary'
          value={tabValue}
          onChange={changeTab}
          aria-label='basic tabs example'
          variant='scrollable'
          centered
          selectionFollowsFocus 
        >
          <Tab label='Patient' {...labelProps(0)} />
          <Tab label='Médecin Pharmacien' {...labelProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <Stack
          spacing={4}
          justifyContent="center"
          alignItems="center"
          sx={{ my: 4}}
        >
          <TextField
            error={errorValidator.email}
            helperText={errorValidator.email ? 'Email invalide' : ''}
            required
            variant='filled'
            id='email-required'
            label='Email'
            type='email'
            color='secondary'
            sx={{
              width: '70%',
              color: 'text.primary'
            }}
            value={userData.email}
            onInput={event => modifyForm(event as React.ChangeEvent<HTMLInputElement>, 'email')}
            onChange={verifyEmail}
            size='small'
          />
          <TextField
            error={errorValidator.emailConfirm}
            helperText={errorValidator.emailConfirm ? 'La confirmation d\'email n\'est pas identique' : ''}
            required
            variant='filled'
            id='email-confirm-required'
            label='Confirmation d&apos;email'
            type='email'
            color='secondary'
            sx={{
              width: '70%',
              color: 'text.primary'
            }}
/*             value={confirmationData.email}
            onInput={formConfirmationEmail} */
            onChange={verifyConfirmEmail}
            size='small'
          />
          <FormControl
            error={errorValidator.password.length > 0}
            required
            sx={{ m: 1, width: '70%'}}
            variant="filled"
            size='small'>
            <InputLabel color='secondary' htmlFor="password-required">Mot de passe</InputLabel>
            <FilledInput
              id='password-required'
              color='primary'
              type={showPassword ? 'text' : 'password'}
              value={userData.password}
              onInput={event => modifyForm(event as React.ChangeEvent<HTMLInputElement>, 'password')}
              onChange={verifyPassword}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleShowPassword}
                      onMouseDown={toggleShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText id="password-required-error-text">{errorValidator.password}</FormHelperText>
          </FormControl>
          <TextField
            error={errorValidator.passwordConfirm}
            helperText={errorValidator.passwordConfirm ? 'La confirmation de mot de passe n\'est pas identique' : ''}
            required
            variant='filled'
            id='password-confirm-required'
            label='Confirmation de mot de passe'
            type={showPassword ? 'text' : 'password'}
            color='secondary'
            sx={{
              width: '70%',
              color: 'text.primary'
            }}
            onChange={verifyConfirmPassword}
            size='small'
          />
          <Button
            disabled={
              errorValidator.email || 
              errorValidator.password.length > 0 || 
              errorValidator.emailConfirm || 
              errorValidator.passwordConfirm ||
              errorValidator.freshEmail ||
              errorValidator.freshPassword
            }
            variant="contained"
            sx={{ bgcolor: 'primary.dark'}}
            focusRipple={false}
            onClick={register}
          >
            <Typography sx={{ color: 'text.primary' }}>Valider</Typography>
          </Button>
        </Stack>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        Médecin - Pharmacien
      </TabPanel>
    </Box>
  )
}

function validateEmail (email: string) : boolean {
  if (!/^[\w-.+]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) return true
  return false
}

function validatePassword (password: string): React.ReactNode[] {
  const errors: React.ReactNode[] = []
  let index = 0
  if (!/\d+/.test(password)) {
    errors.push(<div key={index}>Le mot de passe doit avoir au moins une chiffre (0-9).</div>)
    index++
  }
  if (!/[a-z]+/.test(password)) {
    errors.push(<div key={index}>Le mot de passe doit avoir au moins une caractère minuscule.</div>)
    index++
  }
  if (!/[A-Z]+/.test(password)) {
    errors.push(<div key={index}>Le mot de passe doit avoir au moins une caractère majuscule.</div>)
    index++
  }
  if (!/(\W)|(_)+/.test(password)) {
    errors.push(<div key={index}>Le mot de passe doit avoir au moins une caractère spéciale.</div>)
    index++
  }
  if (!/[\s\S]{8,32}/.test(password)) {
    errors.push(<div key={index}>Le mot de passe doit avoir 8-32 caractères.</div>)
    index++
  }
  if (!/^[^ ]+/.test(password)) {
    errors.push(<div key={index}>Le mot de passe ne doit pas commencer avec une espace.</div>)
    index++
  }
  return errors
}

export default Register
