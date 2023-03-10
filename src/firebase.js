import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCdzRdv-Dl6PlmD2UX2ai9E3alDM55F3Zg",
    authDomain: "catch-of-the-day---melp.firebaseapp.com",
    // databaseURL: "https://catch-of-the-day---melp.firebaseio.com",
    projectId: "catch-of-the-day---melp",
    storageBucket: "catch-of-the-day---melp.appspot.com",
    messagingSenderId: "866628938886",
    appId: "1:866628938886:web:2e855f705bd85b64cf7507",
    measurementId: "G-33MQB50725"
}

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);