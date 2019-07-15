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
export class SubdireccionesService {
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    private _jsonp: Jsonp
  ) {}

  getSubdireccionesPaginado(pagina: number, cantidad: number, filtros: any) {
    let url = URL_SERVICIOS + "/subdireccionesp";
    return this.http
      .post(url, { pagina, por_pagina: cantidad, filtros })
      .map((resp: any) => {
        return resp;
      });
  }


  cambiarEstado(idsubdireccion, val) {
    let url = URL_SERVICIOS + "/subdireccion_cambiar_estado";
    return this.http
      .post(url, { idsubdireccion: idsubdireccion, val: val })
      .map((resp: any) => {
        return resp;
      });
  }


  getSubdireccion(idsubdireccion: string) {
    let url = URL_SERVICIOS + `/subdireccion/${idsubdireccion}`;
    return this.http.get(url).map((resp: any) => {
      return resp;
    });
  }


  agregarSubdireccion(subdireccion: any) {
    let url = URL_SERVICIOS + "/subdireccion";
    return this.http.post(url, subdireccion).map((resp: any) => {
      return resp;
    });
  }


  actualizarSubdireccion(subdireccion: any) {
    let url = URL_SERVICIOS + "/subdireccion";
    return this.http.put(url, subdireccion).map((resp: any) => {
      return resp;
    });
  }

  getSubdireccionesPorDireccion(iddireccion: any) {
    let url = URL_SERVICIOS + `/subdirecciones_por_direccion/${iddireccion}`;
    return this.http.get(url).map((resp: any) => {
      return resp;
    });
  }


}
