const fs = require("fs");
var service = {
    loadSidebar:function(){
        var sidebar = fs.readFileSync('./src/html/sidebar.html');
        return sidebar.toString();
    },
    loadKonten:function(){
        var konten = fs.readFileSync('./src/html/alkitab.html');
        return konten.toString();
    },
    loadKendaliMusik:function(){
        var kendaliMusik = fs.readFileSync('./src/html/kendali-musik.html');
        return kendaliMusik.toString();
    }

}
module.exports = service;