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

  public create_user(userData: {}): Observable<any> {
    return this.http.post(environment.urlAPI + '/user/create', {user: userData});
  }

  public login(userData: {}): Observable<any> {
    return this.http.post(environment.urlAPI + '/user/login', {user: userData});
  }

  public getUsers(): Observable<any> {
    return this.http.get(environment.urlAPI + '/users/get/all');
  }

  public getUser(id: number): Observable<any> {
    return this.http.get(environment.urlAPI + `/users/get/${id}`);
  }
}
