const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');

//configuracion
app.set('port', 4000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'vistas'));
app.use('/vistas', express.static(__dirname + '/vistas'));

//middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./vistas'));

//rutas
app.use(require('./rutas/preguntas'));

//escuchando el server
app.listen(app.get('port'), () => {
    console.log("server en puerto", app.get('port'));
});