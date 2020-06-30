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
    document.getElementById("btnFiltro").addEventListener("click", filtroTabla);
    document.getElementById("js-quitarFiltro").addEventListener("click", quitarFiltros);
    //hago un arreglo de objetos "celular"
    let celulares = [
        {
            "thing": {
                "name": "Samsung J4 Prime",
                "imgsrc": "imagenes/samsung/samsungj4/samsungj4primepng.png",
                "price": "$16.999",
                "dualSim": false,
                "memoria": 32,
                "ram": 2,
                "Os": "8.1 Oreo"
            }
        },
        {
            "thing": {
                "name": "Samsung A10",
                "imgsrc": "imagenes/samsung/samsunga10png.png",
                "price": "$38.400",
                "dualSim": false,
                "memoria": 32,
                "ram": 2,
                "Os": "9.0 Pie"
            }
        },
        {
            "thing": {
                "name": "Samsung A50",
                "imgsrc": "imagenes/samsung/samsunga50png.png",
                "price": "$40.000",
                "dualSim": true,
                "memoria": 64,
                "ram": 4,
                "Os": "9.0 Pie"
            }
        },
        {
            "thing": {
                "name": "Samsung S10",
                "imgsrc": "imagenes/samsung/samsungs10png.png",
                "price": "$65.000",
                "dualSim": false,
                "memoria": 128,
                "ram": 8,
                "Os": "9.0 Pie"
            }
        }
    ]


    // Muestro en la tabla los celulares precargados en el arreglo. // Elimine un monton de codigo repetido (sugerencia defensa 2)
    mostrar();
    //setInterval(function() {mostrar()}, 10000);

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
                    "memoria": memoria,
                    "ram": ram,
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
                    let nameInput = document.createElement("input");
                    nameInput.id = "name" + i;
                    nameInput.placeholder = "nombre";
                    nameInput.classList.add("hidden", "edit" + i);
                    let imgsrc = json.coleccion[i].thing.imgsrc;
                    let imgsrcInput = document.createElement("input");
                    imgsrcInput.id = "imgsrc" + i;
                    imgsrcInput.placeholder = "ruta de imagen"
                    imgsrcInput.classList.add("hidden", "edit" + i);
                    let price = json.coleccion[i].thing.price;
                    let priceInput = document.createElement("input")
                    priceInput.id = "price" + i;
                    priceInput.placeholder = "precio"
                    priceInput.type = "number";
                    priceInput.classList.add("hidden", "edit" + i);
                    let dualSim = json.coleccion[i].thing.dualSim;
                    let dualSimInput = document.createElement("select");
                    let option1 = document.createElement("option")
                    option1.innerHTML = "SI";
                    option1.value = true;
                    let option2 = document.createElement("option");
                    option2.innerHTML = "NO";
                    option2.value = false;
                    dualSimInput.appendChild(option1);
                    dualSimInput.appendChild(option2);
                    dualSimInput.id = "dualSim" + i;
                    dualSimInput.classList.add("hidden", "edit" + i);
                    let memoria = json.coleccion[i].thing.memoria;
                    let memoriaInput = document.createElement("input");
                    memoriaInput.id = "memoria" + i;
                    memoriaInput.type = "number";
                    memoriaInput.placeholder = "memoria";
                    memoriaInput.classList.add("hidden", "edit" + i);
                    let ram = json.coleccion[i].thing.ram;
                    let ramInput = document.createElement("input");
                    ramInput.id = "ram" + i;
                    ramInput.placeholder = "ram";
                    ramInput.type = "number";
                    ramInput.classList.add("hidden", "edit" + i);
                    let Os = json.coleccion[i].thing.Os;
                    let OsInput = document.createElement("input");
                    OsInput.id = "Os" + i;
                    OsInput.placeholder = "Sistema Operativo";
                    OsInput.classList.add("hidden", "edit" + i);

                    let newHeader = document.createElement("tr");
                    newHeader.fila = i;
                    newHeader.innerHTML = `<td><img class="edit${i}" src="${imgsrc}"> <p class="edit${i}"> ${name}</p> </td>`;
                    newHeader.classList.add("edited", "borrar", "celulares-filtro");
                    newHeader.id = "celu" + i;
                    newHeader.firstChild.appendChild(nameInput);
                    newHeader.firstChild.appendChild(imgsrcInput);
                    document.getElementById("celular").appendChild(newHeader);


                    let newPrice = document.createElement("td");
                    let priceSpan = document.createElement("span");
                    priceSpan.innerHTML = price;
                    priceSpan.classList.add("edit" + i);
                    newPrice.classList.add("edited", "borrar");
                    newPrice.appendChild(priceInput);
                    newPrice.appendChild(priceSpan);
                    document.getElementById("celu" + i).appendChild(newPrice);

                    let newDualSim = document.createElement("td");
                    if (dualSim) {
                        newDualSim.innerHTML = `<span class="edit${i}"> SI </span>`;
                    }
                    else {
                        newDualSim.innerHTML = `<span class="edit${i}"> NO </span>`;
                    }
                    newDualSim.classList.add("edited", "borrar");
                    newDualSim.appendChild(dualSimInput);
                    document.getElementById("celu" + i).appendChild(newDualSim);

                    let newMemoria = document.createElement("td");
                    let memoriaSpan = document.createElement("span");
                    memoriaSpan.innerHTML = memoria + " GB";
                    memoriaSpan.classList.add("edit" + i);
                    newMemoria.classList.add("edited", "borrar");
                    newMemoria.appendChild(memoriaInput);
                    newMemoria.appendChild(memoriaSpan);
                    document.getElementById("celu" + i).classList.add("memoria-" + memoria);
                    document.getElementById("celu" + i).appendChild(newMemoria);

                    let newRam = document.createElement("td");
                    let ramSpan = document.createElement("span")
                    ramSpan.innerHTML = ram + " GB";
                    ramSpan.classList.add("edit" + i);
                    newRam.classList.add("edited", "borrar");
                    newRam.appendChild(ramSpan);
                    newRam.appendChild(ramInput);
                    document.getElementById("celu" + i).classList.add("ram-" + ram);
                    document.getElementById("celu" + i).appendChild(newRam);

                    let newOs = document.createElement("td");
                    let osSpan = document.createElement("span");
                    osSpan.innerHTML = Os;
                    osSpan.classList.add("edit" + i);
                    newOs.classList.add("edited", "borrar");
                    newOs.appendChild(OsInput);
                    newOs.appendChild(osSpan);
                    document.getElementById("celu" + i).appendChild(newOs);

                    let tableFooter = document.createElement("td");
                    tableFooter.classList.add("edited", "borrar");
                    let editBtn = document.createElement("button");
                    editBtn.classList.add("fas", "fa-edit", "edit" + i);
                    editBtn.celuID = json.coleccion[i]._id;
                    let buttonSubmit = document.createElement("button");
                    buttonSubmit.id = "submit" + i;
                    buttonSubmit.fila = i;
                    buttonSubmit.classList.add("hidden", "edit" + i);
                    buttonSubmit.innerHTML = "enviar";
                    let borrarBtn = document.createElement("button");
                    borrarBtn.classList.add("fa", "fa-trash", "edit" + i);
                    borrarBtn.Fila = i;
                    tableFooter.appendChild(buttonSubmit);
                    tableFooter.appendChild(borrarBtn);
                    tableFooter.appendChild(editBtn);
                    document.getElementById("celu" + i).appendChild(tableFooter);
                    borrarBtn.addEventListener("click", borrarFila);
                    editBtn.addEventListener("click", function () { editMode(i) });
                    buttonSubmit.addEventListener("click", function () { editCelularAPI(editBtn.celuID, i) });
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
                    "memoria": 32,
                    "ram": 3,
                    "Os": "9.0 Pie"
                }
            },
            {
                "thing": {
                    "name": "Huawei P20",
                    "imgsrc": "imagenes/huawei/p20.jpg",
                    "price": "$24.999",
                    "dualSim": true,
                    "memoria": 32,
                    "ram": 4,
                    "Os": "8.0 Oreo"
                }
            },
            {
                "thing": {
                    "name": "Moto G8",
                    "imgsrc": "imagenes/motorola/motog8.png",
                    "price": "$25.999",
                    "dualSim": false,
                    "memoria": 32,
                    "ram": 2,
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

    function filtroTabla() {
        let valueUser = document.getElementById("js-filtro").value;
        let celulares = document.getElementsByClassName("celulares-filtro");
        for (let i = 0; i < celulares.length; i++) {
            celulares[i].classList.remove("hidden");
        }
        if (document.getElementById("selectFiltro").value == "ram") {
            for (let i = 0; i < celulares.length; i++) {
                if (!celulares[i].classList.contains("ram-" + valueUser)) {
                    celulares[i].classList.add("hidden");
                }
            }
        }
        if (document.getElementById("selectFiltro").value == "memoria") {
            for (let i = 0; i < celulares.length; i++) {
                if (!celulares[i].classList.contains("memoria-" + valueUser)) {
                    celulares[i].classList.add("hidden");
                }
            }
        }
    }
    function quitarFiltros() {
        let celulares = document.getElementsByClassName("celulares-filtro");
        for (let i = 0; i < celulares.length; i++) {
            celulares[i].classList.remove("hidden");
        }
        event.preventDefault();
    }
    function editMode(fila) {
        let celu = document.getElementsByClassName("edit" + fila);
        for (let i = 0; i < celu.length; i++) {
            let tableCell = celu[i];
            tableCell.classList.toggle("hidden");
        }
    }
    async function editCelularAPI(id,fila) {
        celulares.push ( {
            "thing": {
                "name": document.getElementById(`name${fila}`).value,
                "imgsrc": document.getElementById(`imgsrc${fila}`).value,
                "price": document.getElementById(`price${fila}`).value,
                "dualSim": document.getElementById(`dualSim${fila}`).value,
                "memoria": document.getElementById(`memoria${fila}`).value,
                "ram": document.getElementById(`ram${fila}`).value,
                "Os": document.getElementById(`Os${fila}`).value
            }
        });
        try {
            await fetch(url + "/" + id, {
                "method": "PUT",
                "mode": 'cors',
                "headers": { "Content-Type": "application/json" },
                "body": JSON.stringify(celulares[celulares.length-1])
            })
        }
        catch (e) {
            console.log(e);
        }
        mostrar();
    }
}

