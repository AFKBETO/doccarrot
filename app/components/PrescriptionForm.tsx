import { Box, Grid, GridProps, Typography } from '@mui/material'
import React from 'react'

type Props = {}

function PrescriptionForm({ item, xs }: Props & GridProps) {
  return (
    <Grid item xs={xs} sx={{background: '#ABBD98', borderRadius: 5}}>
      <Box sx={{ textAlign: 'center', justify: 'center' }}>
        <Typography variant='h3'>Espace édition</Typography>
      </Box>
      <Grid container>
        <Grid item xs={4}>
          <Typography variant='h4'>Médecin traitant</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant='h4'>Médecin traitant</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PrescriptionForm