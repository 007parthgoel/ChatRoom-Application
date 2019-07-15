var socket=io();

socket.on('connect',function(){
    console.log('connected to server');
});

socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

socket.on('newMessage',function(Message){
    console.log('NewMessage',Message);
});

socket.on('welcomeMessage',(message)=>{
    console.log('welcomeMessage is received',message);
});

socket.on('welcomebroadcast',(message)=>{
    console.log('welcomebroadcast is received',message);
});