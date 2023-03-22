import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js"


const firebaseConfig = {
    apiKey: "AIzaSyBLtCIjp5vALytA39FOg2PXP6u0moZCMGw",
    authDomain: "project-d6f3f.firebaseapp.com",
    databaseURL: "https://project-d6f3f-default-rtdb.firebaseio.com",
    projectId: "project-d6f3f",
    storageBucket: "project-d6f3f.appspot.com",
    messagingSenderId: "726327106887",
    appId: "1:726327106887:web:54b708f1bea35a86ebc062"
};

const app = initializeApp(firebaseConfig);


export default app;