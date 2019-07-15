import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListadoComponent } from './listado/listado.component';
import { AgregarComponent } from './agregar/agregar.component';
import { VerComponent } from './ver/ver.component';

const routes: Routes = [
  {
    path: "",
    component: ListadoComponent
  },
  {
    path: "agregar",
    component: AgregarComponent
  },
  {
    path: "editar/:idticket",
    component: AgregarComponent
  },
  {
    path: "ver/:idticket",
    component: VerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule {}
