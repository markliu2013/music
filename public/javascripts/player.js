function Player(loadedcallback, endedcallback) {
	this.loadedcallback = loadedcallback;
	this.endedcallback = endedcallback;
	this.status = 0;//0 not init  1 just init   2 playing  3 paused  4 stopped
	this.isInited = false;
}
Player.prototype = {
	_prepareAPI: function() {
		//fix browser vender for AudioContext
		window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
		window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
		window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;
	},
	init: function(opt) {
		if (this.isInited) return false;
		var thisPlayer = this;
		thisPlayer._prepareAPI();
		thisPlayer.context = new AudioContext();//should be only one instance
		thisPlayer.analyser = thisPlayer.context.createAnalyser();
		thisPlayer.audio = new Audio();
		thisPlayer.audio.autoplay = false;
		thisPlayer.audio.controls = false;
		thisPlayer.audio.loop = false;
		thisPlayer.audio.preload = 'metadata';
		thisPlayer.audio.volume = localStorage.getItem('volume') || 1.0;
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
		thisPlayer.audio.addEventListener('canplay', function() {
			$('#player-container .progress.loading').removeClass('loading');
			clearInterval(thisPlayer.progressThread);
			thisPlayer.drawProgress();
		});
		$("#player-container .progress").bind('click', function(e) {
			if (thisPlayer.status == 2) {
				$('#player-container .progress').addClass('loading');
				var percent = e.offsetX / $(this).width();
				thisPlayer.audio.currentTime = thisPlayer.audio.duration * percent;
				var currentTime = thisPlayer.audio.currentTime;
				var bufferedTime = null;
				try {
					bufferedTime = thisPlayer.audio.buffered.end(audio.buffered.length-1)
				} catch(error) {
					bufferedTime = thisPlayer.audio.currentTime;
				}
				var currentWidth = currentTime / thisPlayer.audio.duration * $(this).width();
				var bufferWidth = bufferedTime / thisPlayer.audio.duration * $(this).width();
				$('#player-container .progress .play-bar').width(currentWidth);
				$('#player-container .progress .loaded-bar').width(bufferWidth);
			}
		});
		this.status = 1;
		this.isInited = true;
	},
	play: function(url) {
		this.init();
		if (url) {
			this.audio.src = url;
			$('#player-container .progress .play-bar').width(0);
			$('#player-container .progress .loaded-bar').width(0);
		}
		$('#player-container .progress').addClass('loading');
		this.audio.play();
		cancelAnimationFrame(this.animationThread);
		this.drawSpectrum(document.getElementById('spectrum-canvas'));
		this.status = 2;
	},
	pause: function() {
		cancelAnimationFrame(this.animationThread);
		clearInterval(this.progressThread);
		this.audio.pause();
		this.status = 3;
	},
	stop: function() {
		cancelAnimationFrame(this.animationThread);
		clearInterval(this.progressThread);
		this.audio.pause();
		this.audio.currentTime = 0;
		this.status = 4;
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
		function drawCol() {
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
			thisPlayer.animationThread = requestAnimationFrame(drawCol);
		}
		thisPlayer.animationThread = requestAnimationFrame(drawCol);
	},
	drawProgress: function() {
		var thisPlayer = this;
		var audio = thisPlayer.audio;
		var duration = audio.duration;
		var $progress = $('#player-container .progress');
		var $playBar = $('#player-container .play-bar');
		var $loadedBar = $('#player-container .loaded-bar');
		var progressWidth = $('#player-container .progress').width();
		function calProgress() {
			var currentTime = audio.currentTime;
			var bufferedTime = null;
			try {
				bufferedTime = audio.buffered.end(audio.buffered.length-1)
			} catch(error) {
				bufferedTime = audio.currentTime;
			}
			var currentWidth = currentTime / duration * progressWidth;
			var bufferWidth = bufferedTime / duration * progressWidth;
			$('#player-container .progress .play-bar').width(currentWidth);
			$('#player-container .progress .loaded-bar').width(bufferWidth);
		}
		thisPlayer.progressThread = setInterval(calProgress, 1000);
	}
}

























