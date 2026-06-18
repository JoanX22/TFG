const API_URL = "/api";

function mostrarError(zona, mensaje) {
    zona.innerHTML =
        '<div class="resultado error">' + mensaje + "</div>";
}

function buscarCaso() {
    const campoEsip = document.getElementById("esip");
    const resultado = document.getElementById("resultado");
    const esip = campoEsip.value.trim();

    if (esip === "") {
        mostrarError(resultado, "Escribe una ESIP para buscar un caso.");
        return;
    }

    resultado.innerHTML = "<p>Buscando caso...</p>";

    fetch(API_URL + "/casos/" + encodeURIComponent(esip))
        .then(function (respuesta) {
            return respuesta.json().then(function (datos) {
                if (!respuesta.ok) {
                    throw new Error(
                        datos.error || "No se pudo consultar el caso"
                    );
                }

                return datos;
            });
        })
        .then(function (caso) {
            resultado.innerHTML =
                '<div class="resultado">' +
                    "<h3>Resultado del caso</h3>" +
                    "<p><strong>ESIP:</strong> " + caso.esip + "</p>" +
                    "<p><strong>Hospital:</strong> " + caso.hospital + "</p>" +
                    "<p><strong>Diagnóstico:</strong> " + caso.diagnostico + "</p>" +
                    "<p><strong>Bacteria:</strong> " + caso.bacteria + "</p>" +
                    "<p><strong>Riesgo:</strong> " + caso.riesgo + "</p>" +
                    "<p><strong>Fecha:</strong> " + caso.fecha + "</p>" +
                "</div>";
        })
        .catch(function (error) {
            mostrarError(resultado, error.message);
            console.error(error);
        });
}

document.addEventListener("DOMContentLoaded", function () {
    const botonBuscar = document.getElementById("btnBuscar");
    const campoEsip = document.getElementById("esip");

    botonBuscar.addEventListener("click", buscarCaso);

    campoEsip.addEventListener("keydown", function (evento) {
        if (evento.key === "Enter") {
            buscarCaso();
        }
    });
});
