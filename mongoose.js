var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bellhops');
var mongdb = mongoose.connection;
mongdb.on('error', console.error.bind(console, 'connection error:'));
mongdb.once('open', function callback () {
  console.log("mongo connected");
});
var blogschema = mongoose.Schema({
    content: String
});
var blog = mongoose.model('blogschema', blogschema)
module.exports = blog;
