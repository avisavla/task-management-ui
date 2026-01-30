import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenService} from '../services/token.service';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {throwError} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private tokenService:TokenService,
    private router:Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.tokenService.getToken();

    if(token)
    {
      request = request.clone({
        setHeaders:{Authorization:`Bearer ${token}`}
      });

    }
    return next.handle(request).pipe(
      catchError(error=>{
        if(error.status==401){
          this.tokenService.clearToken();
          this.router.navigate(['/login']);
        }
        return throwError(()=>error);
      }
      )
    );
  }
}
