import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketsService } from '../../../servicios/tickets.service';

@Component({
  selector: 'app-ngbd-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.scss']
})
export class ComentarioComponent implements OnInit {
  @Input() idticket;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  errMsj = null;
  load = false;

  forma = {
    idticket: "",
    comentario: "",
    privado: 0
  };

  usuarios: any [] =  [];
  idusuario = 0;

  constructor(
    public activeModal: NgbActiveModal,
    private _ticketsService: TicketsService
  ) {
  }

  ngOnInit() {
    this.forma.idticket = this.idticket;
  }

  agregar() {
    console.log(this.forma);
    this._ticketsService.agregarComentario(this.forma).subscribe(
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

  passBack() {
    this.passEntry.emit(true);
  }
}
