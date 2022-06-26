import React from 'react'
import { USER_CONTEXT } from '../../../../config/userContext'
import RouteGuard from '../../../../components/RouteGuard'
import { useRouter } from 'next/router'

interface Props {

}

function IndexPatient({}: Props) {
  const userContext = React.useContext(USER_CONTEXT)
  const router = useRouter()
  const { userid } = router.query

  return (
    <RouteGuard userId={parseInt(userid as string)}>
      Page patient / user "{ userContext.userName }"
    </RouteGuard>
  )
}

export default IndexPatient
