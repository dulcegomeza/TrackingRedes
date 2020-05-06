--
-- View:         view_tickets_comentarios
-- Timestamp:    2019-07-29 18:00:40
-- Stored MD5:   4f423aa93d3fdee1c91941f3dcd82ade
-- Computed MD5: 4f423aa93d3fdee1c91941f3dcd82ade
--

CREATE  VIEW view_tickets_comentarios AS select tc.idcomentario AS idcomentario,tc.idticket AS idticket,tc.fecha AS fecha,tc.comentario AS comentario,u.nombre AS usuario from tickets_comentarios tc join usuarios u on tc.idusuario = u.idusuario;
