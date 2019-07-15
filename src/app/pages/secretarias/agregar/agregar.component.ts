import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { SecretariasService } from "../../../servicios/servicio.index";

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  @ViewChild('f') userFrm: NgForm;
  nuevo = true;
  errMsj = null;
  load = true;
  loadReq = true;
  forma = {
    idsecretaria: '0',
    secretaria: "",
    activo: '0',
    clave: ''
  }

  constructor(private _secretariasService: SecretariasService,
    private router: Router,
    private route: ActivatedRoute) { 
    this.route.params.subscribe(parametros => {
      let idsecretaria = parametros['idsecretaria'];

      if (idsecretaria > 0) {
        this.forma.idsecretaria = idsecretaria;
        this.nuevo = false;
        this.cargarDatos();

      } else {
        this.load = false;
      }
    });
    }

  ngOnInit() {
  }


  agregar(forma: NgForm) {
    this.load = true;
    if (this.nuevo) {
      this._secretariasService
        .agregarSecretaria(this.forma)
        .subscribe(
          data => {
            this.router.navigate(['/secretarias']);
            this.load = false;
          },
          err => {
            this.errMsj = err.error.mensaje;

            this.load = false;
          }
        );
    } else {
      this._secretariasService
        .actualizarSecretaria(this.forma)
        .subscribe(
          data => {
            this.router.navigate(['/secretarias']);
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
    this._secretariasService
      .getSecretaria(this.forma.idsecretaria)
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


}
