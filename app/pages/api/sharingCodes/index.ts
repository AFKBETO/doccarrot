import type { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../../../config/firebase'
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore'

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

      for (const shared of sharedWith) {
        let sharedDoc = {
          idPharmacy: null,
          idDoctor: null
        }
        if (shared.idPharmacy) {
          sharedDoc.idPharmacy = shared.idPharmacy
        } else if (shared.idDoctor) {
          sharedDoc.idDoctor = shared.idDoctor
        }

        const idSharedWith = (await addDoc(collection(firestore, 'sharingCodes', idSharingCode, 'sharedWith'), sharedDoc)).id;
        await updateDoc(doc(firestore, 'sharingCodes', idSharingCode, 'sharedWith', idSharedWith), { idSharedWith })
      }

      res.status(201).json({ message: 'Data added successfully'})
    } catch(error) {
      console.log(error)
      res.status(400).json({ error: 'Cannot add sharing code : ' + error.message })
    }
  }
}
