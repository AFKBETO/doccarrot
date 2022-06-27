export enum UserType {
  patient,
  medecin,
  pharmacien
}

export interface AuthData {
  email: string,
  password: string
}

export interface UserData {
  firstName: string
  lastName: string
  userType: UserType
}

export interface PatientData {

}

export interface MedecinData {
  rpps: string
}