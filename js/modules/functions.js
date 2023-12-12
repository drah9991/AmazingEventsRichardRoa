import * as variables from "./variables.js"

export function tarjetas(arregloEventos, divp) {
    divp.innerHTML = ""
    if (arregloEventos.length == 0) {
        divp.innerHTML = '<div class="col-12 min-vh-50"><h2 class="text-center text-secondary my-5">No hay elementos para mostrar</h2></div>'
    }
    for (let i = 0; i < arregloEventos.length; i += 4) {
        let carruselItem
        if (i < 4) {
            carruselItem = document.createElement("div")
            carruselItem.classList.add("carousel-item", "active")
        } else {
            carruselItem = document.createElement("div")
            carruselItem.classList.add("carousel-item")
        }

        let contenedor = document.createElement("div")
        contenedor.classList.add("d-flex", "justify-content-around")

        for (let j = i; j < i + 4; j++) {
            if (arregloEventos[j] != undefined) {
                let card = document.createElement("div")
                card.classList.add("card", "tamanoCard")
                card.innerHTML = `
                    <img src="${arregloEventos[j].image}" class="card-img-top w-100 h-100" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${arregloEventos[j].name}</h5>
                        date
                        <p class="card-text">${arregloEventos[j].description}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Date: ${arregloEventos[j].date}</li>
                        <li class="list-group-item">Place: ${arregloEventos[j].place} </li>
                        <li class="list-group-item">Category: ${arregloEventos[j].category} </li>
                        <li class="list-group-item">Price: ${arregloEventos[j].price}</li>
                    </ul>
                    <div class="card-body">
                        <a href="details.html?id=${arregloEventos[j]._id}" class="card-link">Details</a>
                    </div>`;
                contenedor.appendChild(card);
            }
        }

        carruselItem.appendChild(contenedor);
        divp.appendChild(carruselItem);
    }

}

export function pintarCheckbox(data, divC) {
    for (let j = 0; j < data.length; j++) {
        if (data[j] != undefined) {
            let checkbox = document.createElement("div")
            checkbox.classList.add("form-check", "form-check-inline")
            checkbox.innerHTML = `
                <input class="form-check-input" type="checkbox" value="${data[j]}" id="${data[j]}">
                <label class="form-check-label" for="${data[j]}">${data[j]}</label>`;
            divC.appendChild(checkbox);
        }
    }

}

export function filtrarPorCheckbox(data, arregloChecked) {
    let array = data.filter(event => arregloChecked.includes(event.category.toLowerCase()))
    return array
}
//filtro buscar
export function filtrarPorPalabra(arregloEventos, palabraClave) {
    let arregloFiltrado = arregloEventos.filter(evento => evento.name.toLowerCase().includes(palabraClave.toLowerCase()) || evento.description.toLowerCase().includes(palabraClave.toLowerCase()))
    return arregloFiltrado
}

export function generalStatistics(data) {
    let listCapacity = largerCapacity(data)
    let hightPorcentList = [
        [0],
        [0],
        [0]
    ]
    let lowPorcentList = [
        [99],
        [99],
        [99]
    ]
    for (let i = 0; i < data.events.length; i++) {
        let assistance = data.events[i].assistance
        if (assistance == undefined) {
            continue
        }
        let porcent = assistancePorcent(data.events[i])
        if (porcent > (hightPorcentList[0])[0]) {
            hightPorcentList[0] = [porcent, data.events[i].name]
        } else if (porcent > (hightPorcentList[1])[0]) {
            hightPorcentList[1] = [porcent, data.events[i].name]
        } else if (porcent > (hightPorcentList[2])[0]) {
            hightPorcentList[2] = [porcent, data.events[i].name]
        }

        if (porcent < (lowPorcentList[0])[0]) {
            lowPorcentList[1] = lowPorcentList[0]
            lowPorcentList[0] = [porcent, data.events[i].name]
        } else if (porcent < (lowPorcentList[1])[0]) {
            lowPorcentList[2] = lowPorcentList[1]
            lowPorcentList[1] = [porcent, data.events[i].name]
        } else if (porcent < (lowPorcentList[2])[0]) {
            lowPorcentList[2] = [porcent, data.events[i].name]
        }
    }
    hightPorcentList[0][0] = hightPorcentList[0][0] + " % "
    hightPorcentList[1][0] = hightPorcentList[1][0] + " % "
    hightPorcentList[2][0] = hightPorcentList[2][0] + " % "
    lowPorcentList[0][0] = lowPorcentList[0][0] + " % "
    lowPorcentList[1][0] = lowPorcentList[1][0] + " % "
    lowPorcentList[2][0] = lowPorcentList[2][0] + " % "
    let generalStatisticsTable = [hightPorcentList, lowPorcentList, listCapacity]
    console.log(generalStatisticsTable);
    drawStats(statistics, generalStatisticsTable, "g")
}