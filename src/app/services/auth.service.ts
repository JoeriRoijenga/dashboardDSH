import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private testUser = {
      name: 'test',
      pwd: 'test2',
      mail: 'test@test1.com'
    };

  constructor(private http: HttpClient) { }

  public create_user(): Observable<any> {
    return this.http.post(environment.urlAPI + '/user/create', {user: this.testUser});
  }

  public login(userData: {}): Observable<any> {
    return this.http.post(environment.urlAPI + '/user/login', {user: userData});
  }
}
