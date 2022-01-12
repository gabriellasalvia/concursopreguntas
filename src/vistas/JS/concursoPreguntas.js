var preguntas1 = document.getElementById("preguntasjson1").value;
var preguntas2 = document.getElementById("preguntasjson2").value;
var preguntas3 = document.getElementById("preguntasjson3").value;
var preguntas4 = document.getElementById("preguntasjson4").value;
var preguntas5 = document.getElementById("preguntasjson5").value;
let pregunta = null;
let arr = null;
let Puntuacion = null;
let preguntas = null;
let PuntuacionFinal = 0;
let interprete_bp = JSON.parse(preguntas1);

escogerPreguntaAleatoria();
function escogerPreguntaAleatoria() {
    escogerPregunta(Math.floor(Math.random() * interprete_bp.length));
}



function escogerPregunta(n) {
    pregunta = interprete_bp[n];
    seleccionarid("cat").innerHTML = pregunta.categoria;
    seleccionarid("pregunta").innerHTML = pregunta.pregunta;
    desordenarrespuestas(pregunta);
}

function escogerPreguntaAleatoriaSegunNivel(n) {
    if (n == 2) {
        preguntas = JSON.parse(preguntas2);
    } else if (n == 3) {
        preguntas = JSON.parse(preguntas3);
    } else if (n == 4) {
        preguntas = JSON.parse(preguntas4);
    } else {
        preguntas = JSON.parse(preguntas5);
    }
    interprete_bp = preguntas;
    escogerPreguntaAleatoria();
}

let botones = [
    seleccionarid("btn1"),
    seleccionarid("btn2"),
    seleccionarid("btn3"),
    seleccionarid("btn4")
]

function desordenarrespuestas(pregunta) {
    arr = [pregunta.respuesta, pregunta.incorrecta1, pregunta.incorrecta2, pregunta.incorrecta3];
    arr.sort(() => Math.random() - 0.5)
    seleccionarid("btn1").innerHTML = arr[0];
    seleccionarid("btn2").innerHTML = arr[1];
    seleccionarid("btn3").innerHTML = arr[2];
    seleccionarid("btn4").innerHTML = arr[3];
}

function oprimirboton(n) {
    if (arr[n] == pregunta.respuesta) {
        botones[n].style.background = "lightgreen";
        setTimeout(() => {
            avanzarsiguientenivel();
        }, 3000);
    } else {
        botones[n].style.background = "pink";
        setTimeout(() => {
            finalizarConcurso();
        }, 3000);
    }
}

function avanzarsiguientenivel() {
    let nivel = parseInt(seleccionarid("cat").innerHTML, 0) + 1;
    var css = '.btn:hover{ background-color:lightblue,cursor:pointer}';
    for (const btn of botones) {
        btn.style = css;
        btn.style.background = "#4848F7";
        btn.style.color = "white";
        
    }
    if (nivel - 1 == 1) {
        Puntuacion = Puntuacion + 1;
    } else if (nivel - 1 == 2) {
        Puntuacion = Puntuacion + 3;
    } else if (nivel - 1 == 3) {
        Puntuacion = Puntuacion + 5;
    } else if (nivel - 1 == 4) {
        Puntuacion = Puntuacion + 10;
    } else {
        Puntuacion = Puntuacion + 50;
    }
    PuntuacionFinal = Puntuacion;
    if (nivel > 5) {
        finalizarConcursoGanado();
    } else {
        seleccionarid("Puntuacion").innerHTML = Puntuacion;
        escogerPreguntaAleatoriaSegunNivel(nivel);
    }
}

function finalizarConcurso() {
    GuardadDatosEnBd();
    perder();
    window.location.replace("/perder"); 
}
function finalizarConcursoGanado() {
    GuardadDatosEnBd();
    window.location.replace("/ganar"); 
}


function GuardadDatosEnBd() {
    var url = '/agregar';
    var data = {
        puntuacion: PuntuacionFinal
    };
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(function (response) {
            if (response.ok) {
               //window.location.replace("/");
            } else {
                console.log(response);
            }
        });
}

function perder() {
    var url = '/perder';
    var data = {
        puntuacion:PuntuacionFinal
    };
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
function seleccionarid(id) {
    return document.getElementById(id);
}

function style(id) {
    return select_id(id).style
}


