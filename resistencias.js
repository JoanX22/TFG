const API_URL = "/api";

function cargarResistencias() {
    const zona = document.getElementById("tablaResistencias");

    zona.innerHTML = "<p>Cargando resistencias...</p>";

    fetch(API_URL + "/resistencias")
        .then(function (respuesta) {
            return respuesta.json().then(function (datos) {
                if (!respuesta.ok) {
                    throw new Error(
                        datos.error || "No se pudieron consultar las resistencias"
                    );
                }

                return datos;
            });
        })
        .then(function (resistencias) {
            let html =
                '<div class="tabla-contenedor">' +
                    "<table>" +
                        "<thead>" +
                            "<tr>" +
                                "<th>Bacteria</th>" +
                                "<th>Antibiótico analizado</th>" +
                                "<th>Nivel de resistencia</th>" +
                            "</tr>" +
                        "</thead>" +
                        "<tbody>";

            resistencias.forEach(function (resistencia) {
                html +=
                    "<tr>" +
                        "<td>" + resistencia.bacteria + "</td>" +
                        "<td>" + resistencia.antibiotico + "</td>" +
                        "<td>" + resistencia.nivel + "</td>" +
                    "</tr>";
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
    const botonResistencias =
        document.getElementById("btnResistencias");

    botonResistencias.addEventListener(
        "click",
        cargarResistencias
    );
});
