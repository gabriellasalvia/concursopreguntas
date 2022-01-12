const express = require('express');
const router = express.Router();
const preguntas = require('../preguntas/preguntas.json');
const preguntas2 = require('../preguntas/preguntasNivel2.json');
const preguntas3 = require('../preguntas/preguntasNivel3.json');
const preguntas4 = require('../preguntas/preguntasNivel4.json');
const preguntas5 = require('../preguntas/preguntasNivel5.json');
const dbconnection = require('../config/dbConnection');
const path = require("path");
var fs = require('fs');
var PuntuacionFinal = 0;
//rutas
router.get('/principal', (req, res) => {
    res.render('index', { title: 'titulo' });
})

router.get('/concursoPreguntas', ConcursoPreguntas);
router.get('/historialPartidas', HistorialPartidas);
router.get('/crearPregunta', CrearPregunta);
router.get('/ganar', concursoganado);
router.get('/perder', concursoperdidomostrar);
router.post('/perder', concursoperdido);
router.post('/agregar', agregarHistorial);
router.post('/crearPregunta', agregarPregunta);

async function ConcursoPreguntas(req, res, next) {
    return res.render('concursoPreguntas', { title: 'ConcursoPreguntas', preguntas: JSON.stringify(preguntas), preguntas2: JSON.stringify(preguntas2), preguntas3: JSON.stringify(preguntas3), preguntas4: JSON.stringify(preguntas4), preguntas5: JSON.stringify(preguntas5) });
};

async function concursoganado(req, res, next) {
    return res.render('Hasganado', { title: 'Has ganado' });
};

async function concursoperdido(req, res, next) {
    const { puntuacion } = req.body;
    PuntuacionFinal = puntuacion;
    return res.render('Hasperdido', { title: 'Has perdido', puntuacion: puntuacion });
};

async function concursoperdidomostrar(req, res, next) {
    return res.render('Hasperdido', { title: 'Has perdido', puntuacion: PuntuacionFinal });
};

async function HistorialPartidas(req, res, next) {
    const connection = dbconnection();
    connection.query('SELECT * FROM historialpartidas', (err, result) => {
        let i = 0;
        while (i < result.length) {
            result[i].fecha = result[i].fecha.toLocaleString();
            i++;
        }
        res.render('historial', { title: 'Historial de partidas', historial: result });
    });
    //return 
};

async function agregarHistorial(req, res) {
    const { puntuacion } = req.body;
    const connection = dbconnection();
    var sql = `INSERT INTO historialpartidas (puntuacion) VALUES (${puntuacion})`;
    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.status(200).json({
            ok: true,
            message: "Se ha insertado exitosamente",
        });
    });
}

async function CrearPregunta(req, res, next) {
    return res.render('crearPreguntas', { title: 'Crear Preguntas' });
};

async function agregarPregunta(req, res) {
    const { pregunta, respuesta, incorrecta1, incorrecta2, incorrecta3, categoria } = req.body;
    var agregar = { categoria: parseInt(categoria), pregunta: pregunta, respuesta: respuesta, incorrecta1: incorrecta1, incorrecta2: incorrecta2, incorrecta3: incorrecta3 };
    let direccion = null;
    if (parseInt(categoria) == 1) {
        direccion = path.resolve(__dirname, "../preguntas/preguntas.json");
    } else if (parseInt(categoria) == 2) {
        direccion = path.resolve(__dirname, "../preguntas/preguntasNivel2.json");
    } else if (parseInt(categoria) == 3) {
        direccion = path.resolve(__dirname, "../preguntas/preguntasNivel3.json");
    } else if (parseInt(categoria) == 4) {
        direccion = path.resolve(__dirname, "../preguntas/preguntasNivel4.json");
    } else {
        direccion = path.resolve(__dirname, "../preguntas/preguntasNivel5.json");
    }
    fs.readFile(direccion, 'utf8', function (err, data) {
        var json = JSON.parse(data);
        json.push(agregar)
        fs.writeFile(direccion, JSON.stringify(json), function (err, result) {
            if (err) console.log('error', err);
        });
    });
    res.status(200).json({
        ok: true,
        message: "Se ha creado exitosamente",
    });
}

module.exports = router;