import { Injectable } from '@angular/core';
import { URL_SERVICIOS, APIKEY, URL_SERVICIOS_APP } from "../config/config";
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable()
export class ServiciosService {


  constructor(public http: HttpClient) {

  }

  getServiciosPaginado(pagina: number, cantidad: number, filtros: any) {
    let url = URL_SERVICIOS + "/serviciosp";
    return this.http
      .post(url, { pagina, por_pagina: cantidad, filtros })
      .map((resp: any) => {
        return resp;
      });
  }

  getServicio(idservicio: string) {
    let url = URL_SERVICIOS + `/servicio/${idservicio}`;
    return this.http.get(url).map((resp: any) => {
      return resp;
    });
  }
  
  agregarServicio(data:any){
    let url = URL_SERVICIOS + `/servicio_agregar`;
    return this.http.post(url,data).map((resp: any) => {
      return resp;
    });

  }

  actualizarServicio(data: any) {
    let url = URL_SERVICIOS + "/servicio_actualizar";
    return this.http.post(url, data).map((resp: any) => {
      return resp;
    });
  } 
  

  cambiarEstado(idservicio, val) {
    let url = URL_SERVICIOS + "/servicio_cambiar_estado";
    return this.http
      .post(url, {idservicio: idservicio, val: val })
      .map((resp: any) => {
        return resp;
      });
  } 


}
