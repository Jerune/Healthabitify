import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'
import { getAuth } from 'firebase/auth'

// Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBd-i0HluEP2GN59uCmOGt5vZRlpLeH80o',
    authDomain: 'healthabitify.firebaseapp.com',
    projectId: 'healthabitify',
    storageBucket: 'healthabitify.appspot.com',
    messagingSenderId: '160733277781',
    appId: '1:160733277781:web:19245b393c54a34e8eaedc',
}

// Initialize Firebase
const fireapp = initializeApp(firebaseConfig)
const firebase = getFirestore(fireapp)
const auth = getAuth(fireapp)

export { auth, firebase }
