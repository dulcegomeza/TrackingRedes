import { Component } from '@angular/core';
import swal from 'sweetalert2';
import { SubdireccionesService } from '../../../servicios/servicio.index';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html'
})
export class ListadoComponent  {

	subdirecciones: any[];
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

	constructor(public _subdireccionesService: SubdireccionesService) {
		this.filtros = { subdireccion: '', direccion: '', secretaria: '', activo: '' };
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
		this._subdireccionesService
			.getSubdireccionesPaginado(this.pageG, this.rpp, this.filtros)
			.subscribe(
				data => {
					this.totalItems = data.total_paginas * 10;
					this.subdirecciones = data.registros;
					this.totalCount = data.cuantos;
					this.load = false;
				},
				err => {
					this.subdirecciones = null;
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

	cambiarEstado(idsubdireccion, val, nombre) {

		let $title = 'Activación de Subsecretaria';
		let $text = '¿Desea activar la Subsecretaria ' + nombre + ' ?';
	
		if(val == 0){

			$title = 'Desactivación de Subsecretaria';
			$text = '¿Desea desactivar la Subsecretaria ' + nombre + ' ?';

		}
	
		swal({
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
	
			this._subdireccionesService.cambiarEstado(idsubdireccion, val).subscribe(
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

