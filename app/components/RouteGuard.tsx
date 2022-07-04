import React, { ReactElement, PropsWithChildren } from 'react'
import { UserType } from '../config/types'
import { Grid } from '@mui/material'
import Loader from './Loader'
import {USER_CONTEXT} from "../config/dataContexts";

interface Props {
  userId: string
  userType?: UserType | null
}

function RouteGuard(props: PropsWithChildren & Props): ReactElement {
    const userContext = React.useContext(USER_CONTEXT)

    if (userContext.firebaseLoading) {
        return (
            <Grid container sx={{ padding: 10, textAlign: 'center' }}>
              <Loader show />
            </Grid>
        )
    }

    if (userContext.firebaseError) {
        return (
            <Grid container sx={{ padding: 10 }}>
                <>Erreur de chargement des données. {userContext.firebaseError}</>
            </Grid>
      )
    }

    if (props.userId !== userContext.userId) {
        return (
            <Grid container sx={{ padding: 10, textAlign: 'center' }}>
              Veuillez vous connecter à votre compte (props = {props.userId}, userContext = {userContext.userId})
            </Grid>
        )
    }

    if (props.userType !== null && props.userType !== undefined && (userContext.userType !== props.userType)) {
        return <div>{`Vous n'avez pas la permission suffisante !`}</div>
    }

    return props.children as ReactElement
}

export default RouteGuard
