// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../../../config/firebase'
import { doc, getDoc } from 'firebase/firestore'
import {fetchPrescriptionDetails} from "./index";
import {PrescriptionData} from "../../../config/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { idPrescription } = req.query
            const data = (await getDoc(doc(firestore, 'prescriptions', idPrescription as string))).data()
            if (data) {
                const prescription: PrescriptionData = {
                    currentUses: data.currentUses,
                    date: data.date,
                    patientFirstName: "?",  // to be fetched below
                    patientLastName: "?",  // to be fetched below
                    doctorFirstName: "?",  // to be fetched below,
                    doctorLastName: "?",  // to be fetched below,
                    idDoctor: data.idDoctor,
                    idPatient: data.idPatient,
                    idPrescription: data.idPrescription,
                    location: data.location,
                    maxUses: data.maxUses,
                    medications: [],  // to be fetched below,
                    sharingCodes: []  // to be fetched below,
                }
                await fetchPrescriptionDetails(prescription)
                res.status(200).json({ prescription })
            } else {
                throw new Error();
            }
        } catch (error) {
            res.status(404).json({ error: error.message + req.body.uid })
        }
    }
}
