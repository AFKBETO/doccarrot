// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {firestore} from '../../../../config/firebase'
import {collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import { UserData, UserType} from "../../../../config/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { idDoctor } = req.query
            const prescriptions = (await getDocs(query(collection(firestore, 'prescriptions'), where('idDoctor', '==', idDoctor))))
                .docs
                .map(d => d.data())

            const patientsIds = [...new Set(prescriptions.map(p => p.idPatient))]

            const patients: UserData[] = []
            for (const patientId of patientsIds) {
                const patient = (await getDoc(doc(firestore, 'users', patientId))).data()
                if (patient) {
                    patients.push({
                        idUser: patientId,
                        publicID: patient.publicId,
                        firstName: patient.firstName,
                        lastName: patient.lastName,
                        userType: UserType.patient
                    })
                }
            }

            res.status(201).json({ patients })
        } catch (error) {
            console.log(error)
            res.status(404).json({ error: error.message + req.body.uid })
        }
    }
}
