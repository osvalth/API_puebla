const mysql = require('mysql')
//Mysql 
var mysqlConnection = mysql.createConnection({
    host     : 'localhost',
    port     : '3306',
    user     : 'root',
    password : 'root',
    database : 'pruebadb',
    multipleStatements: true,
});
//check connect
mysqlConnection.connect ( err => {
  if (err) {
      console.log(err.stack);
      console.log('Error en la conexión');
      return;
  } else {
      console.log("ID de conexión: " + mysqlConnection.threadId);
      console.log('Canoectado a BD');
  }
});
module.exports = mysqlConnection;