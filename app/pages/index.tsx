import {Box, Button, Grid, MobileStepper, Typography} from '@mui/material'
import React from 'react'
import { USER_CONTEXT } from "../config/userContext";
import Loader from "../components/Loader";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SwipeableViews from 'react-swipeable-views';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { autoPlay } from 'react-swipeable-views-utils';
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"

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
      <Grid container sx={{ padding: 10, alignItems: 'center' }}>
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Grid container sx={{ px:5, pb: 10, overflow: 'auto' }}>
      <Typography variant='h2' align='center'>Bienvenue sur Ormeli.</Typography>
      <Box>
        <AutoPlaySwipeableViews align='center'
                    axis='x'
                    index={activeStep}
                    onChangeIndex={ (index: number) => setActiveStep(index) }
                    enableMouseEvents
        >
          {images.map((step, index) => (
            <Box key={step.imgPath}>
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
            </Box>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={ images.length }
          position="static"
          activeStep={ activeStep }
          nextButton={
            <Button size="small" onClick={handleNext} disabled={ activeStep === images.length - 1 }>
              <Typography variant='h5' component='div'><KeyboardArrowRightIcon /></Typography>
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={ activeStep === 0 }>
              <Typography variant='h5' component='div'><KeyboardArrowLeftIcon /></Typography>
            </Button>
          }
        />
      </Box>
    </Grid>
  )
}

export default Home
