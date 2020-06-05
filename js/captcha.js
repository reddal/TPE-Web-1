document.addEventListener("DOMContentLoaded", iniciarPagina);
function iniciarPagina() {
    "use strict"
    
    // captcha
    let captcha = Math.floor((Math.random() * 100000) + 1);
    let textoConCaptcha = document.getElementById("captcha").innerHTML;
    document.getElementById("captcha").innerHTML = textoConCaptcha + " " + captcha;
    
    document.getElementById("verificarCaptcha").addEventListener("click", verificarCaptcha);
    
    function verificarCaptcha() {
        let valorIngresado = document.getElementById("inputCaptcha").value;
        if (valorIngresado == captcha) {
            document.getElementById("mensajeVerificacion").innerHTML = "Usted ha verificado correctamente.";
            document.getElementById("mensajeVerificacion").classList.remove("verificacionRoja");
            document.getElementById("mensajeVerificacion").classList.add("verificacionVerde");
        }
        else {
            document.getElementById("mensajeVerificacion").innerHTML = "Intente denuevo.";
            document.getElementById("mensajeVerificacion").classList.add("verificacionRoja");
        }
    }
    
    // Cancelar formulario si el usuario ingresa mal el captcha.
    
    document.getElementById("enviarFormulario").addEventListener("click", cancelarEnvio);
    
    function cancelarEnvio() {
        let valorTextoVerificacion = document.getElementById("mensajeVerificacion").innerHTML;
        if(valorTextoVerificacion != "Usted ha verificado correctamente.") {
            document.getElementById("cancelacionDeFormulario").innerHTML = "Verifique el captcha ingresado.";
            event.preventDefault();
        }
    }    
}




