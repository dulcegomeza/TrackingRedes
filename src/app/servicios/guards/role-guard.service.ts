import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable()
export class RoleGuardService implements CanActivate {
    jwtHelperService: JwtHelperService = new JwtHelperService();
    constructor(public auth: AuthService, public router: Router) { }
    canActivate(route: ActivatedRouteSnapshot): boolean {
        // console.log(route);
        const token = this.auth.getToken();
        // decode the token to get its payload
        const tokenDecoded = this.jwtHelperService.decodeToken(token);
        const rolService = tokenDecoded.data;
        let validRole: boolean;

        // switch(route.routeConfig.path){
        //     case 'usuarios': validRole = rolService.config;
        //     break;
        //     default: validRole = true;
        //     break
        // }

        // if (!this.auth.isAuthenticated() || !validRole) {
        //     this.router.navigate(['/starter']);
        //     return false;
        // }
        return true;
    }
}