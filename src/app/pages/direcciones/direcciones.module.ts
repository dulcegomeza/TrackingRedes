import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarComponent } from './agregar/agregar.component';
import { ListadoComponent } from './listado/listado.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module.ts";
import { DireccionesRoutingModule } from './direcciones.routing';


@NgModule({
  declarations: [AgregarComponent, ListadoComponent],
  imports: [
  CommonModule,
  DireccionesRoutingModule,
  NgbModule,
  FormsModule,
  ReactiveFormsModule,
  SharedModule]
})
export class DireccionesModule {}
