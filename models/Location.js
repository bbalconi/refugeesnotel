var mongoose = require("mongoose");
var LocationSchema = new mongoose.Schema({
  locationObject: Object,
  locationName: String
});

module.exports = mongoose.model('Location', LocationSchema);