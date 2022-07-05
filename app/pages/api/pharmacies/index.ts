import type { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../../../config/firebase'
import { collection, getDocs } from 'firebase/firestore'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const snapshot = await getDocs(collection(firestore, 'pharmacies'));
      const docs = snapshot.docs.map(doc => doc.data());
      res.status(200).json({ pharmacies: docs })
    } catch {
      res.status(400).json({ error: 'Cannot get pharmacy' })
    }
  }
}
