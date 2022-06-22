import React from "react"

import { createTheme } from "@mui/material/styles"

export default function theme () {
  return createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#889b78',
        light: '#eaffd9'
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
