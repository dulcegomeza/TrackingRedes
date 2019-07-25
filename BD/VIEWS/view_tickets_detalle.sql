CREATE OR REPLACE VIEW view_tickets_detalle as select distinct t.telefono, t.extension, t.correo, t.medio, t.mac, t.ip, t.equipo, 
t.idticket, t.fecha_creacion,t.nombre as solicitante, t.descripcion,t.idsubdireccion, t.idusuario, s.subdireccion,s.iddireccion,d.idsecretaria,sec.secretaria,u.nombre AS capturo,t.idestado,e.estado, e.color, d.direccion,
(select distinct ta.idusuario_asignado from tickets_asignaciones ta where (ta.idasignacion = (select distinct max(tickets_asignaciones.idasignacion) AS m from tickets_asignaciones where (tickets_asignaciones.idticket = t.idticket) group by tickets_asignaciones.idticket limit 1))) AS idusuario_asignado,
(select nombre from usuarios WHERE usuarios.idusuario=(select distinct ta.idusuario_asignado from tickets_asignaciones ta where (ta.idasignacion = (select distinct max(tickets_asignaciones.idasignacion) AS m from tickets_asignaciones where (tickets_asignaciones.idticket = t.idticket) group by tickets_asignaciones.idticket limit 1)))) as usuario_asignado
from tickets as t
inner join tickets_asignaciones as ta on ta.idticket= t.idticket
inner join subdirecciones as s on s.idsubdireccion=t.idsubdireccion
inner join direcciones as d on d.iddireccion=s.iddireccion
INNER join secretarias as sec on sec.idsecretaria =d.idsecretaria
inner join usuarios as u on u.idusuario=t.idusuario
inner join  estados as e on e.idestado=t.idestado