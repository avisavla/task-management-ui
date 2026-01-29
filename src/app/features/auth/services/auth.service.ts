import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  login(data:any){
    return this.http.post<{token:string}>(
       `${this.apiURL}/Auth/login`,data
    );
  }

  register(data:any){
    return this.http.post(
      `${this.apiURL}/Auth/register`,data
    );
  }
}
