import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from '../../config/firebase'
import { AuthData } from '../../config/types'
import useViewport from '../../config/viewportHook'
import Register from "../../components/Register"

import { Box, Typography, TextField, FormControl, InputLabel, FilledInput, InputAdornment, IconButton, Stack , Button, Modal } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import toast from 'react-hot-toast'



const medSize = 900
const smallSize = 600

const modalStyle = (width: number) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: ((width > medSize) ? '25%' : ((width > smallSize) ? '50%' : '70%')),
  transform: 'translate(-50%, -50%)',
  margin: 'auto', mt: 4, py: 2, border: 1, borderRadius: '20px', backgroundColor: 'primary.dark',
  boxShadow: 'none' 
})

function Login() {
  const [userData, setUserData] = React.useState<AuthData>({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const [openRegister, setOpenRegister] = React.useState<boolean>(false)
  const [openReset, setOpenReset] = React.useState<boolean>(false)
  const { width } = useViewport()

  const router = useRouter()

  const handleOpenRegister = () => setOpenRegister(true)
  const handleCloseRegister = () => setOpenRegister(false)
  const handleOpenReset = () => setOpenReset(true)
  const handleCloseReset = () => setOpenReset(false)

  const modifyForm = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setUserData({
      ...userData,
      [field]: event.target.value
    })
  }
  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const sendPasswordReset = async () => {
    try{
      await sendPasswordResetEmail(auth, userData.email)
    } catch (error) {
      console.log(error)
    }
    setOpenReset(false)
    toast.success(`Un message de réinitialisation de mot de passe a été envoyé à ${userData.email}`)
    setUserData({email: '', password: ''})
    
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
        width: ((width > medSize) ? '25%' : ((width > smallSize) ? '50%' : '70%')),
        margin: 'auto',
        mt: 4,
        pt: 2,
        mb: 4,
        borderRadius: '20px',
        backgroundColor: 'primary.main'
      }}
    >
      <Typography variant='h3' align='center'>Connexion</Typography>
      <Stack spacing={1} justifyContent='center' alignItems='center' sx={{ my: 4, pb: 2}}>
        <TextField id='email-required' variant='filled' label='Email' type='email' color='secondary' size='small' required
          value={openReset ? '' : userData.email}
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
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
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

        <Button onClick={handleOpenRegister}>
          {'Votre première connexion ? C\'est par ici !'}
        </Button>
        <Modal
          open={openRegister}
          onClose={handleCloseRegister}
        >
          <Box sx={modalStyle(width)}>
            <Register closeModal={handleCloseRegister} />
          </Box>
        </Modal>
        <Button variant='contained' sx={{ bgcolor: 'primary.dark'}} focusRipple={false} onClick={handleOpenReset}>
          {'Mot de passe oublié ?'}
        </Button>
        <Modal
          open={openReset}
          onClose={handleCloseReset}
        >
          <Box sx={modalStyle(width)}>
            <Stack spacing={1} justifyContent="center" alignItems="center" >
              <Typography variant='h4'>Réinitialisez votre mot de passe</Typography>
              <TextField id='email-required' variant='filled' label='Saisissez votre email' type='email' color='secondary' size='small' required
                value={userData.email}
                onInput={event => modifyForm(event as React.ChangeEvent<HTMLInputElement>, 'email')}
                sx={{
                  width: '70%',
                  color: 'text.primary'
                }}
              />
              <Button variant='contained' sx={{ bgcolor: 'primary.dark'}}
                focusRipple={false}
                onClick={sendPasswordReset}
              >
                <Typography sx={{ color: 'text.primary' }}>Valider</Typography>
              </Button>
            </Stack>
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
