import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarComponent } from "./agregar/agregar.component";
import { ListadoComponent } from "./listado/listado.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module.ts";
import { SubdireccionesRoutingModule } from './subdirecciones.routing';

@NgModule({
  declarations: [AgregarComponent, ListadoComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SubdireccionesRoutingModule
  ]
})
export class SubdireccionesModule {}
