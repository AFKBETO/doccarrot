import type { NextApiRequest, NextApiResponse } from 'next'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import {firestore} from "../../../../config/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      const { idSharingCode, sharedWith } = req.body
      await putSharedWith(idSharingCode, sharedWith)

      res.status(201).json({ message: 'Data added successfully'})
    } catch(error) {
      console.log(error)
      res.status(400).json({ error: 'Cannot add sharing code : ' + error.message })
    }
  }
}

export async function putSharedWith(idSharingCode: string, sharedWith: { idPharmacy?: string, idDoctor?: string }[]) {
  for (const shared of sharedWith) {
    let sharedDoc;
    if (shared.idPharmacy != null) {
      sharedDoc = { idPharmacy: shared.idPharmacy }
    } else if (shared.idDoctor != null) {
      sharedDoc = { idDoctor: shared.idDoctor }
    } else continue;

    const idSharedWith = (await addDoc(collection(firestore, 'sharingCodes', idSharingCode, 'sharedWith'), sharedDoc)).id;
    await updateDoc(doc(firestore, 'sharingCodes', idSharingCode, 'sharedWith', idSharedWith), { idSharedWith })
  }
}
