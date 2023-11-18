
// Constructores

function Seguros(marca,year,tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
// Realiza la cotización con los datos
Seguros.prototype.cotizarSeguro = function() {
    /*
        American = 1.15
        Asian = 1.05
        European = 1.35
    */
   let cantidad;
   const base = 2000;
    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
    
        default:
            break;
    }
    // Leer el año para que cada año que sea mas viejo se reduce el precio en un 3%


    console.log(cantidad);




function UI() {

}
UI.prototype.addYears = function() {
    const max = new Date().getFullYear();
    const min = max - 20; 

    const fieldYears = document.querySelector('#year');
    for (let i = max; i > min; i--) {
            let fieldYearsValue = document.createElement('option');
            fieldYearsValue.value = i;
            fieldYearsValue.textContent = i;
            fieldYears.appendChild(fieldYearsValue);
    }
}

// Creamos un nuevo prototype para UI que se va a utilizar dependiendo si es correcto el uso del form o incorrecto y va a variar el return dependiendo de esto. 
// Recibe un parametro mensaje y uno tipo, el mensaje va a variar si el valor del parametro tipo es error o correcto;
UI.prototype.mostrarMensaje = function(mensaje,tipo) { 
    const div = document.createElement('DIV');

    if(tipo === "error") {
        div.classList.add('error');
    } else {
        div.classList.add('correcto');
    }

    div.classList.add('mensaje','mt-10');
    //Insertar en el HTML
    const form = document.querySelector('#cotizar-seguro');
    //console.log(form.childNodes)
    div.textContent = mensaje;
    form.insertBefore(div,document.querySelector('#resultado'));
    setTimeout(() => {
        div.remove();
    }, 3000);
}
const ui = new UI();
document.addEventListener('DOMContentLoaded', function(){
    ui.addYears(); // Llena el select con los años. Hecho con la funcion UI ==> addYears() y despues intanciar un nuevo objeto de UI para asginarle la función addYears();
})


eventListeners();
function eventListeners() {
    const form = document.querySelector('#cotizar-seguro');
    form.addEventListener('submit',cotizarSeguro);
}

function cotizarSeguro(e) {
    e.preventDefault();

    // Leer la marca del carro
    const marca = document.querySelector('#marca').value;


    // Leer el año seleccionado
    const year = document.querySelector('#year').value;


    // leer el tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    

    // Validar que no este vacio el form
    if (marca === "" || year === "" || tipo === "") {
        const alert = new UI;
        alert.mostrarMensaje("Debes completar el formulario","error");
        return
    } 

    const alert = new UI;
    alert.mostrarMensaje("Cotizando...","correcto");
    
    //Instanciar el seguro
    const seguro = new Seguros(marca,year,tipo);
    seguro.cotizarSeguro();
    // Utilizar el protoype que va a cotizar el seguro

}
}