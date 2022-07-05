// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {firestore} from '../../../../config/firebase'
import {collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import {PharmacyData, PrescriptionData, UserData, UserType} from "../../../../config/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { idPatient } = req.query
            const sharingCodes = (await getDocs(query(collection(firestore, 'sharingCodes'), where('idPatient', '==', idPatient))))
                .docs
                .map(d => d.data())

            let sharedWithPharmaciesIDs = []

            for (let sharingCode of sharingCodes) {
                const sharedWith = (await getDocs(collection(firestore, 'sharingCodes', sharingCode.idSharingCode, 'sharedWith')))
                    .docs
                    .map(d => d.data())

                for (let shared of sharedWith) {
                    if (shared.idPharmacy) {
                        sharedWithPharmaciesIDs.push(shared.idPharmacy)
                    }
                }
            }

            const pharmaciesIDs = [...new Set(sharedWithPharmaciesIDs)]

            let pharmacies: PharmacyData[] = []
            for (let pharmacyId of pharmaciesIDs) {
                const pharmacy = (await getDoc(doc(firestore, 'pharmacies', pharmacyId))).data()
                if (pharmacy) {
                    pharmacies.push({
                        idPharmacy: pharmacyId,
                        address: pharmacy.address,
                        name: pharmacy.name
                    })
                }
            }

            res.status(201).json({ doctors: pharmacies })
        } catch (error) {
            res.status(404).json({ error: error.message + req.body.uid })
        }
    }
}
