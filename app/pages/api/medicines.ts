// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../../config/firebase'
import { getDocs, collection } from 'firebase/firestore'

interface MedicationTypes {
  id: string,
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const snapshot = await getDocs(collection(firestore, 'medicationTypes'))
      const results: MedicationTypes[] = []
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          name: doc.data().name
        })
      })
      res.status(200).json(results)
    } catch (error) {
      res.status(404).json({ error: error.message + req.body.uid })
    }
  }
}