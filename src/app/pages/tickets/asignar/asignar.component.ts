import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from '../../../servicios/usuarios.service';

@Component({
  selector: 'app-ngbd-asignar',
  templateUrl: './asignar.component.html',
  styleUrls: ['./asignar.component.scss']
})
export class AsignarComponent implements OnInit {
  @Input() idticket;
  errMsj = null;
  load = false;

  asignar = {
    idusuario: "",
    comentario: "",
    idticket: ""
  };

  usuarios: any [] =  [];
  idusuario = 0;

  constructor(
    public activeModal: NgbActiveModal,
    private _usuariosService: UsuariosService
  ) {
    this.asignar.idticket = this.idticket;
  }

  ngOnInit() {
    this.cargarUsuarios();
  }


  asignarUsuario(d) {
    console.log(this.asignar);
    d("changed");
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
}
