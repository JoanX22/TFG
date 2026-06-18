const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5
});

app.get("/api/health", function (req, res) {
    res.json({
        status: "ok",
        message: "Servidor INFDEMIC funcionando"
    });
});

app.get("/api/casos", function (req, res) {
    const sql =
        "SELECT id_caso, esip, hospital, diagnostico, bacteria, riesgo, " +
        "DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha " +
        "FROM casos_clinicos ORDER BY fecha DESC";

    db.query(sql, function (err, results) {
        if (err) {
            console.error("Error SQL en casos:", err.message);
            res.status(500).json({
                error: "Error al consultar casos clínicos",
                detalle: err.message
            });
            return;
        }

        res.json(results);
    });
});

app.get("/api/casos/:esip", function (req, res) {
    const esip = req.params.esip.trim();

    const sql =
        "SELECT id_caso, esip, hospital, diagnostico, bacteria, riesgo, " +
        "DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha " +
        "FROM casos_clinicos WHERE esip = ?";

    db.query(sql, [esip], function (err, results) {
        if (err) {
            console.error("Error SQL buscando ESIP:", err.message);
            res.status(500).json({
                error: "Error al buscar el caso",
                detalle: err.message
            });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({
                error: "No se encontró ningún caso"
            });
            return;
        }

        res.json(results[0]);
    });
});

app.get("/api/bacterias", function (req, res) {
    const sql =
        "SELECT id_bacteria, nombre, familia, descripcion " +
        "FROM bacterias ORDER BY nombre";

    db.query(sql, function (err, results) {
        if (err) {
            console.error("Error SQL en bacterias:", err.message);
            res.status(500).json({
                error: "Error al consultar bacterias",
                detalle: err.message
            });
            return;
        }

        res.json(results);
    });
});

app.get("/api/resistencias", function (req, res) {
    const sql =
        "SELECT id_resistencia, bacteria, antibiotico, nivel " +
        "FROM resistencias ORDER BY bacteria, antibiotico";

    db.query(sql, function (err, results) {
        if (err) {
            console.error("Error SQL en resistencias:", err.message);
            res.status(500).json({
                error: "Error al consultar resistencias",
                detalle: err.message
            });
            return;
        }

        res.json(results);
    });
});

app.use(function (req, res) {
    res.status(404).json({
        error: "Ruta no encontrada"
    });
});

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, "127.0.0.1", function () {
    console.log("Backend INFDEMIC escuchando en el puerto " + PORT);
});
