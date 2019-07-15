CREATE OR REPLACE VIEW view_usuarios AS 
SELECT u.idusuario, u.idsubdireccion, u.nombre, u.activo, u.correo, u.password , r.rol, s.iddireccion, s.subdireccion, d.direccion, se.idsecretaria, se.secretaria, s.idrol FROM usuarios AS u 
LEFT JOIN roles AS r ON  r.idrol = u.idrol
LEFT JOIN subdirecciones AS s ON  s.idsubdireccion = u.idsubdireccion
LEFT JOIN direcciones AS d ON  s.iddireccion = d.iddireccion
LEFT JOIN secretarias AS se ON  d.idsecretaria = se.idsecretaria