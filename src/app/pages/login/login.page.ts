import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public username: string = '';
  public password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.logInOutEvent.subscribe(loggedIn => {
      if (loggedIn)
        this.router.navigate(['/']);
    })
  }

  public login() : void {
    if (this.username && this.username.trim() !== '' && this.password && this.password.trim() !== '') {
      this.authService.authenticate(this.username, this.password).subscribe();
    }
  }

}
