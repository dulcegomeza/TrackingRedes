import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import {
  DireccionesService,
  SubdireccionesService,
  UsuariosService,
  TicketsService,
  ServiciosService
} from "../../../servicios/servicio.index";

@Component({
  selector: "app-agregar",
  templateUrl: "./agregar.component.html"
})
export class AgregarComponent implements OnInit {
  @ViewChild("f") userFrm: NgForm;
  nuevo = true;
  errMsj = null;
  load = true;
  loadReq = true;
  direcciones: any[];
  subdirecciones: any[];
  usuarios: any[];
  servicios: any[];
  forma = {
    idticket: '0',
    nombre: "",
    correo: "",
    telefono: "",
    extension: "",
    iddireccion: 0,
    idsubdireccion: 0,
    area: 2,
    descripcion: "",
    medio: "",
    oficio: "N/A",
    equipo: "",
    idusuario: 0,
    idservicio: "",
    ip: "",
    mac: ""
  };

  constructor(
    private _direccionesService: DireccionesService,
    private _subdireccionesService: SubdireccionesService,
    private _usuariosService: UsuariosService,
    private _ticketsService: TicketsService,
    private router: Router,
    private route: ActivatedRoute,
    private _serviciosService: ServiciosService,
  ) {
    this.route.params.subscribe(parametros => {
      let idticket = parametros["idticket"];
      this.cargarDirecciones();
      this.cargarUsuarios();
      this.cargarServicios();
      if (idticket > 0) {
        this.forma.idticket = idticket;
        this.nuevo = false;
        this.cargarDatos();
      } else {
        this.load = false;
      }
    });
  }

  ngOnInit() {}

  agregar(forma: NgForm) {
    this.load = true;
    if (this.nuevo) {
      this._ticketsService.agregarTicket(this.forma).subscribe(
        data => {
          this.router.navigate(["/tickets"]);
          this.load = false;
        },
        err => {
          this.errMsj = err.error.mensaje;

          this.load = false;
        }
      );
    } else {
      this._ticketsService.actualizarTicket(this.forma).subscribe(
        data => {
          this.router.navigate(["/tickets"]);
          this.load = false;
        },
        err => {
          this.errMsj = err.error.mensaje;
          this.load = false;
        }
      );
    }
  }

  cargarDatos() {
    this._ticketsService.getTicket(this.forma.idticket).subscribe(
      data => {
        this.forma = data.registro;
        this.load = false;
      },
      err => {
        this.errMsj = err.error.mensaje;
        this.load = false;
      }
    );
  }

  oficio(){
    if (this.forma.medio=="Oficio"){
      this.forma.oficio="";
    }else{
      this.forma.oficio="N/A";
    }
  }

  cambioDireccion(){
    this.subdirecciones = [];
    this.forma.idsubdireccion = 0;
    this.forma.area = 2;
    this.cargarSubDirecciones();
  }

  cambioSubdireccion() {
    this.subdirecciones.forEach(d => {
      if (d.idsubdireccion == this.forma.idsubdireccion ){

        this.forma.area = d.area;

      }
    });
  }

  cargarDirecciones() {
    this._direccionesService
      .getDireccionesActivas()
      .subscribe(
        data => {
          this.direcciones = data.registros;
          this.load = false;
        },
        err => {
          this.errMsj = err.error.mensaje;
          this.load = false;
        }
      );
  }

  cargarUsuarios() {
    this._usuariosService
      .getUsuariosActivos()
      .subscribe(
        data => {
          this.usuarios = data.registros;
          this.load = false;
        },
        err => {
          this.errMsj = err.error.mensaje;
          this.load = false;
        }
      );
  }

  cargarSubDirecciones() {
    this._subdireccionesService
      .getSubdireccionesPorDireccion(this.forma.iddireccion)
      .subscribe(
        data => {
          this.subdirecciones = data.registros;
          this.load = false;
        },
        err => {
          this.errMsj = err.error.mensaje;
          this.load = false;
        }
      );
  }


  cargarServicios() {
    this._serviciosService
      .getServicios()
      .subscribe(
        data => {
          this.servicios = data.registros;
          this.load = false;
        },
        err => {
          this.errMsj = err.error.mensaje;
          this.load = false;
        }
      );
  }
}
