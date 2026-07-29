import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

const getValidAppId = (envVal?: string) => {
    if (!envVal || envVal.includes("54546571597")) {
        return "1:333898018800:web:59fbecb1b5fa825ff9b735";
    }
    return envVal;
};

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA-Jy1H1q7wInzWuzzKqm_jL7WJmXc2z_I",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "diakzona.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "diakzona",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "diakzona.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "333898018800",
    appId: getValidAppId(import.meta.env.VITE_FIREBASE_APP_ID),
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-Y1QJ18LN7E"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Use the explicit Firestore database ID from the Firebase console ('databasediakzona')
export const db = getFirestore(app, 'databasediakzona');

export const storage = getStorage(app);

export const analyticsPromise = isSupported()
    .then((supported) => supported ? getAnalytics(app) : null)
    .catch(() => null);

export default app;
