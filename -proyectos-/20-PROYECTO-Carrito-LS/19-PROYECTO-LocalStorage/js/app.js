//Variables
const formulario = document.querySelector('#formulario')
const listaTweets = document.querySelector('#lista-tweets')
let tweets = [];




//Event listener
eventListeners();

function eventListeners() {
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet)

    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        crearHTML();

        console.log(tweets);
    })
}





//Funciones
function agregarTweet(e) {
    e.preventDefault();

    // Text area donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    //Validacion

    if (tweet === '') {
        mostrarError('Un mensaje no puedo ir vacio');

        return;  //Evita que se ejecuten mas lineas de codigo
    }

    const tweetObj = {
        id: Date.now(),
        tweet //Cunado la llave y el valor son iguales en un objeto se puede poner solo una vez
    }

    //Añadiendo al arreglo de tweets

    tweets = [...tweets, tweetObj];

    // una vez agregado se crea el HTML
    crearHTML();

    formulario.reset();

}

//Mostrar mensaje de error 
function mostrarError(error) {
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertar en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Elimina la alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();

    }, 3000)
}

//Muestra un listado de los tweets
function crearHTML() {
    limpiarHTML();

    if (tweets.length > 0) {
        tweets.forEach(tweet => {

            //Crear boton de eleiminar
            const btnEliminar = document.createElement('a')
            btnEliminar.classList.add('borrar-tweet')
            btnEliminar.innerText = 'X';

            //Añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }


            //Carear el HTML
            const li = document.createElement('li');

            //añ a;adir el texto
            li.innerText = tweet.tweet;
            
            //asignar el botnon
            li.appendChild(btnEliminar);

            //insertarlo en el HTML
            listaTweets.appendChild(li);
        });

    }

    sincronizarStorage();
}
//Agrega los tweets actuales a local storage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}


function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id)
    crearHTML();
}
