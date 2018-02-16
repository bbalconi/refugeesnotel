var mongoose = require("mongoose");
var LocationSchema = new mongoose.Schema({
  locationObject: Object,
  locationName: String,
  isEditable: Boolean
});

module.exports = mongoose.model('Location', LocationSchema);