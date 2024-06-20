import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getDatabase, ref, set, onValue, query, limitToLast , update} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getParam } from "./utility.js";
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
const db = getDatabase(app);

const input = document.getElementById("message-input");
const rightChat = document.getElementById("right-chat");
const leftChat = document.getElementById("left-chat");
const sentButton = document.getElementById("sent-btn");
const messagesDiv = document.getElementById('messages');

let userId = generateUnitTimeStamp();
let colorOfUserMessage = getRandomColor();

sentButton.addEventListener('click', () => {
  const message = input.value;
  if (message !== '') {
      sentMessage(userId, message, colorOfUserMessage);
  }
  input.value = '';
});

input.addEventListener('change',(e)=>{
  const message = input.value;
  if (message !== '') {
      sentMessage(userId, message, colorOfUserMessage);
  }
  input.value = '';
})

console.log(getParam("room"),"&&",getParam('password'))

let room = getParam("room") ;
let password = getParam("password");
let roomId = getParam("room_id");
if(roomId != null){

}
else if(room != null || password != null){
  roomId = room+password;
}else{
  roomId = generateUnitTimeStamp();
}


const messagesRef = query(ref(db, roomId+'/messages/'), limitToLast(1));
onValue(messagesRef, (snapshot) => {
  const data = snapshot.val();
  console.log(snapshot);
  console.log(data);

  // Clear the chat display
  rightChat.innerHTML = '';
  leftChat.innerHTML = '';

  // Display the last 4 messages
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const { message, color } = data[key];
      floatMessage(message, color);
    }
  }
});

function sentMessage(userId, message, color) {
  set(ref(db, roomId+'/messages/' + generateUnitTimeStamp()), {
    userId,
    message: message,
    color: color
  });
}

function createMessageBox(message, color) {
  const messageBox = document.createElement('div');
  messageBox.classList.add('message');
  messageBox.classList.add("float-up");
  messageBox.style.backgroundColor = color;

  // Create a text node and append it to the paragraph
  const textNode = document.createTextNode(message);
  messageBox.appendChild(textNode);

  return messageBox;
}

function generateUnitTimeStamp() {
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

function floatMessage(message, color) {
  let spawnPos = [leftChat, rightChat];
  const spawnIndex = Math.floor(Math.random() * 2); // This will give a number between 0 and 1
  console.log(spawnIndex);
  if(message[0] != "#"){
    spawnPos[spawnIndex].appendChild(createMessageBox(message, color));
  }
}




export {ref,set,db,onValue , update, messagesRef, roomId};