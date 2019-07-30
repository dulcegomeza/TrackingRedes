import { Component, OnInit } from '@angular/core';
import { EstadosService } from '../../../servicios/servicio.index';
import swal from "sweetalert2";

@Component({
  selector: "app-servicios",
  templateUrl: "./servicios.component.html",
  styleUrls: ["./servicios.component.css"]
})
export class ServiciosComponent implements OnInit {
  estados: any[];
  itemsPerPage: number;
  totalItems: any;
  page: any;
  totalCount: number;
  previousPage: any;
  pageG = 1;
  rpp = 10;
  load = true;

  filtros: any;
  errMsj = null;
  constructor(public _estadosService: EstadosService) {
    this.filtros = { 'estado': '' };
    this.loadPage(1);
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.loadData();
    } else {
    }
  }

  loadRpp(value: number) {
    this.pageG = 1;
    this.rpp = value;
    this.loadData();
  }

  filtrar() {
    this.pageG = 1;
    this.loadData();
  }

  loadData() {
    this.load = true;
    this._estadosService
      .getEstadosPaginado(this.pageG, this.rpp, this.filtros)
      .subscribe(
        data => {
          this.totalItems = data.total_paginas * 10;
          this.estados = data.registros;
          this.totalCount = data.cuantos;
          this.load = false;
        },
        err => {
          this.errMsj = err.error.mensaje;
        }
      );
  }

  cambiarEstado(idestado, val, nombre) {

    let $title = 'Activación del Estado';
    let $text = '¿Desea activar el estado ' + nombre + ' ?';

    if (val == 0) {

      $title = 'Desactivación del Estado';
      $text = '¿Desea desactivar el estado ' + nombre + ' ?';

    }

    swal({
      title: $title,
      text: $text,
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "SI",
      cancelButtonText: "NO",
      showLoaderOnConfirm: true,
      reverseButtons: true
    }).then(result => {
      if (result.value) {

        this._estadosService.cambiarEstado(idestado, val).subscribe(
          data => {
            this.load = false;
            this.loadData();
          },
          err => {
            this.errMsj = err.error.mensaje;
            this.load = false;
          }
        );

      }
    });

  }


  ngOnInit() {}
}
