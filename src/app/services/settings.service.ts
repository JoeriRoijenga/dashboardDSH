import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mapTo, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private http: HttpClient,
  ) { }

  public getNotificationSettings(): Observable<any> {
    return this.http.get( `${environment.urlAPI}/settings/get/general`, {}).pipe(
      catchError(error => {
        console.log(error.error);
        return of(false);
      })
    );
  }
}
