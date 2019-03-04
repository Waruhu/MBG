
function showDialog() {
    const BrowserWindow = remote.BrowserWindow;
    const path = require('path');
    const url = require('url');

    let top = remote.getCurrentWindow();

    let child  = new BrowserWindow({
        with:400,
        height:500,
        parent: top,
        modal: true,
        show: true,
        title: "Tambah Playlist"
    });

    // child.webContents.openDevTools();
    child.loadURL(url.format({
        pathname: path.join(__dirname,'editor-playlist.html'),
        protocol: 'file',
        slashes: true
    }));
    child.once('ready-to-show', () => {
        child.show()
    });

    child.on('closed',()=>{
        load_playlist();
        child = null;
    });
}

function load_songs() {
    var multiselect = require('bootstrap-multiselect');
    var sql = 'select * from `m_lagu`';
    var songs = new Array();
    database.query(sql, function (error, results, fields) {
        results.forEach(function (result) {
            $('#songs-select').append("<option value=\"" + result.id + "\">" + result.judul + "</option>");
        });
        $.multiselect = multiselect;
        $("#songs-select").multiselect({
            nonSelectedText : "Pilih Lagu",
            includeSelectAllOption : true,
            buttonWidth : '70%',
            enableFiltering : true,
        });

    });

}

function savePlaylist() {
    event.preventDefault();
    writeToDatabase(close)
}

function writeToDatabase(callback) {
    var title = $("#judul").val();
    var values ={
        nama : title,
        status : 1
    };

    console.log("test");
    database.query('INSERT INTO m_playlist SET ?', values, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted",result.insertId);
        var songs = $("#songs-select").val();

        songs.forEach(function (song) {
            var value = {
                id_playlist : result.insertId,
                id_lagu : song
            };

            database.query('INSERT INTO playlist_lagu SET ?', value, function (err, result) {
                console.log("1 playlist_lagu has been recorded");
            });
        });

    });

    
    callback();
}

function close() {
    console.log("dijalankan duluan");
    var window = remote.getCurrentWindow();
    setTimeout(function () {
        load_songs();
        window.close();
        event.preventDefault()
    },1000);
}

function load_playlist() {
    var sql = 'select * from `m_playlist`';
    
    database.query(sql, function (error, results, fields) {
        if (error) console.log(error)
        else {

            $(".list-group-flush").empty();

            results.forEach(function (playlist) {
                $(".list-group-flush").append($('<li class="list-group-item list-group-item-action"></li>').html(playlist.nama));
            });
        }
    });
    
}