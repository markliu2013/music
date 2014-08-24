$(document).ready(function(){
	jQuery.preLoadImages(
		"images/next-hover.png",
		"images/next-pressing.png",
		"images/pause-hover.png",
		"images/pause-pressing.png",
		"images/play-hover.png",
		"images/play-pressing.png",
		"images/prev-hover.png",
		"images/prev-pressing.png",
		"images/stop-hover.png",
		"images/stopped.png",
		"images/stop-pressing.png",
		"images/upload-hover.png",
		"images/upload-pressing.png"
	);
	$(document).bind("click", function(e) {
		$("#player-list ul li.selected").removeClass("selected");
		return false;
	});
	$("#jquery-player").jPlayer({
		play: function() {
			$(this).jPlayer("pauseOthers");
		},
		ended: function() {
			$("#player-controls ul li.jp-next").trigger("click");
		},
		swfPath: "js",
		supplied: "mp3",
		cssSelectorAncestor: '#player-container',
		cssSelector: {

		}
	});

	$("#player-list ul li").bind("dblclick", function() {
		$("#player-list ul li.selected").removeClass("selected");
		$(this).addClass("selected");
		$("#player-list ul li.playing").removeClass("playing");
		$(this).addClass("playing");
		var url = $(this).attr("url");
		$("#jquery-player").jPlayer("setMedia", {
			mp3: url
		}).jPlayer("play");
		$("#player-controls ul li.jp-play").removeClass("pause");
		$("#player-controls ul li.jp-play").addClass("playing");
		$("#player-controls ul li.jp-stop.stopped").removeClass("stopped");
	});
	$("#player-list ul li").bind("click", function(e) {
		$("#player-list ul li.selected").removeClass("selected");
		$(this).addClass("selected");
		e.stopPropagation();
	});
	$("#player-controls ul li.jp-play.playing").live("click", function() {
		$("#jquery-player").jPlayer("pause");
		$(this).removeClass("playing");
		$(this).addClass("pause");
	});
	$("#player-controls ul li.jp-play.pause").live("click", function() {
		if ($("#player-list ul li.playing").length<1) {
			$("#player-list ul li.selected").addClass("playing")
			$("#jquery-player").jPlayer("setMedia", {
				mp3: $("#player-list ul li.selected").attr("url")
			});
		}
		$("#jquery-player").jPlayer("play");
		$("#player-controls ul li.jp-stop.stopped").removeClass("stopped");
		$(this).removeClass("pause");
		$(this).addClass("playing");
	});
	$("#player-controls ul li.jp-stop").bind("click", function() {
		if ($(this).hasClass("stopped")) {
			return;
		}
		$("#jquery-player").jPlayer("stop");
		$("#jquery-player").jPlayer("clearMedia");
		$(this).addClass("stopped");
	});
	$("#player-controls ul li.jp-prev").bind("click", function() {
		var index_playing = $("#player-list ul li.playing").index();
		$("#player-list ul li.playing").removeClass("playing");
		if ( index_playing <= 0 ) {
			$("#player-list ul li").last().addClass("playing");
		} else {
			$("#player-list ul li").eq(index_playing-1).addClass("playing");
		}
		$("#jquery-player").jPlayer("setMedia", {
			mp3: $("#player-list ul li.playing").attr("url")
		}).jPlayer("play");
		$("#player-controls ul li.jp-stop.stopped").removeClass("stopped");
	});
	$("#player-controls ul li.jp-next").bind("click", function() {
		var list_size =  $("#player-list ul li").size();
		var index_playing = $("#player-list ul li.playing").index();
		$("#player-list ul li.playing").removeClass("playing");
		if ( index_playing >= list_size-1 ) {
			$("#player-list ul li").first().addClass("playing");
		} else {
			$("#player-list ul li").eq(index_playing+1).addClass("playing");
		}
		$("#jquery-player").jPlayer("setMedia", {
			mp3: $("#player-list ul li.playing").attr("url")
		}).jPlayer("play");
		$("#player-controls ul li.jp-stop.stopped").removeClass("stopped");
	});
	$("#player-controls ul li").bind("mousedown", function() {
		$(this).addClass("pressing");
	});
	$("#player-controls ul li").bind("mouseup", function() {
		$(this).removeClass("pressing");
	});
});
/* pre-load images */
(function($) {
	var cache = [];
	// Arguments are image paths relative to the current page.
	$.preLoadImages = function() {
		var args_len = arguments.length;
		for (var i = args_len; i--;) {
			var cacheImage = document.createElement('img');
			cacheImage.src = arguments[i];
			cache.push(cacheImage);
		}
	}
})(jQuery)