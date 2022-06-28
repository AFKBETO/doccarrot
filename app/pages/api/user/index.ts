// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../../../config/firebase'
import { doc, setDoc } from 'firebase/firestore'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      const { uid, firstName, lastName, userType } = req.body
      await setDoc(doc(firestore, 'users', uid), {
        firstName: firstName,
        lastName: lastName,
        userType: userType
      }, { merge: true })
      res.status(201).json({ message: 'Data added successfully'})
    } catch {
      res.status(400).json({ error: 'Cannot add user' })
    }
  }
}