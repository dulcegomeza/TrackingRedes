import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  LoginGuard,
  RoleGuardService,
  AuthService,
  SecretariasService,
  DireccionesService,
  EstadosService,
  SubdireccionesService, TicketsService, ServiciosService
} from "./servicio.index";
import { UsuariosService } from "./usuarios.service";

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    LoginGuard,
    AuthService,
    SubdireccionesService,
    RoleGuardService,
    SecretariasService,
    DireccionesService,
    EstadosService,
    UsuariosService,
    TicketsService,
    ServiciosService
  ],
  declarations: []
})
export class ServiceModule {}
