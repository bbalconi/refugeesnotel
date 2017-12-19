var express = require('express');
var http = require('http');
var app = require("express")();
var server = require('http').Server(app);
var request = require('request');
var io = require('socket.io');
let bodyParser = require("body-parser");
var fetch = require('node-fetch');
var cookieParser = require('cookie-parser');
var path  = require('path');
const DarkSky = require('dark-sky')
require('dotenv').config();

const darksky = new DarkSky(process.env.DARK_SKY) // Your API KEY can be hardcoded, but I recommend setting it as an env variable.
//45.816763, -110.929706
 
var allowedOrigins = "http://localhost:* http://192.168.*.*:* https://coffee-pot-pi.herokuapp.com:*";
var ioServer = io(server, {
  origins: allowedOrigins
});
 
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/build'));
} else {
  app.use(express.static('public'));
}

app.get('/skyWalker', (req, res, next) => {
    const result = darksky
    .coordinates({lat: 48.816763, lng: -110.929706})
    .exclude('minutely')
    .get()
    .then((data) => {
      res.json(data)
    })
    .catch(console.log);
})



app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

var port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log('listening on port ' + port);
});    