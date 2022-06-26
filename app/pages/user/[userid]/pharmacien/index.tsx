import React from 'react'
import { USER_CONTEXT } from '../../../../config/userContext'
import RouteGuard from '../../../../components/RouteGuard'
import { useRouter } from 'next/router'
import { UserType } from '../../../../config/types'

interface Props {
}

function IndexPharmacien({}: Props) {
  const userContext = React.useContext(USER_CONTEXT)
  const router = useRouter()
  const { userid } = router.query

  return (
    <RouteGuard userId={parseInt(userid as string)} userType={UserType.pharmacien}>
      Page pharmacien / user "{ userContext.userName }"
    </RouteGuard>
  )
}

export default IndexPharmacien
