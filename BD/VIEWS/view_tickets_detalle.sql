--
-- View:         view_tickets_detalle
-- Timestamp:    2019-07-25 17:36:58
-- Stored MD5:   86087328c42652778c57da71c0d3c8d4
-- Computed MD5: 86087328c42652778c57da71c0d3c8d4
--

CREATE VIEW view_tickets_detalle AS select distinct t.telefono AS telefono,t.extension AS extension,t.correo AS correo,t.medio AS medio,t.mac AS mac,t.ip AS ip,t.equipo AS equipo,t.idticket AS idticket,t.fecha_creacion AS fecha_creacion,t.nombre AS solicitante,t.descripcion AS descripcion,t.idsubdireccion AS idsubdireccion,t.idusuario AS idusuario,s.subdireccion AS subdireccion,s.iddireccion AS iddireccion,d.idsecretaria AS idsecretaria,sec.secretaria AS secretaria,u.nombre AS capturo,t.idestado AS idestado,e.estado AS estado,e.color AS color,d.direccion AS direccion,
(select distinct ta.idusuario_asignado from tickets_asignaciones ta where ta.idasignacion = (select distinct max(tickets_asignaciones.idasignacion) AS m from tickets_asignaciones where tickets_asignaciones.idticket = t.idticket group by tickets_asignaciones.idticket limit 1)) AS idusuario_asignado,
(select usuarios.nombre from usuarios where usuarios.idusuario = (select distinct ta.idusuario_asignado from tickets_asignaciones ta where ta.idasignacion = (select distinct max(tickets_asignaciones.idasignacion) AS m from tickets_asignaciones where tickets_asignaciones.idticket = t.idticket group by tickets_asignaciones.idticket limit 1))) AS usuario_asignado 
from tickets t join tickets_asignaciones ta on ta.idticket = t.idticket join subdirecciones s on s.idsubdireccion = t.idsubdireccion join direcciones d on d.iddireccion = s.iddireccion join secretarias sec on  sec.idsecretaria = d.idsecretaria join usuarios u on u.idusuario = t.idusuario join estados e on e.idestado = t.idestado;
