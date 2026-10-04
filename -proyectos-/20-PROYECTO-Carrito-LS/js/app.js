const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    //cuando agregamos un curso presionando "agregar al carrito"
    listaCursos.addEventListener("click", agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Muestra los cursos de local storage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
    });

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];//Reseateamos el arreglo

        limpiarHTML(); //Eliminamos todo el HTML
        sincronizarStorage()
    })
}

//funciones
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
        //.parentElement selecciona todo el card
    }
}
//Elimina un curso del carrito
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);


        carritoHTML();//Vamos a iteral sobre el carrito y mostrar su HTML
    }
}


//Lee el contenido del html al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso) {
    console.log(curso);

    //Crear un objeto con el contenido actual
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1,
    };

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map((curso) => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++; //retorna el objeto actualizado
                return curso;
            } else {
                return curso; //retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];

    } else {
        //Agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }




    carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML() {
    //Limpiar el HTML
    limpiarHTML();

    console.log("Ejecutando carritoHTML");

    //recorre el carrito y genera el HTML
    articulosCarrito.forEach((curso) => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement("tr");
        row.innerHTML = `
    <td> <img src = "${curso.imagen}" width= "100"> </td>
      <td>${titulo}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td>
      <a href= "#" class="borrar-curso" data-id="${id}"> X </a>
      </td>
    
    `;

        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });

    //Sincronizar con Storage el carrito de compras
    sincronizarStorage();

}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
    console.log('aja');
}

//Elimina los cursos del tbody
function limpiarHTML() {
    //Forma lenta
    // contenedorCarrito.innerHTML  = "";

    //Forma lenta y recomendable
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
