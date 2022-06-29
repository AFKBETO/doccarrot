// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../../../../config/firebase'
import { doc, setDoc } from 'firebase/firestore'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      const { uid, type } = req.query
      console.log(uid,type)
      switch(type) {
        case 'patient': {
          const { nss } = req.body
          await setDoc(doc(firestore,`${type}s`, uid as string), { nss: nss})
          break
        }
        case 'doctor':
        case 'pharmacist': {
          const { rpps } = req.body
          await setDoc(doc(firestore,`${type}s`, uid as string), { rpps: rpps})
        break
      }
    }
      res.status(201).json({ message: 'Data added successfully'})
    } catch {
      res.status(400).json({ error: 'Cannot add user' })
    }
  }
}
