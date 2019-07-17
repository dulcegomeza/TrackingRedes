import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ServiciosService } from "../../../servicios/servicio.index";
import { Servicio } from '../../../modelos/modelos.index';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent  {
  nuevo = true;
  errMsj = null;
  load = true;
  loadReq = true;
  forma = new Servicio('','');
  nombre = "";
  constructor( private _serviciosService: ServiciosService,
    private router: Router,
    private route: ActivatedRoute) { 
      this.route.params.subscribe(parametros => {
        let idservicio = parametros["idservicio"];
        if (idservicio > 0) {
          this.forma.idservicio = idservicio;
          this.nuevo = false;
          this.cargarDatos();
        } else {
          this.load = false;
        }
      });
    }

    cargarDatos() {
      this._serviciosService.getServicio(this.forma.idservicio).subscribe(
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
/*
    agregar(f: NgForm) {
      this.load = true;
      if(this.nuevo){
        this._serviciosService
        .agregarServicio(this.forma)
        .subscribe(
          data => {
            this.router.navigate(["/servicios"]);
            this.load = false;
          },
          err => {
            this.errMsj = err.error.mensaje;
            this.load = false;
          }
        );
      }else{
        this._serviciosService
        .actualizarServicio(this.forma)
        .subscribe(
          data => {
            this.router.navigate(["/servicios"]);
            this.load = false;
          },
          err => {
            this.errMsj = err.error.mensaje;
            this.load = false;
          }
        );
      }
    }
*/
}
