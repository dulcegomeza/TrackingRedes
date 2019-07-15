import { Component, OnInit } from '@angular/core';
import { SecretariasService } from "../../../servicios/servicio.index";
import swal from "sweetalert2";

@Component({
  selector: "app-listado",
  templateUrl: "./listado.component.html",
  styleUrls: ["./listado.component.css"]
})
export class ListadoComponent implements OnInit {
  secretarias: any[];
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
  constructor(public _secretariasService: SecretariasService) {

    this.filtros = { 'clave':'', 'secretaria': '' };
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
    this._secretariasService
      .getSecretariasPaginado(this.pageG, this.rpp, this.filtros)
      .subscribe(
        data => {
          this.totalItems = data.total_paginas * 10;
          this.secretarias = data.registros;
          this.totalCount = data.cuantos;
          this.load = false;
        },
        err => {
          this.errMsj = err.error.mensaje;
        }
      );
  }


  cambiarEstado(idsecretaria, val, nombre) {

    let $title = 'Activación de la Secretaría';
    let $text = '¿Desea activar la secretaria ' + nombre + ' ?';

    if (val == 0) {

      $title = 'Desactivación de la Secretaría';
      $text = '¿Desea desactivar la secretaria ' + nombre + ' ?';

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

        this._secretariasService.cambiarSecretaria(idsecretaria, val).subscribe(
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
