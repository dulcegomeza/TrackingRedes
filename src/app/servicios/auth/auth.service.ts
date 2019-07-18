import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { TOKEN } from '../../config/config';


@Injectable()
export class AuthService {
    jwtHelperService: JwtHelperService = new JwtHelperService();
    constructor() { }

    public isAuthenticated(): boolean {
        if (localStorage.getItem(TOKEN)) {
        const token = localStorage.getItem(TOKEN);
        return !this.jwtHelperService.isTokenExpired(token);
        }else {
            return false;
        }
    }

    public deleteToken() {
        localStorage.removeItem(TOKEN);
    }

    public getToken(): string {
        return localStorage.getItem(TOKEN);
    }

    public getPlayLoad() {
        let token = localStorage.getItem(TOKEN);
        let decodeToken = this.jwtHelperService.decodeToken(token);
        return decodeToken;
    }


}
