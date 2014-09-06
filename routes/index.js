/*
 * GET home page.
 */
var mongoose = require('mongoose');
require('../models/Music');
var Music = mongoose.model('Music');
var fs = require("fs");
var formidable = require('formidable');
var tracklist = require("tracklist");

exports.index = function (req, res) {
	var options = {

	}
	Music.list(options, function(err, musics) {
		res.render('index', {
			title: 'Music Page | Mark Liu Blog',
			musics: musics
		});
	});
};

var target_dir = './public/mp3/';
exports.upload = function (req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		var timestamp = new Date().getTime();
		var target_name = timestamp + Math.ceil(Math.random()*100) + '.mp3';
		var target_path = target_dir+target_name;
		fs.renameSync(files.Filedata.path, target_path);
		tracklist.list(target_path, function (err, tags) {
			var music1 = new Music();
			if (tags.title) {
				music1.name = tags.title.replace("T\u0000", "") ;
			} else {
				music1.name = files.Filedata.name;
				music1.artist = ""
			}
			if (tags.artist) {
				music1.artist = tags.artist.replace("T\u0000", "") ;
			} else {
				music1.artist = "未知Artist"
			}
			music1.targetName = target_name;
			music1.save(function() {mongoose.disconnect();});
            res.send(music1);
		});
	});
}
exports.delete = function (req, res) {
	Music.findById(req.params.id, function(err, doc) {
		doc.remove(function() {
			fs.unlink(target_dir + doc.targetName, function(err) {
				if (err) throw err;
			});
			//res.redirect('/');
			res.json({success:1});
		})
	});
}