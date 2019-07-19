import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  SecretariasService,
  DireccionesService,
  SubdireccionesService,
} from '../../../servicios/servicio.index';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html'
})
export class AgregarComponent {
  @ViewChild('f') userFrm: NgForm;
  nuevo = true;
  errMsj = null;
  load = true;
  loadReq = true;
  forma = {
    idsubdireccion: '0',
    subdireccion: '',
    activo: '0',
    area: '1',
    idsecretaria: null,
    iddireccion: null
  };
  secretarias: any[];
  direcciones: any[];

  constructor(
    private _secretariasService: SecretariasService,
    private _direccionesService: DireccionesService,
    private _subdireccionesService: SubdireccionesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(parametros => {
      let idsubdireccion = parametros['idsubdireccion'];
      this.cargarSecretarias();

      if (idsubdireccion > 0) {
        this.forma.idsubdireccion = idsubdireccion;
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
      this._subdireccionesService.agregarSubdireccion(this.forma).subscribe(
        data => {
          this.router.navigate(['/subdirecciones']);
          this.load = false;
        },
        err => {
          this.errMsj = err.error.mensaje;

          this.load = false;
        }
      );
    } else {
      this._subdireccionesService.actualizarSubdireccion(this.forma).subscribe(
        data => {
          this.router.navigate(['/subdirecciones']);
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
    this._subdireccionesService.getSubdireccion(this.forma.idsubdireccion).subscribe(
      data => {
        this.forma = data.registro;
        this.load = false;
        this.cargarSecretarias();
        this.cargarDirecciones();
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
    this.forma.iddireccion = null;
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

}

