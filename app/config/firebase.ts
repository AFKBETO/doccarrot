import { initializeApp } from '@firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyD8UzQRZgKUPPU1KxvevKcGs3KdooON0SA',
  authDomain: 'doc-carrot.firebaseapp.com',
  databaseURL: 'https://doc-carrot-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'doc-carrot',
  storageBucket: 'doc-carrot.appspot.com',
  messagingSenderId: '791071650638',
  appId: '1:791071650638:web:8ee57342c5a2605b18641f',
  measurementId: 'G-DL4D6W8V5L'
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const firestore = getFirestore(app)
