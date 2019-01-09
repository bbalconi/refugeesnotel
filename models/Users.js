var passwordHash = require("password-hash");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: {type: String, set: function(password){
    return passwordHash.generate(password)
  }},
  locations: [{
    locationObject: Object,
    locationName: String,
    isEditable: Boolean
  }]
});
module.exports = mongoose.model('User', UserSchema);