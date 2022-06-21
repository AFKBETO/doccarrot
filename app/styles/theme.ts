import React from "react"

import { createTheme } from "@mui/material/styles"

export default function theme (lightMode: boolean) {
  return React.useMemo(
    () => createTheme({
      palette: {
        mode: lightMode ? 'light' : 'dark',
        primary: {
          main: '#b8cca7',
          light: '#eaffd9',
          dark: '#889b78'
        },
        text: {
          primary: lightMode? '#000000' : '#b8cca7'
        }
      },
    }),
    [lightMode],
  )
}
