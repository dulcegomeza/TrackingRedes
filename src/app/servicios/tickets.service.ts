import { Injectable } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URL_SERVICIOS, APIKEY, URL_SERVICIOS_APP } from '../config/config';
import { Jsonp, URLSearchParams, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Router } from '@angular/router';

@Injectable()
export class TicketsService {
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    private _jsonp: Jsonp
  ) { }

  getTicketsPaginado(pagina: number, cantidad: number, filtros: any) {
    let url = URL_SERVICIOS + '/ticketsp';
    return this.http
      .post(url, { pagina, por_pagina: cantidad, filtros })
      .map((resp: any) => {
        return resp;
      });
  }

  getTicket(idticket: string) {
    let url = URL_SERVICIOS + `/ticket/${idticket}`;
    return this.http.get(url).map((resp: any) => {
      return resp;
    });
  }

  getTicketDetalle(idticket: string) {
    let url = URL_SERVICIOS + `/ticket_detalle/${idticket}`;
    return this.http.get(url).map((resp: any) => {
      return resp;
    });
  }

  agregarTicket(ticket: any) {
    let url = URL_SERVICIOS + '/ticket';
    return this.http.post(url, ticket).map((resp: any) => {
      return resp;
    });
  }

  actualizarTicket(ticket: any) {
    let url = URL_SERVICIOS + '/ticket';
    return this.http.put(url, ticket).map((resp: any) => {
      return resp;
    });
  }

  agregarComentario(comentario: any) {
    let url = URL_SERVICIOS + '/comentario';
    return this.http.post(url, comentario).map((resp: any) => {
      return resp;
    });
  }

  cambiarEstado(estado: any) {
    let url = URL_SERVICIOS + '/ticket_estado';
    return this.http.post(url, estado).map((resp: any) => {
      return resp;
    });
  }

  asignar(ticket: any) {
    let url = URL_SERVICIOS + '/asignar_usuario';
    return this.http.post(url, ticket).map((resp: any) => {
    return resp;
    });
  }

}
