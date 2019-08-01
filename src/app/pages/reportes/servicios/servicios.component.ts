import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../servicios/reportes.service';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

@Component({
  selector: "app-servicios",
  templateUrl: "./servicios.component.html",
  styleUrls: ["./servicios.component.css"]
})
export class ServiciosComponent implements OnInit {
  servicios: any[];
  selectedServicios: any[];
  load = true;
  verCalen = false;

  errMsj = null;

  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;
  constructor(
    public _reportesService: ReportesService,
    calendar: NgbCalendar
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 7);
    this.loadData();
  }

  loadData() {
    this.load = true;
    const filtros = {
      fromDate: this.fromDate,
      toDate: this.toDate,
    };
    this._reportesService
      .getReporteServicios(filtros)
      .subscribe(
        data => {
          this.servicios = data.registros;
          this.load = false;
        },
        err => {
          this.errMsj = err.error.mensaje;
        }
      );
  }

  descargar() {
    this.selectedServicios = [];
    this.servicios.map(s => {
      if (s.selected) {
        this.selectedServicios.push(s.idservicio);
      }
    });
    if (this.selectedServicios.length <= 0) {
      swal.fire("Error", "Seleccione al menos un servicio", "error");
      return;
    }
    const filtros = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      servicios: this.selectedServicios
    };
    this._reportesService
      .reporteServiciosWord(filtros)
      .subscribe(
        data => {
          // this.servicios = data.registros;
          this.load = false;
        },
        err => {
          this.errMsj = err.error.mensaje;
        }
      );
    console.log(this.selectedServicios);
  }

  selectAll() {
    this.servicios.map(s => {
      s.selected = true;
    });
  }

  ngOnInit() { }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.verCalen = !this.verCalen;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

}
