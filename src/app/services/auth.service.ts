import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  public isAuthenticated() : boolean {
    return !!sessionStorage.getItem('username');
  }

  public getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  public getUsername(): string | null {
    return sessionStorage.getItem('username');
  }

  public authenticate(username: string, password: string) : Observable<boolean> {
    return this.httpClient.post<{username: string, token: string}>(`${environment.baseUrl}/login`, { username, password })
    .pipe(map(result => {
      if (result && result.username && result.token) {
        sessionStorage.setItem('username', result.username);
        sessionStorage.setItem('token', result.token);
        return true;
      }
      return false;
    }));
  }
}
