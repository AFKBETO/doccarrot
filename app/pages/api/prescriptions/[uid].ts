// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../../../config/firebase'
import {collection, doc, getDoc, getDocs} from 'firebase/firestore'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { uid } = req.query

      const snapPrescription = await getDoc(doc(firestore, 'prescriptions', uid as string))
      if (!snapPrescription.exists()) throw new Error()
      let prescription = snapPrescription.data();

      const snapMeds = await getDocs(collection(firestore, 'prescriptions/' + (uid as string) + '/medications'));
      prescription.medications = [];
      for (const doc of snapMeds.docs.map(d => d.data())) {
        prescription.medications.push(doc);
      }

      res.status(200).json({ prescription })
    } catch (error) {
      res.status(404).json({ error: error.message + req.body.uid })
    }
  }
}
