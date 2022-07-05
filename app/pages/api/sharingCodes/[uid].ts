// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../../../config/firebase'
import {collection, doc, getDoc, getDocs} from 'firebase/firestore'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { uid } = req.query

      const snapCode = await getDoc(doc(firestore, 'sharingCodes', uid as string))
      if (!snapCode.exists()) throw new Error()
      const prescription = snapCode.data();

      const snapSharedWith = await getDocs(collection(firestore, 'sharingCodes/' + (uid as string) + '/sharedWith'));
      prescription.sharedWith = [];
      for (const doc of snapSharedWith.docs.map(d => d.data())) {
        prescription.sharedWith.push(doc);
      }

      res.status(200).json({ prescription })
    } catch (error) {
      res.status(404).json({ error: error.message + req.body.uid })
    }
  }
}
