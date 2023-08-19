// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCK8YVOOo050Pvt-2rZoUqKm63Ss-d5SbA",
    authDomain: "optimism-396403.firebaseapp.com",
    projectId: "optimism-396403",
    storageBucket: "optimism-396403.appspot.com",
    messagingSenderId: "379471092629",
    appId: "1:379471092629:web:6fb7ac49efeb704166349c",
    measurementId: "G-95F40080LY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleAuthProvider, db };
