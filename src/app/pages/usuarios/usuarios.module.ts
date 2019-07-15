import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UsuariosRoutes } from './usuarios.routing';
import { SharedModule } from '../../shared/shared.module.ts';
import { ListadoComponent } from './listado/listado.component';
import { AgregarComponent } from './agregar/agregar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UsuariosRoutes),
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

export class UsuariosModule { }
