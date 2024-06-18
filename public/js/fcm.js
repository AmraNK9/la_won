  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAI9yCFTl-0Gn3xiA-kDeGVz8EsnB947MM",
    authDomain: "la-won.firebaseapp.com",
    projectId: "la-won",
    storageBucket: "la-won.appspot.com",
    messagingSenderId: "365381428013",
    appId: "1:365381428013:web:de3199337b88650b5f69a4",
    measurementId: "G-Q50J4G5BBZ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
