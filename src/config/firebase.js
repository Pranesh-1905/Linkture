// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Use Firestore instead

const firebaseConfig = {
  apiKey: "AIzaSyCnETQynmUT8pTBcCs3jixwhMc_te7fYrY",
  authDomain: "linkture12.firebaseapp.com",
  projectId: "linkture12",
  storageBucket: "linkture12.appspot.com",
  messagingSenderId: "712069278235",
  appId: "1:712069278235:web:4720d936bbfc52c4bda6be",
  measurementId: "G-K2HTVWZZHV" 
}; 

const App = initializeApp(firebaseConfig);
export const auth = getAuth(App);
export const db = getFirestore(App); // Firestore database

export default App