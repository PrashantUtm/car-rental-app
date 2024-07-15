import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.page.html',
  styleUrls: ['./cars-list.page.scss'],
})
export class CarsListPage implements OnInit {

  public carsList: Car[] = [];

  constructor(private carsService: CarsService) { }

  ngOnInit() {
    this.carsService.getAllCars().subscribe(cars => this.carsList = cars);
    console.log(this.carsList);
  }



}
