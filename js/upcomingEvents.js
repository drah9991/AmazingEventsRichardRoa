import * as funciones from "./modules/functions.js"
import * as variables from "./modules/variables.js"

// Llamada a la función



fetch(variables.url)
    .then(data => data.json())
    .then(data => {

        let future = filtroEventsporFecha(data.events, data.currentDate, true)
        funciones.tarjetas(future, variables.carrusel)
        let arrayCategory = Array.from(new Set(data.events.map(event => event.category)))
        funciones.pintarCheckbox(arrayCategory, variables.contenedorCheckbox)
        console.log(funciones.tarjetas);
        let filtro = () => {
            let checked = Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map(checkbox => checkbox.value.toLowerCase());
            let keyword = variables.buscador.value.trim().toLowerCase();

            // Si no hay checkboxes seleccionados, mostramos todos los eventos
            let filteredArray = checked.length === 0 ? data.events : funciones.filtrarPorCheckbox(data.events, checked);
            filteredArray = funciones.filtrarPorPalabra(filteredArray, keyword);
            funciones.tarjetas(filteredArray, variables.carrusel);
        };

        // Aplicamos el handler(filtro) a ambos eventos
        variables.contenedorCheckbox.addEventListener("change", filtro);
        variables.buscador.addEventListener("keyup", filtro);
        // // Mueve estas funciones dentro del evento "change" del contenedor de checkboxes
        // variables.contenedorCheckbox.addEventListener("change", () => {
        //     funciones.filtrarPorCheckbox(data.events, variables.contenedorCheckbox);
        //     funciones.filtroGeneral(data.events);
        // });

        console.log(data.events);
    })




// let pastEvents = filtroPast(data.events, data.currentDate)
// let upcoEvents = filtroUpc(data.events, data.currentDate)
function filtroEventsporFecha(arreglo, fecha, futuro) {
    let newArray = []
    for (let i = 0; i < arreglo.length; i++) {
        if (futuro == true) {
            if (arreglo[i].date > fecha) {
                newArray.push(arreglo[i])
            }
        } else {
            if (arreglo[i].date < fecha) {
                newArray.push(arreglo[i])
            }
        }
    }
    return newArray
}