var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/music');
var Schema = mongoose.Schema;
var musicSchema = new Schema({
	name: String,
	artist: String,
	duration: Date,
	url: String
});
var Music = mongoose.model('Music', musicSchema);
Music.find(function(err, musics) {
	console.log(musics);
	mongoose.disconnect();
});