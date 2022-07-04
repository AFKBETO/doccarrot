// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../../../../config/firebase'
import { collection, query, where, getDocs } from "firebase/firestore";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { idPatient } = req.query

      const coll = collection(firestore, 'prescriptions');
      const q = query(coll, where('idPatient', '==', idPatient));
      const snapshot = await getDocs(q);

      let prescriptions = snapshot.docs.map(doc => doc.data());
      console.log('patientId', idPatient)
      console.log(prescriptions);

      for (let prescription of prescriptions) {
        const snapMeds = await getDocs(collection(firestore, 'prescriptions/' + (prescription.idPrescription as string) + '/medications'));
        prescription.medications = [];
        for (const doc of snapMeds.docs.map(d => d.data())) {
          prescription.medications.push(doc);
        }
      }

      res.status(201).json({ prescriptions })
    } catch (error) {
      res.status(404).json({ error: error.message + req.body.uid })
    }
  }
}
