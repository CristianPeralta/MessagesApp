var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  from: { type: Schema.Types.ObjectId, ref: 'User'},
  to: { type: Schema.Types.ObjectId, ref: 'User'},
  contents: String,
  lang: String,
  open: String,
  createdAt:{ type: Date, default: Date.now}
});

var Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
