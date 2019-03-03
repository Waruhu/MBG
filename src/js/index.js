const fs = require("fs");
const remote = require('electron').remote;
const service = remote.require("./src/js/service.js");
const database = remote.require("./src/js/database.js");

$(document).ready(function () {
    $("#closeWindow").click(function () {
        var dialog = require('electron').remote.dialog;
        var pilih = dialog.showMessageBox(
            remote.getCurrentWindow(),
            {
                type: 'question',
                buttons: ['Ya', 'Tidak'],
                title: 'Konfirmasi',
                message: 'Apakah yakin ingin menutup aplikasi MBG?'
            });
        if (pilih == 0) {
            var window = remote.getCurrentWindow();
            window.close();
        }
    });
    $("#sidebar").html(service.loadSidebar());
    $("#content").html(service.loadKonten());
    $("#kendali-musik").html(service.loadKendaliMusik());
});
