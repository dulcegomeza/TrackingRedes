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
export class DireccionesService {
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    private _jsonp: Jsonp
  ) {}

  getDireccionesPaginado(pagina: number, cantidad: number, filtros: any) {
    let url = URL_SERVICIOS + "/direccionesp";
    return this.http
      .post(url, { pagina, por_pagina: cantidad, filtros })
      .map((resp: any) => {
        return resp;
      });
  }

  getDireccionesActivas() {
    let url = URL_SERVICIOS + `/direcciones_activas`;
    return this.http.get(url).map((resp: any) => {
      return resp;
    });
  }

  cambiarEstado(iddireccion, val) {
    let url = URL_SERVICIOS + "/direccion_cambiar_estado";
    return this.http
      .post(url, { iddireccion: iddireccion, val: val })
      .map((resp: any) => {
        return resp;
      });
  }

  getDireccion(iddireccion: string) {
    let url = URL_SERVICIOS + `/direccion/${iddireccion}`;
    return this.http.get(url).map((resp: any) => {
      return resp;
    });
  }

  agregarDireccion(direccion: any) {
    let url = URL_SERVICIOS + "/direccion";
    return this.http.post(url, direccion).map((resp: any) => {
      return resp;
    });
  }

  actualizarDireccion(direccion: any) {
    let url = URL_SERVICIOS + "/direccion";
    return this.http.put(url, direccion).map((resp: any) => {
      return resp;
    });
  }

  getDireccionesPorSecretaria(idsecretaria: any) {
    let url = URL_SERVICIOS + `/direcciones_por_secretaria/${idsecretaria}`;
    return this.http.get(url).map((resp: any) => {
      return resp;
    });
  }

}
