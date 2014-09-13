function Player(loadedcallback, endedcallback) {
	this.loadedcallback = loadedcallback;
	this.endedcallback = endedcallback;
	this.thread = null;
}
Player.prototype = {
	_prepareAPI: function() {
		//fix browser vender for AudioContext
		window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
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
		thisPlayer.audio.volume = localStorage.getItem('volume');
		$('#player-controls .jp-volume-bar-value').width((parseFloat(localStorage.getItem('volume'))*$("#player-controls .jp-volume-bar").width()));//it's not good here.
		$(this).find('.jp-volume-bar-value').width();
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
		clearInterval(this.thread);
		this.drawSpectrum(document.getElementById('spectrum-canvas'));
	},
	pause: function() {
		clearInterval(this.thread);
		this.audio.pause();
	},
	stop: function() {
		clearInterval(this.thread);
		this.audio.pause();
		this.audio.currentTime = 0;
	},
	setVolume: function(val) {
		this.audio.volume = val;
		localStorage.setItem('volume', val);
	},
	drawSpectrum: function(canvas) {
		var thisPlayer = this;
		var ctx = canvas.getContext('2d');
		var gradient = ctx.createLinearGradient(0, 0, 0, 200);
		gradient.addColorStop(0, '#70cbfc');
		gradient.addColorStop(0.3, '#516fd7');
		gradient.addColorStop(1, '#6dc3f9');
		var cWidth = canvas.width;
		var cHeight = canvas.height;
		var columnWidth = 10;
		var columGap = 2;
		var columnNum = cWidth / (columnWidth+columGap);
		var step = Math.floor( thisPlayer.analyser.frequencyBinCount / columnNum);
		var maxValue = 255;
		var capPositionArray = [];
		var capHeight = 2;

		this.thread = setInterval(function() {
			var array = new Uint8Array(thisPlayer.analyser.frequencyBinCount);
			thisPlayer.analyser.getByteFrequencyData(array);
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for (var i=0; i<columnNum; i++) {
				var value = array[i * step]/maxValue*cHeight;
				ctx.fillStyle = '#4c5fd1';
				if (value < capPositionArray[i]) {
					ctx.fillRect(i*(columnWidth+columGap),canvas.height-(--capPositionArray[i]),columnWidth, capHeight);
				} else {
					ctx.fillRect(i*(columnWidth+columGap),canvas.height-value,columnWidth, capHeight);
					capPositionArray[i] = value;
				}
				ctx.fillStyle = gradient;
				ctx.fillRect(i*(columnWidth+columGap),canvas.height-value+capHeight,columnWidth, cHeight);
			}
		}, 20);
	}
}

























