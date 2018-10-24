
function calculateTotalValue(length) {
    var minutes = Math.floor(length / 60),
        seconds_int = length - minutes * 60,
        seconds_str = seconds_int.toString(),
        seconds = seconds_str.substr(0, 2),
        time = minutes + ':' + seconds

    return time;
}

function calculateCurrentValue(currentTime) {
    var current_hour = parseInt(currentTime / 3600) % 24,
        current_minute = parseInt(currentTime / 60) % 60,
        current_seconds_long = currentTime % 60,
        current_seconds = current_seconds_long.toFixed(),
        current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds);

    return current_time;
}

function initProgressBar(){
    var player = document.getElementById('audiofile');
    var length = player.duration;
    var current_time = player.currentTime;
    
    // calculate total length of value
    var totalLength = calculateTotalValue(length);
    document.getElementById("end-time").innerHTML = totalLength;

    // calculate current value time
    var currentTime = calculateCurrentValue(current_time);
    document.getElementById("start-time").innerHTML = currentTime;
    
    var progressMusik = document.getElementById("progressMusik");
    progressMusik.min = 0;
    progressMusik.max = length;
    progressMusik.value=current_time;

    progressMusik.oninput = function () {
        var player = document.getElementById('audiofile');
        player.currentTime = this.value;
    }
    $("#progressVolume").value =player.volume*100;
}

function play(){
    var player = document.getElementById('audiofile');
    player.play();
    $("#btnPlay").hide();
    $("#btnPause").show();
    
}
function pause(){
    var player = document.getElementById('audiofile');
    player.pause();
    $("#btnPlay").show();
    $("#btnPause").hide();
}
function stop(){
    pause();
    var player = document.getElementById('audiofile');
    player.currentTime = 0;
}