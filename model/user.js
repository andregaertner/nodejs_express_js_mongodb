var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var usersSchema = new Schema({
  name:String,
  email:String,
  age:String
});
var User = mongoose.model('users', usersSchema);
mongoose.connect('mongodb://localhost/mongo');
//console.log(mongoose);
module.exports = User;
