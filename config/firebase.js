import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'
import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyCCQXuk_uWAOeivn8wYlZhFqtn0C_ydf1A",
    authDomain: "bwk-school.firebaseapp.com",
    projectId: "bwk-school",
    storageBucket: "bwk-school.appspot.com",
    messagingSenderId: "33157085567",
    appId: "1:33157085567:web:a86a2251bc44de1493824a"
};
try {
    app.initializeApp(firebaseConfig);
} catch (err) {
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack)
    }
}

const fire = app;
export default fire;