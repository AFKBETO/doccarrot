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

export interface MedicationTypes {
  id: string,
  name: string
}

export interface MedicationData {
  idMedication: string
  quantity: number
  name: string
}

export interface PrescriptionData {
  idPrescription: string
  idPatient: string
  idDoctor: string
  doctorFirstName: string
  doctorLastName: string
  date: { seconds: number }
  location: string
  currentUses: number
  maxUses: number
  medications: MedicationData[]
}
