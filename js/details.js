import * as funciones from "./modules/functions.js";
import * as variables from "./modules/variables.js";

fetch(variables.url)
    .then(data => data.json())
    .then(data => {
        let urlString = window.location.href

        let urlArmada = new URL(urlString)

        let parametros = new URLSearchParams(urlArmada.search)
        let id = parametros.get("id")

        let dataFilter = data.events.filter((evento) => evento._id == id)
        console.log(dataFilter)
        document.getElementById("titulo").innerHTML = dataFilter[0].name
        document.getElementById("descripcion").innerHTML = dataFilter[0].description
        document.getElementById("imagen").src = dataFilter[0].image
        document.getElementById("precio").innerHTML = "Precio= " + dataFilter[0].price
    })