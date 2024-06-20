import { onValue, messagesRef, roomId } from "./fcm.js";
import { copyToClipboard } from "./utility.js";
const sections = ['avatar', 'tic-tac-toe-game', 'guess-game', 'weather-screen','heart-beat'];

function toggleSection(sectionIdToShow) {
    console.log("run toggle session")
    sections.forEach(sectionId => {
        document.getElementById(sectionId).style.display = sectionId === sectionIdToShow ? 'block' : 'none';
    });
}

function clearScreen(){
    sections.forEach(sectionId => {
        document.getElementById(sectionId).style.display =  'none';
    });   
}



onValue(messagesRef, (snapshot) => {
    const data = snapshot.val();
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const { message, color } = data[key];
            if (message[0] == "#") {
                let commend = message.substring(1, message.length);
                sections.forEach((v, i, arr) => {
                    console.log(v,"==", commend)
                    if (commend == v) {
                        toggleSection(v)
                    }
                })

                switch (commend) {
                    case "clear":
                        clearScreen();
                        break;

                    case "copy-room":
                        const url = new URL(window.location.href);
                        copyToClipboard(url+"?room_id="+roomId)
                
                    default:
                        break;
                }
            }
        }
    }
});


const copyLinkBtn = document.getElementById("copy-room")

copyLinkBtn.addEventListener('click',(e)=>{
    const url = new URL(window.location.href);
    copyToClipboard(url+"?room_id="+roomId)
})