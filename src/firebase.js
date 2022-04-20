import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAb0gw1n5v1F6Qd9vdYfZ92XbVrZQa5USg",
    authDomain: "aibigdata-hustler.firebaseapp.com",
    projectId: "aibigdata-hustler",
    storageBucket: "aibigdata-hustler.appspot.com",
    messagingSenderId: "458333384257",
    appId: "1:458333384257:web:9a571a0985aec3fffb60c0",
    measurementId: "G-GZ34RZ0B77"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export { db }