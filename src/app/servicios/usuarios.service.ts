import { Injectable } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS, APIKEY } from '../config/config';
import { Usuario } from '../modelos/usuario.model';

import { TOKEN } from '../config/config';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Roles } from '../modelos/roles.model';
declare var swal: any;


@Injectable()
export class UsuariosService {
  token: string;

  rutas = [];
  jwtHelperService: JwtHelperService = new JwtHelperService();

  constructor(public http: HttpClient, public router: Router) {
    this.cargarStorage();
  }

  login(usuario: Usuario) {
    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + "/login";
    return this.http.post(url, usuario).map((resp: any) => {
      this.guardarStorage(resp.token);
      this.cargarStorage();
    });
  }

  cargarStorage() {
    if (localStorage.getItem(TOKEN)) {
      this.token = localStorage.getItem(TOKEN);
      let tkn = this.jwtHelperService.decodeToken(this.token);
      this.rutas = tkn.menu;
    } else {
      this.token = "";
    }
  }

  guardarStorage(token: string) {
    localStorage.setItem(TOKEN, token);
    this.token = token;
  }

  salir() {
    localStorage.removeItem(TOKEN);
    this.rutas = [];
    this.token = "";
    this.router.navigate(["/login"]);
  }

  getUsuariosPaginado(pagina: number, cantidad: number, filtros: any) {
    let url = URL_SERVICIOS + "/usuariosp";
    return this.http
      .post(url, { pagina, por_pagina: cantidad, filtros })
      .map((resp: any) => {
        return resp;
      });
  }
  
  getUsuariosActivos() {
    let url = URL_SERVICIOS + `/usuarios_activos`;
    return this.http.get(url).map((resp: any) => {
      return resp;
    });
  }

  getUsuariosFiltros(idrol:string) {
    let url = URL_SERVICIOS + `/usuarios_filtros/${idrol}`;
    return this.http.get(url).map((resp: any) => {
      return resp;
    });
  }

  getAreas() {
    let url = URL_SERVICIOS + `/areas`;
    return this.http.get(url).map((resp: any) => {
      return resp;
    });
  }
  

  agregarUsuario(usuario: any) {
    let url = URL_SERVICIOS + "/usuario";
    return this.http.post(url, usuario).map((resp: any) => {
      return resp;
    });
  }

  validarCorreo(forma: any) {
    let url = URL_SERVICIOS + "/validar_correo";
    return this.http.post(url, forma,).map((resp: any) => {
      return resp;
    });
  }

  getUsuario(idusuario: string) {
    let url = URL_SERVICIOS + `/usuario/${idusuario}`;
    return this.http.get(url).map((resp: any) => {
      return resp;
    });
  }

  actualizarUsuario(usuario: any) {
    let url = URL_SERVICIOS + "/usuario";
    return this.http.put(url, usuario).map((resp: any) => {
      return resp;
    });
  }

  getRoles() {
    let url = URL_SERVICIOS + `/roles`;
    return this.http.get(url).map((resp: any) => {
      return resp;
    });
  }

  getRolespaginado(pagina: number, cantidad: number, filtros: any) {
    let url = URL_SERVICIOS + "/rolesp";
    return this.http
      .post(url, { pagina, por_pagina: cantidad, filtros })
      .map((resp: any) => {
        return resp;
      });
  }

  getRol(idrol: any) {
    let url = URL_SERVICIOS + `/rol/${idrol}`;
    return this.http.get(url).map((resp: any) => {
      return resp;
    });
  }

  agregarRol(rol: Roles) {
    let url = URL_SERVICIOS + `/rol`;
    return this.http.post(url, rol).map((resp: any) => {
      return resp;
    });
  }

  actualizarRol(rol: Roles) {
    let url = URL_SERVICIOS + `/rol`;
    return this.http.put(url, rol).map((resp: any) => {
      return resp;
    });
  }

  cambiarEstado(idusuario, val) {
    let url = URL_SERVICIOS + "/usuario_cambiar_estado";
    return this.http
      .post(url, {idusuario: idusuario, val: val })
      .map((resp: any) => {
        return resp;
      });
  }
}
