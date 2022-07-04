import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'
import { getUser } from './api'
import { UserType } from './types'

export function useUserData () {
  const [userId, setUserId] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)
  const [userType, setUserType] = useState<UserType | null>(null)
  const [firebaseUser, loading, error] = useAuthState(auth)

  useEffect(() => {
    fetchData()    
  }, [firebaseUser])

  const fetchData = async () => {
    try {
      if (firebaseUser) {   
        const res = await getUser(firebaseUser.uid)
        setUserId(firebaseUser.uid)
        setUserName(res.firstName + ' ' + res.lastName)
        setUserType(res.userType)
      } else {
        setUserId(null)
        setUserName(null)
        setUserType(null)
      }
    } catch (error) {
      setUserId('0')
      setUserName('unknown')
      setUserType(UserType.patient)
    }
    
  }

  return { userId, userName, userType, firebaseUser, loading, error }
}
