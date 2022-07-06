import React, { ReactElement, PropsWithChildren } from 'react'
import { UserType } from '../config/types'
import { Grid, Typography } from '@mui/material'
import Loader from './Loader'
import {USER_CONTEXT} from "../config/userContext";

interface Props {
  userId: string
  userType?: UserType | null
}

function RouteGuard(props: PropsWithChildren & Props): ReactElement {
  const userContext = React.useContext(USER_CONTEXT)

  if (userContext.firebaseLoading || userContext.userId == null) {  // firebase might have finished loading, but not us
    return (
      <Grid container sx={{ padding: 10, textAlign: 'center' }}>
        <Loader show />
      </Grid>
    )
  }

  if (userContext.firebaseError) {
    return (
      <Grid container sx={{ padding: 10 }}>
        <Typography component='div'>
          {`Erreur de chargement des données. ${userContext.firebaseError}`}
        </Typography>
      </Grid>
    )
  }

  if (props.userId !== userContext.userId) {
    return (
      <Grid container sx={{ padding: 10, textAlign: 'center' }}>
        <Typography component='div'>
          Veuillez vous connecter à votre compte (props = {props.userId}, userContext = {userContext.userId})
        </Typography>
      </Grid>
    )
  }

  if (props.userType !== null && props.userType !== undefined && (userContext.userType !== props.userType)) {
    return (
      <Grid container sx={{ padding: 10, textAlign: 'center' }}>
        <Typography component='div'>
          {`Vous n'avez pas la permission suffisante !`}
        </Typography>
      </Grid>
    )
  }

  return props.children as ReactElement
}

export default RouteGuard
