import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'

export function useUserData () {
  const [userId, setUserId] = useState<number | null>(null)
  const [userName, setUserName] = useState<string | null>(null)
  const [firebaseUser] = useAuthState(auth)

  useEffect(() => {
    if (firebaseUser) {
      setUserId(0)
      setUserName('unknown')
    }
  }, [firebaseUser])

  return { userId, userName, firebaseUser }
}
