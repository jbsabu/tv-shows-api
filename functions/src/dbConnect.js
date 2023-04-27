import { initializeApp,cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { secrets } from "../secrets.js";

initializeApp({ // connect with cred
  credential: cert(secrets)
})


export const db = getFirestore()
