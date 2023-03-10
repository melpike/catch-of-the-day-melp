import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC8MFA8kZnoZIS-ACvi-QzVPYPWxN6D71k",
    authDomain: "catch-of-the-day-melp.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-melp-default-rtdb.firebaseio.com",
    projectId: "catch-of-the-day-melp",
    storageBucket: "catch-of-the-day-melp.appspot.com",
    messagingSenderId: "917496956739",
    appId: "1:917496956739:web:85ded8858c71a8721e51f6",
    measurementId: "G-N2SC581Q80"
})

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;