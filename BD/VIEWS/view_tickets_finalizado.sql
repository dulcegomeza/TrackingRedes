--
-- View:         view_tickets_finalizado
-- Timestamp:    2019-07-30 14:19:44
-- Stored MD5:   f6e4b27d28a6cb2e3a0ea03cce55983e
-- Computed MD5: f6e4b27d28a6cb2e3a0ea03cce55983e
--

CREATE  VIEW view_tickets_finalizado AS select t.idticket AS idticket,t.idservicio AS idservicio,s.servicio AS servicio,te.fecha_creacion AS fecha_realizado from tickets t join servicios s on t.idservicio = s.idservicio join tickets_estados te on t.idticket = te.idticket and te.idestado = 4 where t.idestado = 4;
