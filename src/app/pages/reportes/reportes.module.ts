import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiciosComponent } from "./servicios/servicios.component";
import { ListadoComponent } from "./listado/listado.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module.ts";
import { ReportesRoutingModule } from './reportes.routing';

@NgModule({
  declarations: [ServiciosComponent, ListadoComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ReportesRoutingModule
  ]
})

export class ReportesModule {}
