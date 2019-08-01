import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { ServiciosService } from '../../../servicios/servicio.index';


@Component({
	selector: 'app-listado',
	templateUrl: './listado.component.html',
	styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
	servicios: any[];
	itemsPerPage: number;
	totalItems: any;
	page: any;
	totalCount: number;
	previousPage: any;
	pageG = 1;
	rpp = 10;
	load = true;
	filtros: any;
	errMsj = null;

	constructor(public _serviciosService: ServiciosService) {
		this.filtros = { servicio: '', activo: '' };
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

	filtrar() {
		this.pageG = 1;
		this.loadData();
	}

	ngOnInit() {
	}


	cambiarEstado(idservicio, val, servicio) {
		let title = 'Activación de servicio';
		let text = '¿Desea activar al servicio ' + servicio + ' ?';
		if (val == 0) {
			title = 'Desactivación de servicio';
			text = '¿Desea desactivar al servicio ' + servicio + ' ?';
		}

		swal.fire({
			title: title,
			text: text,
			type: "warning",
			showCancelButton: true,
			confirmButtonText: "SI",
			cancelButtonText: "NO",
			showLoaderOnConfirm: true,
			reverseButtons: true
		}).then(result => {
			if (result.value) {
				this._serviciosService.cambiarEstado(idservicio, val).subscribe(
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

	loadData() {
		this.load = true;
		this._serviciosService
			.getServiciosPaginado(this.pageG, this.rpp, this.filtros)
			.subscribe(
				data => {
					this.totalItems = data.total_paginas * 10;
					this.servicios = data.registros;
					this.totalCount = data.cuantos;
					this.load = false;
				},
				err => {
					this.servicios = null;
					this.errMsj = err.error.mensaje;
					this.totalCount = 0;
					this.load = false;
				}
			);
	}

}
