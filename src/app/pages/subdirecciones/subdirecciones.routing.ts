import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListadoComponent } from './listado/listado.component';
import { AgregarComponent } from './agregar/agregar.component';

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
    path: "editar/:idsubdireccion",
    component: AgregarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubdireccionesRoutingModule {}
