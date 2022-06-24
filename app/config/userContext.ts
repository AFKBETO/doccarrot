import { createContext } from 'react'
import { User } from 'firebase/auth'

export class userContext {
  user: User | null | undefined = null
  username: string | null = null
  updateUser? (value: User | null | undefined) {
    this.user = value
  }
  updateUsername? (value: string | null) {
    this.username = value
  }
}

export const UserContext = createContext<userContext>(new userContext())