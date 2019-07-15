import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';
import { TOKEN } from '../../config/config';


@Injectable()
export class AuthService {
    jwtHelper: JwtHelper = new JwtHelper();
    constructor() { }

    public isAuthenticated(): boolean {
        if (localStorage.getItem(TOKEN)) {
        const token = localStorage.getItem(TOKEN);
        return !this.jwtHelper.isTokenExpired(token);
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
        let decodeToken = this.jwtHelper.decodeToken(token);
        return decodeToken;
    }


}
