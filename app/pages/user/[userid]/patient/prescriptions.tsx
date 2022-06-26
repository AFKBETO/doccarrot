import React from 'react'
import RouteGuard from '../../../../components/RouteGuard'
import { useRouter } from 'next/router'

interface Props {

}

function Prescriptions({}: Props) {
  const router = useRouter()
  const { userid } = router.query

  return (
    <RouteGuard userId={parseInt(userid as string)}>
      prescriptions
    </RouteGuard>
  )
}

export default Prescriptions
