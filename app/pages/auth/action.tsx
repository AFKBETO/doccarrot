import { VisibilityOff, Visibility } from "@mui/icons-material"
import { Box, BoxProps, Button, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, Stack, TextField, Typography } from "@mui/material"
import { applyActionCode, confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth"
import { useRouter } from "next/router"
import React from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import toast from "react-hot-toast"
import Loader from "../../components/Loader"
import { auth } from "../../config/firebase"
import { AuthData } from "../../config/types"
import { validatePassword } from "../../config/validators"



function ResetPassword (props : { actionCode: string } & BoxProps) {
  const [userData, setUserData] = React.useState<AuthData>({
    email: '',
    password: ''
  })
  const [status, setStatus] = React.useState<'loading' | 'ok' | 'error' | 'changed'>('loading')
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const [errorValidator, setErrorValidator] = React.useState({
    password: [] as React.ReactNode[],
    passwordConfirm: false,
    freshPassword: true
  })

  const verifyCode = async () => {
    try {
      const email = await verifyPasswordResetCode(auth, props.actionCode)
      setUserData({...userData, email: email})
      setStatus('ok')
    } catch (error) {
      setStatus('error')
    }
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

  React.useEffect(() => {
    verifyCode()
  }, [props.actionCode])

  const submit = async () => {
    try {
      await confirmPasswordReset(auth, props.actionCode, userData.password)
      toast.success('Votre mot de passe a été modifié.')
      setStatus('changed')
    } catch (error) {
      toast.error(error.message)
    }
  }

  switch (status) {
    case 'changed': {
      return (
        <Box {...props}>
          Votre mot de passe a été modifié. Vous pouvez vous authentifier.
          <Button href='/login'>Login</Button>
        </Box>
      )
    }
    case 'loading': {
      return (
        <Box {...props}><Loader show /></Box>
        
      )
    }
    case 'ok': {
      return (
        <Box {...props}>
          <Stack spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 4}}>
            <Typography sx={{ color: 'text.primary' }}>Réinitialisation de mot de passe</Typography>
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
                      {showPassword ? <VisibilityOff /> : <Visibility />}
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
            <Box textAlign='center' sx={{ my: 4}}>
              <Button variant="contained"
                disabled={
                  errorValidator.password.length > 0 || 
                  errorValidator.passwordConfirm ||
                  errorValidator.freshPassword
                }
                sx={{ bgcolor: 'primary.dark' }}
                focusRipple={false}
                onClick={submit}
              >
                <Typography sx={{ color: 'text.primary' }}>Valider</Typography>
              </Button>
            </Box>
          </Stack>
        </Box>
      )
    }
    default: {
      return (
        <Box {...props}>Code invalide</Box>
      )
    }
  }
}

function VerifyEmail (props : { actionCode: string } & BoxProps) {
  const [status, setStatus] = React.useState<'loading' | 'ok' | 'error'>('loading')

  const verifyCode = async () => {
    try {
      await applyActionCode(auth, props.actionCode)
      setStatus('ok')
    } catch (error) {
      setStatus('error')
    }
  }

  React.useEffect(() => {
    verifyCode()
  }, [props.actionCode])

  switch (status) {
    case 'loading': {
      return (
        <Box {...props}><Loader show /></Box>
        
      )
    }
    case 'ok': {
      return (
        <Box {...props}>
          Votre email a été vérifié. Vous pouvez vous authentifier.
          <Button href='/login'>Login</Button>
        </Box>
      )
    }
    default: {
      return (
        <Box {...props}>
          Code invalide.
          <Button href='/login'>Login</Button>
        </Box>
      )
    }
  }
}

function Action (props: BoxProps) {
  const router = useRouter()
  const { mode, oobCode } = router.query

  if (mode == 'resetPassword') {
    return <ResetPassword {...props} actionCode={oobCode as string} />
  }
  if (mode == 'verifyEmail') {
    return <VerifyEmail {...props} actionCode={oobCode as string} />
  }
  return (<Box {...props}>
      Mode invalide
      <Button href='/login'>Login</Button>
    </Box>
  )
}

function ActionWrapper() {
  const [render, setRender] = React.useState(false)
  const [user, loading] = useAuthState(auth)
  const router = useRouter()
  
  React.useEffect(() => {
    if (!loading) {
    if (user && user.emailVerified) router.push({ pathname: '/'})
    else setRender(true)
    }
  }, [loading, user, router])
  
  if (render) return <Action sx={{
      width: '25%',
      margin: 'auto',
      textAlign: 'center',
      mt: 4,
      padding: 4,
      mb: 4,
      borderRadius: '20px',
      backgroundColor: 'primary.main'
    }} />
  else return <></>
}

export default ActionWrapper
