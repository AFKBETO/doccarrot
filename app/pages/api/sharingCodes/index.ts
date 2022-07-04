import type { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../../../config/firebase'
import { doc, setDoc } from 'firebase/firestore'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      const { idSharingCode, idPatient, idPrescription, code, sharedWith } = req.body

      await setDoc(doc(firestore, 'sharingCodes', idSharingCode), {
        idSharingCode,
        idPatient,
        idPrescription,
        code
      }, { merge: true })

      for (const shared of sharedWith) {
        let sharedDoc = {
          idSharedWith: shared.idSharedWith,
          idPharmacy: undefined,
          idDoctor: undefined
        }
        if (shared.idPharmacy) {
          sharedDoc.idPharmacy = shared.idPharmacy
        } else if (shared.idDoctor) {
          sharedDoc.idDoctor = shared.idDoctor
        }
        await setDoc(doc(firestore, 'sharingCodes/' + (idSharingCode as string) + '/sharedWith', shared.idSharedWith), sharedDoc, { merge: true });
      }

      res.status(201).json({ message: 'Data added successfully'})
    } catch {
      res.status(400).json({ error: 'Cannot add prescription' })
    }
  }
}