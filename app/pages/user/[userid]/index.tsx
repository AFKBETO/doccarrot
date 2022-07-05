import { useRouter } from 'next/router'
import React from 'react'
import { USER_CONTEXT } from '../../../config/userContext'
import RouteGuard from '../../../components/RouteGuard'
import {Grid, Typography} from "@mui/material";

function User () {
    const router = useRouter()
    const { userid } = router.query
    const userContext = React.useContext(USER_CONTEXT)

    return (
        <RouteGuard userId={userid as string}>
            <Grid container sx={{ paddingLeft: 5, paddingRight:5, paddingBottom: 10 }}>
                <Grid item>
                    <Typography variant="h2">Hello, { userContext.userName }</Typography>
                    <p style={{ textAlign: 'justify' }}>
                      ... paramètres utilisateur ...
                    </p>
                </Grid>
            </Grid>
      </RouteGuard>
    )
}

export default User
