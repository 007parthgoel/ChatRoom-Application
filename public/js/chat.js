var socket=io();

function scrollToBottom(){
    var messages=jQuery('#messages');
    var newMessage=messages.children('li:last-child');


    var clientHeight=messages.prop('clientHeight');
    var scrollTop=messages.prop('scrollTop');
    var scrollHeight=messages.prop('scrollHeight');
    var newMessageHeight=newMessage.innerHeight();
    var lastMessageHeight=newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
           //  console.log('should scroll');
          messages.scrollTop(scrollHeight);
    }

}

socket.on('connect',function(){
   console.log('connected to server');
    var params=jQuery.deparam(window.location.search);

    socket.emit('join',params,function(err){
        if(err){
            alert(err);
            window.location.href='/';
        }else{
            console.log("No error");

        }
    });
});

socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

socket.on('updateUserList',function(users){
  //  console.log('User List', users);
  var ol=jQuery('<ol></ol>');

  users.forEach(function(user){
      ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
});

socket.on('newMessage',function(message){
    var formatedTime=moment(message.createdAt).format('h:mm A');

    var template=jQuery('#message-template').html();
    var html=Mustache.render(template,{
        text:message.text,
        from:message.from,
        createdAt:formatedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage',function(message){
    var formatedTime=moment(message.createdAt).format('h:mm A');
  
    // var li=jQuery('<li></li>');
    // var a=jQuery('<a target="_blank">My current Location</a>');

    var locationTeamplate=jQuery('#Location-message-template').html();
    var html=Mustache.render(locationTeamplate,{
        url:message.url,
        from:message.from,
        createdAt:formatedTime     
    });

    jQuery('#messages').append(html);
    scrollToBottom();
   
 
   
//    li.text(`${message.from}: ${formatedTime} :`);
//    a.attr('href',message.url);
//    li.append(a);
//    jQuery('#messages').append(li);
});



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