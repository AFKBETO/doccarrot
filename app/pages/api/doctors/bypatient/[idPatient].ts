// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {firestore} from '../../../../config/firebase'
import {collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import { UserData, UserType} from "../../../../config/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { idPatient } = req.query
            const prescriptions = (await getDocs(query(collection(firestore, 'prescriptions'), where('idPatient', '==', idPatient))))
                .docs
                .map(d => d.data())

            const doctorsIds = [...new Set(prescriptions.map(p => p.idDoctor))]

            const doctors: UserData[] = []
            for (const doctorId of doctorsIds) {
                const doctor = (await getDoc(doc(firestore, 'users', doctorId))).data()
                if (doctor) {
                    doctors.push({
                        idUser: doctorId,
                        firstName: doctor.firstName,
                        lastName: doctor.lastName,
                        userType: UserType.doctor
                    })
                }
            }

            res.status(201).json({ doctors })
        } catch (error) {
            res.status(404).json({ error: error.message + req.body.uid })
        }
    }
}
