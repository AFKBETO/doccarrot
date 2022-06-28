export enum UserType {
  patient,
  doctor,
  pharmacist
}

export interface AuthData {
  email: string,
  password: string
}

export interface UserData {
  firstName: string
  lastName: string
  userType: UserType | null
}

export interface PatientData {
  nss?: string
  tokenCarteVitale?: string
}

export interface DoctorData {
  rpps?: string
}

export interface PharmacistData {
  rpps?: string
}