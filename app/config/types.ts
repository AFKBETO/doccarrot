export enum UserType {
  patient,
  medecin,
  pharmacien
}

export interface AuthData {
  email: string,
  password: string
}

export interface PatientData {

}

export interface MedecinData {
  rpps: string
}