import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  public getUser(username: string): Observable<User> {
    return this.httpClient.get(`${environment.baseUrl}/mocks/users/${username}`) as Observable<User>;
  }
}
