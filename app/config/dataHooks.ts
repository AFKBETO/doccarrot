import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'
import {getDoctorsByPatient, getPrescriptionsByPatient, getUser} from './api'
import {PrescriptionData, UserData, UserType} from "./types";

export function useHooks () {
    const [userId, setUserId] = useState<string | null>(null)
    const [userName, setUserName] = useState<string | null>(null)
    const [userType, setUserType] = useState<UserType | null>(null)
    const [patientPrescriptions, setPatientPrescriptions] = useState<PrescriptionData[]>([])
    const [patientDoctors, setPatientDoctors] = useState<UserData[]>([])
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

                if (res.userType == UserType.patient) {
                    const patientPrescriptions = await getPrescriptionsByPatient(firebaseUser.uid)
                    setPatientPrescriptions(patientPrescriptions)

                    const patientDoctors = await getDoctorsByPatient(firebaseUser.uid)
                    setPatientDoctors(patientDoctors)
                } else {
                    setPatientPrescriptions([])
                    setPatientDoctors([])
                }

                return
            }
        } catch (error) {
            console.log(error)
        }
        setUserId(null)
        setUserName(null)
        setUserType(null)
        setPatientPrescriptions([])
    }

    return { firebaseUser, firebaseLoading, firebaseError, userId, userName, userType, patientPrescriptions, patientDoctors }
}
