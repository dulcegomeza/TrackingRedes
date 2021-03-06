import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService, EstadosService } from '../../../servicios/servicio.index';
import { forkJoin } from 'rxjs/observable/forkJoin';
import swal from 'sweetalert2';
import { AuthService } from '../../../servicios/auth/auth.service';
import { ReportesService } from '../../../servicios/reportes.service';
import { TicketsService } from '../../../servicios/tickets.service';
@Component({
  selector: 'app-detallado',
  templateUrl: './detallado.component.html',
  styleUrls: ['./detallado.component.css']
})
export class DetalladoComponent implements OnInit {
  tickets: any[];
  fecha = false;
  fechas = {
    fechaInicio: "",
    fechaFin: ""
  };
  roles: any;
  estados: any;
  usuarios: any;
  itemsPerPage: number;
  totalItems: any;
  page: any;
  totalCount: number;
  previousPage: any;
  pageG = 1;
  rpp = 10;
  load = true;
  usr: any;

  filtros: any;
  errMsj = null;

  constructor(
    public _usuariosService: UsuariosService,
    public _estadosService: EstadosService,
    public _reportesService: ReportesService,
    public _ticketsService: TicketsService,
    public _authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const payload = this._authService.getPlayLoad();
    this.filtros = {
      'idticket': '',
      'idestado': '',
      'idusuario_asignado': '',
      'secretaria': '',
      'subdireccion': '',
      'solicitante': '',
      'descripcion': '',
      'asignado': '',
      'equipo': '',
      'ip': '',
      'mac': ''
    };
    this.usr = payload.data;
    console.log(this.usr);
    if (this.usr.role == 2) {
      this.filtros.idusuario_asignado = this.usr.idusuario;
    }
    this.cargar();
    this.loadPage(1);
  }

  ngOnInit() { }

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
    this.load = false;
    let fechas = this.fechas;
    if (!this.fecha) {
      fechas = null;
    }

    this._ticketsService
      .getReporteDetalladoPaginado(this.pageG, this.rpp, this.filtros, fechas)
      .subscribe(
        data => {
          this.totalItems = data.total_paginas * 10;
          this.tickets = data.registros;
          this.totalCount = data.cuantos;
          this.load = false;
        },
        err => {
          this.errMsj = err.error.mensaje;
        }
      );
  }

  fechas_evaluacion() {


    if (this.fechas.fechaInicio == "" || this.fechas.fechaFin == "") {
      return true;
    } else {
      return false;
    }

  }

  cargar() {
    this.load = true;
    forkJoin(
      this._usuariosService.getRoles(),
      this._estadosService.getEstadosActivos(),
      this._usuariosService.getUsuariosActivos()
    ).subscribe(
      ([roles, estados, usuarios]) => {
        if (!roles.err && !estados.err && !usuarios.err) {
          this.roles = roles.registros;
          this.estados = estados.registros;
          this.usuarios = usuarios.registros;
        }
        this.load = false;
      },
      err => {
        swal.fire({
          type: 'error',
          title: 'Contacte al administrador',
          text: 'No se pudo cargar la informacion.'
        });
        this.load = false;
      }
    );

  }

  cargarUsuarios() {
    console.log('entra get filtro usuarios');
    console.log(this.filtros.idrol_asignado);
    this.usuarios = null;
    this._usuariosService
      .getUsuariosFiltros(this.filtros.idrol_asignado)
      .subscribe(
        data => {
          this.usuarios = data.registros;
          console.log(this.usuarios);
          this.filtrar();
        },
        err => {
          this.usuarios = null;
        }
      );


  }

  excel() {
    let fechas = this.fechas;
    if (!this.fecha) {
      fechas = null;
    }
    let data = {
      fechas: fechas,
      filtros: this.filtros
    };
    this._ticketsService
      .getReporteDetalladoExcel(data)
      .subscribe();
  }
}
