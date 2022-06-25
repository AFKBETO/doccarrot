import { createContext } from 'react'
import { User } from 'firebase/auth'
import { UserType } from "./types";

export class UserContext {

  userId: number | null
  userName: string | null
  userType: UserType | null
  firebaseUser: User | null | undefined

  constructor(userId: number | null = null,
              userName: string | null,
              userType: UserType | null,
              firebaseUser: User | null | undefined) {
    this.userId = userId
    this.firebaseUser = firebaseUser
    this.userName = userName
    this.userType = userType
  }

  updateUserId(value: number | null) {
    this.userId = value
  }
  updateUserName(value: string | null) {
    this.userName = value
  }
  updateUserType(value: UserType | null) {
    this.userType = value
  }

  updateFirebaseUser(value: User | null | undefined) {
    this.firebaseUser = value
  }

  toString() {
    return `${(this.userId)},${this.userName},${this.userType}`;
  }

}

export const USER_CONTEXT = createContext<UserContext>(new UserContext(null, null, null, null))
