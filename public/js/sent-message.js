const input = document.getElementById("message-input");
const rightChat = document.getElementById("right-chat");
const sentButton = document.getElementById("sent-btn");

console.log(input)

input.addEventListener('change',(e)=>{
    // console.log(e.target.value);

    // createMessageBox(e.target.value)
    
    createMessageBox(input.value)
    rightChat.appendChild(createMessageBox(input.value))
    input.value = ''
})

sentButton.addEventListener('click',(e)=>{


});




function createMessageBox(message){
    const messageBox = document.createElement('div');

    messageBox.classList.add('message');
    messageBox.classList.add("float-up");


    // Create a text node and append it to the paragraph
    const textNode = document.createTextNode(message);
    messageBox.appendChild(textNode);

    return messageBox;
}