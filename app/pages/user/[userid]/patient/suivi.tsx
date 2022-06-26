import React from 'react'
import RouteGuard from '../../../../components/RouteGuard'
import { useRouter } from 'next/router'

interface Props {

}

function Suivi({}: Props) {
  const router = useRouter()
  const { userid } = router.query

  return (
    <RouteGuard userId={parseInt(userid as string)}>
      suivi
    </RouteGuard>
  )
}

export default Suivi
