import type { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../../../config/firebase'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import {putSharedWith} from "./sharedWith";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      const { idPatient, idPrescription, code, sharedWith } = req.body

      const idSharingCode = (await addDoc(collection(firestore, 'sharingCodes'), {
        idPatient,
        idPrescription,
        code
      })).id

      await updateDoc(doc(firestore, 'sharingCodes', idSharingCode), { idSharingCode })
      await putSharedWith(idSharingCode, sharedWith)

      res.status(201).json({ message: 'Data added successfully'})
    } catch(error) {
      console.log(error)
      res.status(400).json({ error: 'Cannot add sharing code : ' + error.message })
    }
  }
}
