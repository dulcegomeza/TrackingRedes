import { Injectable } from "@angular/core";
// import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { URL_SERVICIOS, APIKEY, URL_SERVICIOS_APP } from "../config/config";
import { Jsonp, URLSearchParams, RequestOptions } from "@angular/http";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/toPromise";

import { Router } from "@angular/router";

@Injectable()
export class EstadosService {
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    private _jsonp: Jsonp
  ) {}

  getEstadosPaginado(pagina: number, cantidad: number, filtros: any) {
    let url = URL_SERVICIOS + "/estadosp";
    return this.http
      .post(url, { pagina, por_pagina: cantidad, filtros })
      .map((resp: any) => {
        return resp;
      });
  }

  cambiarEstado(idestado, val) {
    let url = URL_SERVICIOS + "/estados_cambiar_estado";
    return this.http
      .post(url, { idestado: idestado, val: val })
      .map((resp: any) => {
        return resp;
      });
  }

  getEstado(idestado: string) {
    let url = URL_SERVICIOS + `/estado/${idestado}`;
    return this.http.get(url).map((resp: any) => {
      return resp;
    });
  }

  agregarEstado(estado: any) {
    let url = URL_SERVICIOS + "/estado";
    return this.http.post(url, estado).map((resp: any) => {
      return resp;
    });
  }

  actualizarEstado(estado: any) {
    let url = URL_SERVICIOS + "/estado";
    return this.http.put(url, estado).map((resp: any) => {
      return resp;
    });
  }

  getEstadosActivos() {
    let url = URL_SERVICIOS + `/estados_activos`;
    return this.http.get(url).map((resp: any) => {
      return resp;
    });
  }


}
