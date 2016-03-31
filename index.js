var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
 
// Initialize appication with route / (that means root of the application)
app.get('/', function(req, res){
  var express=require('express');
  app.use(express.static(path.join(OPENSHIFT_HOMEDIR)));
  res.sendFile(path.join(OPENSHIFT_HOMEDIR, './', 'index.html'));
});
 
// Register events on socket connection
io.on('connection', function(socket){
  socket.on('chatMessage', function(from, msg){
    io.emit('chatMessage', from, msg);
  });
  socket.on('notifyUser', function(user){
    io.emit('notifyUser', user);
  });
});
 
// Listen application request on port 80
http.listen(OPENSHIFT_NODEJS_PORT, function(){
  console.log('listening');
});
