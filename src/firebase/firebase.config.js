// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrlQgcGUhC8aZ8EbsWmSBMuWEgIBZor_0",
  authDomain: "movies-demo-544f4.firebaseapp.com",
  projectId: "movies-demo-544f4",
  storageBucket: "movies-demo-544f4.firebasestorage.app",
  messagingSenderId: "311944610846",
  appId: "1:311944610846:web:26db98c12ef4a0567e5a0f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);