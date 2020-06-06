document.addEventListener("DOMContentLoaded", iniciarPagina);
function iniciarPagina() {
    "use strict";
    //hago un arreglo de objetos "celular"
    let celulares = [
        {
            "name": "Samsung J4 Prime",
            "imgsrc": "imagenes/samsung/samsungj4/samsungj4primepng.png",
            "price": "$16.999",
            "dualSim": false,
            "memoria": "32 GB",
            "ram": "2 GB",
            "Os": "8.1 Oreo"
        },
        {
            "name": "Samsung A10",
            "imgsrc": "imagenes/samsung/samsunga10png.png",
            "price": "$38.400",
            "dualSim": false,
            "memoria": "32 GB",
            "ram": "2 GB",
            "Os": "9.0 Pie"
        },
        {
            "name": "Samsung A50",
            "imgsrc": "imagenes/samsung/samsunga50png.png",
            "price": "$40.000",
            "dualSim": true,
            "memoria": "64 GB",
            "ram": "4 GB",
            "Os": "9.0 Pie"
        },
        {
            "name": "Samsung S10",
            "imgsrc": "imagenes/samsung/samsungs10png.png",
            "price": "$65.000",
            "dualSim": false,
            "memoria": "128 GB",
            "ram": "8 GB",
            "Os": "9.0 Pie"
        }
    ]


    // Muestro en la tabla los celulares precargados en el arreglo. // Elimine un monton de codigo repetido (sugerencia defensa 2)
    for (let i = 0; i < celulares.length; i++) {
        mostrar();
    }

    // aca voy a hacer que cada boton muestre el siguiente input y el ultimo cargue los datos al array y vuelva a mostrar el primero
    document.getElementById("botonNewName").addEventListener("click", toogle1);
    document.getElementById("botonNewImgSrc").addEventListener("click", toogle2);
    document.getElementById("botonNewPrice").addEventListener("click", toogle3);
    document.getElementById("botonNewDualSim").addEventListener("click", toogle4);
    document.getElementById("botonNewMemoria").addEventListener("click", toogle5);
    document.getElementById("botonNewRam").addEventListener("click", toogle6);
    document.getElementById("cargarTabla").addEventListener("click", Cargar);
    function toogle1() {
        document.getElementById("divNewName").classList.toggle("hidden");
        document.getElementById("divNewImgSrc").classList.toggle("hidden");
    }
    function toogle2() {
        document.getElementById("divNewImgSrc").classList.toggle("hidden");
        document.getElementById("divNewPrice").classList.toggle("hidden");
    }
    function toogle3() {
        document.getElementById("divNewPrice").classList.toggle("hidden");
        document.getElementById("divNewDualSim").classList.toggle("hidden");
    }
    function toogle4() {
        document.getElementById("divNewDualSim").classList.toggle("hidden");
        document.getElementById("divNewMemoria").classList.toggle("hidden");
    }

    function toogle5() {
        document.getElementById("divNewMemoria").classList.toggle("hidden");
        document.getElementById("divNewRam").classList.toggle("hidden");
    }
    function toogle6() {
        document.getElementById("divNewRam").classList.toggle("hidden");
        document.getElementById("divNewOs").classList.toggle("hidden");
    }
    //leo cosas del DOM y las tiro en celulares en forma de objeto
    function Cargar() {
        document.getElementById("divNewOs").classList.toggle("hidden");
        document.getElementById("divNewName").classList.toggle("hidden");
        let name = document.getElementById("newName").value;
        let imgsrc = document.getElementById("newImgSrc").value;
        let price = document.getElementById("newPrice").value;
        let dualSim = document.getElementById("newDualSim").value;
        let memoria = document.getElementById("newMemoria").value;
        let ram = document.getElementById("newRam").value;
        let Os = document.getElementById("newOs").value;
        if (dualSim === "true") {
            dualSim = true;
        }
        else {
            dualSim = false;
        };
        celulares.push(
            {
                "name": name,
                "imgsrc": imgsrc,
                "price": "$" + price,
                "dualSim": dualSim,
                "memoria": memoria + " " + "GB",
                "ram": ram + " " + "GB",
                "Os": Os
            }
        );
        let todosLosInputs = document.getElementsByClassName("inputsBorrar");
        for (let i = 0; i < todosLosInputs.length; i++) {
            const element = todosLosInputs[i];
            element.value = " ";
        }
        mostrar();
    }
    //ahora voy a recorrer el array mostrando cada objeto en su lugar en la table del DOM 
    function mostrar() {
        let edited = document.getElementsByClassName("edited");
        for (let i = edited.length - 1; i >= 0; --i) {
            let element = edited[i];
            element.remove();
        }
        for (let i = 0; i < celulares.length; i++) {
            let name = celulares[i].name;
            let imgsrc = celulares[i].imgsrc;
            let price = celulares[i].price;
            let dualSim = celulares[i].dualSim;
            let memoria = celulares[i].memoria;
            let ram = celulares[i].ram;
            let Os = celulares[i].Os;

            let newHeader = document.createElement("TH");
            newHeader.innerHTML = "<img src=" + imgsrc + ">" + "<p>" + name + "</p>" + "</th>";
            newHeader.classList.add("edited", "borrar");
            document.getElementById("tabHeader").appendChild(newHeader);

            let newPrice = document.createElement("TD");
            newPrice.innerHTML = price;
            newPrice.classList.add("edited", "borrar")
            document.getElementById("price").appendChild(newPrice);

            let newDualSim = document.createElement("TD");
            if (dualSim) {
                newDualSim.innerHTML = "SI";
            }
            else {
                newDualSim.innerHTML = "NO";
            }
            newDualSim.classList.add("edited", "borrar");
            document.getElementById("dualSim").appendChild(newDualSim);

            let newMemoria = document.createElement("TD");
            newMemoria.innerHTML = memoria;
            newMemoria.classList.add("edited", "borrar");
            document.getElementById("memoria").appendChild(newMemoria);

            let newRam = document.createElement("TD");
            newRam.innerHTML = ram;
            newRam.classList.add("edited", "borrar");
            document.getElementById("ram").appendChild(newRam);

            let newOs = document.createElement("TD");
            newOs.innerHTML = Os;
            newOs.classList.add("edited", "borrar");
            document.getElementById("Os").appendChild(newOs);
        }
    }

    // Borrar toda la tabla.
    document.getElementById("borrarTabla").addEventListener("click", borrarTabla);
    function borrarTabla() {
        celulares = [];
        let borrarElementos = document.getElementsByClassName("borrar");
        for (let i = borrarElementos.length - 1; i >= 0; i--) {
            borrarElementos[i].remove();
        }
    }
    document.getElementById("celulares3").addEventListener("click", agregar3);
    function agregar3() {
        celulares.push(
            {
                "name": "Samsung A30",
                "imgsrc": "imagenes/samsung/samsunga30.jpg",
                "price": "$35.100",
                "dualSim": false,
                "memoria": "32 GB",
                "ram": "3 GB",
                "Os": "9.0 Pie"
            },
            {
                "name": "Huawei P20",
                "imgsrc": "imagenes/huawei/p20.jpg",
                "price": "$24.999",
                "dualSim": true,
                "memoria": "32 GB",
                "ram": "4 GB",
                "Os": "8.0 Oreo"
            },
            {
                "name": "Moto G8",
                "imgsrc": "imagenes/motorola/motog8.png",
                "price": "$$25.999",
                "dualSim": false,
                "memoria": "32 GB",
                "ram": "2 GB",
                "Os": "9.0 Pie"
            });
        mostrar();
    }
}
