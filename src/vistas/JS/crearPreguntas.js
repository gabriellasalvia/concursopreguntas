//campos
const pregunta = document.getElementById("Pregunta");
const respuesta = document.getElementById("Respuesta");
const incorrecta1 = document.getElementById("Incorrecta1");
const incorrecta2 = document.getElementById("Incorrecta2");
const incorrecta3 = document.getElementById("Incorrecta3");
const categoria = document.getElementById("Categoria");

//boton de submit
const submit = document.getElementById("btn-enviar");
submit.addEventListener("click", crearPublicacion);

function crearPublicacion() {
    var url = '/crearPregunta';
    var data = {
        pregunta: pregunta.value,
        respuesta: respuesta.value,
        incorrecta1: incorrecta1.value,
        incorrecta2: incorrecta2.value,
        incorrecta3: incorrecta3.value,
        categoria: categoria.value,
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
                alert('creado exitosamente');
                window.location.replace("/principal");
            } else {
                console.log(response);
            }
        });
}

function volver() {
    window.location.replace("/principal");
}