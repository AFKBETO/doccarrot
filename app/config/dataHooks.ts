import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'
import {
  getDoctorsByPatient, getMedicationTypes, getPatientsByDoctor,
  getPharmaciesByPatient,
  getPrescriptionsByPatient,
  getPrescriptionsByPharmacy,
  getUser
} from './api'
import {MedicationType, PharmacyData, PrescriptionData, UserData, UserType} from "./types";

export function useHooks () {
  const [firebaseUser, firebaseLoading, firebaseError] = useAuthState(auth)

  const [userId, setUserId] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)
  const [userPublicID, setUserPublicID] = useState<string | null>(null)
  const [userType, setUserType] = useState<UserType | null>(null)

  const [patientPrescriptions, setPatientPrescriptions] = useState<PrescriptionData[]>([])
  const [patientDoctors, setPatientDoctors] = useState<UserData[]>([])
  const [patientPharmacies, setPatientPharmacies] = useState<PharmacyData[]>([])

  const [pharmacistPharmacyId, setPharmacistPharmacyId] = useState<string | null>(null)
  const [pharmacistPrescriptions, setPharmacistPrescriptions] = useState<PrescriptionData[]>([])

  const [doctorMedicationTypes, setDoctorMedicationTypes] = useState<MedicationType[]>([])
  const [doctorPatients, setDoctorPatients] = useState<UserData[]>([])

  const [refetchUserData, setRefetchUserData] = useState<number>(0)
  const refreshUserData = () => setRefetchUserData(refetchUserData + 1);

  useEffect(() => { 
    fetchUserData()
  }, [ firebaseUser, refetchUserData ])

  const fetchUserData = async () => {
    
    try {
      if (firebaseUser) {
        const userData = await getUser(firebaseUser.uid)
        setUserId(firebaseUser.uid)
        setUserName(userData.firstName + ' ' + userData.lastName)
        setUserPublicID(userData.publicID != undefined ? userData.publicID : '')
        setUserType(userData.userType)

        if (userData.userType == UserType.patient) {
          const patientPrescriptions = await getPrescriptionsByPatient(firebaseUser.uid)
          setPatientPrescriptions(patientPrescriptions)

          const patientDoctors = await getDoctorsByPatient(firebaseUser.uid)
          setPatientDoctors(patientDoctors)

          const patientPharmacies = await getPharmaciesByPatient(firebaseUser.uid)
          setPatientPharmacies(patientPharmacies)

          setPharmacistPrescriptions([])
          setPharmacistPharmacyId(null)
          setDoctorMedicationTypes([])
          setDoctorPatients([])
        } else if (userData.userType == UserType.pharmacist) {
          if (userData.idPharmacy) {
            setPharmacistPharmacyId(userData.idPharmacy)

            const pharmacistPrescriptions = await getPrescriptionsByPharmacy(userData.idPharmacy)
            setPharmacistPrescriptions(pharmacistPrescriptions)
          } else {
            setPharmacistPharmacyId(null)
            setPharmacistPrescriptions([])
          }

          setPatientPrescriptions([])
          setPatientDoctors([])
          setPatientPharmacies([])
          setDoctorMedicationTypes([])
          setDoctorPatients([])
        } else if (userData.userType == UserType.doctor) {
          const doctorMedicationTypes = await getMedicationTypes()
          setDoctorMedicationTypes(doctorMedicationTypes)

          const doctorPatients = await getPatientsByDoctor(firebaseUser.uid)
          setDoctorPatients(doctorPatients)

          setPatientPrescriptions([])
          setPatientDoctors([])
          setPatientPharmacies([])
          setPharmacistPharmacyId(null)
          setPharmacistPrescriptions([])
        } else {
          setPatientPrescriptions([])
          setPatientDoctors([])
          setPatientPharmacies([])
          setPharmacistPharmacyId(null)
          setPharmacistPrescriptions([])
          setDoctorMedicationTypes([])
          setDoctorPatients([])
        }
        return
      }
    } catch (error) {
      console.log(error)
    }
    setUserId(null)
    setUserName(null)
    setUserPublicID(null)
    setUserType(null)
    setPatientPrescriptions([])
    setPatientDoctors([])
    setPatientPharmacies([])
    setPharmacistPharmacyId(null)
    setPharmacistPrescriptions([])
    setDoctorMedicationTypes([])
    setDoctorPatients([])
  }

  return {
    firebaseUser,
    firebaseLoading,
    firebaseError,
    userId,
    userName,
    userPublicID,
    userType,
    patientPrescriptions,
    patientDoctors,
    patientPharmacies,
    pharmacistPharmacyId,
    pharmacistPrescriptions,
    doctorMedicationTypes,
    doctorPatients,
    refreshUserData
  }
}
