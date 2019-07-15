import { Routes } from '@angular/router';
import { ListadoComponent } from '../usuarios/listado/listado.component';
import { AgregarComponent } from '../usuarios/agregar/agregar.component';


export const UsuariosRoutes: Routes = [
  {
    path: '',
    component: ListadoComponent
  },
  {
    path: 'agregar',
    component: AgregarComponent
  },
  {
    path: 'editar/:idusuario',
    component: AgregarComponent
  }
];
