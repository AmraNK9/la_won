

const input = document.getElementById("message-input");
const rightChat = document.getElementById("right-chat");
const leftChat = document.getElementById("left-chat");
const sentButton = document.getElementById("sent-btn");
const socket = io('http://localhost:3001');
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');

console.log(input)

input.addEventListener('change', (e) => {
    // console.log(e.target.value);

    // createMessageBox(e.target.value)
    sendMessage(e.target.value)
    // rightChat.appendChild(createMessageBox(input.value))
    input.value = ''
})

sentButton.addEventListener('click', (e) => {

    sendMessage(e.target.value)
    // rightChat.appendChild(createMessageBox(input.value))
    input.value = ''
});



socket.on('message', (msg) => {
    let spawnPos = [leftChat, rightChat];

    const spawnIndex = Math.random() * 2; // This will give a number between 0 and 2 (exclusive of 2)
    console.log(spawnIndex.toFixed() -1);




    spawnPos[spawnIndex.toFixed()-1].appendChild(createMessageBox(msg))


});

function sendMessage(msg) {
    socket.emit('message', msg);
}




function createMessageBox(message) {
    const messageBox = document.createElement('div');

    messageBox.classList.add('message');
    messageBox.classList.add("float-up");


    // Create a text node and append it to the paragraph
    const textNode = document.createTextNode(message);
    messageBox.appendChild(textNode);

    return messageBox;
}