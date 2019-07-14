const path=require('path');
const http =require('http');
const express=require('express');
const SocketIO=require('socket.io');

const publicpath=path.join(__dirname,'../public');
const port=process.env.PORT || 3000;
var app=express();
var server=http.createServer(app);
var io=SocketIO(server);

app.use(express.static(publicpath));

io.on('connection',(socket)=>{
    console.log('New user connected');

    // socket.emit('newEmail',{
    //     from:'mike@example.com',
    //     text:'Hey, what is going on',
    //     createdAt:123
    // });

    socket.emit('NewMessage',{
        from:'server',
        text:'welcome to the chat app',
        createdAt:Date.now()

    });

    socket.on('createMessage',(message)=>{
        console.log('createMessage',message);
    });
    
    // socket.on('createEmail',(newEmail)=>{
    //     console.log('createEmail',newEmail);
    // });

    socket.on('disconnect',()=>{
        console.log('User was Disconnected');
    });
});

server.listen(port,()=>{
    console.log(`server is up on port ${port}`);
});
//console.log(__dirname+'/../public');
//console.log(publicpath);