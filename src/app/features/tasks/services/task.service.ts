import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Task} from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = `${environment.apiURL}/task`;

  constructor(private http:HttpClient) { }

  getTasks(pageNo:number,pageSize:number):Observable<any>{
    const params = new HttpParams().set('pageNo',pageNo).set('pageSize',pageSize);
    return this.http.get<any>(this.apiUrl,{params});
  }
}
