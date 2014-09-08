function Player(loadedcallback, endedcallback) {
	this.loadedcallback = loadedcallback;
	this.endedcallback = endedcallback;
}
Player.prototype = {
	_prepareAPI: function() {
		//fix browser vender for AudioContext and requestAnimationFrame
		window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
		window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
		window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;
	},
	init: function() {
		var thisPlayer = this;
		thisPlayer._prepareAPI();
		thisPlayer.context = new AudioContext();//should be only one instance
		thisPlayer.analyser = thisPlayer.context.createAnalyser();
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
		thisPlayer.source = thisPlayer.context.createMediaElementSource(thisPlayer.audio);
		thisPlayer.source.connect(thisPlayer.analyser);
		thisPlayer.analyser.connect(thisPlayer.context.destination);
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
	},
	drawSpectrum: function(canvas) {
		var thisPlayer = this;
		setInterval(function() {

		}, 60);
	}
}

























