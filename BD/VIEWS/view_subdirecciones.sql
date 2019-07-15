CREATE OR REPLACE VIEW view_subdirecciones AS 
SELECT s.idsubdireccion, s.subdireccion, s.iddireccion, s.activo, s.area, d.direccion, se.idsecretaria, se.secretaria FROM subdirecciones AS s
LEFT JOIN direcciones AS d ON  s.iddireccion = d.iddireccion
LEFT JOIN secretarias AS se ON  d.idsecretaria = se.idsecretaria