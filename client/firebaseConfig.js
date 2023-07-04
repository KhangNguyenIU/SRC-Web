
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
    apiKey: String(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
    authDomain: String(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
    databaseURL: String(process.env.NEXT_PUBLIC_FIREBASE_DB_URL),
    projectId: String(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
    storageBucket: String(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
    messagingSenderId: String(process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID),
    appId: String(process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
    measurementId: String(process.env.NEXT_PUBLIC_FIREBASE_MESSUREMENT_ID)
};

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app);

