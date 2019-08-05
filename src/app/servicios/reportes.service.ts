import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from "../config/config";
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ReportesService {
  constructor(public http: HttpClient) {

  }

  getReporteServicios(filtros: any) {
    let url = URL_SERVICIOS + "/reporte_servicios";
    return this.http
      .post(url, filtros)
      .map((resp: any) => {
        return resp;
      });
  }

  reporteServiciosWord(filtros: any) {
    let url = URL_SERVICIOS + "/reporte_servicios_word";
    return this.http
      .post(url, filtros, { responseType: "blob" })
      .map((resp: any) => {
        let downloadUrl = window.URL.createObjectURL(resp);
        window.open(downloadUrl);
      });
  }

  getReporteDetalladoPaginado(pagina: number, cantidad: number, filtros: any) {
    let url = URL_SERVICIOS + '/reporte_detalladop';
    return this.http
      .post(url, { pagina, por_pagina: cantidad, filtros })
      .map((resp: any) => {
        return resp;
      });
  }
}
