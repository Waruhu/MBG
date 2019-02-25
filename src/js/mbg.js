var rawSubTitle = "";
var convertVttToJson = require('vtt-json');
var syncData = [];



function load_musik() {
    var sql = 'select * from `m_lagu`';
    database.query(sql, function (error, results, fields) {
        if (error) console.log(error.code);
        else {
            var html = '';
            var app = require('electron').remote.app;
            results.forEach(function (lagu) {
                html += "<li path_lagu='" + app.getAppPath() + lagu.path_lagu + "' path_lirik='" + app.getAppPath() + lagu.path_lirik + "' class='list-group-item list-group-item-action row-music'>" + lagu.judul + "</li>";
            });
            $('#list-lagu').html(html);
            $(".row-music").click(function () {
                $(this).siblings().removeClass("active");
                $(this).addClass("active");
                stop();
                $("#audiofile").attr("src",$(this).attr('path_lagu'))
                audiosync("audiofile","lirik-lagu",$(this).attr('path_lirik'))
            });
        }
    });
}

function audiosync(idAudioPlayer,idSubtitles, subtitlesFile) {

    var audioPlayer = document.getElementById(idAudioPlayer);
    var subtitles = document.getElementById(idSubtitles);
    var app = require('electron').remote.app;
    // var out = fs.readFileSync(subtitlesFile);
    // createSubtitle(out.toString());
    var Lyrics = require('lyrics.js');
    var xhr = new XMLHttpRequest();
    xhr.open("GET",subtitlesFile, false);
    xhr.send();
    var lyrics;
    var lrc = new Lyrics(xhr.responseText);
    lyrics = lrc.getLyrics();

    var tu = function(e){
        subtitles.innerHTML = "";

        lyrics.forEach(function(element, index, array){
            el = document.createElement('span');
            el.setAttribute("id", "c_" + index);
            if(index % 2 == 0){
                el.innerText = element.text.slice(0, -10) + " ";
            }else{
                el.innerText = element.text.slice(0, -10) + "\n";
            }
            subtitles.appendChild(el);

            if(index == (lyrics.length -1)){
                el.style.color = 'yellow';
            }else{
                if( (audioPlayer.currentTime) >= element.timestamp && (audioPlayer.currentTime) <= lyrics[index+1].timestamp ) {
                    el.style.background = 'yellow';
                    el.scrollIntoView(true);
                }

                if(lyrics[index+1].timestamp  < audioPlayer.currentTime){
                    el.style.color = 'yellow';
                }
            }


        })};

    audioPlayer.removeEventListener("timeupdate", tu,true);
    audioPlayer.addEventListener("timeupdate", tu,true);
}

function createSubtitle(text)
    {
        var rawSubTitle = text;
        convertVttToJson(text)
        .then((result) => {
            var x = 0;
            syncData.length = 0;
            for (var i = 0; i < result.length; i++) { //cover for bug in vtt to json here
                if (result[i].part && result[i].part.trim() != '') {
                    syncData[x] = result[i];
                    x++;
                }
            }

        });
    }

    function addMusikToDatabase(file){
      var fs = require('fs');
      var oldPath = file.toString();
      var fileName = oldPath.replace(/^.*[\\\/]/, '');
      var newPath = '../mbg/files/'+fileName;
      var path_lirik = '/files/'+fileName;
      var path_lagu = '/files/'+fileName;
      console.log(newPath);
      fs.rename(oldPath, newPath, function (err) {
        if (err) throw err
        console.log('Successfully renamed - AKA moved!')
        insertMusikToDatabase(fileName, path_lagu, path_lirik);
      })
    }

    function insertMusikToDatabase(judul, path_lagu, path_lirik){
      var values ={
        judul : judul,
        path_lagu : path_lagu,
        path_lirik : path_lirik
      };
      database.query('INSERT INTO m_lagu SET ?', values, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
    }

    function addLirikLaguToDatabase(file){
      var fs = require('fs');
      var oldPath = file.toString();
      var fileName = oldPath.replace(/^.*[\\\/]/, '');
      var newPath = '../mbg/files/'+fileName;
      var path_lirik = '/files/'+fileName;
      var path_lagu = '/files/'+fileName;
      console.log(newPath);
      fs.rename(oldPath, newPath, function (err) {
        if (err) throw err
        console.log('Successfully renamed - AKA moved!')
        insertLirikToDatabase(fileName, path_lagu, path_lirik);
      })
    }

    function insertLirikToDatabase(judul, path_lagu, path_lirik){
      var values ={
        judul : judul,
        path_lagu : path_lagu,
        path_lirik : path_lirik
      };
      database.query('INSERT INTO m_lagu SET ?', values, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");

      });
    }

    $("#btn-add-music").click(function(){
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
            title: "Tambah Lagu"
        });
        // child.webContents.openDevTools();
        child.loadURL(url.format({
    		pathname: path.join(__dirname,'editor-music.html'),
    		protocol: 'file',
    		slashes: true
    	}));
        child.once('ready-to-show', () => {
            child.show()
        });

        child.on('closed',()=>{
            load_musik();
            child = null;
    	});
    });

    function simpanMusic(){
        event.preventDefault();
        var app = require('electron').remote.app;
        var fs = require('fs');
        var judul = $("#judul").val();
        var lagu=document.getElementById('lagu').files[0].path;
        var fileNameLagu = lagu.replace(/^.*[\\\/]/, '');
        var lirik = document.getElementById('lirik').files[0].path;
        var fileNameLirik = lirik.replace(/^.*[\\\/]/, '');

        var newPathLagu =  '/files/'+fileNameLagu;
        var newPathLirik = '/files/'+fileNameLirik;

        fs.rename(lagu, app.getAppPath()+newPathLagu, function (err) {
          if (err) throw err
          else{
            fs.rename(lirik, app.getAppPath()+newPathLirik, function (err) {
            console.log('Successfully add lagu!')
              if (err) throw err
              else{
                  insertLirikToDatabase(judul, newPathLagu, newPathLirik);
                  var remote = require('electron').remote;
                  var window = remote.getCurrentWindow();
                  setTimeout(function () {
                      window.close();
                      event.preventDefault()
                  },100);
              }
            });
          }
        });



    }
