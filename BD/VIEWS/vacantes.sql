CREATE VIEW view_vacantes AS
SELECT v.idempresa AS id, v.idempresa, v.activo, v.fecha, v.puesto,  n.nivel , v.sexo, e.empresa , c.categoria, DATE_ADD(v.fecha, INTERVAL 45 DAY) AS vencimiento
FROM empresa_vacantes  AS v
LEFT JOIN empresa_registro AS e ON v.id = e.idempresa
LEFT JOIN catalogo_categorias AS c ON v.categoria = c.idcategoria
LEFT JOIN catalogo_nivelacademico AS n ON v.nivelacademico = n.id