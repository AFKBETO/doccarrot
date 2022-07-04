import type { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../../../config/firebase'
import { doc, setDoc } from 'firebase/firestore'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      const { uid, idPatient, idDoctor, date, location, signature, maxUses, medications } = req.body

      await setDoc(doc(firestore, 'prescriptions', uid), {
        idPatient,
        idDoctor,
        date,
        location,
        signature,
        currentUses: 0,
        maxUses
      }, { merge: true })

      for (const med of medications) {
        const { idMedication, idMedicationType, quantity } = med
        await setDoc(doc(firestore, 'prescriptions/' + (uid as string) + '/medications', med.uid), {
          idMedication,
          idMedicationType,
          quantity

        }, { merge: true });
      }

      res.status(201).json({ message: 'Data added successfully'})
    } catch {
      res.status(400).json({ error: 'Cannot add prescription' })
    }
  }
}
