// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js";

// Your web app's Firebase configuration
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

// Initialize Firebase Cloud Messaging
const messaging = getMessaging(app);

// Request permission to send notifications
const requestPermission = async () => {
  // try {
    await Notification.requestPermission();
    const token = await getToken(messaging, { vapidKey: 'BL4JfcDNgariv6G8YMTywLrnABcbG073FfFYEBDyTus-8XFziWMNMe65N8yLi9_gVWDUc_tRkwYYDzeIalRaIsU' });
    console.log('FCM Token:', token);
    // Send the token to your server and update the UI if necessary
  // } catch (error) {
  //   console.error('Permission denied or error occurred:', error);
  // }
};

requestPermission();

// Handle incoming messages when the app is in the foreground
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  new Notification(notificationTitle, notificationOptions);
});
