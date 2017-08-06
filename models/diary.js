var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var diarySchema = new Schema({
    title : String,
    description: String,
    date: Date,
    photo : String
});

module.exports = mongoose.model('diary', diarySchema);
