// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../../../config/firebase'
import { getDocs, collection } from 'firebase/firestore'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const medicationTypes = (await getDocs(collection(firestore, 'medicationTypes'))).docs.map(doc => doc.data());
      res.status(200).json({ medicationTypes })
    } catch (error) {
      res.status(404).json({ error: error.message + req.body.uid })
    }
  }
}