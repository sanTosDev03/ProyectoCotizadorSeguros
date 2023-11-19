
// GOD object, funcion principal
function Seguro(marca,year,tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
// Nuevo Prototype para seguro para cotizar el seguro segun que datos tome
Seguro.prototype.CotizarSeguro = function() {
    let precioTotal;
    const precioMin = 2000;
    switch (this.marca) {
        case '1':
            precioTotal = precioMin* 1.15;
            break;
        case '2':
                precioTotal = precioMin* 1.05;
                break;
        case '3':
                precioTotal = precioMin* 1.35;
                break;
        default:
            break;
    }
    // Leer el año 
    const diferencia = new Date().getFullYear() - this.year;
    // Cada año que se vuelva más antiguo se desvaloriza un 3%
    precioTotal -= ((diferencia * 3) * precioTotal) / 100;

    /*
        Si el seguro es básico se multiplica por un 30% más 
        Si el seguro es completo se multiplica por un 50% mas
    */
    if(this.tipo === "basico") {
        precioTotal *= 1.30;
    } else {
        precioTotal *= 1.50;
    }
    

    return precioTotal;
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
    mensajeAlerta.classList.add('mensaje');
    mensajeAlerta.textContent = mensaje;
    const form = document.querySelector('#cotizar-seguro');
    form.insertBefore(mensajeAlerta,document.querySelector('#resultado'))
    setTimeout(() => {
        mensajeAlerta.remove();
    }, 3000);
}

// // Prototipo especifico de la funcion UI() para mostrar la cotización en el HTML;
UI.prototype.mostrarCotizacion = function(seguro,total) {
    const {marca,year,tipo} = seguro;

    let textMarca;

    switch (marca) {
        case '1':
            textMarca = "Americano";
            break;
        case '2':
            textMarca = "Asiatico";
            break;
        case '3':
            textMarca = "Europeo";
            break;
    
        default:
            break;
    }

    const divCotizacion = document.createElement('DIV');
    divCotizacion.classList.add('mt-10');
    divCotizacion.innerHTML = `
            <p class="header">Tu Resumen</p>
            <p class="font-bold">Marca: <span class="font-normal">${textMarca} </span> </p>
            <p class="font-bold">Año: <span class="font-normal">${year} </span> </p>
            <p class="font-bold">Tipo de Seguro: <span class="font-normal">${tipo} </span> </p>
            <p class="font-bold">Total: <span class="font-normal">$${total} </span> </p>

    `;
    
    const resultadoDiv = document.querySelector('#resultado');
    
    // Mostrar el spinner en el HTML antes de mostrar la cotización;
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';
    
    setTimeout(() => {
        spinner.style.display = "none"; // Se elimina el spinner del html
        resultadoDiv.appendChild(divCotizacion); // Se muestra en la page la cotización total
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
    const resultados = document.querySelector('#resultado div');
    if (resultados != null) {
        resultados.remove();
    }


    // Instanciar el seguro ==> 
    //Creamos un objeto nuevo y le asginamos la funcion Seguro() toma los parametros marca,year,tipo de los valores del formulario, por eso el mismo nombre de var
    const seguro = new Seguro(marca,year,tipo);
    const total = seguro.CotizarSeguro();


    // Instanciar y utilizar el prototype de UI que va a cotizar y mostrar la cotizacion en el HTML
    ui.mostrarCotizacion(seguro,total);

}