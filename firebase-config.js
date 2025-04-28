// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCt0e0bDAHtZeKc8voyHt64RZhBgQi6-uQ",
  authDomain: "kelasf-be7e9.firebaseapp.com",
  projectId: "kelasf-be7e9",
  storageBucket: "kelasf-be7e9.firebasestorage.app",
  messagingSenderId: "412551956117",
  appId: "1:412551956117:web:acdc18b11265314e92fd9c",
  measurementId: "G-ENS3CQ4685"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
