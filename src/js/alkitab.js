init_select("Indonesia");
document.getElementById("submit").addEventListener('click',function(){
  //var connection = connect_db();
  var id_kitab = $("#s_kitab option:selected").val()
  var pasal = $("#s_pasal option:selected").val()
  var ayat = $("#s_ayat option:selected").val()
  var limit = $("#s_limit option:selected").val()
  var sql = 'select * from `kitab_detail` where id_kitab='+id_kitab+' and pasal='+pasal+' and ayat>='+ayat+' limit '+limit;
  database.query(sql, function (error, results, fields) {
    if (error) console.log(error.code);
    else {
      var html= '';
      results.forEach(function(row){
          html += row.pasal+':'+row.ayat+' '+row.teks+'<br/>'; 
      });
      $('#list-ayat').html("");
      $('#list-ayat').html(html);
    }
  });
},false);

document.getElementById("nextListAyat").addEventListener('click',function(){
  var id_kitab = $("#s_kitab option:selected").val()
  var pasal = parseInt($("#s_pasal option:selected").val())
  var ayat = parseInt($("#s_ayat option:selected").val())
  var limit = parseInt($("#s_limit option:selected").val())
  var sql = 'select * from `kitab_detail` where id_kitab='+id_kitab+' and pasal='+pasal+' and ayat>='+(ayat+limit)+' limit '+limit;
  database.query(sql, function (error, results, fields) {
    if (error) console.log(error.code);
    else {
      if(results.length==0){
        $('#list-ayat').html("Ayat tidak ditemukan.");
      }else{
        var html= '';
        results.forEach(function(row){
            html += row.pasal+':'+row.ayat+' '+row.teks+'<br/>'; 
        });
        $('#list-ayat').html("");
        $('#list-ayat').html(html);
        $("#s_ayat").val(ayat+limit).change();
      }
    }
  });
},false);

document.getElementById("prevListAyat").addEventListener('click', function(){
  var id_kitab = $("#s_kitab option:selected").val()
  var pasal = parseInt($("#s_pasal option:selected").val())
  var ayat = parseInt($("#s_ayat option:selected").val())
  var limit = parseInt($("#s_limit option:selected").val())
  var sql = 'select * from `kitab_detail` where id_kitab='+id_kitab+' and pasal='+pasal+' and ayat>='+(ayat-limit)+' limit '+limit;
  database.query(sql, function (error, results, fields) {
    if (error) console.log(error.code);
    else {
      if(results.length==0){
        $('#list-ayat').html("Ayat tidak ditemukan.");
        $("#s_ayat").val(1).change();
      }else{
        var html= '';
        results.forEach(function(row){
            html += row.pasal+':'+row.ayat+' '+row.teks+'<br/>'; 
        });
        $('#list-ayat').html("");
        $('#list-ayat').html(html);
        var recent = (ayat-limit)<1?1:ayat-limit;
        $("#s_ayat").val(recent).change();
      }
    }
  });
},false);

$('#s_kitab').bind('change', function() {
  var id_kitab = $("#s_kitab").val()
  fill_s_pasal(id_kitab);    
});
$('#s_pasal').bind('change', function() {
  var id_kitab = $("#s_kitab option:selected").val()
  var pasal = $("#s_pasal option:selected").val()
  fill_s_ayat(id_kitab,pasal);    
});
$('#plus-font-size').bind('click',function(){
  var size = parseInt($("#list-ayat").css('font-size'));
  size += 2;
  $('#list-ayat').css("font-size", size + "px");
});
$('#minus-font-size').bind('click',function(){
  var size = parseInt($("#list-ayat").css('font-size'));
  size -= 2;
  $('#list-ayat').css("font-size", size + "px");
});

function init_select(bahasa) {
  fill_s_kitab(bahasa);
  fill_s_pasal(1, bahasa);
  fill_s_ayat(1, 1, bahasa);
}
function fill_s_kitab(bahasa) {
  sql = "select * from `m_kitab` where bahasa like '" + bahasa + "' and status=1 order by id asc";
  database.query(sql, function (error, results, fields) {
      if (error) {
          console.log(error.code);
      } else {
          var html = '';
          results.forEach(function (row) {
              html += "<option value=" + row.id + ">" + row.id + ' ' + row.nama + "</option>";
          });
          $('#s_kitab').html(html);
      }
  });
}

function fill_s_pasal(id_kitab, bahasa) {
  var sql = 'select distinct pasal from `kitab_detail` where id_kitab=' + id_kitab;
  database.query(sql, function (error, results, fields) {
      if (error) console.log(error.code);
      else {
          var html = '';
          results.forEach(function (row) {
              html += "<option value=" + row.pasal + ">" + row.pasal + "</option>";
          });
          $('#s_pasal').html(html);
      }
  });
}

function fill_s_ayat(id_kitab, pasal) {
  var sql = 'select ayat from `kitab_detail` where id_kitab=' + id_kitab + ' and pasal=' + pasal;
  database.query(sql, function (error, results, fields) {
      if (error) console.log(error.code);
      else {
          var html = '';
          results.forEach(function (row) {
              html += "<option value=" + row.ayat + ">" + row.ayat + "</option>";
          });
          $('#s_ayat').html(html);
      }
  });
}
