import {Grid, Typography, Box, Paper} from "@mui/material"
import React from "react"
import {styled} from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: 'black',
    maxWidth: 800,
    marginRight: 30
}))

function Solutions() {
  return (
      <Grid container direction='column' sx={{ px:5, pb: 10, overflow: 'auto' }}>

          <Typography variant="h2">Nos solutions</Typography>

          <Grid container>
              <Item sx={{ background: '#ABBD98', borderRadius: 5, padding: 3, marginTop: 3 }}>
                  <Typography variant="h3" sx={{ marginBottom: 3, textDecoration: 'underline' }}>
                      Pour les pharmaciens :
                      <br />
                      Accompagnez vos patients avec de nouveaux services numériques
                  </Typography>
                  <Typography variant="h4" sx={{ marginBottom: 3, textAlign: 'justify' }}>
                      Ormeli vous propose des solutions simplifiant le suivi du parcours de soin et vous déchargeant des tâches administratives.
                  </Typography>
              </Item>

              <Item sx={{ background: '#ABBD98', borderRadius: 5, padding: 3, marginTop: 3 }}>
                  <Typography variant="h3" sx={{ marginBottom: 3, textDecoration: 'underline' }}>
                      Pour les médecins :
                      <br />
                      Gagnez du temps avec notre solution médicale en ligne
                  </Typography>
                  <Typography variant="h4" component='div' sx={{ marginBottom: 3, textAlign: 'justify' }}>
                      Conçue autour de la e-prescription et enrichie de multiples fonctionnalités pour simplifier votre pratique.
                  </Typography>
              </Item>

              <Item sx={{ background: '#ABBD98', borderRadius: 5, padding: 3, marginTop: 3 }}>
                  <Typography variant="h3" sx={{ marginBottom: 3, textDecoration: 'underline' }}>
                      Pour les patients :
                      <br />
                      Fini les ordonnances perdues, imprimées, ré-imprimées
                  </Typography>
                  <Typography variant="h4" component='div' sx={{ marginBottom: 3, textAlign: 'justify' }}>
                      e-ordonnances, compte rendu de (télé)consultation, formulaires médicaux, etc, le patient peut retrouver tout son historique de suivi des derniers 24 mois dans son espace personnel. Le patient est maître de ses données, et décide de partager ou restreindre l&apos;accès à ses ordonnances à n&apos;importe quel professionnel de santé de France de son choix.
                  </Typography>
              </Item>

              <Item sx={{ background: '#ABBD98', borderRadius: 5, padding: 3, marginTop: 3 }}>
                  <Typography variant="h3" sx={{ marginBottom: 3, textDecoration: 'underline' }}>
                      Adoptez la e-prescription sécurisée
                  </Typography>
                  <Typography variant="h4" component='div' sx={{ marginBottom: 3, textAlign: 'justify' }}>
                      La prescription électronique signée avec une signature conforme Ormeli permet d&apos;authentifier le prescripteur et de rendre infalsifiable l&apos;e-ordonnance émise. La e-ordonnance est accessible à vos patients, ils maîtrisent le partage de leur données et leur parcours de soin. Délivrable dans toutes les pharmacies, la gestion de la délivrance par le pharmacien se fait en ligne et assure sa traçabilité.
                  </Typography>
              </Item>

          </Grid>

      </Grid>
  )
}

export default Solutions
