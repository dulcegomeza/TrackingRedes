import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { EstadosService } from "../../../servicios/servicio.index";

@Component({
  selector: "app-agregar",
  templateUrl: "./agregar.component.html",
  styleUrls: ["./agregar.component.css"]
})
export class AgregarComponent implements OnInit {

  @ViewChild('f') userFrm: NgForm;
  nuevo = true;
  errMsj = null;
  load = true;
  loadReq = true;
  forma = {
    idestado: '0',
    estado: "",
    activo: '0',
    color: ''
  }

  constructor(
    private _estadosService: EstadosService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.route.params.subscribe(parametros => {
      let idestado = parametros['idestado'];

      if (idestado > 0) {
        this.forma.idestado = idestado;
        this.nuevo = false;
        this.cargarDatos();

      } else {
        this.load = false;
      }
    });
  }


  agregar(forma: NgForm) {
    this.load = true;
    if (this.nuevo) {
      this._estadosService
        .agregarEstado(this.forma)
        .subscribe(
          data => {
            this.router.navigate(['/estados']);
            this.load = false;
          },
          err => {
            this.errMsj = err.error.mensaje;

            this.load = false;
          }
        );
    } else {
      this._estadosService
        .actualizarEstado(this.forma)
        .subscribe(
          data => {
            this.router.navigate(['/estados']);
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
    this._estadosService
      .getEstado(this.forma.idestado)
      .subscribe(
        data => {
          this.forma = data.registro;
          this.load = false;
        },
        err => {
          this.errMsj = err.error.mensaje;
          this.load = false;
        },
      );
  }

  ngOnInit() {}
}
