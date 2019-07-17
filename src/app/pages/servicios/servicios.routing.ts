import { Routes } from '@angular/router';
import { ListadoComponent } from '../servicios/listado/listado.component';
import { AgregarComponent } from '../servicios/agregar/agregar.component';


export const ServiciosRoutes: Routes = [
  {
    path: '',
    component: ListadoComponent
  },
  {
    path: 'agregar',
    component: AgregarComponent
  },
  {
    path: 'editar/:idservicio',
    component: AgregarComponent
  }
];
