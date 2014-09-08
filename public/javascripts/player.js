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
	init: function(opt) {
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
		thisPlayer.columnWidth = opt && opt.columnWidth ? opt.columnWidth : 10;
		thisPlayer.gapWidth = opt && opt.gapWidth ? opt.gapWidth : 2;

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
		var ctx = canvas.getContext('2d');
		var gradient = ctx.createLinearGradient(0, 0, 0, 200);
		gradient.addColorStop(1, '#6dc3f9');
		gradient.addColorStop(0.5, '#516fd7');
		gradient.addColorStop(0, '#70cbfc');
		ctx.fillStyle = gradient;

		setInterval(function() {
			var array = new Uint8Array(thisPlayer.analyser.frequencyBinCount);
			thisPlayer.analyser.getByteFrequencyData(array);
			var marWidth = thisPlayer.columnWidth+thisPlayer.gapWidth;
			var columnNum = canvas.width / marWidth;

			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for (var i=0; i<columnNum; i++) {
				ctx.fillRect(i*marWidth,0,thisPlayer.columnWidth, Math.random()*200);
			}
		}, 50);
	}
}

























