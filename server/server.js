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

    socket.emit('newMessage',{
        from:"admin",
        text:"welcome to the chat app",
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage',{
        from:"admin",
        text:"New user joined",
        createdAt: new Date().getTime()
    });



    socket.on('createMessage',(message)=>{
        console.log('createMessage',message);

         // socket.broadcast.emit('newMessage',{
        //     from: message.from,
        //     text:message.text,
        //     createdAt: new Date().getTime()             
        // });      
    });

    socket.on('mail',(message)=>{
        console.log('mail was received',message);
    });

    socket.on('newMessage',(message)=>{
        console.log('newMessage was received',message);
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