import { createContext } from 'react'
import { User } from 'firebase/auth'

class userContext {
  
  user: User | null | undefined,
  username: string | null,
  updateUser: (value: User | null | undefined) => {}
}

export const UserContext = createContext<userContext>({
    user: null,
    username: null,
    updateUser: (value: User | null | undefined) => {
        this.user =
    },
})