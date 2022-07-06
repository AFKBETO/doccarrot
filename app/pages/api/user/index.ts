// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../../../config/firebase'
import {doc, setDoc, updateDoc} from 'firebase/firestore'

function makeid(length: number) {  // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  let result = '';
  const characters = '0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      const { uid, firstName, lastName, userType } = req.body

      await setDoc(doc(firestore, 'users', uid), {
        firstName: firstName,
        lastName: lastName,
        publicID: makeid(10),
        userType: userType
      }, { merge: true })

      await addUserType(req)
      await updateDoc(doc(firestore, 'users', uid), { idUser: uid });

      res.status(201).json({ message: 'Data added successfully'})
    } catch {
      res.status(400).json({ error: 'Cannot add user' })
    }
  }
}

async function addUserType(req: NextApiRequest) {
  if (req.method === 'PUT') {
    const { uid, userType } = req.body
    switch(userType) {
      case 'patient': {
        const { nss } = req.body
        await setDoc(doc(firestore,`${userType}s`, uid), { nss: nss})
        break
      }
      case 'doctor':
      case 'pharmacist': {
        const { rpps } = req.body
        await setDoc(doc(firestore,`${userType}s`, uid), { rpps: rpps})
        break
      }
    }
  }
}
