import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonPopover } from '@ionic/angular';
import { BookingStatus } from 'src/app/enums/booking-status';
import { Booking } from 'src/app/models/booking';
import { AuthService } from 'src/app/services/auth.service';
import { BookingsService } from 'src/app/services/bookings.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.page.html',
  styleUrls: ['./my-bookings.page.scss'],
})
export class MyBookingsPage implements OnInit {
  public bookings: Booking[] = [];
  @ViewChild('popover') public popover! : IonPopover;
  public isPopoverOpen = false;
  public isAuthenticated = false

  constructor(private authService: AuthService, private bookingsService: BookingsService, private router: Router) { }

  ngOnInit() {
    this.authService.logInOutEvent.subscribe(loggedIn => {
      this.isAuthenticated = this.authService.isAuthenticated();
      if (this.isAuthenticated)
      {
        this.bookingsService.getBookings().subscribe(bookings => this.bookings = bookings);
      }
    })
  }

  public presentPopover(e: Event) {
    this.popover.event = e;
    this.isPopoverOpen = true;
  }

  public logout() : void {
    this.authService.logout();
    this.router.navigate(['/']);
    this.popover.dismiss();
  }

  public getStatusIcon(status: BookingStatus) : string {
    switch(status) {
      case BookingStatus.Pending:
        return 'timer-outline';  
      case BookingStatus.Active:
        return 'checkmark-circle-outline';
      case BookingStatus.Past:
      case BookingStatus.Cancelled:
        return 'ban-outline';
      default:
        return '';
    }
  }

  public getStatusValue(status: BookingStatus) : string {
    switch(status) {
      case BookingStatus.Pending:
        return 'Pending';  
      case BookingStatus.Active:
        return 'Active';
      case BookingStatus.Past:
        return 'Past';
      case BookingStatus.Cancelled:
        return 'Cancelled';
      default:
        return '';
    }
  }

}
