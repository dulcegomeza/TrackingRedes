import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
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
    telefono: ""
  };
  asignar = {
    idusuario: "",
    comentario: "",
    idticket: ""
  };

  padding: string = "5px";
  closeResult: string;
  usuarios: any;
  usuario_actual:any;
  constructor(
    private _ticketsService: TicketsService,
    private _usuariosService: UsuariosService,
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
    this._ticketsService.getTicketDetalle(this.ticket.idticket).subscribe(
      data => {
        this.ticket = data.registro;
        console.log(data.registro);
        this.asignar.idticket = data.registro.idticket;
        this.load = false;
      },
      err => {
        this.errMsj = err.error.mensaje;
        this.load = false;
      }
    );
  }

  cargarUsuarios() {
    this._usuariosService.getUsuariosActivos().subscribe(
      data => {
        this.usuarios = data.registros;
        console.log(this.usuarios);
        this.load = false;
      },
      err => {
        this.errMsj = err.error.mensaje;
        this.load = false;
      }
    );
  }

  open(content) {
    this.cargarUsuarios();
    this.asignar.comentario = "";
    this.asignar.idusuario = "";
    this.usuario_actual = this.ticket.idusuario_asignado;
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(result => {}, reason => {});
  }

  asignarUsuario(d) {
    console.log(this.asignar);
    d("changed");
  }
}
