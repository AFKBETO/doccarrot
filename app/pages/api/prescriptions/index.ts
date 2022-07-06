import type { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../../../config/firebase'
import {addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where} from 'firebase/firestore'
import { PrescriptionData, SharedWithData} from "../../../config/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        try {
            const { idPatient, idDoctor, date, location, signature, maxUses, medications } = req.body

            const idPrescription = (await addDoc(collection(firestore, 'prescriptions'), {
                idPatient,
                idDoctor,
                date,
                location,
                signature,
                currentUses: 0,
                maxUses
            })).id;

            await updateDoc(doc(firestore, 'prescriptions', idPrescription), { idPrescription })

            for (const med of medications) {
                const { idMedicationType, quantity } = med
                const idMedication = (await addDoc(collection(firestore, 'prescriptions', idPrescription, 'medications'), {
                    idMedicationType,
                    quantity
                })).id
                await updateDoc(doc(firestore, 'prescriptions', idPrescription, 'medications', idMedication), { idMedication })
            }

            res.status(201).json({ message: 'Data added successfully'})
        } catch(error) {
            console.log(error)
            res.status(400).json({ error: 'Cannot add prescription : ' + error.message })
        }
    }
}

export async function fetchPrescriptionDetails(prescription: PrescriptionData, withSharingCodes = true) {

    // fetch patient name
    const patientData = (await getDoc(doc(firestore, 'users', prescription.idPatient))).data()
    if (patientData != null) {
        prescription.patientFirstName = patientData.firstName
        prescription.patientLastName = patientData.lastName
    }

    // fetch doctor name
    const doctorData = (await getDoc(doc(firestore, 'users', prescription.idDoctor))).data()
    if (doctorData != null) {
        prescription.doctorFirstName = doctorData.firstName
        prescription.doctorLastName = doctorData.lastName
    }

    // fetch medications and their details
    const meds = (await getDocs(collection(firestore, 'prescriptions', prescription.idPrescription, 'medications'))).docs.map(d => d.data())
    for (const med of meds) {
        const medTypeData = (await getDoc(doc(firestore, 'medicationTypes', med.idMedicationType))).data()
        prescription.medications.push({
            idMedicationType: med.idMedicationType,
            idMedication: med.idMedication,
            quantity: med.quantity,
            name: medTypeData?.name
        })
    }

    // fetch sharing codes
    if (withSharingCodes) {
        const codes = (await getDocs(query(collection(firestore, 'sharingCodes'),where('idPrescription', '==', prescription.idPrescription)))).docs.map(d => d.data())

        for (const code of codes) {
            const sharedWith: SharedWithData[] = []

            // fetch shared with
            const swith = (await getDocs(collection(firestore, 'sharingCodes', code.idSharingCode, 'sharedWith'))).docs.map(d => d.data())
            for (const sw of swith) {
                const shared: SharedWithData = {
                    idSharedWith: sw.idSharedWith
                }

                if (sw.idDoctor != null) {
                    const sharedWithDoctorData = (await getDoc(doc(firestore, 'users', sw.idDoctor))).data()
                    if (sharedWithDoctorData) {
                        shared.doctorFirstName = sharedWithDoctorData.firstName
                        shared.doctorLastName = sharedWithDoctorData.lastName
                    }
                } else if (sw.idPharmacy != null) {
                    const sharedWithPharmacyData = (await getDoc(doc(firestore, 'pharmacies', sw.idPharmacy))).data()
                    if (sharedWithPharmacyData) {
                        shared.pharmacyName = sharedWithPharmacyData.name
                    }
                } else continue;

                sharedWith.push(shared)
            }

            prescription.sharingCodes.push({
                code: code.code,
                idPatient: code.idPatient,
                idPrescription: code.idPrescription,
                idSharingCode: code.idSharingCode,
                sharedWith
            })
        }
    }

}
