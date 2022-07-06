import Head from 'next/head'
import {Box, Button, Grid, MobileStepper, Typography} from '@mui/material'
import React from 'react'
import { USER_CONTEXT } from "../config/userContext";
import Loader from "../components/Loader";
// @ts-ignore
import SwipeableViews from 'react-swipeable-views';
// @ts-ignore
import { autoPlay } from 'react-swipeable-views-utils';
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import theme from "../styles/theme";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
    {
        imgPath:
            'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        imgPath:
            'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        imgPath:
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
    },
    {
        imgPath:
            'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    }
];

function Home() {
    const userContext = React.useContext(USER_CONTEXT)
    const [activeStep, setActiveStep] = React.useState(0);

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
    /*if (userContext.firebaseUser) {
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
    }*/

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Grid container sx={{ px:5, pb: 10, overflow: 'auto' }}>
            <Head>
                <title>Ormeli</title>
                <meta name='description' content='Ormeli App' />
                <link rel='icon' href='/favicon.png' />
            </Head>

            <main>
                <Typography variant='h2' align='center'>Bienvenue sur Ormeli.</Typography>
                <div>
                    <AutoPlaySwipeableViews align='center'
                                            axis='x'
                                            index={activeStep}
                                            onChangeIndex={ (index: number) => setActiveStep(index) }
                                            enableMouseEvents
                    >
                        {images.map((step, index) => (
                            <div key={step.imgPath}>
                                {Math.abs(activeStep - index) <= 2 ? (
                                    <Box
                                        component="img"
                                        sx={{
                                            height: 255,
                                            display: 'block',
                                            maxWidth: 400,
                                            overflow: 'hidden',
                                            width: '100%',
                                        }}
                                        src={step.imgPath}
                                        alt={step.imgPath}
                                    />
                                ) : null}
                            </div>
                        ))}
                    </AutoPlaySwipeableViews>
                    <MobileStepper
                        steps={ images.length }
                        position="static"
                        activeStep={ activeStep }
                        nextButton={
                            <Button size="small" onClick={handleNext} disabled={ activeStep === images.length - 1 }>
                                <Typography variant='h5'><KeyboardArrowRight /></Typography>
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={ activeStep === 0 }>
                                <Typography variant='h5'><KeyboardArrowLeft /></Typography>
                            </Button>
                        }
                    />
                </div>
            </main>
        </Grid>
    )
}

export default Home
