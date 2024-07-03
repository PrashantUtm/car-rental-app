import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public isAuthenticated() : boolean {
    return !!localStorage.getItem('username');
  }

  public authenticate(username: string, password: string) : boolean {
    if (username && username.trim() !== '' && password && password.trim() !== '') {
      localStorage.setItem('username', username);
      return true;
    } else {
      return false;
    }
  }
}
