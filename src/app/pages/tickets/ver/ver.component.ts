import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TicketsService } from '../../../servicios/tickets.service';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css']
})
export class VerComponent {
  errMsj = null;
  load = false;

  ticket = {
    area: '',
    correo: '',
    descripcion: '',
    equipo: '',
    extension: '',
    fecha_creacion: '',
    secretaria: '',
    direccion: '',
    estado: '',
    color: '',
    servicio: '',
    subdireccion: '',
    idticket: '',
    idusuario: '',
    idusuario_asignado: '',
    usuario_asignado: '',
    capturo: '',
    ip: '',
    mac: '',
    medio: '',
    solicitante: '',
    oficio: '',
    telefono: '',
  };

  padding:string="5px";
  constructor(
    private _ticketsService: TicketsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(parametros => {
      this.ticket.idticket = parametros['idticket'];
      this.cargarDatos();
    });
  }

  cargarDatos() {
    this._ticketsService.getTicketDetalle(this.ticket.idticket).subscribe(
      data => {
        this.ticket = data.registro;
        console.log(data.registro);
        this.load = false;
      },
      err => {
        this.errMsj = err.error.mensaje;
        this.load = false;
      }
    );
  }
}
