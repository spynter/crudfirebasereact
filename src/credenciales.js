// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaRa8tP6_Q-CqFZG7Q6prhFJz8J2gdmE0",
  authDomain: "mi-primer-proyecto-react-31ad1.firebaseapp.com",
  projectId: "mi-primer-proyecto-react-31ad1",
  storageBucket: "mi-primer-proyecto-react-31ad1.appspot.com",
  messagingSenderId: "596763369711",
  appId: "1:596763369711:web:53364f4f2b8c6000b77b1a"
};

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);

export default fireBaseApp;