import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IonPopover, ModalController } from '@ionic/angular';
import { filter } from 'rxjs';
import { BookingModalComponent } from 'src/app/components/booking-modal/booking-modal.component';
import { BookingStatus } from 'src/app/enums/booking-status';
import { Booking } from 'src/app/models/booking';
import { AuthService } from 'src/app/services/auth.service';
import { BookingsService } from 'src/app/services/bookings.service';
import { CacheKeys, CachingService } from 'src/app/services/caching.service';

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

  private bookingUpdated: EventEmitter<Booking> = new EventEmitter();

  constructor(
    private authService: AuthService,
    private bookingsService: BookingsService,
    private router: Router,
    private modalController: ModalController,
    private cachingService: CachingService
  ) { }

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(async () => await this.getBookings());
    
    this.authService.logInOutEvent.subscribe(async loggedIn => {
      this.isAuthenticated = this.authService.isAuthenticated();
      if (this.isAuthenticated)
      {
        await this.getBookings();
      }
    });

    this.isAuthenticated = this.authService.isAuthenticated();
    this.getBookings();

    this.bookingUpdated.subscribe((booking) => this.bookingsService.updateBooking(booking).subscribe(() => console.log('booking updated')));
  }

  public async showBookingModal(booking: Booking) : Promise<void> {
    const modal = await this.modalController.create({
      component: BookingModalComponent,
      componentProps: {
        booking: booking,
        bookingUpdated: this.bookingUpdated
      }
    });
    modal.present();
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

  private async getBookings() {
    // Fetch from cache
    this.bookings = await this.cachingService.get<Booking[]>(CacheKeys.Bookings, []);

    this.bookingsService.getBookings().subscribe(async bookings => {
      if (this.bookings)
      {
        this.bookings = bookings
        // Update/Set cached bookings
        await this.cachingService.set(CacheKeys.Bookings, this.bookings);
      }
    });
  }

}
