function Seguro(brand, year, type) {
    this.brand = brand;
    this.year = year;
    this.type = type;
}

//REALIZA LA CONTIZACION(quote) CON LOS DATOS
Seguro.prototype.quoteInsurance = function () {
    /*
          1.  Americano 15%
          2.  Asiatico 5%
          3.  Europeo 30%
      */

    //Cantidad(amount)
    let amount;
    const base = 3000;

    switch (this.brand) {
        case "1":
            amount = base * 1.15;
            break;
        case "2":
            amount = base * 1.5;
            break;
        case "3":
            amount = base * 1.35;
            break;

        default:
            break;
    }

    //LEER EL A;O
    const difference = new Date().getFullYear() - this.year;

    //CADA A;O QUE LA DIFERENCIA ES MAYOR, EL COSTO VA A REDUCIR A UN 4%

    amount -= (difference * 4 * amount) / 100;

    /*  SI EL TIPO DE SEGURO ES BASICO SE MULTIPLICA POR 30% MAS
       SI EL TIPO DE SEGURO ES COMPLETO SE MULTIPLICA POR 50% MAS
      */
    if (this.tipo === "basico") {
        amount *= 1.3;
    } else {
        amount *= 1.5;
    }

    return amount.toFixed(2);
};

function UI() { };

//LLENA LAS OOPCIONES DE LOS A;OS
UI.prototype.fillYears = () => {
    const max = new Date().getFullYear(),
        min = max - 20;

    const selectYear = document.querySelector("#year");

    for (let i = max; i > min; i--) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
};

//MUESTRA ALERTA EN PANTALLA
UI.prototype.showMessage = (mensaje, tipo) => {
    const div = document.createElement("div");

    if (tipo === "error") {
        div.classList.add("mensaje", "error");
    } else {
        div.classList.add("mensaje", "correcto");
    }

    div.classList.add("mensaje", "mt-10");
    div.textContent = mensaje;

    //INSERTAR EN EL HTML
    const form = document.querySelector("#cotizar-seguro");
    form.insertBefore(div, document.querySelector("#resultado"));

    setTimeout(() => {
        div.remove();
    }, 3000);
};

//MOSTRAR EL RESULTADO
UI.prototype.showResult = (total, seguro) => {
    const div = document.createElement("div");
    div.classList.add("mt-10");

    const { brand, year, type } = seguro;

    let brandText;

    switch (brand) {
        case '1':
            brandText = 'Americano';
            break;
        case '2':
            brandText = 'Asiatico';
            break;
        case '3':
            brandText = 'Europeo';
            break;


        default:
            break;
    }




    div.innerHTML = `
        <p class="header">Tu resumen</p>
        <p class="font-bold">Marca: <span class="font-normal"> ${brandText}</span></p>
        <p class="font-bold">Año: <span class="font-normal"> ${year}</span></p>
        <p class="font-bold">Tipo: <span class="font-normal capitalize"> ${type}</span></p>
        <p class="font-bold">Total: <span class="font-normal"> ${total}$</span></p>
    `;

    //INSERTAR EL RESULTADO EN EL HTML
    const resultDiv = document.querySelector('#resultado');


    //MOSTRAR EL SPINNER
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none';//SE BORRA EL SPINNER
        resultDiv.appendChild(div);//SE MUESTRA EL RESULTADO
        ui.enableForm(); //HABILITAR EL FORMULARIO NUEVAMENTE
    }, 3000);
};

//DESHABILITAR ELEMENTOS DEL FORMULARIO
UI.prototype.disableForm = () => {
    const marca = document.querySelector("#marca");
    const year = document.querySelector("#year");
    const radios = document.querySelectorAll('input[name="tipo"]');
    const button = document.querySelector('button[type="submit"]');

    marca.disabled = true;
    year.disabled = true;
    radios.forEach(radio => radio.disabled = true);
    button.disabled = true;
};

//HABILITAR ELEMENTOS DEL FORMULARIO
UI.prototype.enableForm = () => {
    const marca = document.querySelector("#marca");
    const year = document.querySelector("#year");
    const radios = document.querySelectorAll('input[name="tipo"]');
    const button = document.querySelector('button[type="submit"]');

    marca.disabled = false;
    year.disabled = false;
    radios.forEach(radio => radio.disabled = false);
    button.disabled = false;
};

//INSTANCIAR UI

const ui = new UI();

document.addEventListener("DOMContentLoaded", () => {
    ui.fillYears(); //LLENA EL SELECT CON LOS A;OS
});

eventListeners();
function eventListeners() {
    const form = document.querySelector("#cotizar-seguro");
    form.addEventListener("submit", quoteInsurance);
}

function quoteInsurance(e) {
    e.preventDefault();

    //LEER LA MARCA SELECCIONADA
    const brand = document.querySelector("#marca").value;

    //LEER EL A;O SELECCIONADO
    const year = document.querySelector("#year").value;

    //LEER EL TIPO DE COBERTURA
    const type = document.querySelector('input[name="tipo"]:checked').value;

    if (brand === "" || year === "" || type === "") {
        ui.showMessage("Todos los campos son obligatorios", "error");
        return;
    }

    ui.showMessage("Cotizando...", "exito");
    ui.disableForm(); //DESHABILITAR EL FORMULARIO

    const results = document.querySelector("#resultado div");
    if (results != null) {
        results.remove();
    }

    //INSTANCIAR EL SEGURO
    const seguro = new Seguro(brand, year, type);
    const total = seguro.quoteInsurance();

    //UTILIZAR EL PROTOTYPE QUE VA A COTIZAR
    ui.showResult(total, seguro);
}
