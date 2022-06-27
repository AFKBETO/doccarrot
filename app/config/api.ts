import axios from 'axios'
import { UserData, UserType } from './types'

export async function getUser (uid: string): Promise<UserData> {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/user/${uid}`)
    return {
      firstName: res.data.firstName,
      lastName: res.data.lastName,
      userType: UserType[res.data.userType as keyof typeof UserType]
    }
  } catch (error) {
    throw error
  }
  
}
