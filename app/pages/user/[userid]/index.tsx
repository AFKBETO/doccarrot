import { useRouter } from 'next/router'
import React from 'react'
import { USER_CONTEXT } from '../../../config/userContext'
import RouteGuard from '../../../components/RouteGuard'

interface Props {
}

function User ({} : Props) {
  const router = useRouter()
  const { userid } = router.query
  const userContext = React.useContext(USER_CONTEXT)

  return (
    <RouteGuard userId={userid as string}>
      Hello, user { userContext.userName }
    </RouteGuard>
  )
}

export default User
