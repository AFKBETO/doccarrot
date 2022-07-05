// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../../../config/firebase'
import {collection, doc, getDoc, getDocs} from 'firebase/firestore'
import {PharmacyData} from "../../../config/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { uid } = req.query

      const p = (await getDoc(doc(firestore, 'pharmacies', uid as string))).data()
      if (!p) throw new Error();

      let pharmacy: PharmacyData = {
        idPharmacy: uid as string,
        address: p.address,
        name: p.name,
        publicID: p.publicID
      }

      res.status(200).json({ pharmacy })
    } catch (error) {
      res.status(404).json({ error: error.message + req.body.uid })
    }
  }
}
