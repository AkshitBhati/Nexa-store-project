// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyABu8UOAGQ9b5nIWzi3XxXvbbOU_7LEacs",
//   authDomain: "data-management-system-5952c.firebaseapp.com",
//   projectId: "data-management-system-5952c",
//   storageBucket: "data-management-system-5952c.appspot.com",
//   messagingSenderId: "532277002465",
//   appId: "1:532277002465:web:f4d9fb4de20ebfea79b7a0",
//   measurementId: "G-KVRRR4X2G9"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);




//FOR TEST MODE

// Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";


// const firebaseConfig = {
//   apiKey: "AIzaSyCPt9VZgUNrVnXo0TWTVQPRh-OV35YIftE",
//   authDomain: "naveen-2cf88.firebaseapp.com",
//   projectId: "naveen-2cf88",
//   storageBucket: "naveen-2cf88.appspot.com",
//   messagingSenderId: "868211093073",
//   appId: "1:868211093073:web:20fc486c1d5c623b625270",
//   measurementId: "G-J5LJ010E9E"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

import { getApp, getApps, initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCPt9VZgUNrVnXo0TWTVQPRh-OV35YIftE",
    authDomain: "naveen-2cf88.firebaseapp.com",
    projectId: "naveen-2cf88",
    storageBucket: "naveen-2cf88.appspot.com",
    messagingSenderId: "868211093073",
    appId: "1:868211093073:web:20fc486c1d5c623b625270",
    measurementId: "G-J5LJ010E9E"
  };
  
  // Initialize Firebase
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const auth = getAuth()

  export { db, auth }