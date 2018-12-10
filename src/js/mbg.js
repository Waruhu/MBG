var rawSubTitle = "";
    var convertVttToJson = require('vtt-json');
    var syncData = [];
function audiosync(idAudioPlayer,idSubtitles, subtitlesFile) {

    var audioPlayer = document.getElementById(idAudioPlayer);
    var subtitles = document.getElementById(idSubtitles);
   
    
    
    var out = fs.readFileSync(subtitlesFile);
    createSubtitle(out.toString());
   
    
    var tu = function(e){   
        subtitles.innerHTML = "";     
        syncData.forEach(function(element, index, array){
            el = document.createElement('span');
            el.setAttribute("id", "c_" + index);
            el.innerText = syncData[index].part + "\n";
            subtitles.appendChild(el);
            if( (audioPlayer.currentTime*1000) >= element.start && (audioPlayer.currentTime*1000) <= element.end ) {
                el.style.background = 'yellow';
                el.scrollIntoView(false);
                
            }
            if(element.end < audioPlayer.currentTime*1000){
                el.style.color = 'yellow';
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