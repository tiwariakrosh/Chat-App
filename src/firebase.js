import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyACATLZt-X4cXJNtWQVwdR4F_Aa2_pGRdw",
    authDomain: "chat-app-f05af.firebaseapp.com",
    projectId: "chat-app-f05af",
    storageBucket: "chat-app-f05af.appspot.com",
    messagingSenderId: "751483665982",
    appId: "1:751483665982:web:865abd2253cfe4e747db6f"
}).auth();