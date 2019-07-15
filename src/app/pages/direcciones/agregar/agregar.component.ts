import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { DireccionesService, SecretariasService } from "../../../servicios/servicio.index";

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
  secretarias: any[];
  forma = {
    iddireccion: "0",
    direccion: "",
    activo: "0",
    idsecretaria: "0"
  };

  constructor(
    private _direccionesService: DireccionesService,
    private _secretariasService: SecretariasService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(parametros => {
      let iddireccion = parametros["iddireccion"];
      this.cargarSecretarias();
      if (iddireccion > 0) {
        this.forma.iddireccion = iddireccion;
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
      this._direccionesService.agregarDireccion(this.forma).subscribe(
        data => {
          this.router.navigate(["/direcciones"]);
          this.load = false;
        },
        err => {
          this.errMsj = err.error.mensaje;

          this.load = false;
        }
      );
    } else {
      this._direccionesService.actualizarDireccion(this.forma).subscribe(
        data => {
          this.router.navigate(["/direcciones"]);
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
    this._direccionesService.getDireccion(this.forma.iddireccion).subscribe(
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

  cargarSecretarias() {
    this._secretariasService.getSecretariasActivas().subscribe(
      data => {
        this.secretarias = data.registros;
        this.load = false;
      },
      err => {
        this.errMsj = err.error.mensaje;
        this.load = false;
      }
    );
  }
}
