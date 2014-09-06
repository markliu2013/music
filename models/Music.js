var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var MusicSchema = new Schema({
	name: { type: String, default: '' },
	artist: { type: String, default: '' },
	duration: { type: Date, default: '' },
	targetName: { type: String, default: '' }
});

MusicSchema.statics = {
	list: function(options, cb) {
		this.find().exec(cb);
	}
}

mongoose.model('Music', MusicSchema);