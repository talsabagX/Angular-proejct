import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AutenticationInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let token: string;
        token = sessionStorage.getItem("token");
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: "Bearer"+" "+token
                }
            })
        }
        return next.handle(request)
    }

}