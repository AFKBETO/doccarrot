import React from 'react'
import {USER_CONTEXT} from "../../../../config/userContext";
import { styled, alpha } from '@mui/material/styles';
import UpgradeIcon from '@mui/icons-material/Upgrade';
//import Link from 'next/link'
import { Paper, Modal, Box, TextField, List, Toolbar, Typography, Button, IconButton, Grid, ListSubheader, ListItem, ListItemText, CssBaseline, Avatar, ListItemAvatar } from '@mui/material'
import RouteGuard from '../../../../components/RouteGuard'
import { useRouter } from 'next/router'
import { UserType } from '../../../../config/types'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'black',
}))


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};



const readQRCode = () => {
  console.log('read')
}

const readCode = () => {
  console.log('read')
}

const updatePrescri = () => {
  console.log('update')
}

function IndexPharmacien() {
  const userContext = React.useContext(USER_CONTEXT)
  const router = useRouter()
  const { userid } = router.query

  const [open, setOpen] = React.useState({
    modal1: false,
    modal2: false,
    modal3: false
  })
  
  const handleOpen = (event: React.MouseEvent, field: string) => setOpen({...open, [field]: true}) 
  const handleClose = (event: React.MouseEvent, field: string) => setOpen({...open, [field]: false}) 
  
  return (
    <RouteGuard userId={userid as string} userType={UserType.pharmacist}>
      <Grid container spacing={2} sx={{paddingLeft: 5, paddingRight:5, paddingBottom: 10}} direction='row'>
        <Grid item xs={10}>
          <Typography><h1>Mon espace pharmacien</h1></Typography>
        </Grid>
        <Grid item xs={3}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Item sx={{background: '#ABBD98', borderRadius: 5}}>
                <Button onClick={event => handleOpen(event, 'modal2')}>scanner qrcode</Button>
              </Item>
              <Modal
                open={open.modal2}
                onClose={(event: React.MouseEvent<Element, MouseEvent>) => handleClose(event, 'modal2')}
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Scanner le QRCode
                  </Typography>
                </Box>
              </Modal>
            </Grid>
            <Grid item xs={10}>
              <Item sx={{background: '#ABBD98', borderRadius: 5}}>
                <Button onClick={event => handleOpen(event, 'modal1')}>code</Button>
              </Item>
              <Modal
                open={open.modal1}
                onClose={(event: React.MouseEvent<Element, MouseEvent>) => handleClose(event, 'modal1')}
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Entrez un code de prescription
                  </Typography>
                  <TextField id="standard-basic" label="CODE" variant="standard"/>
                </Box>
              </Modal>
            </Grid>
          </Grid> 
        </Grid>
        <Grid item xs={8}>
          <Item sx={{background: '#ABBD98', borderRadius: 5}}>
            <Typography><h1>Prescription</h1></Typography>
          </Item>
        </Grid>
        <Grid item xs={1}>
          <Item sx={{background: '#ABBD98', borderRadius: 5}}>
            <Grid container spacing={2} direction='column'>
              <Grid item xs={1}>
                <IconButton component="span">
                  <UpgradeIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Item>
        </Grid>
      </Grid>
    </RouteGuard>
  )
}

export default IndexPharmacien
