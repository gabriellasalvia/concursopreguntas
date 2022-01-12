CREATE DATABASE concurso_preguntas;

USE concurso_preguntas;

CREATE TABLE historialpartidas(
    idpartida INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    puntuacion INT NOT NULL
);
