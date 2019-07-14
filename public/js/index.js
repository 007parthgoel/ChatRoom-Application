var socket=io();

socket.on('connect',function(){
    console.log('connected to server');

    socket.emit('createMessage',{
        from:'client',
        text:'hello::::::'
    });
    
    // socket.emit('createEmail',{
    //     to:'jen@example.com',
    //     text:'Hey, this is parth'
    // });
});


socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

socket.on('newEmail',function(email){
    console.log('new Email',email);
})

socket.on('NewMessage',function(Message){
    console.log('NewMessage',Message);
});