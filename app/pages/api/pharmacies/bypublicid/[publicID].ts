// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {firestore} from '../../../../config/firebase'
import {collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import {PharmacyData, PrescriptionData, UserData, UserType} from "../../../../config/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { publicID } = req.query
            const p = (await getDocs(query(collection(firestore, 'pharmacies'), where('publicID', '==', publicID))))
                .docs
                .map(d => d.data())
                .find(() => true)
            if (!p) throw new Error();

            let pharmacy: PharmacyData = {
                idPharmacy: p.pharmacyID,
                address: p.address,
                name: p.name,
                publicID: p.publicID
            }

            res.status(201).json({ pharmacy })
        } catch (error) {
            res.status(404).json({ error: error.message + req.body.uid })
        }
    }
}
