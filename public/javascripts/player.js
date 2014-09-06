function Player(loadedcallback, endedcallback) {
	this.audio = null;
	this.loadedcallback = loadedcallback;
	this.endedcallback = endedcallback;
}
Player.prototype = {
	init: function() {
		var thisPlayer = this;
		thisPlayer.audio = new Audio();
		thisPlayer.audio.autoplay = false;
		thisPlayer.audio.controls = false;
		thisPlayer.audio.loop = false;
		thisPlayer.audio.preload = 'auto';
		thisPlayer.audio.addEventListener('loadedmetadata', function() {
			thisPlayer.loadedcallback(this);
		}, false);
		thisPlayer.audio.addEventListener('ended', function() {
			thisPlayer.endedcallback(this);
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
	},
	stop: function() {
		this.audio.pause();
		this.audio.currentTime = 0;
	}
}

























