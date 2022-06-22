export enum UserType {
  patient,
  medecin,
  pharmacien
}

export interface UserData {
  email: string,
  password: string
}