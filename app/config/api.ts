import axios from 'axios'
import {
    DoctorData,
    MedicationData,
    PatientData,
    PharmacistData,
    PharmacyData,
    PrescriptionData,
    UserData,
    UserType
} from './types'

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
        } else {
            throw new Error('User type 2 is not specified')
        }

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
            let prescription: PrescriptionData = {
                currentUses: p.currentUses,
                date: p.date,
                idDoctor: p.idDoctor,
                doctorFirstName: p.doctorFirstName,
                doctorLastName: p.doctorLastName,
                idPatient: p.idPatient,
                idPrescription: p.idPrescription,
                location: p.location,
                maxUses: p.maxUses,
                medications: medications
            };

            for (let m of p.medications) {
                medications.push({
                    idMedication: m.idMedication,
                    name: m.name,
                    quantity: m.quantity
                })
            }

            prescriptions.push(prescription);
        }

        return prescriptions;
    } catch (error) {
        console.log(error);
        throw error
    }
}


export async function getDoctorsByPatient (idUser: string): Promise<UserData[]> {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/doctors/bypatient/${idUser}`)
        let doctors: UserData[] = []

        for (let p of res.data.doctors) {
            doctors.push({
                idUser: p.idUser,
                firstName: p.firstName,
                lastName: p.lastName,
                userType: UserType.doctor
            });
        }

        return doctors;
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function getPharmaciesByPatient (idUser: string): Promise<PharmacyData[]> {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/pharmacies/bypatient/${idUser}`)
        let pharmacies: PharmacyData[] = []

        for (let p of res.data.pharmacies) {
            pharmacies.push({
                idPharmacy: p.idPharmacy,
                name: p.name,
                address: p.address,
                publicID: p.publicID
            });
        }

        return pharmacies;
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function getMedicines () {
    return await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/medicine/`)
}
