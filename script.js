function cuentaPalabras(textoADividir, separador) {
  let arrayTexto = textoADividir.split(separador);
  arrayTexto.length;
  return arrayTexto.length;
}

let texto = "esto es una prueba";
let separador = " ";

console.log(cuentaPalabras(texto, separador));


function verificar(verificacion){
  for(let i = 0; i < verificacion.length; i++ ){
    if(verificacion[0] == verificacion[i]){
      return false;
    }
  }
  return true;
}
