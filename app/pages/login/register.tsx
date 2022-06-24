import React from 'react'
import { Box, Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, Stack, Tab, Tabs, TextField, Typography } from '@mui/material'
import { AuthData, PatientData, MedecinData } from '../../config/types'
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface Props {
  
}

function Register({}: Props) {
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

function Register ({}: Props) {
  const [tabValue, setTabValue] = React.useState<number>(0)
  const [userData, setUserData] = React.useState<AuthData>({
    email: '',
    password: ''
  })
  const [confirmationData, setConfirmationData] = React.useState<AuthData>({
    email: '',
    password: ''
  })
  const [medecinData, setMedecinData] = React.useState<MedecinData>({
    rpps: ''
  })
  const [showPassword, setShowPassword] = React.useState<boolean>(false)

  const changeTab = (event: React.SyntheticEvent, newTabValue: number) => {
    setTabValue(newTabValue)
  }
  const formEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      email: event.target.value
    })
  }
  const formPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      password: event.target.value
    })
  }
  const formConfirmationEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmationData({
      ...confirmationData,
      email: event.target.value
    })
  }
  const formConfirmationPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmationData({
      ...confirmationData,
      password: event.target.value
    })
  }
  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const register = () => {
    
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
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ my: 4}}
        >
          <TextField
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
            onInput={formEmail}
            size='small'
          />
          <TextField
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
            value={confirmationData.email}
            onInput={formConfirmationEmail}
            size='small'
          />
          <FormControl required sx={{ m: 1, width: '70%'}} variant="filled" size='small'>
            <InputLabel color='secondary' htmlFor="password-required">Mot de passe</InputLabel>
            <FilledInput
              id='password-required'
              color='primary'
              type={showPassword ? 'text' : 'password'}
              value={userData.password}
              onInput={formPassword}
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
          </FormControl>
          <TextField
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
            value={confirmationData.password}
            onInput={formConfirmationPassword}
            size='small'
          />
          <Button
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

export default Register
