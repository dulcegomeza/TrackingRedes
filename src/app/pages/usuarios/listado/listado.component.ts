import { Component } from '@angular/core';
import swal from 'sweetalert2';
import { UsuariosService, AuthService } from '../../../servicios/servicio.index';

@Component({
	selector: 'app-listado',
	templateUrl: './listado.component.html'
})
export class ListadoComponent {

	usuarios: any[];
	itemsPerPage: number;
	totalItems: any;
	page: any;
	totalCount: number;
	previousPage: any;
	pageG = 1;
	rpp = 10;
	load = true;
	filtros: any;
	usuario: any;


	errMsj = null;

	constructor(public _usuariosService: UsuariosService, public _authService: AuthService) {
		this.filtros = { nombre: '', correo: '', rol: '', activo: '' };
		this.usuario = this._authService.getPlayLoad().data;
		this.loadPage(1);
	}

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

	loadData() {
		this.load = true;
		this._usuariosService
			.getUsuariosPaginado(this.pageG, this.rpp, this.filtros)
			.subscribe(
				data => {
					this.totalItems = data.total_paginas * 10;
					this.usuarios = data.registros;
					this.totalCount = data.cuantos;
					this.load = false;
				},
				err => {
					this.usuarios = null;
					this.errMsj = err.error.mensaje;
					this.totalCount = 0;
					this.load = false;
					console.log(err);
				}
			);
	}

	filtrar() {
		this.pageG = 1;
		this.loadData();
	}

	cambiarEstado(idusuario, val, nombre) {

		let $title = 'Activación de usuario';
		let $text = '¿Desea activar al usuario ' + nombre + ' ?';

		if (val == 0) {

			$title = 'Desactivación de Usuario';
			$text = '¿Desea desactivar al usuario ' + nombre + ' ?';

		}

		swal.fire({
			title: $title,
			text: $text,
			type: "warning",
			showCancelButton: true,
			confirmButtonText: "SI",
			cancelButtonText: "NO",
			showLoaderOnConfirm: true,
			reverseButtons: true
		}).then(result => {
			if (result.value) {

				this._usuariosService.cambiarEstado(idusuario, val).subscribe(
					data => {
						this.load = false;
						this.loadData();
					},
					err => {
						this.errMsj = err.error.mensaje;
						this.load = false;
					}
				);

			}
		});

	}

}
