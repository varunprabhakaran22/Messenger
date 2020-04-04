const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const socket = io();

//message from  server 
socket.on('message',message=>{
    console.log(message)
    outputMessage(message)


    //scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

//display the message from  server 
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML=`<p class="meta">Mary <span>9:15pm</span></p>
    <p class="text">
        ${message}
    </p>`;

    document.querySelector(".chat-messages").appendChild(div);
}

//function send button
chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    //sending to server
    socket.emit('chatMessage',msg);

    //clear input
    e.target.elements.msg.value=''
    e.target.elements.msg.focus();
})