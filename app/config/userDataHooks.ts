import { GetStaticProps } from 'next'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'
import { getUser } from './api'

export function useUserData () {
  const [userId, setUserId] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)
  const [firebaseUser] = useAuthState(auth)

  useEffect(() => {
    const fetchData = async () => {
      if (firebaseUser) {
        console.log(firebaseUser.uid)
        getUser(firebaseUser.uid).then((userData) => {
          setUserId(firebaseUser.uid)
          setUserName(userData.firstName + ' ' + userData.lastName)
        }).catch((error) => {
          setUserId('0')
          setUserName('unknown')
        })
      } else {
        setUserId(null)
        setUserName(null)
      }
    }
    
    fetchData()  
  }, [firebaseUser])

  return { userId, userName, firebaseUser }
}
