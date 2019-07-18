import { Component, AfterViewInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbPanelChangeEvent, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Token } from '../../modelos/token.model';
import { AuthService, UsuariosService } from '../../servicios/servicio.index';

declare var $: any;
@Component({
  selector: 'ap-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {
  name: any = '';
  playLoad:any;
  public config: PerfectScrollbarConfigInterface = {};
  jwtHelperService: JwtHelperService = new JwtHelperService();
  constructor(private modalService: NgbModal, private _usuariosService: UsuariosService, private router: Router, _authService: AuthService) {
    this.playLoad = _authService.getPlayLoad()
    this.name = this.playLoad.data.nombre;
  }

 

  salir() {
    this._usuariosService.salir();
  }

  ngAfterViewInit() {

    let set = function () {
      let width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
      let topOffset = 0;
      if (width < 1170) {
        $('#main-wrapper').addClass('mini-sidebar');
      } else {
        $('#main-wrapper').removeClass('mini-sidebar');
      }
    };
    $(window).ready(set);
    $(window).on('resize', set);


    $('.search-box a, .search-box .app-search .srh-btn').on('click', function () {
      $('.app-search').toggle(200);
    });


    $('body').trigger('resize');


  }
  closeResult: string;
  formaModal = {
    primera: 2,
    segunda: 2,
    tercera: 2,
    cuarta: 2,
    quinta: 2,
  };
  openModalColonia(modalcolonia) {
    this.modalService.open(modalcolonia, { size: 'lg' }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReasonColonia(
          reason
        )}`;
      }
    );
  }

  private getDismissReasonColonia(reason: any) {
    if (reason == "save") {
      console.log("save");
      // this.load = true;
      // this._coloniasService
      //   .agregarColonia(this.formaColonia)
      //   .subscribe(
      //     data => {
      //       this.cargarCombos();
      //       Swal(
      //         "Colonia agregada correctamente!",
      //         "",
      //         "success"
      //       );
      //       this.cargarCombos();
      //     },
      //     err => {
      //       this.errMsj = err.error.mensaje;

      //       this.load = false;
      //     }
      //   );
    }
  }
}
