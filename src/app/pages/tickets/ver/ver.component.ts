import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AsignarComponent } from '../asignar/asignar.component';
import { CamEstadoComponent } from '../cam_estado/cam_estado.component';
import { ComentarioComponent } from '../comentario/comentario.component';
import {
  UsuariosService,
  TicketsService
} from "../../../servicios/servicio.index";
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-ver",
  templateUrl: "./ver.component.html",
  styleUrls: ["./ver.component.css"]
})
export class VerComponent {
  errMsj = null;
  load = false;

  ticket = {
    area: "",
    correo: "",
    descripcion: "",
    equipo: "",
    extension: "",
    fecha_creacion: "",
    secretaria: "",
    direccion: "",
    idestado: "",
    estado: "",
    color: "",
    servicio: "",
    subdireccion: "",
    idticket: "",
    idusuario: "",
    idusuario_asignado: "",
    usuario_asignado: "",
    capturo: "",
    ip: "",
    mac: "",
    medio: "",
    solicitante: "",
    oficio: "",
    telefono: "",
    comentarios: [],
    testados: [],
  };

  padding = "5px";
  closeResult: string;
  usuarios: any;
  usuario_actual: any;

  constructor(
    private _ticketsService: TicketsService,
    public modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(parametros => {
      this.ticket.idticket = parametros["idticket"];
      this.cargarDatos();
    });
  }

  cargarDatos() {
    this.load = true;
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

  asignar() {
    const modal = this.modalService.open(AsignarComponent);
    modal.componentInstance.idticket = this.ticket.idticket;
  }

  cam_estado() {
    const modal = this.modalService.open(CamEstadoComponent);
    modal.componentInstance.idusuario_asignado = this.ticket.idusuario_asignado;
    modal.componentInstance.idticket = this.ticket.idticket;
    modal.componentInstance.idestado = this.ticket.idestado;
    modal.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry) {
        this.cargarDatos();
      }
    });
  }

  comentario() {
    const modal = this.modalService.open(ComentarioComponent);
    modal.componentInstance.idticket = this.ticket.idticket;
    modal.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry) {
        this.cargarDatos();
      }
    });
  }

}
