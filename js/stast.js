import * as funciones from "./modules/functions.js"
import * as variables from "./modules/variables.js"



fetch(variables.url)
    .then(data => data.json())
    .then(data => {
        // Estadísticas de Eventos
        funciones.crearFilaEncabezado("Estadísticas de Eventos");

        let asistenciasMayores = [];
        let asistenciasMenores = [];

        data.events.forEach(evento => {
            let porcentajeCapacidad = (100 / 100) * evento.capacity;
            let resultadoOperacion = funciones.calcularPorcentaje(evento.assistance, porcentajeCapacidad);

            (resultadoOperacion > 90 ? asistenciasMayores : asistenciasMenores).push({
                nombre: evento.name,
                categorias: evento.category,
                asistencia: resultadoOperacion,
                capacidad: evento.capacity
            });
        });

        asistenciasMayores.forEach(evento => funciones.crearFilaEvento(evento.nombre, evento.asistencia, evento.capacidad));

        // Próximos Eventos
        funciones.crearFilaEncabezado("Estadísticas de Próximos Eventos por Categoría");

        let eventosFuturos = funciones.filtrarFechas(data.events, data.currentDate, true);

        eventosFuturos.forEach(evento => {
            let fila = document.createElement("tr");
            fila.innerHTML = `
        <td>Nombre: <b>${evento.name}</b></td>
        <td>Categoría: <b>${evento.category}</b></td>
        <td>Ingresos Estimados: <b>$${evento.price * evento.capacity}</b></td>
        <td>Asistencia: <b>100%</b></td>`;
            tablaEstadisticas.appendChild(fila);
        });

        // Eventos Pasados
        funciones.crearFilaEncabezado("Estadísticas de Eventos Pasados por Categoría");

        let eventosPasados = funciones.filtrarFechas(data.events, data.currentDate, false);

        eventosPasados.forEach(evento => {
            let porcentajeCapacidad = (100 / 100) * evento.capacity;
            let asistenciaPasada = funciones.calcularPorcentaje(evento.assistance, porcentajeCapacidad);

            let fila = document.createElement("tr");
            fila.innerHTML = `
        <td>Nombre: <b>${evento.name}</b></td>
        <td>Categoría: <b>${evento.category}</b></td>
        <td>Ingresos Estimados: <b>$${evento.price * evento.assistance}</b></td>
        <td>Asistencia: <b>${asistenciaPasada}%</b></td>`;
            tablaEstadisticas.appendChild(fila);
        });

    })