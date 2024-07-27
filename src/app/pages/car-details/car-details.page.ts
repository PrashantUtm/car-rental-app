import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarType } from 'src/app/enums/car-type';
import { Car } from 'src/app/models/car';
import { User } from 'src/app/models/user';
import { CarsService } from 'src/app/services/cars.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.page.html',
  styleUrls: ['./car-details.page.scss'],
})
export class CarDetailsPage implements OnInit {

  public owner: User | undefined;

  public car: Car | undefined = {
    plateNumber: '',
    capacity: 0,
    dailyRate: 0,
    fuel: '',
    make: '',
    model: '',
    ownerId: '',
    photo: '',
    transmission: '',
    type: CarType.Hatchback
  };

  constructor(
    private route: ActivatedRoute,
    private carsService: CarsService,
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    const carPlateNumber = this.route.snapshot.paramMap.get('plateNumber');
    if (carPlateNumber) {
      this.carsService.getCar(carPlateNumber).subscribe(car => {
        this.car = car;
        if (this.car) {
          this.usersService.getUser(this.car?.ownerId).subscribe(user => this.owner = user);
        }
      });
      
    }
  }

  public book(): void {
    this.router.navigate(['/book', this.car?.plateNumber, this.car?.ownerId]);
  }

  public goToMaps(address: string) : void {
    console.log('car details page', address);
  }
}
