document.addEventListener("DOMContentLoaded", iniciarPagina);
function iniciarPagina() {
    "use strict"
    
    //inicio carousel de fotos
    document.getElementById("imglast").addEventListener("click", cambiarFotoIz);
    let img1 = document.getElementById("img1");
    let img2 = document.getElementById("img2");
    let img3 = document.getElementById("img3");
    
    function cambiarFotoIz() {
        if (img1.className == "imagenproducto") {
            img1.classList.replace("imagenproducto", "hidden");
            img3.classList.replace("hidden", "imagenproducto");
        } else if (img2.className == "imagenproducto") {
            img2.classList.replace("imagenproducto", "hidden");
            img1.classList.replace("hidden", "imagenproducto");
        } else if (img3.className == "imagenproducto") {
            img3.classList.replace("imagenproducto", "hidden");
            img2.classList.replace("hidden", "imagenproducto");
        }
    }
    
    document.getElementById("imgnext").addEventListener("click", cambiarFotoDer);
    
    function cambiarFotoDer() {
        if (img1.className == "imagenproducto") {
            img1.classList.replace("imagenproducto", "hidden");
            img2.classList.replace("hidden", "imagenproducto");
        } else if (img2.className == "imagenproducto") {
            img2.classList.replace("imagenproducto", "hidden");
            img3.classList.replace("hidden", "imagenproducto");
        }
        else if (img3.className == "imagenproducto") {
            img3.classList.replace("imagenproducto", "hidden");
            img1.classList.replace("hidden", "imagenproducto");
        }
    }
    //fin carousel de fotos
    
    // actualizar precio en base a las unidades
    document.getElementById("calcularPrecio").addEventListener("click", calcularPrecio);
    function calcularPrecio() {
        let precio = document.getElementById("preciounitario").value;
        let unidad = document.getElementById("cantComprar").value;
        let nuevoPrecio = 16999 * unidad;
        document.getElementById("preciounitario").innerHTML = nuevoPrecio;
    }  
}

