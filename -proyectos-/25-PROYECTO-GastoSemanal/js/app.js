// VARIABLES Y SELECTORES
const formulario = document.querySelector('#agregar-gasto');
const gastosListado = document.querySelector('#gastos ul');



//EVENTOS

eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGastos)
}


//CLASES
class Presupuesto {
    constructor(presupuesto,) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];

    }

    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
    }

    calcularRestante() {

        //Tengo que poner el acumulador en el parametro, el valor inicial, y los parametros 
        //Vos podes, vas super bien♥♥♥
        const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
        this.restante = this.presupuesto - gastado;

        restante.innerHTML = this.restante; 
        console.log(this.restante);
    }

    eliminarGasto(id){
        this.gastos = this.gastos.filter( gasto => gasto.id !== id)
         this.calcularRestante();
    }


}

class UI {

    insertarPresupuesto(cantidad) {
        //EXTRAYENDO EL VALOR
        const { presupuesto, restante } = cantidad;

        //INSERTANDO EN EL HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta(mensaje, tipo) {
        //CREAR EL DIV
        const divAlerta = document.createElement('div');
        divAlerta.classList.add('text-center', 'alert');
        divAlerta.textContent = mensaje;

        if (tipo === 'error') {
            divAlerta.classList.add('alert-danger');
        } else {
            divAlerta.classList.add('alert-success');
        }

        //MENSAJE DE ERROR
        divAlerta.textContent = mensaje;

        //INSERTAR EN EL HTML
        document.querySelector('.primario').insertBefore(divAlerta, formulario);

        setTimeout(() => {
            divAlerta.remove();
        }, 2000);
    }

    mostrarGastos(gastos) {

        this.limpiarHTML();

        //ITERAR SOBRE LOS GASTOS
        gastos.forEach(gasto => {

            const { cantidad, nombre, id } = gasto;

            //CREAR UN LI
            const nuevoGasto = document.createElement('li')
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id;


            //AGREGAR EL HTML DEL GASTO
            nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill">$ ${cantidad} $</span>`;


            //BOTON PARA BORRAR EL GASTO
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.innerHTML = 'Borrar &times;';
            nuevoGasto.appendChild(btnBorrar);
            btnBorrar.onclick = () => {
                eliminarGasto(id);
            }
            nuevoGasto.appendChild(btnBorrar);
            


            //AGREGAR AL HTML
            gastosListado.appendChild(nuevoGasto);
        })
    }

    limpiarHTML() {
        while (gastosListado.firstChild) {
            gastosListado.removeChild(gastosListado.firstChild);
        }
    }

    actualizarRestante(restante) {
        document.querySelector('#restante').textContent = restante;
    }

    comprobarPresupuesto(presupuestObj) {
        const { presupuesto, restante } = presupuestObj;

        const restanteDiv = document.querySelector('.restante');

        //COMPROBAR EL 25%
        if ((presupuesto / 4) > restante) {
            restanteDiv.classList.remove('alert-success', 'alert-warning');
            restanteDiv.classList.add('alert-danger');
        } else if ((presupuesto / 2) > restante) {
            restanteDiv.classList.remove('alert-success');
            restanteDiv.classList.add('alert-warning');
        }else{
            restanteDiv.classList.remove('alert-danger', 'alert-warning');
            restanteDiv.classList.add('alert-success');
        }


        // SI EL TOTAL ES 0 O MENOS 
        if(restante <= 0){
            ui.imprimirAlerta('Haz llegado al liminte del presupuesto', 'error')
            formulario.querySelector('button[type="submit"]').disabled = true;
        }
    }
}


//INSTANCIAS
const ui = new UI();
let presupuesto;


//FUNCIONES

function preguntarPresupuesto() {

    const presupuestoUsuario = prompt('Cual es tu presuesto?');

    if (presupuestoUsuario === "" || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload();
    }
    presupuesto = new Presupuesto(presupuestoUsuario);

    ui.insertarPresupuesto(presupuesto);
}


//AGREGANDO GASTOS
function agregarGastos(e) {
    e.preventDefault();

    //LEER LOS GASTOS DEL FORMULARIO

    const nombre = document.querySelector('#gasto').value
    const cantidad = Number(document.querySelector('#cantidad').value)

    //VALIDAR
    if (nombre === '' || cantidad === '') {
        ui.imprimirAlerta('Los campos son obligatorios', 'error');
        return;
    } else if (cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta('Cantidad no valida', 'error')
        return;
    }


    //GENERAR UN OBJETO CON EL GASTO
    const gasto = { nombre, cantidad, id: Date.now() };

    //A;ADE UN NUEVO GASTO
    presupuesto.nuevoGasto(gasto);

    //MENSAJE CORRECTO
    ui.imprimirAlerta('exist')


    //IMPRIMIR LOS GASTOS
    const { gastos, restante } = presupuesto;
    ui.mostrarGastos(gastos);

    ui.actualizarRestante(restante);

    ui.comprobarPresupuesto(presupuesto);

    //REINICIA EL FORMUALRIO
    formulario.reset();
}


function eliminarGasto(id){

    //ELIMINA EL GASTO DEL OBJETO
    presupuesto.eliminarGasto(id);

    //ELIMINA LOS GASTOS DEL HTML
    const {gastos, restante} = presupuesto;
    ui.mostrarGastos(gastos);

    ui.actualizarRestante(restante);

    ui.comprobarPresupuesto(presupuesto);
}
