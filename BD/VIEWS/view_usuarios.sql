--
-- View:         view_usuarios
-- Timestamp:    2019-07-25 16:34:34
-- Stored MD5:   6787e5c8b19492e31fa9ca61826bd266
-- Computed MD5: 6787e5c8b19492e31fa9ca61826bd266
--

CREATE  VIEW view_usuarios AS select u.idusuario AS idusuario,u.nombre AS nombre,u.activo AS activo,u.correo AS correo,u.password AS password,r.rol AS rol,u.idrol AS idrol from usuarios u left join roles r on r.idrol = u.idrol;
