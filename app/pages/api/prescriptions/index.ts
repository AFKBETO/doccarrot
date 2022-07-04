import type { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../../../config/firebase'
import {collection, doc, getDoc, getDocs, setDoc} from 'firebase/firestore'
import {PrescriptionData} from "../../../config/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        try {
            const { uid, idPatient, idDoctor, date, location, signature, maxUses, medications } = req.body

            await setDoc(doc(firestore, 'prescriptions', uid), {
                idPatient,
                idDoctor,
                date,
                location,
                signature,
                currentUses: 0,
                maxUses
            }, { merge: true })

            for (const med of medications) {
                const { idMedication, idMedicationType, quantity } = med
                await setDoc(doc(firestore, 'prescriptions', uid, 'medications', med.uid), {
                    idMedication,
                    idMedicationType,
                    quantity
                }, { merge: true });
            }

            res.status(201).json({ message: 'Data added successfully'})
        } catch {
            res.status(400).json({ error: 'Cannot add prescription' })
        }
    }
}

export async function fetchPrescriptionDetails(prescription: PrescriptionData) {

    // fetch doctor
    const doctorData = (await getDoc(doc(firestore, 'users', prescription.idDoctor))).data()
    if (doctorData) {
        prescription.doctorFirstName = doctorData.firstName
        prescription.doctorLastName = doctorData.lastName
    }

    // fetch medications and their details
    const snapMeds = await getDocs(collection(firestore, 'prescriptions', prescription.idPrescription, 'medications'))
    for (const med of snapMeds.docs.map(d => d.data())) {
        const snapMedType = await getDoc(doc(firestore, 'medicationsTypes', med.idMedicationType))
        prescription.medications.push({
            idMedication: med.idMedication,
            quantity: med.quantity,
            name: snapMedType.data()?.name
        })
    }

}
