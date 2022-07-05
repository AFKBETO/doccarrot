import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'
import {getDoctorsByPatient, getPharmaciesByPatient, getPrescriptionsByPatient, getUser} from './api'
import {PharmacyData, PrescriptionData, UserData, UserType} from "./types";

export function useHooks () {
    const [firebaseUser, firebaseLoading, firebaseError] = useAuthState(auth)

    const [userId, setUserId] = useState<string | null>(null)
    const [userName, setUserName] = useState<string | null>(null)
    const [userType, setUserType] = useState<UserType | null>(null)

    const [patientPrescriptions, setPatientPrescriptions] = useState<PrescriptionData[]>([])
    const [patientDoctors, setPatientDoctors] = useState<UserData[]>([])
    const [patientPharmacies, setPatientPharmacies] = useState<PharmacyData[]>([])

    useEffect(() => { refreshUserData() }, [ firebaseUser ])

    const refreshUserData = async () => {
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

                    const patientPharmacies = await getPharmaciesByPatient(firebaseUser.uid)
                    setPatientPharmacies(patientPharmacies)
                } else {
                    setPatientPrescriptions([])
                    setPatientDoctors([])
                    setPatientPharmacies([])
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
        setPatientDoctors([])
        setPatientPharmacies([])
    }

    return { firebaseUser, firebaseLoading, firebaseError, userId, userName, userType, patientPrescriptions, patientDoctors, patientPharmacies }
}
