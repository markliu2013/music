$(document).ready(function () {

	function calculateDuration(time) {
		var min = '00' + (time / 60 | 0), sec = time % 60;
		sec = '00' + (sec | 0);
		return [min.substr(-2), sec.substr(-2)].join(':');
	}

	function loadedCallBack(audio) {
		$('#player-list ul li.playing .duration').text(calculateDuration(audio.duration));
	}
	var player = new Player(loadedCallBack);
	player.init();

	$(document).bind("click", function (e) {
		$("#player-list ul li.selected").removeClass("selected");
	});

	$("#player-list ul").delegate("li", "dblclick", function () {
		$("#player-list ul li.selected").removeClass("selected");
		$(this).addClass("selected");
		$("#player-list ul li.playing").removeClass("playing");
		$(this).addClass("playing");
		var url = 'mp3/'+$(this).attr("data-url");
		player.play(url);
		$("#player-controls ul li.jp-play").removeClass("pause");
		$("#player-controls ul li.jp-play").addClass("playing");
		$("#player-controls ul li.jp-stop.stopped").removeClass("stopped");
	});
	$("#player-list ul").delegate("li", "click", function (e) {
		$("#player-list ul li.selected").removeClass("selected");
		$(this).addClass("selected");
		e.stopPropagation();
	});
	$("#player-controls ul li.jp-play").bind('click', function() {
		if ($(this).hasClass('playing')) {
			player.pause();
			$(this).removeClass("playing");
			$(this).addClass("pause");
		} else if ($(this).hasClass('pause')) {
			if ($("#player-list ul li.playing").length < 1) {
				var url = 'mp3/'+$("#player-list ul li.selected").attr("data-url");
				player.play(url);
				$("#player-list ul li.selected").addClass("playing");
				$("#player-controls ul li.jp-stop.stopped").removeClass("stopped");
			} else {
				player.play();
			}
			$(this).removeClass("pause");
			$(this).addClass("playing");
		}
	});
	$("#player-controls ul li.jp-stop").bind("click", function () {
		if ($(this).hasClass("stopped")) {
			return;
		}
		$("#jquery-player").jPlayer("stop");
		$("#jquery-player").jPlayer("clearMedia");
		$(this).addClass("stopped");
	});
	$("#player-controls ul li.jp-prev").bind("click", function () {
		var index_playing = $("#player-list ul li.playing").index();
		$("#player-list ul li.playing").removeClass("playing");
		if (index_playing <= 0) {
			$("#player-list ul li").last().addClass("playing");
		} else {
			$("#player-list ul li").eq(index_playing - 1).addClass("playing");
		}
		$("#jquery-player").jPlayer("setMedia", {
			mp3: $("#player-list ul li.playing").attr("url")
		}).jPlayer("play");
		$("#player-controls ul li.jp-stop.stopped").removeClass("stopped");
	});
	$("#player-controls ul li.jp-next").bind("click", function () {
		var list_size = $("#player-list ul li").size();
		var index_playing = $("#player-list ul li.playing").index();
		$("#player-list ul li.playing").removeClass("playing");
		if (index_playing >= list_size - 1) {
			$("#player-list ul li").first().addClass("playing");
		} else {
			$("#player-list ul li").eq(index_playing + 1).addClass("playing");
		}
		$("#jquery-player").jPlayer("setMedia", {
			mp3: $("#player-list ul li.playing").attr("url")
		}).jPlayer("play");
		$("#player-controls ul li.jp-stop.stopped").removeClass("stopped");
	});
	$("#music-file").uploadifive({
		uploadScript: '/upload',
		queueID: 'queue',
		fileType: 'audio/mp3',
		auto: false,
		buttonText: '',
		width: 35,
		height: 35,
		buttonClass: 'music-file-button',
		queueSizeLimit: 3,
		removeCompleted: true,
		onUploadComplete: function (file, data, response) {
			var data = $.parseJSON(data);
			var $lastItem = $('#player-list ul li:last-child');
			var itemHtml = '<li id="' + data._id + '" class="clearfix" data-url="' + data.targetName + '">';
			itemHtml += '<span class="num">'+($lastItem.index()+2)+'.</span>';
			itemHtml += '<span class="name">' + data.artist + ' - ' + data.name + '</span>';
			itemHtml += '<span class="duration"></span>';
			$('#player-list ul').append(itemHtml);
		},
		onError: function(errorType, file) {
			setTimeout(function() {
				$("#music-file").uploadifive('cancel', file);
			}, 3000);
		}
	});
	$("#queue button").bind("click", function () {
		$("#music-file").uploadifive('upload');
	});

	$(document).bind("keydown", function (event) {
		if (event.keyCode == 46) {
			if ($("#player-list ul li.selected").length < 1) {
				return;
			}
			var msg = "确定删除" + "吗？"
			if (window.confirm(msg) == true) {
				var musicId = $("#player-list ul li.selected").attr("id");
				$.ajax({
					url: musicId,
					type: 'DELETE',
					success: function(result) {
						$("#player-list ul li.selected").remove();
					}
				});
				return;
			}
		} else if (event.keyCode == 13) {//enter
			if ($("#player-list ul li.selected").length < 1) {
				return;
			}
			var url = $("#player-list ul li.selected").attr("url");
			$("#jquery-player").jPlayer("setMedia", {
				mp3: url
			}).jPlayer("play");
			$("#player-list ul li.playing").removeClass("playing");
			$("#player-list ul li.selected").addClass("playing");
			$("#player-controls ul li.jp-play").removeClass("pause");
			$("#player-controls ul li.jp-play").addClass("playing");
			$("#player-controls ul li.jp-stop.stopped").removeClass("stopped");
		} else if (event.keyCode == 38) {//up
			if ($("#player-list ul li.selected").length < 1) {
				$("#player-list ul li:last-child").addClass("selected");
			} else {
				var index_selected = $("#player-list ul li.selected").index();
				$("#player-list ul li.selected").removeClass("selected");
				if (index_selected <= 0) {
					$("#player-list ul li:last-child").addClass("selected");
				} else {
					$("#player-list ul li").eq(index_selected - 1).addClass("selected");
				}
			}
		} else if (event.keyCode == 40) {//down
			if ($("#player-list ul li.selected").length < 1) {
				$("#player-list ul li:first-child").addClass("selected");
			} else {
				var list_size = $("#player-list ul li").size();
				var index_selected = $("#player-list ul li.selected").index();
				$("#player-list ul li.selected").removeClass("selected");
				if (index_selected >= list_size - 1) {
					$("#player-list ul li:first-child").addClass("selected");
				} else {
					$("#player-list ul li").eq(index_selected + 1).addClass("selected");
				}
			}
		}
	})
});