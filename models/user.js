var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
   userid : String,
    name: String,
    password: String,
    mobile : String
});

module.exports = mongoose.model('user', userSchema);
