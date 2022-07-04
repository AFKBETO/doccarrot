import { ReactElement, PropsWithChildren } from 'react'
import { UserType } from '../config/types'
import { useUserData } from '../config/userDataHooks'
import { Link } from '@mui/material'
import Loader from './Loader'

interface Props {
  userId: string
  userType?: UserType | null
}

function RouteGuard(props: PropsWithChildren & Props): ReactElement {
  const { userId, loading, error, userType } = useUserData()

  if (loading) {
    return <Loader show={loading} />
  }

  if (error) {
    return <div>Erreur</div>
  }

  if (props.userId !== userId) {
    return <div>Veuillez <Link href='/login'>connecter</Link> à votre compte !</div>
  }

  if (props.userType !== null && props.userType !== undefined && (userType !== props.userType)) {
    return <div>{`Vous n'avez pas la permission suffisante !`}</div>
  }

  return props.children as ReactElement
}

export default RouteGuard
