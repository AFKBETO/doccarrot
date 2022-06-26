import React from 'react'
import RouteGuard from '../../../../components/RouteGuard'
import { useRouter } from 'next/router'
import { UserType } from '../../../../config/types'

interface Props {
  
}

function Prescription({}: Props) {
  const router = useRouter()
  const { userid } = router.query

  return (
    <RouteGuard userId={parseInt(userid as string)} userType={UserType.medecin}>
      prescriptions
    </RouteGuard>
  )
}

export default Prescription
