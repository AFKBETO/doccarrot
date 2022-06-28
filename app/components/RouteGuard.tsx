import { useContext, ReactElement, PropsWithChildren } from 'react'
import { USER_CONTEXT } from '../config/userContext'
import { UserType } from '../config/types'
import { Link } from '@mui/material'

interface Props {
  userId: string
  userType?: UserType | null
}

function RouteGuard(props: PropsWithChildren & Props): ReactElement {
  const userContext = useContext(USER_CONTEXT)

  if (props.userId !== userContext.userId) {
    return <div>Veuillez <Link href='/login'>connecter</Link> à votre compte !</div>
  }

  if (props.userType !== null && userContext.userType !== props.userType) {
    return <div>{'Vous n\'avez pas la permission suffisante !'}</div>
  }

  return props.children as ReactElement
}

export default RouteGuard
