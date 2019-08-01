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
  playLoad: any;
  public config: PerfectScrollbarConfigInterface = {};
  jwtHelperService: JwtHelperService = new JwtHelperService();
  constructor(private modalService: NgbModal, private _usuariosService: UsuariosService, private router: Router, _authService: AuthService) {
    this.playLoad = _authService.getPlayLoad();
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
}
