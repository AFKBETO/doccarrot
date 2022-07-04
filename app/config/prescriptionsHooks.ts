import { User } from 'firebase/auth';
import { useEffect, useState } from 'react'
import { auth } from '../config/firebase'
import { getPrescriptionsByPatient } from './api'
import {PrescriptionData, UserType} from './types'
import {useUserData} from "./userDataHooks";

export function usePrescriptions (userId: string | null) {
  const [prescriptions, setPrescriptions] = useState<PrescriptionData[]>([])

  useEffect(() => {
    fetchData()    
  }, [userId])

  const fetchData = async () => {
    try {
      if (userId) {
        setPrescriptions(await getPrescriptionsByPatient(userId));
        return;
      }
    } catch (error) {}
    setPrescriptions([]);
  }

  return { prescriptions }
}
