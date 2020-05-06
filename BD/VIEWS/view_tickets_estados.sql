--
-- View:         view_tickets_estados
-- Timestamp:    2019-07-29 20:26:21
-- Stored MD5:   27be3e8024adceb86e9f761b2bbcb2f3
-- Computed MD5: 27be3e8024adceb86e9f761b2bbcb2f3
--

CREATE  VIEW view_tickets_estados AS select te.idticketestado AS idticketestado,te.idticket AS idticket,te.fecha_creacion AS fecha,e.estado AS estado,e.color AS color,te.comentario AS comentario,u.nombre AS usuario,ua.nombre AS asignado from tickets_estados te join estados e on te.idestado = e.idestado join usuarios u on te.idusuario = u.idusuario join usuarios ua on te.idusuario_asignado = ua.idusuario;
