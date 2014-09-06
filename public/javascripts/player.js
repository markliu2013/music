function Player(loadedcallback) {
	this.audio = null;
	this.loadedcallback = loadedcallback;
}
Player.prototype = {
	init: function() {
		var thisPlayer = this;
		thisPlayer.audio = new Audio();
		thisPlayer.audio.autoplay = false;
		thisPlayer.audio.controls = false;
		thisPlayer.audio.loop = true;
		thisPlayer.audio.preload = 'auto';
		thisPlayer.audio.addEventListener('loadedmetadata', function() {
			thisPlayer.loadedcallback(this);
		}, false);
	},
	play: function(url) {
		if (url) {
			this.audio.src = url;
		}
		this.audio.play();
	},
	pause: function() {
		this.audio.pause();
	}
}

























