// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../../../../config/firebase'
import { collection, query, where, getDocs } from "firebase/firestore";
import {PrescriptionData} from "../../../../config/types";
import {fetchPrescriptionDetails} from "../index";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { idPatient } = req.query

            const docs = (await getDocs(query(collection(firestore, 'prescriptions'), where('idPatient', '==', idPatient))))
                .docs
                .map(d => d.data())

            const prescriptions: PrescriptionData[] = []

            for (const doc of docs) {
                const prescription: PrescriptionData = {
                    currentUses: doc.currentUses,
                    date: doc.date,
                    patientFirstName: "?",  // to be fetched below
                    patientLastName: "?",  // to be fetched below
                    doctorFirstName: "?",  // to be fetched below
                    doctorLastName: "?",  // to be fetched below
                    idDoctor: doc.idDoctor,
                    idPatient: doc.idPatient,
                    idPrescription: doc.idPrescription,
                    location: doc.location,
                    maxUses: doc.maxUses,
                    medications: [],  // to be fetched below,
                    sharingCodes: []  // to be fetched below,
                }
                await fetchPrescriptionDetails(prescription)
                prescriptions.push(prescription)
            }

            res.status(200).json({ prescriptions })
        } catch (error) {
            console.log(error)
            res.status(404).json({ error: error.message + req.body.uid })
        }
    }
}
