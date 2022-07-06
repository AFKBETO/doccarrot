// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../../../../config/firebase'
import {collection, getDocs, query, where} from 'firebase/firestore'
import {toKeyAlias} from "@babel/types";
import {fetchUserData} from '../[uid]/index'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { publicID } = req.query
      const foundUser = (await getDocs(query(collection(firestore, 'users'), where('publicID', '==', publicID)))).docs.map(d => d.data()).find(() => true)

      if (!foundUser) throw new Error();

      const result = await fetchUserData(foundUser.idUser)
      res.status(200).json(result)
    } catch (error) {
      res.status(404).json({ error: error.message + req.body.uid })
    }
  }
}
