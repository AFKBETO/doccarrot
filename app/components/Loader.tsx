
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

interface Props {
  show: boolean
}

function Loader({ show } : Props) {
  return (
    show ? <Box className='loader'><CircularProgress /></Box> : null
  )
}

export default Loader
