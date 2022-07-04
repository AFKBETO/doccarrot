import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'
import { getPrescriptionsByPatient, getUser } from './api'
import { PrescriptionData, UserType } from "./types";

export function useHooks () {
    const [userId, setUserId] = useState<string | null>(null)
    const [userName, setUserName] = useState<string | null>(null)
    const [userType, setUserType] = useState<UserType | null>(null)
    const [userPrescriptions, setUserPrescriptions] = useState<PrescriptionData[]>([])
    const [firebaseUser, firebaseLoading, firebaseError] = useAuthState(auth)

    useEffect(() => {
        refreshData()
    }, [ firebaseUser ])

    const refreshData = async () => {
        try {
            if (firebaseUser) {
                const res = await getUser(firebaseUser.uid)
                setUserId(firebaseUser.uid)
                setUserName(res.firstName + ' ' + res.lastName)
                setUserType(res.userType)

                const prescriptions = await getPrescriptionsByPatient(firebaseUser.uid)
                setUserPrescriptions(prescriptions)

                return
            }
        } catch (error) {
            console.log(error)
        }
        setUserId(null)
        setUserName(null)
        setUserType(null)
        setUserPrescriptions([])
    }

    return { firebaseUser, firebaseLoading, firebaseError, userId, userName, userType, userPrescriptions }
}
