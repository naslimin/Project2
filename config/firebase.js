import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCmLQt5c55M2FnsQERVkvGcXVE1O9uL9ls",
    authDomain: "bwkschool-8a348.firebaseapp.com",
    projectId: "bwkschool-8a348",
    storageBucket: "bwkschool-8a348.appspot.com",
    messagingSenderId: "865747928165",
    appId: "1:865747928165:web:358f3f924076aa9e70b28c"
};
try {
    firebase.initializeApp(firebaseConfig);
} catch (err) {
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack)
    }
}
const fire = firebase;
export default fire;