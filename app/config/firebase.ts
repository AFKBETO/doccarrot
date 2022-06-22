import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyD8UzQRZgKUPPU1KxvevKcGs3KdooON0SA",
  authDomain: "doc-carrot.firebaseapp.com",
  databaseURL: "https://doc-carrot-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "doc-carrot",
  storageBucket: "doc-carrot.appspot.com",
  messagingSenderId: "791071650638",
  appId: "1:791071650638:web:8ee57342c5a2605b18641f",
  measurementId: "G-DL4D6W8V5L"
}

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const emailAuthProvider = new firebase.auth.EmailAuthProvider()
export const storage = firebase.storage()