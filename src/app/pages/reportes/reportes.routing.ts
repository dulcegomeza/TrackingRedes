import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ListadoComponent } from './listado/listado.component';
import { ServiciosComponent } from './servicios/servicios.component';

const routes: Routes = [
  {
    path: "",
    component: ListadoComponent
  },
  {
    path: "servicios",
    component: ServiciosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule {}
