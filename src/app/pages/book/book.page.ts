import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public confirm() : void {
    this.router.navigate(['/my-bookings']);
  }
}
