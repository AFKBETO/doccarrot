// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../../../config/firebase'
import {collection, doc, getDoc, getDocs} from 'firebase/firestore'
import {fetchPrescriptionDetails} from "./index";
import {PrescriptionData} from "../../../config/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { idPrescription } = req.query
            const data = (await getDoc(doc(firestore, 'prescriptions', idPrescription as string))).data()
            if (data) {
                let prescription: PrescriptionData = {
                    currentUses: data.currentUses,
                    date: data.date,
                    doctorFirstName: "?",
                    doctorLastName: "?",
                    idDoctor: data.idDoctor,
                    idPatient: data.idPatient,
                    idPrescription: data.idPrescription,
                    location: data.location,
                    maxUses: data.maxUses,
                    medications: []
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
