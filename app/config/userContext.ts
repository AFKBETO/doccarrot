import React, { createContext } from 'react'
import { User } from 'firebase/auth'
import {MedicationType, PharmacyData, PrescriptionData, UserData, UserType} from "./types"

export class UserContext {

    firebaseUser: User | null | undefined = null
    firebaseLoading: boolean = false
    firebaseError: Error | undefined = undefined

    userId: string | null = null
    userName: string | null = null
    userPublicID: string | null
    userType: UserType | null = null

    patientPrescriptions: PrescriptionData[] = []
    patientDoctors: UserData[] = []
    patientPharmacies: PharmacyData[] = []

    pharmacistPharmacyId: string | null = null
    pharmacistPrescriptions: PrescriptionData[] = []

    doctorMedicationTypes: MedicationType[]
    doctorPatients: UserData[]

    refreshUserData: Function

    updateFirebase(user: User | null | undefined, loading: boolean, error: Error | undefined) {
        this.firebaseUser = user
        this.firebaseLoading = loading
        this.firebaseError = error
    }

    updateUserId(value: string | null) {
        this.userId = value
    }
    updateUserName(value: string | null) {
        this.userName = value
    }
    updateUserPublicID(value: string | null) {
        this.userPublicID = value
    }
    updateUserType(value: UserType | null) {
        this.userType = value
    }

    updatePatientPrescriptions(value: PrescriptionData[]) {
        this.patientPrescriptions = value
    }
    updatePatientDoctors(value: UserData[]) {
        this.patientDoctors = value
    }
    updatePatientPharmacies(value: PharmacyData[]) {
        this.patientPharmacies = value
    }

    updatePharmacistPharmacyId(value: string | null) {
        this.pharmacistPharmacyId = value
    }
    updatePharmacistPrescriptions(value: PrescriptionData[]) {
        this.pharmacistPrescriptions = value
    }

    updateDoctorMedicationTypes(value: MedicationType[]) {
        this.doctorMedicationTypes = value
    }
    updateDoctorPatients(value: UserData[]) {
        this.doctorPatients = value
    }

    updateRefreshUserDataFunction(value: Function) {
        this.refreshUserData = value
    }

    toString() {
        return `${(this.userId)},${this.userName},${this.userType}`;
    }

}

export const USER_CONTEXT = createContext<UserContext>(new UserContext())
