load_m_library();
load_m_playlist("list-playlist");

$("#alkitab").click(function () {
    var content = fs.readFileSync('src/html/alkitab.html');
    $("#content").html(content.toString());
});

$("#bibel").click(function () {
    var content = fs.readFileSync('src/html/bibel.html');
    $("#content").html(content.toString());
});


$("#btn-add-library").click(function(){
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
    const path = require('path');
    const url = require('url');

    let top = remote.getCurrentWindow();
    let child = new BrowserWindow({
        with:300,
        height:300,
        parent: top,
        modal: true,
        show: true,
        title: "Formulir"
    });

    child.loadURL(url.format({
		pathname: path.join(__dirname,'editor-library.html'),
		protocol: 'file',
		slashes: true
	}));

    child.once('ready-to-show', () => {
        child.show()
    });

    child.on('closed',()=>{
        load_m_library();
        child = null;
	});
});

function simpanLibrary(){
    event.preventDefault();
    var nama = $("#label_library").val();
    var sql = "insert into m_library(nama,status,kode) values('"+nama+"',1,'00')";
    database.query(sql, function (error, results, fields) {
        if (error) console.log(error);
        else {
            load_m_library();
            var window = remote.getCurrentWindow();
            window.close();
        }
    });
}


function deleteAlbum() {
    var dialog = require('electron').remote.dialog;

    d = document .getElementsByClassName("active");
    id= $(d).attr("kode")

    var pilih = dialog.showMessageBox(
        remote.getCurrentWindow(),
        {
            type: 'question',
            buttons: ['Ya', 'Tidak'],
            title: 'Konfirmasi',
            message: 'Apakah yakin ingin menghapus album ini?'
        });
    if (pilih == 0) {
        var sql = 'delete from m_library where id=' + id;
        database.query(sql, function (error, results, fields) {
            if (error) console.log(error.code);
            else {
                load_m_library();
            }
        });
    }
    else{
      load_m_library();
    }
}

function load_m_library() {
    var sql = 'select * from `m_library`';
    database.query(sql, function (error, results, fields) {
        if (error) console.log(error.code);
        else {
            var html = '';
            results.forEach(function (library) {
                html += "<a class='list-group-item list-group-item-action lgi-library' kode=" + library.id + ">" + library.nama + "</a>";
            });
            $('#list-library').html(html);
            $(".lgi-library").click(function () {
                $(this).siblings().removeClass("active");
                $(this).addClass("active");
                if($(this).text() === "My Playlist"){
                    $("#content").load('playlist.html')
                    $(".music-control").attr("disabled", false);
                }else{
                    $("#content").load('musik.html');
                    $(".music-control").attr("disabled", false);
                }

            });
        }
    });
}

function load_m_playlist(el) {
    var sql = 'select * from `m_playlist`';
    database.query(sql, function (error, results, fields) {
        if (error) console.log(error.code);
        else {
            var html = '';
            results.forEach(function (playlist) {
                html += "<a class='list-group-item list-group-item-action'>" + playlist.nama + "</a>";
            });
            $('#' + el).html(html);
        }
    });
}
