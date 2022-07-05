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
  idUser: string
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
  idPharmacy?: string
}

export interface PharmacyData {
  idPharmacy: string
  name: string
  address: string
  publicID: number
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
  sharingCodes: SharingCodeData[]
}

export interface SharingCodeData {
  idSharingCode: string
  idPatient: string
  idPrescription: string
  code: string
  sharedWith: SharedWithData[]
}

export interface SharedWithData {
  idDoctor?: string
  doctorFirstName?: string
  doctorLastName?: string
  idPharmacy?: string
  pharmacyName?: string
}
