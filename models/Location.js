var mongoose = require("mongoose");
var LocationSchema = new mongoose.Schema({
  locationObject: Object
});

module.exports = mongoose.model('Location', LocationSchema);