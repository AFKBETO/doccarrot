import { CircularProgress } from '@mui/material'
import React from 'react'

interface loaderData {
  show: boolean
}

function Loader({show} : loaderData) {
  return (
    show ? <div className="loader"><CircularProgress /></div> : null
  )
}

export default Loader
