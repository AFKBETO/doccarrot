import React from 'react'
import { USER_CONTEXT } from '../../../../config/userContext'
import RouteGuard from '../../../../components/RouteGuard'
import { useRouter } from 'next/router'

function IndexPatient() {
  const userContext = React.useContext(USER_CONTEXT)
  const router = useRouter()
  const { userid } = router.query

  return (
    <RouteGuard userId={userid as string}>
      {`Page patient / user "${ userContext.userName }"`}
    </RouteGuard>
  )
}

export default IndexPatient
