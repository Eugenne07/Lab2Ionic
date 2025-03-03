import { Injectable, NgModule } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RestService {
  private apiUrl = 'https://restcountries.com/v3.1/all?fields=name,capital,flags,region';
  
  private extractData(res: Response) {
    const body = res;
    return body || { };
  }
  
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
    const err = error || '';
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
    errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return throwError(errMsg);
  }  
    

  getCountries(): Observable<any> {
    return this.http.get<Response>(this.apiUrl).pipe(
    map(this.extractData),
    catchError(this.handleError)
    );
    }
  
  constructor(private http: HttpClient) { }
}
