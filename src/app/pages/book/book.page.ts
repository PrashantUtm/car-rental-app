import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { Geolocation } from '@capacitor/geolocation';
import { AlertController, IonBackButton, NavController } from '@ionic/angular';
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
  @ViewChild(IonBackButton, { static: false }) backButton: IonBackButton | undefined;
  
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
    private alertController: AlertController,
    private navController: NavController,
    private nativeGeocoder: NativeGeocoder
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

  ionViewDidEnter() : void {
    if (this.backButton) {
      this.backButton.onClick = async() => {
        if (!this.bookingForm?.dirty) {
          this.navController.back();
        } else {
          const alert = await this.alertController.create({
            buttons: [ 
              {
                text: 'Stay',
                role: 'cancel',
                handler: () => {}
              }, {
                text: 'Continue',
                role: 'confirm',
                handler: () => {
                  this.navController.back();
                }
              } 
            ],
            message: 'Changes will be lost',
            header: 'Leave?',
            
          });
          await alert.present();
        }

      }
    }
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

  public async setCurrentLocation(controlName: string): Promise<void> {
    const coords = await Geolocation.getCurrentPosition();
    const latitude = coords.coords.latitude;
    const longitude = coords.coords.longitude;

    this.bookingForm.get(controlName)?.patchValue(`latitude: ${latitude}, longitude: ${longitude}`);

    const result = await this.nativeGeocoder.reverseGeocode(latitude, longitude);
    const firstResult = result[0];
    const locationName = `${firstResult.subLocality}, ${firstResult.locality}, ${firstResult.countryName}`;

    this.bookingForm.get(controlName)?.patchValue(locationName);
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
