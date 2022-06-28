// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../../../config/firebase'
import { doc, getDoc } from 'firebase/firestore'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { uid } = req.query
      const docSnap = await getDoc(doc(firestore, 'users', uid as string))
      if (!docSnap.exists()) throw new Error()
      const userData = docSnap.data()
      res.status(200).json({ firstName: userData.firstName, lastName: userData.lastName, userType: userData.userType })
    } catch (error) {
      res.status(404).json({ error: error.message + req.body.uid })
    }
  }
}
