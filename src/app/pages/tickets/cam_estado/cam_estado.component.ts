import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EstadosService } from '../../../servicios/estados.service';
import { TicketsService } from '../../../servicios/tickets.service';

@Component({
  selector: 'app-ngbd-asignar',
  templateUrl: './cam_estado.component.html',
  styleUrls: ['./cam_estado.component.scss']
})
export class CamEstadoComponent implements OnInit {
  @Input() idticket;
  @Input() idestado;
  @Input() idusuario_asignado;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  errMsj = null;
  load = false;

  forma = {
    idticket: "",
    idusuario_asignado: "",
    idestado: undefined,
    comentario: "",
  };

  estados: any [] =  [];

  constructor(
    public activeModal: NgbActiveModal,
    private _estadosService: EstadosService,
    private _ticketsService: TicketsService
  ) {}

  ngOnInit() {
    this.forma.idticket = this.idticket;
    this.forma.idusuario_asignado = this.idusuario_asignado;
    this.cargarEstados();
  }

  agregar() {
    console.log(this.forma);
    this._ticketsService.cambiarEstado(this.forma).subscribe(
      data => {
        this.load = false;
        this.passBack();
        this.activeModal.close("Close click");
      },
      err => {
        this.errMsj = err.error.mensaje;

        this.load = false;
      }
    );
  }

  cargarEstados() {
    this.load = true;
    this._estadosService.getEstadosFiltro(this.idestado).subscribe(
      data => {
        this.estados = data.registros;
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
