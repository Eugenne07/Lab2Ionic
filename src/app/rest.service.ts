import { Injectable, NgModule } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Country } from './models/country';

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
    return throwError(() => new Error(errMsg));
  }  
    

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
    }
  
  constructor(private http: HttpClient) { }
}
