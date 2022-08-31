import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn : 'root'})


export class Interceptor implements HttpInterceptor{

    constructor() {
        
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const request = req.clone({
            headers : req.headers.set('Content-Type', 'application/json')
        });

        return next.handle(request);
    }

}