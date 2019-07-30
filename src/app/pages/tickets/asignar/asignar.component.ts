import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UsuariosService,
  TicketsService
} from '../../../servicios/servicio.index';

@Component({
  selector: 'app-ngbd-asignar',
  templateUrl: './asignar.component.html',
  styleUrls: ['./asignar.component.scss']
})
export class AsignarComponent implements OnInit {
  @Input() idticket;
  @Input() idusuario_asignado;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
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
    private _ticketsService: TicketsService,
    private router: Router,
    private route: ActivatedRoute,
    private _usuariosService: UsuariosService
  ) {
  }

  ngOnInit() {
    this.asignar.idticket = this.idticket;
    this.cargarUsuarios();
  }

  asignarUsuario() {
    this._ticketsService.asignar(this.asignar).subscribe(
      data => {
        this.passBack();
        this.load = false;
        this.activeModal.close("Close click");
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

  passBack() {
    this.passEntry.emit(true);
  }

}
