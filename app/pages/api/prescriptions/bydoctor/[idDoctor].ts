// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../../../../config/firebase'
import { collection, query, where, getDocs, getDoc, doc } from "firebase/firestore"

interface UserBasic {
  firstName: string,
  lastName: string,
  uid: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { idDoctor } = req.query

      const coll = collection(firestore, 'prescriptions')
      const q = query(coll, where('idDoctor', '==', idDoctor))
      const snapshot = await getDocs(q)

      const patients: UserBasic[] = []
      snapshot.forEach(async(document) => {
        const uid = document.data().idPatient
        const snapUser = await getDoc(doc(firestore, 'users', uid))
        if (snapUser.exists()) {
          patients.push({
            firstName: snapUser.data().firstName,
            lastName: snapUser.data().lastName,
            uid: uid
          })
        }
      })
      res.status(200).json({ patients })
    } catch (error) {
      res.status(404).json({ error: error.message })
    }
  }
}
