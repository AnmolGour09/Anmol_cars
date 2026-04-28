import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxnX-8CPtj8j2Ez5ADKEgHItD7Nh7tWso",
  authDomain: "car-showroom-86ff1.firebaseapp.com",
  projectId: "car-showroom-86ff1",
  storageBucket: "car-showroom-86ff1.firebasestorage.app",
  messagingSenderId: "251191129799",
  appId: "1:251191129799:web:e4cd3c3759aa1f12e7b0e2"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);