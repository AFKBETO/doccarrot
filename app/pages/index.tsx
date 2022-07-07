import {Box, Button, Grid, IconButton, ListItem, ListItemText, MobileStepper, Paper, Typography} from '@mui/material'
import React from 'react'
import { USER_CONTEXT } from "../config/userContext";
import Loader from "../components/Loader";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SwipeableViews from 'react-swipeable-views';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { autoPlay } from 'react-swipeable-views-utils';
//import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
//import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import Carousel from 'react-material-ui-carousel'
//import RemoveIcon from "@mui/icons-material/Remove";

//const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    imgPath:
        'https://media.discordapp.net/attachments/885519275870265415/994609467750613052/ordonnance-medecin.jpeg',
  },
  {
    imgPath:
        'https://media.discordapp.net/attachments/885519275870265415/994609468077772890/pillules.jpeg?width=1014&height=676',
  },
  {
    imgPath:
        'https://media.discordapp.net/attachments/885519275870265415/994609468371370024/pillules2.jpeg',
  }
];

function Home() {
  const userContext = React.useContext(USER_CONTEXT)
  //const [activeStep, setActiveStep] = React.useState(0);

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

  /*const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };*/

  return (
      <Grid container direction='column' sx={{ px:5, pb: 10, overflow: 'auto' }}>
        <Typography sx={{mb: 10}} variant='h2' align='center'>Bienvenue sur Ormeli.</Typography>

        <Carousel sx={{ textAlign: 'center' }}>
          {
            images.map((image, idx) => (
                <Paper key={idx}>
                  <img src={image.imgPath} style={{ height: 500 }} />
                </Paper>
            ))
          }
        </Carousel>

        { /*<Box>
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
                            display: 'block',
                            maxWidth: 600,
                            overflow: 'hidden',
                            width: '100%',
                            maxHeight: 300
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
        </Box> */ }
      </Grid>
  )
}

export default Home
