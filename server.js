var express = require('express');
var http = require('http');
var app = require("express")();
var server = require('http').Server(app);
var request = require('request');
let bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var path = require('path');
const DarkSky = require('dark-sky')
let mongoose = require('mongoose');
let uriUtil = require('mongodb-uri');
let Location = require('./models/Location');
require('dotenv').config();

let mongodbUri = `mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PASSWORD}@ds223738.mlab.com:23738/refugeesnotel`;

const darksky = new DarkSky(process.env.DARK_SKY) // Your API KEY can be hardcoded, but I recommend setting it as an env variable.
//45.816763, -110.929706

var mongooseUri = uriUtil.formatMongoose(mongodbUri);
var options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};

mongoose.connect(mongooseUri, options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to mLab!');
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./sner/build'));
} else {
  app.use(express.static('public'));
}
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/darthVader', (req, res, next) => {
  const result = darksky
    .coordinates({ lat: req.body.lat, lng: req.body.lng })
    .exclude('minutely')
    .get()
    .then((data) => {
      res.json(data);
    })
    .catch(console.log);
})

app.post('/saveLocation', (req, res, next) => {
  let location = new Location();
  location.locationObject = req.body.locationObject,
  location.locationName = req.body.locationName,
  location.isEditable = false;
  location.save((err, newLocation) => {
    if (err) { next(err) }
    else { res.json(newLocation) };
  });
});

app.get('/retrieveSavedLocations', (req, res, next) => {
  Location.find((req, locations) => {
    res.json(locations)
  })
})

app.put('/updateCard', (req, res, next) => {
  let id = req.body._id;
  let newData = req.body.newData;
    Location.findByIdAndUpdate(id, {$set: {locationObject: newData}}, (err, res) => {
        if (err) { console.log(err) }
    });
    res.send('Success');
});

app.put('/updateLocationName', (req, res, next) => {
  console.log(req.body)
  let id = req.body._id;
  let newLocationName = req.body.newLocationName;
    Location.findByIdAndUpdate(id, {$set: {locationName: newLocationName}}, (err, res) => {
      if (err) {console.log(err)}
    });
    res.send('Success');
});

app.post('/deleteCard', (req, res, next) => {
  Location.findOneAndRemove({ _id: req.body.id }, (err, deleted) => {
    let response = {
      message: "Location deleted",
      id: deleted._id
    };
    res.status(200).send(response)
  });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, 'sner', 'build', 'index.html'));
});

var port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log('listening on port ' + port);
});    