import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarComponent } from './agregar/agregar.component';
import { ListadoComponent } from './listado/listado.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module.ts';
import { TicketsRoutingModule } from './tickets.routing';
import { VerComponent } from './ver/ver.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [AgregarComponent, ListadoComponent, VerComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TicketsRoutingModule,
    NgSelectModule
  ]
})
export class TicketsModule {}
