USE infdemic;

INSERT IGNORE INTO usuarios (nombre, email, password, rol) VALUES
('Administrador INFDEMIC', 'admin@infdemic.local', 'Admin123!', 'administrador'),
('Medico Demo', 'medico@infdemic.local', 'Medico123!', 'medico'),
('Investigador Demo', 'investigador@infdemic.local', 'Investiga123!', 'investigador');

INSERT IGNORE INTO pacientes (esip, sexo, edad) VALUES
('ESIP-CV-000245', 'Masculino', 58),
('ESIP-CV-000311', 'Femenino', 42),
('ESIP-CV-000512', 'Masculino', 71);

INSERT INTO casos_clinicos
(esip, hospital, diagnostico, bacteria, riesgo, fecha)
SELECT
'ESIP-CV-000245',
'Hospital La Fe',
'Neumonia bacteriana',
'Staphylococcus aureus',
'Alto',
'2026-06-01'
WHERE NOT EXISTS (
    SELECT 1 FROM casos_clinicos
    WHERE esip = 'ESIP-CV-000245'
);

INSERT INTO casos_clinicos
(esip, hospital, diagnostico, bacteria, riesgo, fecha)
SELECT
'ESIP-CV-000311',
'Hospital Clinico',
'Infeccion urinaria',
'Escherichia coli',
'Medio',
'2026-06-02'
WHERE NOT EXISTS (
    SELECT 1 FROM casos_clinicos
    WHERE esip = 'ESIP-CV-000311'
);

INSERT INTO casos_clinicos
(esip, hospital, diagnostico, bacteria, riesgo, fecha)
SELECT
'ESIP-CV-000512',
'Hospital General',
'Herida quirurgica infectada',
'Pseudomonas aeruginosa',
'Alto',
'2026-06-03'
WHERE NOT EXISTS (
    SELECT 1 FROM casos_clinicos
    WHERE esip = 'ESIP-CV-000512'
);

INSERT IGNORE INTO bacterias (nombre, familia, descripcion) VALUES
(
    'Staphylococcus aureus',
    'Staphylococcaceae',
    'Bacteria asociada a infecciones de piel, heridas y neumonia.'
),
(
    'Escherichia coli',
    'Enterobacteriaceae',
    'Bacteria frecuente en infecciones urinarias y digestivas.'
),
(
    'Pseudomonas aeruginosa',
    'Pseudomonadaceae',
    'Bacteria oportunista con importancia hospitalaria.'
);

INSERT IGNORE INTO resistencias (bacteria, antibiotico, nivel) VALUES
('Staphylococcus aureus', 'Penicilina', 'Alto'),
('Escherichia coli', 'Amoxicilina', 'Medio'),
('Pseudomonas aeruginosa', 'Ciprofloxacino', 'Alto');
