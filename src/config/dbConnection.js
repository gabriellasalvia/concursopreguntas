var mysql = require('mysql');
module.exports = () => {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'concurso_preguntas'
    });

    /* connection.connect(function (err) {
         if (err) {
             console.error('error connecting: ' + err.stack);
             return;
         }
 
         console.log('connected as id ' + connection.threadId);
     });*/
}