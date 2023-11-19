
// GOD object, funcion principal
function Seguro(marca,year,tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

function UI() {

}
// Prototipo especifico de la funcion UI() para Llenar las opciones de los años
UI.prototype.MostrarYears = function(){
    const selectYear = document.querySelector('#year');
    const max = new Date().getFullYear();
    const min = max - 20;

    for (let index = max; index > min; index--) {
        let option = document.createElement('option');
        option.value= index;
        option.textContent = index;
        selectYear.appendChild(option);
    }
}   
// Prototipo especifico de la funcion UI() para mostrar un mensaje de alerta dependiendo si esta lleno el form o no;
UI.prototype.MostrarMensaje = function(mensaje,modo) {
    const mensajeAlerta = document.createElement('DIV');
    if (modo === 'error') {
        // Creamos el HTML del mensaje
        mensajeAlerta.classList.add('error');
    } else if (modo === 'correcto') {
        mensajeAlerta.classList.add('correcto');
    }
    // Insertamos en el HTML
    mensajeAlerta.textContent = mensaje;
    const form = document.querySelector('#cotizar-seguro');
    form.insertBefore(mensajeAlerta,document.querySelector('#resultado'))
    setTimeout(() => {
        mensajeAlerta.remove();
    }, 3000);
}

// Instanciar UI la para la funcion de completar los años
const ui = new UI();


document.addEventListener('DOMContentLoaded', () => {
    ui.MostrarYears(); // una vez que carga el documento HTML se ejecuta la funcion MostrarYears() y muuestra los años;
})
EventListeners();
function EventListeners() {
    const form = document.querySelector('#cotizar-seguro');
    form.addEventListener('submit',cotizarSeguro);
}   

function cotizarSeguro(e) {
    e.preventDefault();
    
    // Toma el valor de Marca
    const marca = document.querySelector('#marca').value;

    // Toma el valor de Año
    const year = document.querySelector('#year').value;

    // Toma el valor de Tipo de seguro
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    
    if (marca === '' || year === '' || tipo === "" ) {
        ui.MostrarMensaje('No se puede dejar ningun campo vacio', 'error');
        return;
    }
    ui.MostrarMensaje('Cotizando...', 'correcto');

}