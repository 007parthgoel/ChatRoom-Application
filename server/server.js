const path=require('path');
const http =require('http');
const express=require('express');
const SocketIO=require('socket.io');
const {generateMessage,generateLocationMessage}=require('./utils/message');

const publicpath=path.join(__dirname,'../public');
const port=process.env.PORT || 3000;
var app=express();
var server=http.createServer(app);
var io=SocketIO(server);

app.use(express.static(publicpath));

io.on('connection',(socket)=>{
    console.log('New user connected');

    socket.emit(
        'newMessage',generateMessage('Admin','Welcome to the chat App')
        );

    socket.broadcast.emit(
        'newMessage',generateMessage('Admin','New user joined')
        );

    socket.on('createMessage',(message,callback)=>{
        console.log('createMessage',message);
        io.emit('newMessage',generateMessage(message.from,message.text));  
        callback('This is from the server'); 

    });

    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
    });

    socket.on('disconnect',()=>{
        console.log('User was Disconnected');
    });
});

server.listen(port,()=>{
    console.log(`server is up on port ${port}`);
});
//console.log(__dirname+'/../public');
//console.log(publicpath);