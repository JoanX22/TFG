const API_URL = "/api";

function obtenerJson(url, mensajeError) {
    return fetch(url).then(function (respuesta) {
        return respuesta.json().then(function (datos) {
            if (!respuesta.ok) {
                throw new Error(datos.error || mensajeError);
            }

            return datos;
        });
    });
}

function cargarBacterias() {
    const zona = document.getElementById("tablaBacterias");

    zona.innerHTML = "<p>Cargando información...</p>";

    Promise.all([
        obtenerJson(
            API_URL + "/bacterias",
            "No se pudieron consultar las bacterias"
        ),
        obtenerJson(
            API_URL + "/resistencias",
            "No se pudieron consultar las resistencias"
        )
    ])
        .then(function (resultados) {
            const bacterias = resultados[0];
            const resistencias = resultados[1];

            let html =
                '<div class="tabla-contenedor">' +
                    "<table>" +
                        "<thead>" +
                            "<tr>" +
                                "<th>Bacteria</th>" +
                                "<th>Familia</th>" +
                                "<th>Descripción</th>" +
                                "<th>Antibiótico analizado</th>" +
                                "<th>Nivel de resistencia</th>" +
                            "</tr>" +
                        "</thead>" +
                        "<tbody>";

            bacterias.forEach(function (bacteria) {
                const datosResistencia = resistencias.filter(
                    function (resistencia) {
                        return resistencia.bacteria === bacteria.nombre;
                    }
                );

                if (datosResistencia.length === 0) {
                    html +=
                        "<tr>" +
                            "<td>" + bacteria.nombre + "</td>" +
                            "<td>" + bacteria.familia + "</td>" +
                            "<td>" + bacteria.descripcion + "</td>" +
                            "<td>Sin información</td>" +
                            "<td>Sin información</td>" +
                        "</tr>";
                    return;
                }

                datosResistencia.forEach(function (resistencia) {
                    html +=
                        "<tr>" +
                            "<td>" + bacteria.nombre + "</td>" +
                            "<td>" + bacteria.familia + "</td>" +
                            "<td>" + bacteria.descripcion + "</td>" +
                            "<td>" + resistencia.antibiotico + "</td>" +
                            "<td>" + resistencia.nivel + "</td>" +
                        "</tr>";
                });
            });

            html +=
                        "</tbody>" +
                    "</table>" +
                "</div>";

            zona.innerHTML = html;
        })
        .catch(function (error) {
            zona.innerHTML =
                '<div class="resultado error">' + error.message + "</div>";
            console.error(error);
        });
}

document.addEventListener("DOMContentLoaded", function () {
    const botonBacterias = document.getElementById("btnBacterias");

    botonBacterias.addEventListener("click", cargarBacterias);
});
