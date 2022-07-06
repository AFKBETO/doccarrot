import { useRouter } from 'next/router'
import React from 'react'
import { USER_CONTEXT } from '../../../config/userContext'
import RouteGuard from '../../../components/RouteGuard'
import {Box, Grid, Paper, TextField, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: 'black',
}))

const propsStyle = {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 1
}

const userTypeNames = ['patient', 'médecin', 'pharmacien']

function User () {
    const router = useRouter()
    const { userid } = router.query
    const userContext = React.useContext(USER_CONTEXT)

    return (
        <RouteGuard userId={userid as string}>
            <Grid container sx={{ paddingLeft: 5, paddingRight:5, paddingBottom: 10 }}>
                <Grid item>
                    <Typography variant="h2">Votre compte Ormeli</Typography>

                    {/*---------- GENERALITES ----------*/}
                    <Item sx={{ background: '#ABBD98', borderRadius: 5, padding: 3 }}>
                        <Typography variant="h3" sx={{ marginBottom: 3, textDecoration: 'underline' }}>Généralités</Typography>
                        <Box sx={propsStyle}>
                            <Typography variant='h4'>Type de compte : </Typography>
                            <Typography variant='h5'>&nbsp;{ userTypeNames[userContext.userType as number] }</Typography>
                        </Box>
                        <Box sx={propsStyle}>
                            <Typography variant='h4'>Numéro utilisateur : </Typography>
                            <Typography variant='h5'>&nbsp;{ userContext.userPublicID }</Typography>
                        </Box>
                    </Item>

                    {/*---------- PARAMETRES UTILISATEUR ----------*/}
                    <Item sx={{ background: '#ABBD98', borderRadius: 5, padding: 3, marginTop: 3 }}>
                        <Typography variant="h3" sx={{ marginBottom: 3, textDecoration: 'underline' }}>Paramètres utilisateur</Typography>
                        <Box sx={propsStyle}>
                            <Typography variant='h4'>Prénom : </Typography>
                            <TextField id="location" type="text" variant="outlined" sx={{marginLeft: 1}}
                                       value={ userContext.userName?.split(' ')[0] }
                            />
                        </Box>
                        <Box sx={propsStyle}>
                            <Typography variant='h4'>Nom : </Typography>
                            <TextField id="location" type="text" variant="outlined" sx={{marginLeft: 1}}
                                       value={ userContext.userName?.split(' ')[1] }
                            />
                        </Box>
                    </Item>
                </Grid>
            </Grid>
      </RouteGuard>
    )
}

export default User
