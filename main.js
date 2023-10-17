const formularioCalculadora = document.getElementById('formulario-calculadora');
const resultadoCalculadora = document.getElementById('resultado');

formularioCalculadora.addEventListener('submit', (evento) => {
    evento.preventDefault();
    calcularCalorias();
});

function calcularCalorias() {
    aparecerResultado();

    const inputs = {
        edad: document.querySelector('#edad'),
        peso: document.querySelector('#peso'),
        altura: document.querySelector('#altura'),
        actividad: document.querySelector('#actividad'),
        genero: document.querySelector('input[name="genero"]:checked'),
        nombre: document.querySelector('#nombre'),
        tipoDocumento: document.querySelector('#tipo-documento'),
        tipoDocumentoSelect: document.querySelector('#tipo-documento').value,
        numeroDocumento: document.querySelector('#numero-documento'),
    };

    const { edad, peso, altura, actividad, genero, nombre, tipoDocumento, tipoDocumentoSelect, numeroDocumento } = inputs;

    if (!edad.value || !peso.value || !altura.value) {
        mostrarMensajeDeError('Por favor asegúrese de rellenar todos los campos.');
        return;
    }

    const edadValue = parseInt(edad.value);
    if (edadValue < 15 || edadValue > 80) {
        mostrarMensajeDeError('La edad ingresada no es válida.');
        return;
    }

    const multiplicadorTMB = {
        peso: 10,
        altura: 6.25,
        edad: 5,
    };

    let calculoCalorias;

    if (genero.id === 'masculino') {
        calculoCalorias = actividad.value * (multiplicadorTMB.peso * peso.value) *
            (multiplicadorTMB.altura * altura.value) - (multiplicadorTMB.edad * edadValue) + 5;
    } else {
        calculoCalorias = actividad.value * (multiplicadorTMB.peso * peso.value) *
            (multiplicadorTMB.altura * altura.value) - (multiplicadorTMB.edad * edadValue) - 161;
    }

    let grupoPoblacional;

    if (edadValue >= 15 && edadValue < 29) {
        grupoPoblacional = "Jóvenes";
    } else if (edadValue >= 30 && edadValue < 59) {
        grupoPoblacional = "Adultos";
    } else if (edadValue >= 60) {
        grupoPoblacional = "Adultos mayores";
    }

    resultado.innerHTML = `
    <div class="card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
        <h5 class="card-title h2">Resultado</h5>
        <div class="mb-3 w-100 h-250">
            <textarea class="form-control text-justify" style="font-size: 1rem" rows="4" readonly>El paciente ${nombre.value} identificado con ${tipoDocumentoSelect} NO. ${numeroDocumento.value}, requiere un total de ${Math.floor(calculoCalorias)} kcal para el sostenimiento de su TMB.
            </textarea>
        </div>
        <h5 class="card-title h3 text-center">Usted es parte del grupo poblacional de: ${grupoPoblacional}</h5>
    </div>`;

    for (const key in inputs) {
        if (inputs.hasOwnProperty(key)) {
            const input = inputs[key];
            input.value = '';
        }
    }
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
