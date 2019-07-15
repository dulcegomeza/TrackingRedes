import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import {
  UsuariosService,
  SecretariasService,
  DireccionesService,
  SubdireccionesService,
  AuthService
} from "../../../servicios/servicio.index";

@Component({
  selector: "app-agregar",
  templateUrl: "./agregar.component.html"
})
export class AgregarComponent {
  @ViewChild("f") userFrm: NgForm;
  nuevo = true;
  errMsj = null;
  load = true;
  loadReq = true;
  iddireccion = true;
  idsubdireccion = true;
  usuario: any;
  forma = {
    idusuario: "0",
    nombre: "",
    activo: "0",
    password: "",
    idrol: "1",
    correo: "",
    idsecretaria: null,
    iddireccion: null,
    idsubdireccion: null,
    nuevo: null
  };
  roles: any[];
  areas: any[];
  secretarias: any[];
  direcciones: any[];
  subdirecciones: any[];

  correo_repetido: boolean;

  constructor(
    private _usuariosService: UsuariosService,
    private _secretariasService: SecretariasService,
    private _direccionesService: DireccionesService,
    private _subdireccionesService: SubdireccionesService,
    private _authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(parametros => {
      let idusuario = parametros["idusuario"];
      this.usuario = this._authService.getPlayLoad().data;
      this.cargarRoles();
      this.cargarSecretarias();

      if (idusuario > 0) {
        this.forma.idusuario = idusuario;
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
      this._usuariosService.agregarUsuario(this.forma).subscribe(
        data => {
          this.router.navigate(["/usuarios"]);
          this.load = false;
        },
        err => {
          this.errMsj = err.error.mensaje;

          this.load = false;
        }
      );
    } else {
      this._usuariosService.actualizarUsuario(this.forma).subscribe(
        data => {
          this.router.navigate(["/usuarios"]);
          this.load = false;
        },
        err => {
          this.errMsj = err.error.mensaje;
          this.load = false;
        }
      );
    }
  }

  cargarRoles() {
    this._usuariosService.getRoles().subscribe(
      data => {
        this.roles = data.registros;

        this.load = false;
      },
      err => {
        this.errMsj = err.error.mensaje;
        this.load = false;
      }
    );
  }

  cargarDatos() {
    this._usuariosService.getUsuario(this.forma.idusuario).subscribe(
      data => {
        this.forma = data.registro;
        this.load = false;
        this.cargarDirecciones();
        this.cargarSubdirecciones();
        console.log(this.forma);
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

  cambioSecretaria() {
    this.direcciones = [];
    this.cargarDirecciones();
    this.forma.idsubdireccion = null;
    this.forma.iddireccion = null;
  }

  cambioDireccion() {
    this.subdirecciones = [];
    this.cargarSubdirecciones();
    this.forma.idsubdireccion = null;
  }

  cargarDirecciones() {
    this._direccionesService
      .getDireccionesPorSecretaria(this.forma.idsecretaria)
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

  cargarSubdirecciones() {
    this.subdirecciones = [];
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

  subdireccion() {
    console.log(this.forma);
  }

  buscarUsuarioRepetido() {

    if (this.forma.correo.length > 0) {
      this.forma.nuevo = this.nuevo;
      this._usuariosService.validarCorreo(this.forma).subscribe(
        data => {

          if (data.registrado) {
            this.correo_repetido = true;
            this.userFrm.form.controls["correo"].setErrors({ incorrect: true });
          } else {
            this.correo_repetido = false;
          }
        },
        err => {}
      );
    }
  }
}
