document.addEventListener("DOMContentLoaded", iniciarPagina);
function iniciarPagina() {
    "use strict"
    
    // Boton de menu
    document.getElementById("botonMenu").addEventListener("click", mostrarMenu);
    
    function mostrarMenu() {
        document.getElementById("navegacion").classList.toggle("mostrarMenu");
    }
}


