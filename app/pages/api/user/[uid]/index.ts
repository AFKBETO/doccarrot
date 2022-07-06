// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../../../../config/firebase'
import { doc, getDoc } from 'firebase/firestore'

interface UserData extends Record<string, any> {
  firstName?: string,
  lastName?: string,
  userType?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { uid } = req.query
      const result: UserData = {}
      await getData('users', uid as string, result, true)
      await getData(`${result.userType}s`, uid as string, result, false)
      if (result.userType !== 'patient') {
        await getData('patients', uid as string, result, false)
      }
      res.status(200).json(result)
    } catch (error) {
      res.status(404).json({ error: error.message + req.body.uid })
    }
  }
}

async function getData(docName: string, uid: string, user: UserData, strict: boolean): Promise<void> {
  const docSnap = await getDoc(doc(firestore, docName, uid as string))
  if (strict && !docSnap.exists()) throw new Error("no data found")
  const result = docSnap.data()
  for (const key in result) {
    user[key] = result[key]
  }
}
