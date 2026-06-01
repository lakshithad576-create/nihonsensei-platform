import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCNeJB1y64dzuTsESW7WtGeeg_ZpR8Sc9A",
  authDomain: "nihonsensei-lk.firebaseapp.com",
  projectId: "nihonsensei-lk",
  storageBucket: "nihonsensei-lk.firebasestorage.app",
  messagingSenderId: "144344471111",
  appId: "1:144344471111:web:cea58c0f0cfca22aa94362"
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);