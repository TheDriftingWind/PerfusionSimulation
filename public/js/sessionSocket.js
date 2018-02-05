// Make connection
var socket = io.connect(window.location.href);
// Query DOM
var message = document.getElementById('message'),
      sender = document.getElementById('sender'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', function(){
    message.value = message.value.replace(/</g,'').replace(/>/g,'');
    sender.value = sender.value.replace(/</g,'').replace(/>/g,'');
    socket.emit('chat', {
        message: message.value,
        sender: sender.value
    });
    message.value = "";
});

message.addEventListener('keyup', function(e){
    if(e.keyCode==13){
      document.getElementById('send').click();
    }
    message.value = message.value.replace(/</g,'').replace(/>/g,'');
    sender.value = sender.value.replace(/</g,'').replace(/>/g,'');
    socket.emit('typing', {
      'sender' : sender.value,
      'isTyping' : message.value.length == 0 ? false : true
    });
});

message.addEventListener('focus', function(e){
    socket.emit('startTyping', {
    });
});

sender.addEventListener('keyup', function(e){
  if(e.keyCode==13){
      $('#message').focus();
            $('#message').select();
    }
    message.value = message.value.replace(/</g,'').replace(/>/g,'');
    sender.value = sender.value.replace(/</g,'').replace(/>/g,'');
    socket.emit('typing', {
      'sender' : sender.value,
      'isTyping' : message.value.length == 0 ? false : true
    });
});

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><span style="font-size: 10px;white-space: pre;">' + getTime(new Date().getTime()) +'</span><strong> ' + data.sender + ': </strong>' + data.message + '</p>';
    reScroll();
});

socket.on('typing', function(data){
    if(data.isTyping){
      feedback.innerHTML = '<p><em>' + data.sender + ' is typing a message...</em></p>';      
    }
    else{
      feedback.innerHTML = '';
    }
});

socket.on('startTyping', function(data){
    reScroll()
});

function reScroll(){
  $("#chat-window").animate({ scrollTop: $('#chat-window').prop("scrollHeight")}, 1000);
}
function getTime(milliseconds){
    let time = new Date(milliseconds);
    var curr_date = time.getDate();
      var curr_month = time.getMonth() + 1; //Months are zero based
      var curr_year = time.getFullYear();
    time = time.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true });

    return curr_month + '-' + curr_date + '-' + curr_year + ' ' + time;
  }


  