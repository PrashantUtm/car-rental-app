import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingStatus } from 'src/app/enums/booking-status';
import { Car } from 'src/app/models/car';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { BookingsService } from 'src/app/services/bookings.service';
import { CarsService } from 'src/app/services/cars.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {

  public bookingForm : FormGroup;
  public car: Car | undefined;
  public owner: User | undefined;
  private ownerId: string = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private bookingsService: BookingsService,
    private usersService: UsersService,
    private carsService: CarsService
  ) { 
    const carPlateNumber = this.activatedRoute.snapshot.paramMap.get('plateNumber');
    this.ownerId = this.activatedRoute.snapshot.paramMap.get('ownerId') as string;

    this.bookingForm =  this.formBuilder.group({
      id: ['-1'],
      pickupDate: [new Date().toISOString()],
      dropOffDate: [new Date()],
      customerId: [ this.authService.getUsername() ],
      carPlateNumber: [carPlateNumber],
      totalPrice: [0],
      pickupLocation: [''],
      dropOffLocation: [''],
      status: [BookingStatus.Pending]
    });
  }

  ngOnInit() {
    this.carsService.getCar(this.bookingForm.get('carPlateNumber')?.value).subscribe(car => {
      this.car = car;
    });
    this.usersService.getUser(this.ownerId).subscribe(user => this.owner = user);
  }

  public confirm() : void {
    console.log(this.bookingForm.value);
    // this.bookingsService.createBooking(this.bookingForm.value).subscribe(booking => {
    //   if (booking) {
    //     this.router.navigate(['/my-bookings']);
    //   }
    // });

    
  }
}
