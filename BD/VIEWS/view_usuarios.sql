CREATE OR REPLACE VIEW view_usuarios AS
SELECT u.idusuario, u.nombre, u.activo, u.correo, u.password, r.rol, u.idrol
FROM usuarios AS u
LEFT JOIN roles AS r ON r.idrol = u.idrol
