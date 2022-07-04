import React, { ReactElement, PropsWithChildren } from 'react'
import { UserType } from '../config/types'
import { useUserData } from '../config/userDataHooks'
import { Grid } from '@mui/material'
import Loader from './Loader'

interface Props {
  userId: string
  userType?: UserType | null
}

function RouteGuard(props: PropsWithChildren & Props): ReactElement {
    const { userId, loading, error, userType } = useUserData()

    if (loading) {
        return (
            <Grid container sx={{ padding: 10, textAlign: 'center' }}>
              <Loader show />
            </Grid>
        )
    }

    if (error) {
        return (
            <Grid container sx={{ padding: 10 }}>
              Erreur de chargement des données.
            </Grid>
      )
    }

    if (props.userId !== userId) {
        return (
            <Grid container sx={{ padding: 10, textAlign: 'center' }}>
              <Loader show />
            </Grid>
        )
    }

    if (props.userType !== null && props.userType !== undefined && (userType !== props.userType)) {
        return <div>{`Vous n'avez pas la permission suffisante !`}</div>
    }

    return props.children as ReactElement
}

export default RouteGuard
