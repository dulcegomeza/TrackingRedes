import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { APIKEY } from '../../config/config';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public auth: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                ['Authorization']: [`${this.auth.getToken()}`],
                ['soporte']: [APIKEY]
            }
        });
        return next.handle(request);

    }
}
