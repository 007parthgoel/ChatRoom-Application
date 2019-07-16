var socket=io();

socket.on('connect',function(){
    console.log('connected to server');
});

socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

socket.on('newMessage',function(message){
    console.log('NewMessage',message);
    var li=jQuery('<li></li>');
    li.text(`${message.from} : ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage',function(message){
   var li=jQuery('<li></li>');
   var a=jQuery('<a target="_blank">My current Location</a>');

   li.text(`${message.from}: `);
   a.attr('href',message.url);
   li.append(a);
   jQuery('#messages').append(li);
});

// socket.emit('createMessage',{
//     from:'Frank',
//     text: 'Hi'
// },function(data){
//     console.log('Got it',data);
// });

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();

    var messageTextbox=jQuery('[name=message]');

    socket.emit('createMessage',{
        from:'User',
        text:messageTextbox.val()
    },function(){
        messageTextbox.val('');
    });
});

var locationButton=jQuery('#send-location');
//jQuery('#send-location').on
locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled','disabled').text('Sending Location...');

    navigator.geolocation.getCurrentPosition(function(position){
   //      console.log(position);
   locationButton.removeAttr('disabled').text('Send Location');

   socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
   });

    },function(){
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location');
    });
});