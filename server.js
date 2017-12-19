var express = require('express');
var http = require('http');
var app = require("express")();
var server = require('http').Server(app);
var io = require('socket.io');
let bodyParser = require("body-parser");
var fetch = require('node-fetch');
var cookieParser = require('cookie-parser');
var path  = require('path');

require('dotenv').config();
 
var allowedOrigins = "http://localhost:* http://192.168.*.*:* https://coffee-pot-pi.herokuapp.com:*";
var ioServer = io(server, {
  origins: allowedOrigins
});
 

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/build'));
} else {
  app.use(express.static('public'));
}


// app.post('/socketUrl', (req, res)=>{
//   if (process.env.PORT){
//     res.json('https://coffee-pot-pi.herokuapp.com:');
//   } else {
//     res.json('http://localhost:5000')
//   }
// });

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

var port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log('listening on port ' + port);
});    