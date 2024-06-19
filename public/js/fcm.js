// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getMessaging, getToken, onMessage, } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js";
import { getDatabase,  ref, set , onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAI9yCFTl-0Gn3xiA-kDeGVz8EsnB947MM",
  authDomain: "la-won.firebaseapp.com",
  projectId: "la-won",
  storageBucket: "la-won.appspot.com",
  messagingSenderId: "365381428013",
  
  appId: "1:365381428013:web:de3199337b88650b5f69a4",
  measurementId: "G-Q50J4G5BBZ",
  databaseURL: "https://la-won-default-rtdb.asia-southeast1.firebasedatabase.app",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const input = document.getElementById("message-input");
const rightChat = document.getElementById("right-chat");
const leftChat = document.getElementById("left-chat");
const sentButton = document.getElementById("sent-btn");
// const socket = io('https://256bf5c1a36a29ce5e83eccafa383cbe.serveo.net');
const messagesDiv = document.getElementById('messages');
const db = getDatabase(app);


sentButton.addEventListener('click', () => {
  const message = input.value;
  
  if (message !== '') {
      sentMessage(generateUserId(),message,colorOfUserMessage)
  }
  input.value = '';

});
console.log(db)

let userId = generateUserId();

let colorOfUserMessage = getRandomColor()



  const messagesRef = ref(db, 'messages/');
  onValue(messagesRef, (snapshot) => {
    const data = snapshot.val();
    const keys = Object.keys(data);
const lastKey = keys[keys.length - 1];
const lastValue = data[lastKey];
    floatMessage(lastValue['message'],lastValue['color']);
    
  });
  
  function sentMessage(userId, message, color, ) {
    set(ref(db, 'messages/' + userId), {
      message: message,
     color: color
    });


  }
  


function createMessageBox(message,color) {
  const messageBox = document.createElement('div');

  messageBox.classList.add('message');
  messageBox.classList.add("float-up");
  messageBox.style.backgroundColor = color;


  // Create a text node and append it to the paragraph
  const textNode = document.createTextNode(message);
  messageBox.appendChild(textNode);

  return messageBox;
}
// Initialize Firebase Cloud Messaging
// const messaging = getMessaging(app);

// Request permission to send notifications
// const requestPermission = async () => {
//   try {
//     await Notification.requestPermission();
//     const token = await getToken(messaging, { vapidKey: 'BL4JfcDNgariv6G8YMTywLrnABcbG073FfFYEBDyTus-8XFziWMNMe65N8yLi9_gVWDUc_tRkwYYDzeIalRaIsU' });
//     console.log('FCM Token:', token);
//     // Send the token to your server and update the UI if necessary
//   } catch (error) {
//     console.error('Permission denied or error occurred:', error);
//   }
// };

// requestPermission();

// Handle incoming messages when the app is in the foreground
// onMessage(messaging, (payload) => {
//   console.log('Message received. ', payload);
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.icon
//   };

//   new Notification(notificationTitle, notificationOptions);
// });

function generateUserId() {
    const timestamp = Date.now().toString(); // Get current timestamp in milliseconds
    const randomString = Math.random().toString(36).substring(2, 10); // Generate a random alphanumeric string

    return `${timestamp}-${randomString}`;
}

function getRandomColor() {
  const randomColor = () => Math.floor(Math.random() * 256);
  const red = randomColor().toString(16).padStart(2, '0');
  const green = randomColor().toString(16).padStart(2, '0');
  const blue = randomColor().toString(16).padStart(2, '0');
  
  return `#${red}${green}${blue}`;
}

function floatMessage(message,color){
  let spawnPos = [leftChat, rightChat];

  const spawnIndex = Math.random() * 2; // This will give a number between 0 and 2 (exclusive of 2)
  console.log(spawnIndex.toFixed() -1);




  spawnPos[spawnIndex.toFixed()-1].appendChild(createMessageBox(message,color))
}