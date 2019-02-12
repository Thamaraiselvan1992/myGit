import { Injectable } from '@angular/core';
import { configuration } from './configuration';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';




const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config = configuration;
  apiUrl = 'api/posts';
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  constructor(private http: HttpClient) { }

  getconfig() {
    return this.config;
  }
getSettings(database:string, id?:string): Observable<any> {
    let uid = id || null;
    let url: string;
  uid!==null? url = `api/${database}/${id}`: url = `api/${database}`;
    
    return this.http.get<any>(`${url}`).pipe(
      tap(
        setting => console.log(setting)
      ),
      catchError(this.handleError('Get Settings', []))
    );
  }
}

  

