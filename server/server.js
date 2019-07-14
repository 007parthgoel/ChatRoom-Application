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

    socket.on('createMessage',(message)=>{
        console.log('createMessage',message);
          io.emit('newMessage',{
            from:message.from,
            text:message.text,
            createdAt: new Date().getTime()
        });
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