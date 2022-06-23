export enum UserType {
  patient,
  medecin,
  pharmacien
}

export interface AuthData {
  email: string,
  password: string
}