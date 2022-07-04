import React from "react"

import { createTheme } from "@mui/material/styles"

export default function theme () {
    return createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#b8cca7',
                light: '#eaffd9',
                dark: '#889b78',
                contrastText: '#000000'
            },
            secondary: {
                main: '#ffffff'
            },
            text: {
                primary: '#000000',
                secondary: '#ffffff'
            }
        },
        typography: {
            h1: {
                fontSize: 40,
                color: 'white'
            },
            h2: {
                fontWeight: "bold",
                fontSize: 30,
                color: 'black',
                marginTop: 35,
                marginBottom: 35
            },
            h3: {
                fontSize: 25,
                color: 'white',
                marginTop: 5,
                marginBottom: 5
            },
            h4: {
                fontSize: 17,
                color: 'white',
            },
            body1: {
                fontSize: 17,
                color: 'black'
            },
            body2: {
                fontSize: 16,
                color: 'black'
            }
        },
        components: {
            MuiButton: {
                defaultProps: {
                    sx: { color: '#fff' }
                }
            }
        },
    })
}
