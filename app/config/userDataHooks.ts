import { firebaseConfig } from "./firebase";
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getApp, initializeApp } from "@firebase/app";
import { getAuth } from "firebase/auth";

try {
  getApp()
} catch (e) {
  initializeApp(firebaseConfig)
}

export function useUserData () {
  const [user] = useAuthState(getAuth())
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    setUsername('unknown')
  }, [user])

  return {user, username}
}
