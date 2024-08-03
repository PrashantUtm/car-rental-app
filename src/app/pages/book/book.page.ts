import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
  public minimumPickupDate: string;
  public minimumDropOffDate: string;
  public totalPrice = 0;
  public invalidDates = false;
  
  private ownerId: string = '';
  private readonly OneDayInMilliseconds = 24 * 60 * 60 * 1000.00;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private bookingsService: BookingsService,
    private usersService: UsersService,
    private carsService: CarsService,
    private alertController: AlertController
  ) { 
    const carPlateNumber = this.activatedRoute.snapshot.paramMap.get('plateNumber');
    this.ownerId = this.activatedRoute.snapshot.paramMap.get('ownerId') as string;

    const today = new Date();
    const tomorrow = new Date(today.getTime() + this.OneDayInMilliseconds);

    this.bookingForm =  this.formBuilder.group({
      id: ['-1'],
      pickupDate: [this.getLocalIsoString(today)],
      dropOffDate: [this.getLocalIsoString(tomorrow)],
      customerId: [ this.authService.getUsername() ],
      carPlateNumber: [carPlateNumber],
      totalPrice: [0],
      pickupLocation: ['', Validators.required],
      dropOffLocation: ['', Validators.required],
      status: [BookingStatus.Pending]
    });

    this.minimumPickupDate = this.getLocalIsoString(today);
    this.minimumDropOffDate = this.getLocalIsoString(tomorrow);
  }

  ngOnInit() {
    this.carsService.getCar(this.bookingForm.get('carPlateNumber')?.value).subscribe(car => {
      this.car = car;
      this.calculateTotalPrice();
    });
    this.usersService.getUser(this.ownerId).subscribe(user => this.owner = user);

    this.bookingForm.get('pickupDate')?.valueChanges.subscribe(() => this.calculateTotalPrice());
    this.bookingForm.get('dropOffDate')?.valueChanges.subscribe(() => this.calculateTotalPrice());
  }

  public async confirm() : Promise<void> {
    console.log(this.bookingForm.value);  
    this.bookingForm.markAllAsTouched();
    if (!this.invalidDates && this.bookingForm.valid)
    {
      const alert = await this.alertController.create({
        header: 'Rent this car',
        message: 'Are you sure you wish to proceed?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Proceed',
            role: 'confirm',
            handler: () => {
              this.createBooking();
            },
          },
        ],
      });
      await alert.present();
    }
  }

  private getLocalIsoString(date: Date) : string {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60 * 1000)).toISOString();
  }

  private calculateTotalPrice() : void {
    this.invalidDates = false;
    const pickupDateValue = this.bookingForm.get('pickupDate')?.value;
    const dropOffDateValue = this.bookingForm.get('dropOffDate')?.value;

    const pickupDate = new Date(pickupDateValue);
    const dropOffDate = new Date(dropOffDateValue);

    const differenceInMilliseconds = dropOffDate.getTime() - pickupDate.getTime();
    const differenceInDays = differenceInMilliseconds / this.OneDayInMilliseconds;

    if (differenceInDays < 0) {
      this.invalidDates = true;
      this.totalPrice = 0;
      return;
    }

    console.log(differenceInDays);
    if (this.car)
      this.totalPrice = Number((differenceInDays * this.car?.dailyRate).toFixed(2));
  }

  private createBooking() : void {
    this.bookingForm.get('totalPrice')?.patchValue(this.totalPrice);
      this.bookingsService.createBooking(this.bookingForm.value).subscribe(booking => {
        if (booking) {
          this.router.navigate(['/my-bookings']);
        }
      });
  }
}
