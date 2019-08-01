import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { DireccionesService } from "../../../servicios/servicio.index";

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  direcciones: any[];
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
  constructor(public _direccionesService: DireccionesService) {

    this.filtros = { 'secretaria': '', 'direccion': '' };
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
    this._direccionesService
      .getDireccionesPaginado(this.pageG, this.rpp, this.filtros)
      .subscribe(
        data => {
          this.totalItems = data.total_paginas * 10;
          this.direcciones = data.registros;
          this.totalCount = data.cuantos;
          this.load = false;
        },
        err => {
          this.errMsj = err.error.mensaje;
        }
      );
  }


  cambiarEstado(iddireccion, val, nombre) {

    let $title = 'Activación de Dirección';
    let $text = '¿Desea activar la dirección ' + nombre + '?';

    if (val == 0) {

      $title = 'Desactivación de Dirección';
      $text = '¿Desea desactivar la dirección ' + nombre + '?';

    }

    swal.fire({
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

        this._direccionesService
          .cambiarEstado(iddireccion, val)
          .subscribe(
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

  ngOnInit() { }

}
