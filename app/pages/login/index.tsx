import React, { useEffect } from 'react'
import { sendEmailVerification, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../../config/firebase'
import { AuthData } from '../../config/types'
import { Box, Typography, TextField, FormControl, InputLabel, FilledInput, InputAdornment, IconButton, Stack , Button, Modal } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import Register from './register'
import { useAuthState } from 'react-firebase-hooks/auth'
import { USER_CONTEXT } from '../../config/userContext'

function Login() {
  const [userData, setUserData] = React.useState<AuthData>({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const [openRegister, setOpenRegister] = React.useState<boolean>(false)
  const userContext = React.useContext(USER_CONTEXT)

  const router = useRouter()

  const handleOpen = () => setOpenRegister(true)
  const handleClose = () => setOpenRegister(false)

  const modifyForm = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setUserData({
      ...userData,
      [field]: event.target.value
    })
  }
  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const login = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, userData.email, userData.password)
      if (user.emailVerified) {
        router.push('/')
      } else {
        toast((t) => (
          <Box onClick={() => {
              sendEmailVerification(user)
              toast.dismiss(t.id)
            }}>
            Vous n&apos;avez pas encore vérifié votre adresse. Cliquez ici pour renvoyer l&apos;email de vérification.
          </Box>
        ))
        setTimeout(async () => await signOut(auth), 500)
      }
    } catch (error) {
      toast.error('Email/mot de passe invalide')
      return
    }
  }
  return (
    <Box component='form' autoComplete='off' noValidate
      sx={{
        width: '25%',
        margin: 'auto',
        mt: 4,
        pt: 2,
        mb: 4,
        borderRadius: '20px',
        backgroundColor: 'primary.main'
      }}
    >
      <Typography variant='h3' align='center'>Connexion</Typography>
      <Stack spacing={2} justifyContent='center' alignItems='center' sx={{ my: 4}}>
        <TextField id='email-required' variant='filled' label='Email' type='email' color='secondary' size='small' required
          value={userData.email}
          onInput={event => modifyForm(event as React.ChangeEvent<HTMLInputElement>, 'email')}
          sx={{
            width: '70%',
            color: 'text.primary'
          }}
        />
        <FormControl required sx={{ m: 1, width: '70%'}} variant='filled' size='small'>
          <InputLabel color='secondary' htmlFor='password-required'>Mot de passe</InputLabel>
          <FilledInput id='password-required' color='primary'
            type={showPassword ? 'text' : 'password'}
            value={userData.password}
            onInput={event => modifyForm(event as React.ChangeEvent<HTMLInputElement>, 'password')}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton aria-label='toggle password visibility' edge='end'
                  onClick={toggleShowPassword}
                  onMouseDown={toggleShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button variant='contained' sx={{ bgcolor: 'primary.dark'}}
          focusRipple={false}
          onClick={login}
        >
          <Typography sx={{ color: 'text.primary' }}>Valider</Typography>
        </Button>

        <Button onClick={handleOpen}>
          {'Votre première connexion ? C\'est par ici !'}
        </Button>
        <Modal
          open={openRegister}
          onClose={handleClose}
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '25%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'transparent',
            boxShadow: 'none' 
          }}>
            <Register closeModal={handleClose} />
          </Box>
        </Modal>
      </Stack>
    </Box>
  )
}

function LoginWrapper() {
  const [render, setRender] = React.useState(false)
  const [user, loading] = useAuthState(auth)
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (user && user.emailVerified) router.push({ pathname: '/'})
      else setRender(true)
    }
  }, [loading, user, router])

  if (render) return <Login />
  else return < ></>
}

export default LoginWrapper
