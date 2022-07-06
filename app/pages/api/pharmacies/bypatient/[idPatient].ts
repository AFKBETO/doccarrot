// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {firestore} from '../../../../config/firebase'
import {collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import {PharmacyData } from "../../../../config/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { idPatient } = req.query
            const sharingCodes = (await getDocs(query(collection(firestore, 'sharingCodes'), where('idPatient', '==', idPatient))))
                .docs
                .map(d => d.data())

            const sharedWithPharmaciesIDs = []

            for (const sharingCode of sharingCodes) {
                const sharedWith = (await getDocs(collection(firestore, 'sharingCodes', sharingCode.idSharingCode, 'sharedWith')))
                    .docs
                    .map(d => d.data())

                for (const shared of sharedWith) {
                    if (shared.idPharmacy != null) {
                        sharedWithPharmaciesIDs.push(shared.idPharmacy)
                    }
                }
            }

            const pharmaciesIDs = [...new Set(sharedWithPharmaciesIDs)]

            const pharmacies: PharmacyData[] = []
            for (const pharmacyId of pharmaciesIDs) {
                const pharmacy = (await getDoc(doc(firestore, 'pharmacies', pharmacyId))).data()
                if (pharmacy) {
                    pharmacies.push({
                        idPharmacy: pharmacyId,
                        address: pharmacy.address,
                        name: pharmacy.name,
                        publicID: pharmacy.publicID
                    })
                }
            }

            res.status(201).json({ pharmacies })
        } catch (error) {
            res.status(404).json({ error: error.message + req.body.uid })
        }
    }
}
