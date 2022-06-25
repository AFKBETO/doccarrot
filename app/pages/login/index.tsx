import React from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'
import { AuthData } from '../../config/types'
import { Box, Typography, TextField, FormControl, InputLabel, FilledInput, InputAdornment, IconButton, Stack , Button, Modal } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import Register from './register'

interface Props {

}

function Login(props: Props) {
  const [userData, setUserData] = React.useState<AuthData>({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const [openRegister, setOpenRegister] = React.useState<boolean>(false)

  const router = useRouter()

  const handleOpen = () => setOpenRegister(true)
  const handleClose = () => setOpenRegister(false)

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
  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, userData.email, userData.password)
    } catch (error) {
      toast.error("Email/mot de passe invalide")
      return
    }
  }

  return (
    <Box
      component='form'
      sx={{
        width: '25%',
        margin: 'auto',
        mt: 4,
        pt: 2,
        border: 1,
        borderRadius: '20px',
        backgroundColor: 'primary.main'
      }}
      noValidate
      autoComplete='off'
    >
      <Typography variant='h4' align='center'>Connexion</Typography>
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
        <Button
          variant="contained"
          sx={{ bgcolor: 'primary.dark'}}
          focusRipple={false}
          onClick={login}
        >
          <Typography sx={{ color: 'text.primary' }}>Valider</Typography>
        </Button>

        <Button onClick={handleOpen}>
          Votre première connexion ? C'est par ici !
        </Button>
        <Modal
          open={openRegister}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            width: '25%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'transparent',
            boxShadow: 'none' 
          }}>
            <Register />
          </Box>
        </Modal>
      </Stack>
    </Box>
  )
}

export default Login
