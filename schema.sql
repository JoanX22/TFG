USE infdemic;

CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS pacientes (
    id_paciente INT AUTO_INCREMENT PRIMARY KEY,
    esip VARCHAR(50) NOT NULL UNIQUE,
    sexo VARCHAR(20),
    edad INT
);

CREATE TABLE IF NOT EXISTS casos_clinicos (
    id_caso INT AUTO_INCREMENT PRIMARY KEY,
    esip VARCHAR(50) NOT NULL,
    hospital VARCHAR(100) NOT NULL,
    diagnostico VARCHAR(150) NOT NULL,
    bacteria VARCHAR(100) NOT NULL,
    riesgo VARCHAR(50) NOT NULL,
    fecha DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS bacterias (
    id_bacteria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    familia VARCHAR(100),
    descripcion TEXT
);

CREATE TABLE IF NOT EXISTS resistencias (
    id_resistencia INT AUTO_INCREMENT PRIMARY KEY,
    bacteria VARCHAR(100) NOT NULL,
    antibiotico VARCHAR(100) NOT NULL,
    nivel VARCHAR(50) NOT NULL,
    UNIQUE KEY uq_resistencia (bacteria, antibiotico)
);
