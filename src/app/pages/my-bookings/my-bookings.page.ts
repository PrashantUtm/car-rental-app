import { Component, OnInit } from '@angular/core';
import { BookingsService } from 'src/app/services/bookings.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.page.html',
  styleUrls: ['./my-bookings.page.scss'],
})
export class MyBookingsPage implements OnInit {

  constructor(private bookingsService: BookingsService) { }

  ngOnInit() {
    this.bookingsService.getBookings().subscribe(bookings => console.log('bookings: ', bookings));
  }

}
