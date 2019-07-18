const path=require('path');
const http =require('http');
const express=require('express');
const SocketIO=require('socket.io');

const {generateMessage,generateLocationMessage}=require('./utils/message');
const {isRealString}=require('./utils/validation');
const {Users}=require('./utils/user');

const publicpath=path.join(__dirname,'../public');
const port=process.env.PORT || 3000;
var app=express();
var server=http.createServer(app);
var io=SocketIO(server);
var users= new Users(); 

app.use(express.static(publicpath));

io.on('connection',(socket)=>{
     console.log('New user connected');
 
     socket.on('join',(params,callback)=>{
             // console.log(params);
         if(!isRealString(params.name) || !isRealString(params.room)){
              return callback('Name and Room name are required');
         }

         //socket.to('the office fans').emit();
         // socket.leave('params.room');
         socket.join(params.room);
         users.removeUser(socket.id);
         users.addUser(socket.id,params.name,params.room);

         io.to(params.room).emit('updateUserList',users.getUserList(params.room));

         socket.emit('newMessage',generateMessage('Admin','Welcome to the chat App'));

         socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined `));

         callback();
     });

     


       socket.on('createMessage',(message,callback)=>{
           // console.log('createMessage',message);
        io.emit('newMessage',generateMessage(message.from,message.text));  
        callback();
        });

      socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
      });

     socket.on('disconnect',()=>{
        //console.log('User was Disconnected');
        var user=users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left`));
        }
    });
});

server.listen(port,()=>{
    console.log(`server is up on port ${port}`);
});
//console.log(__dirname+'/../public');
//console.log(publicpath);