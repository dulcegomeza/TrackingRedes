import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ServiciosRoutes } from './servicios.routing';
import { SharedModule } from '../../shared/shared.module.ts';
import { ListadoComponent } from './listado/listado.component';
import { AgregarComponent } from './agregar/agregar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ServiciosRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule
  ],
  declarations: [
    ListadoComponent,
    AgregarComponent,
  ]
})

export class ServiciosModule { }
