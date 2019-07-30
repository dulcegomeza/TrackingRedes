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
}
