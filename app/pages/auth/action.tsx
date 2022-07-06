import { VisibilityOff, Visibility } from "@mui/icons-material"
import { Box, BoxProps, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, Stack, TextField } from "@mui/material"
import { applyActionCode, verifyPasswordResetCode } from "firebase/auth"
import { useRouter } from "next/router"
import React from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import Loader from "../../components/Loader"
import { auth } from "../../config/firebase"
import { AuthData } from "../../config/types"
import { validatePassword } from "../../config/validators"



function ResetPassword (props : { actionCode: string } & BoxProps) {
  const [userData, setUserData] = React.useState<AuthData>({
    email: '',
    password: ''
  })
  const [status, setStatus] = React.useState<'loading' | 'ok' | 'error'>('loading')
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
  })

  switch (status) {
    case 'loading': {
      return (
        <Box {...props}><Loader show /></Box>
        
      )
    }
    case 'ok': {
      return (
        <Box {...props}>
          <Stack spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 4}}>
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
  })

  switch (status) {
    case 'loading': {
      return (
        <Box {...props}><Loader show /></Box>
        
      )
    }
    case 'ok': {
      return (
        <Box {...props}>Code ok</Box>
      )
    }
    default: {
      return (
        <Box {...props}>Code invalide</Box>
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
  return (<Box>Mode invalide</Box>)
  
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
  
  if (render) return <Action />
  else return <></>
  }

export default ActionWrapper
