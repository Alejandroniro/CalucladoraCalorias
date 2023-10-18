const formularioCalculadora = document.getElementById('formulario-calculadora');
const resultadoCalculadora = document.getElementById('resultado');

const MULTIPLICADOR_TMB = Object.freeze({
    peso: 10,
    altura: 6.25,
    edad: 5,
});

const SEXO = Object.freeze({
    masculino: "masculino",
    femenino: "femenino"

})

formularioCalculadora.addEventListener('submit', (evento) => {
    evento.preventDefault();
    calcularCalorias();
});

function calcularCalorias() {

    const edad = document.querySelector('#edad').value;
    const peso = document.querySelector('#peso').value;
    const altura = document.querySelector('#altura').value;
    const actividad = document.querySelector('#actividad').value;
    const genero = document.querySelector('input[name="genero"]:checked');
    const nombre = document.querySelector('#nombre').value;
    const tipoDocumento = document.querySelector('#tipo-documento').value;
    const numeroDocumento = document.querySelector('#numero-documento').value;

    const camposIncompletos = !edad || !peso || !altura || !actividad || !genero || !nombre || !tipoDocumento || !numeroDocumento;
    if (camposIncompletos) {
        // mostrarMensajeDeError('Por favor asegúrese de rellenar todos los campos.');
        return;
    }
    aparecerResultado();

    const edadValue = parseInt(edad);
    const noEsUnaEdadValida = edadValue < 15 || edadValue > 80;
    if (noEsUnaEdadValida) {
        mostrarMensajeDeError('La edad ingresada no es válida.');
        return;
    }


    let calculoCalorias = actividad * (MULTIPLICADOR_TMB.peso * peso) *
        (MULTIPLICADOR_TMB.altura * altura) - (MULTIPLICADOR_TMB.edad * edadValue);

    if (genero.id === SEXO.masculino) {
        calculoCalorias += 5;
    } else {
        calculoCalorias -= 161;
    }

    let grupoPoblacional;

    if (edadValue >= 15 && edadValue < 29) {
        grupoPoblacional = "Jóvenes";
    } else if (edadValue >= 30 && edadValue < 59) {
        grupoPoblacional = "Adultos";
    } else if (edadValue >= 60) {
        grupoPoblacional = "Adultos mayores";
    }
    console.log('calculoCalorias:', calculoCalorias);
    console.log('Edad:', edad);
    console.log('Peso:', peso);
    console.log('Altura:', altura);
    resultado.innerHTML = `
    <div class="card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
        <h5 class="card-title h2">Resultado</h5>
        <div class="mb-3 w-100 h-250">
            <textarea class="form-control text-justify" style="font-size: 1rem" rows="4" readonly>El paciente ${nombre} identificado con ${tipoDocumento} NO. ${numeroDocumento}, requiere un total de ${Math.floor(calculoCalorias)} kcal para el sostenimiento de su TMB.
            </textarea>
        </div>
        <h5 class="card-title h3 text-center">Usted es parte del grupo poblacional de: ${grupoPoblacional}</h5>
    </div>`;
}

function mostrarMensajeDeError(msg) {
    const calculo = document.querySelector('#calculo');
    if (calculo) {
        calculo.remove();
    }

    const divError = document.createElement('div');
    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

    resultado.appendChild(divError);

    setTimeout(() => {
        divError.remove();
        desvanecerResultado();
    }, 5000);
}

// Animaciones
function aparecerResultado() {
    resultado.style.top = '100vh';
    resultado.style.display = 'block';

    let distancia = 100;
    let resta = 0.3;
    let id = setInterval(() => {
        resta *= 1.1;
        resultado.style.top = `${distancia - resta}vh`;
        if (resta > 100) {
            clearInterval(id);
        }
    }, 10);
}

function desvanecerResultado() {
    let distancia = 1;

    let id = setInterval(() => {
        distancia *= 2;
        resultado.style.top = `${distancia}vh`;
        if (distancia > 100) {
            clearInterval(id);
            resultado.style.display = 'none';
            resultado.style.top = 0;
        }
    }, 10);
}

(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                } else {
                    calcularCalorias();
                }

                form.classList.add('was-validated')
            }, false)
        })
})()
