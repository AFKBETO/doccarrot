import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'
import {
    getDoctorsByPatient,
    getPharmaciesByPatient,
    getPrescriptionsByPatient,
    getPrescriptionsByPharmacy,
    getUser
} from './api'
import {PharmacyData, PrescriptionData, UserData, UserType} from "./types";

export function useHooks () {
    const [firebaseUser, firebaseLoading, firebaseError] = useAuthState(auth)

    const [userId, setUserId] = useState<string | null>(null)
    const [userName, setUserName] = useState<string | null>(null)
    const [userType, setUserType] = useState<UserType | null>(null)

    const [patientPrescriptions, setPatientPrescriptions] = useState<PrescriptionData[]>([])
    const [patientDoctors, setPatientDoctors] = useState<UserData[]>([])
    const [patientPharmacies, setPatientPharmacies] = useState<PharmacyData[]>([])

    const [pharmacistPrescriptions, setPharmacistPrescriptions] = useState<PrescriptionData[]>([])

    const [refetchUserData, setRefetchUserData] = useState<number>(0)
    const refreshUserData = () => setRefetchUserData(refetchUserData + 1);

    useEffect(() => { fetchUserData() }, [ firebaseUser, refetchUserData ])

    const fetchUserData = async () => {
        try {
            if (firebaseUser) {
                const userData = await getUser(firebaseUser.uid)
                setUserId(firebaseUser.uid)
                setUserName(userData.firstName + ' ' + userData.lastName)
                setUserType(userData.userType)

                if (userData.userType == UserType.patient) {
                    const patientPrescriptions = await getPrescriptionsByPatient(firebaseUser.uid)
                    setPatientPrescriptions(patientPrescriptions)

                    const patientDoctors = await getDoctorsByPatient(firebaseUser.uid)
                    setPatientDoctors(patientDoctors)

                    const patientPharmacies = await getPharmaciesByPatient(firebaseUser.uid)
                    setPatientPharmacies(patientPharmacies)

                    setPharmacistPrescriptions([])
                } else if (userData.userType == UserType.pharmacist) {
                    if (userData.idPharmacy) {
                        const pharmacistPrescriptions = await getPrescriptionsByPharmacy(userData.idPharmacy)
                        setPharmacistPrescriptions(pharmacistPrescriptions)
                    } else {
                        setPharmacistPrescriptions([])
                    }

                    setPatientPrescriptions([])
                    setPatientDoctors([])
                    setPatientPharmacies([])
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

    return { firebaseUser, firebaseLoading, firebaseError, userId, userName, userType, patientPrescriptions, patientDoctors, patientPharmacies, refreshUserData }
}
