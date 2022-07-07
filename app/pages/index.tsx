import {Box, Grid, Typography} from '@mui/material'
import React from 'react'
import { USER_CONTEXT } from "../config/userContext"
import Loader from "../components/Loader"
import Carousel from 'react-material-ui-carousel'
import Image from 'next/image'

const images = [
  {
    imgPath:
        'https://media.discordapp.net/attachments/885519275870265415/994609467750613052/ordonnance-medecin.jpeg',
  },
  {
    imgPath:
        'https://media.discordapp.net/attachments/885519275870265415/994609468077772890/pillules.jpeg',
  },
  {
    imgPath:
        'https://media.discordapp.net/attachments/885519275870265415/994609468371370024/pillules2.jpeg',
  }
];

function Home() {
  const userContext = React.useContext(USER_CONTEXT)

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

  return (
      <Grid container direction='column' sx={{ px:5, pb: 10, overflow: 'auto' }}>
        <Typography variant='h2' align='center'>Bienvenue sur Ormeli.</Typography>

        <Carousel sx={{ textAlign: 'center', zIndex: 1 }}>
          {
            images.map((image, idx) => (
                <Box key={idx} style={{zIndex:1}}>
                  <Image src={image.imgPath} width={500} height={300} style={{zIndex:1}} />
                </Box>
            ))
          }
        </Carousel>
      </Grid>
  )
}

export default Home
