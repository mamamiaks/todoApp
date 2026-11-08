// firebaseConfig.js

import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCmHdajzO1xToMgAl4sJfkFslmpH0ka3-k',
  authDomain: 'todoapp-561ac.firebaseapp.com',
  projectId: 'todoapp-561ac',
  storageBucket: 'todoapp-561ac.firebasestorage.app',
  messagingSenderId: '1070435750266',
  appId: '1:1070435750266:web:55b361ff590c7bef9586c3',
  measurementId: 'G-LP87V36ZTE',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

let auth;

try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  auth = getAuth(app);
}

const db = getFirestore(app);

export { app, auth, db };