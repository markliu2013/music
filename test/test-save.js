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
Music.collection.remove(function() {});
/*
var music1 = new Music();
music1.name = "Special Agent Mahone";
music1.artist = "Klaus Badelt";
music1.duration = new Date();
music1.url = "http://127.0.0.1:3000/mp3/1.mp3";
var music2 = new Music();
music2.name = "Glad You Came";
music2.artist = "The Wanted";
music2.duration = new Date();
music2.url = "http://127.0.0.1:3000/mp3/2.mp3";
var music3 = new Music();
music3.name = "Wonderful World";
music3.artist = "Eternity ∞";
music3.duration = new Date();
music3.url = "http://127.0.0.1:3000/mp3/3.mp3";
var music4 = new Music();
music4.name = "天涯明月刀";
music4.artist = "钟汉良";
music4.duration = new Date();
music4.url = "http://127.0.0.1:3000/mp3/4.mp3";
var music5 = new Music();
music5.name = "愿得一人心";
music5.artist = "李行亮,雨宗林";
music5.duration = new Date();
music5.url = "http://127.0.0.1:3000/mp3/5.mp3";
music1.save();
music2.save();
music3.save();
music4.save();
music5.save(function() {mongoose.disconnect();});*/
