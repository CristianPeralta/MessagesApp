var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {type:String, unique:true, required:'Name is required'},
  createdAt:{ type: Date, default: Date.now}
});

var User = mongoose.model("User", UserSchema);

module.exports = User;