var id3 = require('id3js');
var iconv = require("iconv-lite");
id3({ file: '4.mp3', type: id3.OPEN_LOCAL }, function(err, tags) {
	console.log(iconv.decode(tags.title,"gbk"));
});
