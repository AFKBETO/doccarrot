import Head from 'next/head'
import {Box, Grid, Typography} from '@mui/material'
import React from 'react'
import { USER_CONTEXT } from "../config/userContext";
import Loader from "../components/Loader";
import {useHooks} from "../config/dataHooks";


function Home() {
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
    if (userContext.firebaseUser) {
        return (
            <Grid container sx={{ paddingLeft: 5, paddingRight:5, paddingBottom: 10 }}>
                <Grid item>
                    <Typography variant="h2">Bienvenue, { userContext.userName }</Typography>
                    <p style={{ textAlign: 'justify' }}>
                        {'... page d\'accueil ...'}
                    </p>
                </Grid>
            </Grid>
        )
    }

    return (
        <Box>
            <Head>
                <title>Ormeli</title>
                <meta name='description' content='Ormeli App' />
                <link rel='icon' href='/favicon.png' />
            </Head>

            <main>
                <Typography variant='h2' align='center'>Bienvenue sur Ormeli.</Typography>
            </main>
        </Box>
    )
}

export default Home
