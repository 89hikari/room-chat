import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBc3kCYxJjpv9YrYXHzSXjwdUitqPiLyWA",
    authDomain: "chat-app-9d82a.firebaseapp.com",
    databaseURL: "https://chat-app-9d82a-default-rtdb.firebaseio.com",
    projectId: "chat-app-9d82a",
    storageBucket: "chat-app-9d82a.appspot.com",
    messagingSenderId: "62711158843",
    appId: "1:62711158843:web:c3fdbf7648d75a628f241e",
    measurementId: "G-L1EQ86DTVY"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;