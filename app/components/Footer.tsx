import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { UserType } from '../config/types'
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Grid, Popper, Dialog, DialogTitle } from '@mui/material'



  const contenus = ['Mentions Légales', 'Crédits','A propos'];

    export interface SimpleDialogProps {
        open: boolean;
        selectedValue: string;
        onClose: (value: string) => void;
      }

    function SimpleDialog(props: SimpleDialogProps) {
        const { onClose, selectedValue, open } = props;
      
        const handleClose = () => {
          onClose(selectedValue);
        };
      
        const handleListItemClick = (value: string) => {
          onClose(value);
        };
      
        return (
          <Dialog onClose={handleClose} open={open}>
            <DialogTitle>{props.selectedValue}</DialogTitle>
            
          </Dialog>
        );
      }

    export default function Footer() {
        const [open, setOpen] = React.useState(false);
        const [selectedValue, setSelectedValue] = React.useState(contenus[0]);
      
        const handleClickOpen = () => {
          setOpen(true);
        };
      
        const handleClose = (value: string) => {
          setOpen(false);
          setSelectedValue(value);
        }; 

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Grid
                container
                direction='row'
                justifyContent='flex-start'
                alignItems='center'
                spacing={4}
                sx={{ flexShrink: 3 }}
            >
                <Grid item xs={3}>
                    <Image
                    src='/carotte_assistant.png'
                    width='72vw'
                    height='100vh'
                    alt='Carotte Assistant'
                    />  
                </Grid>
                
                <Grid item xs={3}>
                  
                    <Button color='inherit' onClick={handleClickOpen}>
                        Mentions légales
                    </Button>
                    <SimpleDialog
                        selectedValue={selectedValue}
                        open={open}
                        onClose={handleClose}
                    />
                    
                </Grid>
            <Grid item xs={3}>
            <Button color='inherit' onClick={handleClickOpen}>
                        A propos
                    </Button>
                    <SimpleDialog
                        selectedValue={selectedValue}
                        open={open}
                        onClose={handleClose}
                    />
            </Grid>  
            <Grid item xs={3}>
            <Button color='inherit' onClick={handleClickOpen}>
                        Crédits
                    </Button> 
                    <SimpleDialog
                        selectedValue={selectedValue}
                        open={open}
                        onClose={handleClose}
                    />
                </Grid>       
            </Grid>
            </Toolbar>
        </AppBar>
        </Box>
    );
}

