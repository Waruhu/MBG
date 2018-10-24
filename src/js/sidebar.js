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

$("#add-album").click(function () {
    loadTableAlbum();
});
$("#simpan_album").click(function(){
    event.preventDefault();
    var nama = $("#nama_album").val();
    var sql = "insert into m_library(nama,status,kode) values('"+nama+"',1,'00')";
    database.query(sql, function (error, results, fields) {
        if (error) console.log(error);
        else {
            load_m_library();
            loadTableAlbum();
        }
    });
});
function simpanAlbum(){
    event.preventDefault();
    var nama = $("#nama_album").val();
    var sql = "insert into m_library(nama,status,kode) values('"+nama+"',1,'00')";
    database.query(sql, function (error, results, fields) {
        if (error) console.log(error);
        else {
            load_m_library();
            loadTableAlbum();
        }
    });
}
function loadTableAlbum() {
    var sql = 'select * from `m_library`';
    database.query(sql, function (error, results, fields) {
        if (error) console.log(error.code);
        else {
            var row = 1;
            var form = "<div class='form-group mb-2'>"+
                "   <input type='hidden' class='form-control' id='id_album'>"+
                "</div>"+
                "<div class='form-group mx-sm-3 mb-2'>"+
                "   <label for='nama_album'>Nama Album</label>"+
                "    <input type='text' class='form-control' id='nama_album'>"+
                "</div>"+
                "<button class='btn btn-primary' id='simpan_album' onclick='simpanAlbum()'>Simpan</button>";
            var html = form + "<table class='table'>" +
                "<thead class='thead-light'>" +
                "<tr>" +
                "<th scope='col'>#</th>" +
                "<th scope='col' colspan=2>Nama Album</th>" +
                "</tr>" +
                "</thead>" +
                "<tbody>";
            results.forEach(function (library) {
                html += "<tr>" +
                    "<td>" + row++ + "</td>" +
                    "<td>" + library.nama + "</td>" +
                    "<td><button class='btn btn-info btn-sm' title='Edit'><span class='fa fa-edit' onclick='editAlbum(" + library +")'></span></button>&nbsp"+
                    "<button class='btn btn-danger btn-sm' title='Hapus'><span class='fa fa-trash-alt' onclick='deleteAlbum(" + library.id + ")'></span></button></td>" +
                    "</tr>";
            });
            html += "</tbody></table>";
            $("#albumModalBody").html(html);
        }
    });
}

function editAlbum(obj){
    //$('#id_album').val(obj.id);
    //$('#nama_album').val(obj.nama);
    //$('#form_album').show();
    $("#albumModalBody").html("");
}
function deleteAlbum(id) {
    var dialog = require('electron').remote.dialog;
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
                loadTableAlbum();
            }
        });
    }
}
function load_m_library() {
    var sql = 'select * from `m_library`';
    database.query(sql, function (error, results, fields) {
        if (error) console.log(error.code);
        else {
            var html = '';
            results.forEach(function (library) {
                html += "<a class='list-group-item list-group-item-action lgi-library' kode=" + library.kode + ">" + library.nama + "</a>";
            });
            $('#list-library').html(html);
            $(".lgi-library").click(function () {
                var kode = $(this).attr("kode");
                const fs = require("fs");
                var content = fs.readFileSync('src/html/musik.html');
                $("#content").html(content.toString());
                $(".music-control").attr("disabled", false);
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
