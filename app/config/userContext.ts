import React, { createContext } from 'react'
import { User } from 'firebase/auth'
import {PharmacyData, PrescriptionData, UserData, UserType} from "./types"

export class UserContext {

    firebaseUser: User | null | undefined = null
    firebaseLoading: boolean = false
    firebaseError: Error | undefined = undefined

    userId: string | null = null
    userName: string | null = null
    userType: UserType | null = null

    patientPrescriptions: PrescriptionData[] = []
    patientDoctors: UserData[] = []
    patientPharmacies: PharmacyData[] = []

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

    updateRefreshUserDataFunction(value: Function) {
        this.refreshUserData = value
    }

    toString() {
        return `${(this.userId)},${this.userName},${this.userType}`;
    }

}

export const USER_CONTEXT = createContext<UserContext>(new UserContext())
