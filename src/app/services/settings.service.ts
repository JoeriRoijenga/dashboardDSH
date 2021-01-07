import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mapTo, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private notificationSettings = {
    "notifications": null,
    "sms": null,
    "mail": null,
  }

  constructor(
    private http: HttpClient,
  ) { }

  public getNotificationSettings(): Observable<any> {
    return this.http.get(`${environment.urlAPI}/settings/get/general`, {}).pipe(
      tap((response) => {
        for (var setting of response.settings) {
          this.notificationSettings[setting.type] = setting.on;
        }
      },
      catchError(error => {
        console.log(error.error);
        return of(false);
      })
    ));
  }

  public saveNotificationSettings(newSettings: {}): Observable<any> {
    Object.entries(newSettings).forEach(
      ([key, value]) => this.notificationSettings[key] = (this.notificationSettings[key] !== value && value !== null) ? value : this.notificationSettings[key]
    );

    return this.http.put(`${environment.urlAPI}/settings/save/general`, {"settings": this.notificationSettings});
  }
}
