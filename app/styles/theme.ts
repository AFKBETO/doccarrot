import React from "react"

import { createTheme } from "@mui/material/styles"

export default function theme () {
  return createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#b8cca7',
        light: '#eaffd9',
        dark: '#889b78'
      },
      secondary: {
        main: '#ffffff'
      },
      text: {
        primary:'#ffffff',
        secondary:'#ffffff'
      }
    },
    components: {
      MuiButton: {
        defaultProps: {
          sx:{color: '#fff'}
        }
      }
    }
  })
}
