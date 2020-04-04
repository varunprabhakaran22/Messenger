const express = require('express');
const path = require('path'); 
const http = require('http');
const socketio =require('socket.io');

const app =express();
const server = http.createServer(app);
const io = socketio(server); 
const PORT = 3000 || process.env.PORT

//set static folder
app.use(express.static(path.join(__dirname,'public')));

// run when client connect 
io.on('connection',socket =>{ 
    socket.emit('message','welcome')


    //Broadcast 
    socket.broadcast.emit('message','A user joined');


    //Disconnects
    socket.on('disconnect',()=>{
        io.emit('message','user left');
    });

    //listen for cient message
    socket.on('chatMessage', msg=>{
        io.emit('message',msg);
    })
});



server.listen(PORT,(req,res)=>{
    console.log("server running")
}); 