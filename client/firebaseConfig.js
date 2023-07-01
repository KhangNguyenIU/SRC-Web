
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyA374ebkQxWDJ8Ueyuw7BaKl6KQjlU9W-0",
    authDomain: "src-noti.firebaseapp.com",
    databaseURL: "https://src-noti-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "src-noti",
    storageBucket: "src-noti.appspot.com",
    messagingSenderId: "732232551077",
    appId: "1:732232551077:web:1e29e4421578aae1541b4c",
    measurementId: "G-G7EEGG0ZXG"
  };

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app);