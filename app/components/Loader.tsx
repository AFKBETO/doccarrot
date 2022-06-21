import { CircularProgress } from '@mui/material'
import React from 'react'

interface Props {
  show: boolean
}

function Loader({show} : Props) {
  return (
    show ? <div className='loader'><CircularProgress /></div> : null
  )
}

export default Loader
