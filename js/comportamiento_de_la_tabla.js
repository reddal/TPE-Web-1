document.addEventListener("DOMContentLoaded", iniciarPagina);
function iniciarPagina() {
    "use strict";
    const url = "https://web-unicen.herokuapp.com/api/groups/013ariasmoauro/coleccion";
    document.getElementById("botonNewName").addEventListener("click", toogle1);
    document.getElementById("botonNewImgSrc").addEventListener("click", toogle2);
    document.getElementById("botonNewPrice").addEventListener("click", toogle3);
    document.getElementById("botonNewDualSim").addEventListener("click", toogle4);
    document.getElementById("botonNewMemoria").addEventListener("click", toogle5);
    document.getElementById("botonNewRam").addEventListener("click", toogle6);
    document.getElementById("cargarTabla").addEventListener("click", Cargar);
    document.getElementById("rest").addEventListener("click", cargarCelularesApi);
    document.getElementById("borrarTabla").addEventListener("click", borrarTabla);
    document.getElementById("celulares3").addEventListener("click", agregar3);

    //hago un arreglo de objetos "celular"
    let celulares = [
        {
            "thing": {
                "name": "Samsung J4 Prime",
                "imgsrc": "imagenes/samsung/samsungj4/samsungj4primepng.png",
                "price": "$16.999",
                "dualSim": false,
                "memoria": "32 GB",
                "ram": "2 GB",
                "Os": "8.1 Oreo"
            }
        },
        {
            "thing": {
                "name": "Samsung A10",
                "imgsrc": "imagenes/samsung/samsunga10png.png",
                "price": "$38.400",
                "dualSim": false,
                "memoria": "32 GB",
                "ram": "2 GB",
                "Os": "9.0 Pie"
            }
        },
        {
            "thing": {
                "name": "Samsung A50",
                "imgsrc": "imagenes/samsung/samsunga50png.png",
                "price": "$40.000",
                "dualSim": true,
                "memoria": "64 GB",
                "ram": "4 GB",
                "Os": "9.0 Pie"
            }
        },
        {
            "thing": {
                "name": "Samsung S10",
                "imgsrc": "imagenes/samsung/samsungs10png.png",
                "price": "$65.000",
                "dualSim": false,
                "memoria": "128 GB",
                "ram": "8 GB",
                "Os": "9.0 Pie"
            }
        }
    ]


    // Muestro en la tabla los celulares precargados en el arreglo. // Elimine un monton de codigo repetido (sugerencia defensa 2)
    mostrar();
    setTimeout(function() {mostrar()}, 5000);

    // aca voy a hacer que cada boton muestre el siguiente input y el ultimo cargue los datos al array y vuelva a mostrar el primero
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
    // Esta funcion carga el celular ingresado por el usuario en la API y lo muestra en la tabla
    async function Cargar() {
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
        }
        celulares.push(
            {
                "thing": {
                    "name": name,
                    "imgsrc": imgsrc,
                    "price": "$" + price,
                    "dualSim": dualSim,
                    "memoria": memoria + " " + "GB",
                    "ram": ram + " " + "GB",
                    "Os": Os
                }
            }
        );
        try {
            let response = await fetch(url, {
                "method": "POST",
                "headers": { "Content-type": "application/json" },
                "body": JSON.stringify(celulares[celulares.length - 1])
            });
            if (response.ok) {
                let todosLosInputs = document.getElementsByClassName("inputsBorrar");
                for (let i = 0; i < todosLosInputs.length; i++) {
                    const element = todosLosInputs[i];
                    element.value = " ";
                }
                mostrar();
            }

        }
        catch (error) {
            console.log(error);

        }
    }

    // Esta funcion recorrer la API mostrando cada objeto en su lugar en la table del DOM 
    async function mostrar() {
        let edited = document.getElementsByClassName("edited");
        for (let i = edited.length - 1; i >= 0; --i) {
            let element = edited[i];
            element.remove();
        }

        try {
            let response = await fetch(url);
            if (response.ok) {
                let json = await response.json();

                for (let i = 0; i < json.coleccion.length; i++) {
                    let name = json.coleccion[i].thing.name;
                    let imgsrc = json.coleccion[i].thing.imgsrc;
                    let price = json.coleccion[i].thing.price;
                    let dualSim = json.coleccion[i].thing.dualSim;
                    let memoria = json.coleccion[i].thing.memoria;
                    let ram = json.coleccion[i].thing.ram;
                    let Os = json.coleccion[i].thing.Os;

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

                    let tableFooter = document.createElement("td");
                    tableFooter.classList.add("edited", "borrar");
                    let borrarBtn = document.createElement("button");
                    borrarBtn.classList.add("fa", "fa-trash");
                    borrarBtn.Fila = i;
                    tableFooter.appendChild(borrarBtn);
                    document.getElementById("borrar").appendChild(tableFooter);
                    borrarBtn.addEventListener("click", borrarFila);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async function borrarFila() {
        try {
            let response = await fetch(url);
            if (response.ok) {
                let json = await response.json();
                let numeroFila = this.Fila;
                let idBorrar = json.coleccion[numeroFila]._id;
                eliminarCelularApi(idBorrar); 
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    // Borrar toda la tabla, tambien borra TODOS los celulares de la API.
    async function borrarTabla() {
        try {
            let response = await fetch(url);
            if (response.ok) {
                let json = await response.json();
                for (let i = 0; i < json.coleccion.length; i++) {
                    eliminarCelularApi(json.coleccion[i]._id);
                }
            }
        }
        catch (error) {
            console.log(error);
        }

        let borrarElementos = document.getElementsByClassName("borrar");
        for (let i = borrarElementos.length - 1; i >= 0; i--) {
            borrarElementos[i].remove();
        }
    }

    // Esta funcion carga los 3 celulares a la API y los muestra en la tabla
    async function agregar3() {
        celulares.push(
            {
                "thing": {
                    "name": "Samsung A30",
                    "imgsrc": "imagenes/samsung/samsunga30.jpg",
                    "price": "$35.100",
                    "dualSim": false,
                    "memoria": "32 GB",
                    "ram": "3 GB",
                    "Os": "9.0 Pie"
                }
            },
            {
                "thing": {
                    "name": "Huawei P20",
                    "imgsrc": "imagenes/huawei/p20.jpg",
                    "price": "$24.999",
                    "dualSim": true,
                    "memoria": "32 GB",
                    "ram": "4 GB",
                    "Os": "8.0 Oreo"
                }
            },
            {
                "thing": {
                    "name": "Moto G8",
                    "imgsrc": "imagenes/motorola/motog8.png",
                    "price": "$25.999",
                    "dualSim": false,
                    "memoria": "32 GB",
                    "ram": "2 GB",
                    "Os": "9.0 Pie"
                }
            });

        for (let i = celulares.length - 3; i < celulares.length; i++) {
            try {
                let response = await fetch(url, {
                    "method": "POST",
                    "headers": { "Content-Type": "application/json" },
                    "body": JSON.stringify(celulares[i])
                });
                if (response.ok) {

                }
            }
            catch (error) {
                console.log(error);
            }
        }
        mostrar();
    }

    // Esta funcion carga los celulares por defecto a la API
    async function cargarCelularesApi() {
        for (let i = 0; i < celulares.length; i++) {
            try {
                let response = await fetch(url, {
                    "method": "POST",

                    "headers": {
                        "Content-Type": 'application/json'
                    },
                    "body": JSON.stringify(celulares[i])
                });
                if (response.ok) {

                }
            }
            catch (e) {
                console.log(e);
            }
        }
        mostrar();
    }

    // Esta funcion elimina un celular de la API.
    async function eliminarCelularApi(id) {
        try {
            await fetch(url + "/" + id, {
                "method": "DELETE"
            })
        }
        catch (e) {
            console.log(e);
        }
        mostrar();
    }
}
