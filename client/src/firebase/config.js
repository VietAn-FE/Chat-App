import firebase from "firebase/compat/app";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8bKE9CU5kfRHbMxldERs9Y5rLXAqYYH4",
  authDomain: "chat-app-66986.firebaseapp.com",
  projectId: "chat-app-66986",
  storageBucket: "chat-app-66986.appspot.com",
  messagingSenderId: "370099054387",
  appId: "1:370099054387:web:63f40288c52d6a61998046",
  measurementId: "G-HWL74211WY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

const auth = getAuth();
const db = getFirestore();

export { auth, db };

export default firebase;
