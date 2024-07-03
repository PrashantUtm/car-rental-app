import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarType } from 'src/app/enums/car-type';
import { Car } from 'src/app/models/car';
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.page.html',
  styleUrls: ['./car-details.page.scss'],
})
export class CarDetailsPage implements OnInit {

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
    private router: Router
  ) { }

  ngOnInit() {
    const carPlateNumber = this.route.snapshot.paramMap.get('plateNumber');
    if (carPlateNumber) {
      this.car = this.carsService.getCar(carPlateNumber);
      console.log(this.car);
    }
  }

  public book(): void {
    this.router.navigate(['/book', this.car?.plateNumber]);
  }
}
