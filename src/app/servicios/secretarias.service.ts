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
export class SecretariasService {
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    private _jsonp: Jsonp
  ) {}

  getSecretariasPaginado(pagina: number, cantidad: number, filtros: any) {
    let url = URL_SERVICIOS + "/secretariasp";
    return this.http
      .post(url, { pagina, por_pagina: cantidad, filtros })
      .map((resp: any) => {
        return resp;
      });
  }

  cambiarSecretaria(idsecretaria, val) {
    let url = URL_SERVICIOS + "/secretaria_cambiar_estado";
    return this.http
      .post(url, { idsecretaria: idsecretaria, val: val })
      .map((resp: any) => {
        return resp;
      });
  }

  getSecretaria(idsecretaria: string) {
    let url = URL_SERVICIOS + `/secretaria/${idsecretaria}`;
    return this.http.get(url).map((resp: any) => {
      return resp;
    });
  }

  agregarSecretaria(secretaria: any) {
    let url = URL_SERVICIOS + "/secretaria";
    return this.http.post(url, secretaria).map((resp: any) => {
      return resp;
    });
  }

  actualizarSecretaria(secretaria: any) {
    let url = URL_SERVICIOS + "/secretaria";
    return this.http.put(url, secretaria).map((resp: any) => {
      return resp;
    });
  }

  getSecretariasActivas() {
    let url = URL_SERVICIOS + `/secretarias_activas`;
    return this.http.get(url).map((resp: any) => {
      return resp;
    });
  }
  
}
