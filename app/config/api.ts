import axios from 'axios'
import {DoctorData, MedicationData, PatientData, PharmacistData, PrescriptionData, UserData, UserType} from './types'

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

export async function getPrescriptionsByPatient (idUser: string): Promise<PrescriptionData[]> {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/prescriptions/bypatient/${idUser}`)
    let prescriptions: PrescriptionData[] = []
    for (let p of res.data.prescriptions) {
      let medications: MedicationData[] = []
      let prescription = {
        currentUses: p.currentUses,
        date: p.date,
        idDoctor: p.idDoctor,
        idPatient: p.idPatient,
        idPrescription: p.idPrescription,
        location: p.location,
        maxUses: p.maxUses,
        medications: medications
      };
      for (let m of p.medications) {
        medications.push({
          idMedication: m.idMedication,
          idMedicationType: m.idMedicationType,
          quantity: m.quantity
        })
      }
      prescriptions.push(prescription);
    }
    return prescriptions;
  } catch (error) {
    throw error
  }
}
