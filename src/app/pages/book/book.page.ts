import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingStatus } from 'src/app/enums/booking-status';
import { AuthService } from 'src/app/services/auth.service';
import { BookingsService } from 'src/app/services/bookings.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {

  public bookingForm : FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private bookingsService: BookingsService
  ) { 
    const carPlateNumber = this.activatedRoute.snapshot.paramMap.get('carPlateNumber');

    this.bookingForm =  this.formBuilder.group({
      id: ['-1'],
      pickupDate: [new Date()],
      dropOffDate: [new Date(2024, 8, 31)],
      customerId: [ this.authService.getUsername() ],
      carPlateNumber: [carPlateNumber],
      totalPrice: [20000],
      pickupLocation: ['Curepipe'],
      dropOffLocation: ['Port Louis'],
      status: [BookingStatus.Pending]
    });
  }

  ngOnInit() {
  }

  public confirm() : void {
    this.bookingsService.createBooking(this.bookingForm.value).subscribe(booking => {
      if (booking) {
        this.router.navigate(['/my-bookings']);
      }
    });

    
  }
}
