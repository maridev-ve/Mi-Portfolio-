document.addEventListener("DOMContentLoaded", function () {
  const email = {
    email: '',
    asunto: '',
    mensaje: '',
  }

  //Seleccionar los elementos de la interfaz
  const inputEmail = document.querySelector("#email");
  const inputAsunto = document.querySelector("#asunto");
  const inputMensaje = document.querySelector("#mensaje");
  const formulario = document.querySelector("#formulario");
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');

  //Asignar eventos
  inputEmail.addEventListener("blur", validar);
  inputAsunto.addEventListener("blur", validar);
  inputMensaje.addEventListener("blur", validar);


  formulario.addEventListener("submit", enviarEmail);

  btnReset.addEventListener("click", function (e) {
    e.preventDefault();
    resetFormulario();
  })

  function enviarEmail(e) {
    e.preventDefault();

    spinner.classList.add('flex');
    spinner.classList.remove('hidden');

    setTimeout(() => {
      spinner.classList.remove('flex');
      spinner.classList.add('hidden');

      resetFormulario();
      
      //Crear una alerta
      const alertaExito = document.createElement('P');
      alertaExito.textContent = 'El mensaje se envio correctamente';
      alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');

      formulario.appendChild(alertaExito);

      setTimeout(() => {
        alertaExito.remove();
      }, 3000);

    }, 3000);

  }

  function validar(e) {
    //nextElementSibling va a ir al siguiente elemento a diferencia de parentElement que va al anterior elemento como al padre
    if (e.target.value.trim() === "") {
      //trim Elimina espacios en blanco
      mostrarAlerta(
        `El campo ${e.target.id} es obligatorio`, e.target.parentElement);
      email[e.target.name] = '';
      comprobarEmail();
      return;
    }


    if (e.target.id === 'email' && !validarEmail(e.target.value)) {
      mostrarAlerta('El email no es valido', e.target.parentElement);
      email[e.target.name] = '';
      comprobarEmail();
      return;
    }


    limpiarAlerta(e.target.parentElement);

    //Asignar los valores
    email[e.target.name] = e.target.value.trim().toLowerCase();


    //Comprobar el objeto de Email
    comprobarEmail()
  }

  function mostrarAlerta(mensaje, referencia) {
    limpiarAlerta(referencia)

    //Generar alerta en HTML
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add("bg-red-600", "text-white", "p-2", "text-center");

    //Inyectar el error al formulario
    referencia.appendChild(error);
  }

  function limpiarAlerta(referencia) {
    //Comprueba si ya existe una alerta
    const alerta = referencia.querySelector(".bg-red-600");
    if (alerta) {
      alerta.remove();
    }
  }

  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/; //Expresion regular
    const resultado = regex.test(email);
    return resultado;
  }

  function comprobarEmail() {
    if (Object.values(email).includes('')) {
      btnSubmit.classList.add('opacity-50');
      btnSubmit.disabled = true;
      return;
    }
    btnSubmit.classList.remove('opacity-50');
    btnSubmit.disabled = false;

    //El array method includes() pregunta si al menos un input en el formulario esta vacio, tinen que estar todos llenos para que cumplan la condicion
  }

  function resetFormulario() {
    //Reiniciar el objeto
    email.email = '',
    email.asunto = '',
    email.mensaje = '',

    formulario.reset();
    comprobarEmail();
  }
});

//Funciones = sin los parentesis significa que no se manda a llamar hasta que se ejecute esa funcion
//blur Se ejecuta cuando abandonas un campo
//input se ejecuta mientras estamos escribiendo
