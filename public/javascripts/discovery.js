var socket = io.connect('http://localhost:3000/discovery');
var mconfirm = null;
socket.on('connect',function(skt) {
  mconfirm = prompt("Your Name please:");
  skt.emit('name',"hello");
});


