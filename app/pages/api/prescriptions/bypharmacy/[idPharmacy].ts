// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../../../../config/firebase'
import { collection, query, where, getDocs } from "firebase/firestore";
import {PrescriptionData} from "../../../../config/types";
import {fetchPrescriptionDetails} from "../index";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { idPharmacy } = req.query
            const allCodes = (await getDocs(collection(firestore, 'sharingCodes')))
                .docs
                .map(d => d.data())

            let sharedPrescriptionsIds = []
            for (let code of allCodes) {
                const sharedWithPharmacies = (await getDocs(query(collection(firestore, 'sharingCodes', code.idSharingCode, 'sharedWith'), where('idPharmacy', '==', idPharmacy)))).docs
                if (sharedWithPharmacies.length != 0) {
                    sharedPrescriptionsIds.push(code.idPrescription)
                }
            }

            let prescriptions: PrescriptionData[] = []
            for (let prescriptionId of [...new Set(sharedPrescriptionsIds)]) {
                let doc = (await getDocs(query(collection(firestore, 'prescriptions'), where('idPrescription', '==', prescriptionId)))).docs.map(d => d.data()).find(() => true)
                if (doc) {
                    let prescription: PrescriptionData = {
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
                    await fetchPrescriptionDetails(prescription, false)
                    prescriptions.push(prescription)
                }
            }

            res.status(201).json({ prescriptions })
        } catch (error) {
            console.log(error)
            res.status(404).json({ error: error.message + req.body.uid })
        }
    }
}
