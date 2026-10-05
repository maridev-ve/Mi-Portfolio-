const boton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.navbar');

boton.addEventListener('click', function () {
    menu.classList.toggle('open');
});