const readXlsxFile = require('read-excel-file/node');
var mysql = require('mysql');
// Add the credentials to access your database
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '', // or the original password : 'apaswword'
    database : 'db_mbg'
});

    connection.connect(function(err) {
        // in case of error
        if(err){
            console.log(err.code);
            console.log(err.fatal);
        }else{
          console.log("Koneksi Database Berhasil")

          // File path.
            readXlsxFile('./dokumen/List_Bibel.xlsx',{ sheet: 8 }).then((rows) => {

          //readXlsxFile('./dokumen/List_Nama_Kitab.xlsx',{ sheet: 1 }).then((rows) => {
            // `rows` is an array of rows
            // each row being an array of cells.
            var num = 1;
            rows.forEach(function(row){
                var kitab = parseInt(row[1])+25;
                var sql = "insert into `kitab_detail`(id_kitab,pasal,ayat,teks)values('"+kitab+"','"+row[2]+"','"+row[3]+"','"+row[4]+"')";
                //var sql = "insert into `m_kitab` (nama,bahasa,status)values('"+row[1]+"','Batak',1)";
                connection.query(sql, function (error, results, fields) {
                  if (error){
                      console.log(error.code);
                  }else{
                    console.log(num++)
                  }
                });

            }).done(connection.end(function(){
              console.log("Koneksi Database Diputus")
              // The connection has been closed
            }));
          })


        }

    });
/*
    connection.end(function(){
      console.log("Koneksi Database Diputus")
      // The connection has been closed
    });
    */
