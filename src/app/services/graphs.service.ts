import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class GraphsService {

  constructor(
    private http: HttpClient,
  ) { }

  public getSensorData(): Observable<any> {
    return this.http.post( `${environment.urlAPI}/graphs/get/sensor/data`, {}).pipe(
      catchError(error => {
        console.log(error.error);
        return of(false);
      })
    );
  }

  public getSensorDataUpdate(lastDateTime: string): Observable<any> {
    return this.http.post( `${environment.urlAPI}/graphs/get/sensor/data`, {'datetime': lastDateTime}).pipe(
      catchError(error => {
        console.log(error.error);
        return of(false);
      })
    );
  }
}
