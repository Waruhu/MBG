var setint = '';
$("#volume-down").on('mousedown', function () {
    clearInterval(setint);
    var player = document.getElementById('audiofile');
    setint = setInterval(function () {
        if (player.volume > 0.01) {
            player.volume = player.volume - 0.01;
            var progressVolume = document.getElementById('progressVolume');
            progressVolume.value = player.volume * 100;
        }
    }, 20);
}).on("mouseleave mouseup", function () {
    clearInterval(setint);
});

$("#volume-up").on('mousedown', function () {
    clearInterval(setint);
    var player = document.getElementById('audiofile');
    setint = setInterval(function () {
        if (player.volume < 0.999) {
            player.volume = player.volume + 0.01;
            var progressVolume = document.getElementById('progressVolume');
            progressVolume.value = player.volume * 100;
        }
    }, 20);
}).on("mouseleave mouseup", function () {
    clearInterval(setint);
});

$(".music-control").attr("disabled", true);