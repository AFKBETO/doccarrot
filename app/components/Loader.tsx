import CircularProgress from '@mui/material/CircularProgress'

interface Props {
  show: boolean
}

function Loader({ show } : Props) {
  return (
    show ? <div className='loader'><CircularProgress /></div> : null
  )
}

export default Loader
