import React, { createContext } from 'react'
import { User } from 'firebase/auth'
import {PrescriptionData, UserType} from "./types"

export class UserContext {

    userId: string | null
    userName: string | null
    userType: UserType | null
    firebaseUser: User | null | undefined
    firebaseLoading: boolean
    firebaseError: Error | undefined

    constructor(userId: string | null,
                userName: string | null,
                userType: UserType | null,
                firebaseUser: User | null | undefined,
                firebaseLoading: boolean,
                firebaseError: Error | undefined
    ) {
        this.userId = userId
        this.firebaseUser = firebaseUser
        this.firebaseLoading = firebaseLoading
        this.firebaseError = firebaseError
        this.userName = userName
        this.userType = userType
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
    updateFirebase(user: User | null | undefined, loading: boolean, error: Error | undefined) {
        this.firebaseUser = user
        this.firebaseLoading = loading
        this.firebaseError = error
    }

    toString() {
        return `${(this.userId)},${this.userName},${this.userType}`;
    }

}

export class PrescriptionContext {
    prescriptions: PrescriptionData[]

    constructor(prescriptions: PrescriptionData[]) {
        this.prescriptions = prescriptions
    }

    updatePrescriptions(value: PrescriptionData[]) {
        this.prescriptions = value
    }
}

export const USER_CONTEXT = createContext<UserContext>(new UserContext(null, null, null, null, false, undefined))
export const PRESCRIPTIONS_CONTEXT = createContext<PrescriptionContext>(new PrescriptionContext([]))
