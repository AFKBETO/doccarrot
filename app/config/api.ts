import axios from 'axios'
import {
    MedicationData,
    MedicationType,
    PharmacyData,
    PrescriptionData, SharingCodeData,
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
        return res.data.prescriptions as PrescriptionData[];
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function getPrescriptionsByPharmacy (idPharmacy: string): Promise<PrescriptionData[]> {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/prescriptions/bypharmacy/${idPharmacy}`)
        return res.data.prescriptions as PrescriptionData[];
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function addPrescription (idPatient: string, idDoctor: string, date: number, location: string, signature: string, maxUses: number, medications: MedicationData[]): Promise<void> {
    try {
        await axios.put(`${process.env.NEXT_PUBLIC_URL}/api/prescriptions/`,{
            idPatient,
            idDoctor,
            date,
            location,
            signature,
            maxUses,
            medications
        })
    } catch (error) {
        throw error
    }
}

export async function setPrescriptionUses(idPrescription: string, currentUses: number): Promise<void> {
    try {
        await axios.patch(`${process.env.NEXT_PUBLIC_URL}/api/prescriptions/${idPrescription}`,{ currentUses })
    } catch (error) {
        throw error
    }
}

export async function getDoctorsByPatient (idUser: string): Promise<UserData[]> {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/doctors/bypatient/${idUser}`)
        return res.data.doctors as UserData[];
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function getPharmacyById (idPharmacy: string): Promise<PharmacyData> {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/pharmacies/${idPharmacy}`)
        return res.data.pharmacy as PharmacyData;
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function getPharmacyByPublicId (publicID: string): Promise<PharmacyData> {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/pharmacies/bypublicid/${publicID}`)
        return res.data.pharmacy as PharmacyData;
    } catch (error) {
        if (error?.response?.status != 404) console.log(error);
        throw error
    }
}

export async function getPharmaciesByPatient (idUser: string): Promise<PharmacyData[]> {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/pharmacies/bypatient/${idUser}`)
        return res.data.pharmacies as PharmacyData[];
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function getSharingCodeByPublicID (publicID: string): Promise<SharingCodeData> {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/sharingCodes/bypublicid/${publicID}`)
        return res.data.sharingCode as SharingCodeData;
    } catch (error) {
        if (error?.response?.status != 404) console.log(error);
        throw error
    }
}

export async function addSharingCode(idPatient: string, idPrescription: string, code: string, sharedWith: { idPharmacy: string }[]): Promise<void> {
    try {
        await axios.put(`${process.env.NEXT_PUBLIC_URL}/api/sharingCodes/`,{
            idPatient,
            idPrescription,
            code,
            sharedWith
        })
    } catch (error) {
        throw error
    }
}

export async function addSharingCodeSharedWith(idSharingCode: string, sharedWith: { idPharmacy?: string | null, idDoctor?:string | null }[]): Promise<void> {
    try {
        await axios.put(`${process.env.NEXT_PUBLIC_URL}/api/sharingCodes/sharedWith/`,{
            idSharingCode,
            sharedWith
        })
    } catch (error) {
        throw error
    }
}

export async function getMedicationTypes (): Promise<MedicationType[]> {
    try {
        return (await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/medicationTypes/`)).data.medicationTypes as MedicationType[]
    } catch (error) {
        throw error
    }
}

export async function getPatientsByDoctor (idDoctor: string): Promise<UserData[]> {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/user/bydoctor/${idDoctor}`)
        return res.data.patients as UserData[];
    } catch (error) {
        console.log(error);
        throw error
    }
}
