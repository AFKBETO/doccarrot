import {Grid, Typography, Box, Paper, TextField} from "@mui/material";
import React from "react";
import {styled} from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: 'black',
    maxWidth: 800,
    marginRight: 30
}))

function Pourquoi() {
    return (
        <Grid container direction='column' sx={{ px:5, pb: 10, overflow: 'auto' }}>

            <Typography variant="h2">Pourquoi Ormeli ?</Typography>

            <Grid container>
                <Item sx={{ background: '#ABBD98', borderRadius: 5, padding: 3, marginTop: 3 }}>
                    <Typography variant="h3" sx={{ marginBottom: 3, textDecoration: 'underline' }}>Construisons ensemble les services e-santé de demain</Typography>
                    <Typography variant="h4" sx={{ marginBottom: 3, textAlign: 'justify' }}>
                        En 2021 il devrait être aussi simple et sécurisé d&apos;accéder à ses données de santé qu&apos;à ses données bancaires. La santé connait une incroyable accélération du virage numérique et d&apos;ici 2025 pourrait être à 100% digitalisée. Nous rendons cela possible.
                    </Typography>
                </Item>

                <Item sx={{ background: '#ABBD98', borderRadius: 5, padding: 3, marginTop: 3 }}>
                    <Typography variant="h3" sx={{ marginBottom: 3, textDecoration: 'underline' }}>Nous maîtrisons toutes les contraintes réglementaires, y compris les plus exigeantes.</Typography>
                    <Typography variant="h4" component='div' sx={{ marginBottom: 3, textAlign: 'justify' }}>
                        Ormeli est pleinement engagé à accompagner le virage numérique en santé porté par le Ministère de la Santé, l&apos;ANS et l&apos;Assurance Maladie avec le plan MaSanté2022 et Ségur numérique de la ville.
                        <br />
                        <br />
                        Notre infrastructure ouverte et interopérable nous permet de développer des connexions aux nouveaux téléservices tels que SIDEP, la e-prescription unifiée, l&apos;ENS, l&apos;INSI, le DMP, la messagerie sécurisée MSsanté et de proposer ces téléservices au sein de nos solutions.
                    </Typography>
                </Item>

                <Item sx={{ background: '#ABBD98', borderRadius: 5, padding: 3, marginTop: 3 }}>
                    <Typography variant="h3" sx={{ marginBottom: 3, textDecoration: 'underline' }}>Nous digitalisons avec vous n&apos;importe quel processus e-santé.</Typography>
                    <Typography variant="h4" component='div' sx={{ marginBottom: 3, textAlign: 'justify' }}>
                        Nous apportons la couche technologique indispensable aux acteurs de la santé d&apos;aujourd&apos;hui grâce à notre lab d&apos;innovation Tech composé d&apos;une trentaine d&apos;ingénieurs, designers et product managers
                    </Typography>
                </Item>

                <Item sx={{ background: '#ABBD98', borderRadius: 5, padding: 3, marginTop: 3 }}>
                    <Typography variant="h3" sx={{ marginBottom: 3, textDecoration: 'underline' }}>Nos valeurs les plus fondamentales sont la protection des données de santé, la transparence, et le respect des règles éthiques et déontologiques.</Typography>
                    <Typography variant="h4" component='div' sx={{ marginBottom: 3, textAlign: 'justify' }}>
                        Depuis sa création, Ormeli travaille avec plusieurs avocats spécialisés en matière de protection des données à caractère personnel et droit de la santé, et se fait assister par un délégué à la protection des données (DPO) dont les compétences ont été certifiées par la CNIL.
                        Sur les sites internet d&apos;Ormeli et de Covid-Pharma, l&apos;ensemble des éléments nécessaires à la parfaite information des professionnels de santé et de leurs patients sont rendus disponibles : politiques de confidentialité, déclaration sur le RGPD et charte du sous-traitant.
                    </Typography>
                </Item>
            </Grid>

        </Grid>
    )
}

export default Pourquoi
