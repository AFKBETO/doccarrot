import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'


export function useUserData () {
  const [user] = useAuthState(auth)
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    if (user) setUsername('unknown')
    else setUsername(null)
  }, [user])

  return {user, username}
}
