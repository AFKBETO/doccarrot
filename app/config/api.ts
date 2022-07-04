import axios from 'axios'
import { DoctorData, PatientData, PharmacistData, UserData, UserType } from './types'

export async function getUser (uid: string): Promise<UserData> {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/user/${uid}`)
    return {
      ...res.data,
      userType: UserType[res.data.userType as keyof typeof UserType]
    }
  } catch (error) {
    throw error
  }
}

export async function addUser (uid: string, userData: UserData): Promise<void> {
  try {
    if (userData.userType !== null) {
      await axios.put(`${process.env.NEXT_PUBLIC_URL}/api/user/`,{
        ...userData,
        uid: uid,
        userType: UserType[userData.userType]
      })
    } else throw new Error('User type 2 is not specified')
    
  } catch (error) {
    throw error
  }
}

export async function getMedicines () {
  return await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/medicine/`)
}