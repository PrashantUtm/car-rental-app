import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { CarType } from '../enums/car-type';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private carsList : Car[] = [
    {
      plateNumber: '1234',
      make: 'Toyota',
      model: 'Corolla',
      capacity: 5,
      dailyRate: 1000,
      fuel: 'unleaded',
      ownerId: '1',
      transmission: 'manual',
      type: CarType.Sedan,
      photo: 'https://toyotamauritius.com/sites/default/files/models/colors/5.png'
    },
    {
      plateNumber: '2345',
      make: 'Suzuki',
      model: 'Swift',
      capacity: 4,
      dailyRate: 800,
      fuel: 'diesel',
      ownerId: '2',
      transmission: 'automatic',
      type: CarType.Hatchback,
      photo: 'https://cars.suzuki.co.uk/_next/image/?url=https%3A%2F%2Fmedia.umbraco.io%2Fsuzuki-gb%2Fhf4b0n10%2Fswift-module-50-alpha-motion-mobile-2x.png&w=828&q=75'
    },
    {
      plateNumber: '3456',
      make: 'Toyota',
      model: 'Hiace',
      capacity: 12,
      dailyRate: 1500,
      fuel: 'unleaded',
      ownerId: '3',
      transmission: 'manual',
      type: CarType.Van,
      photo: 'https://toyotamauritius.com/sites/default/files/models/colors/hiace-colour_0.jpg'
    },
  ]

  constructor() { }

  public getAllCars() : Car[] {
    return this.carsList;
  }

  public getCar(plateNumber: string) : Car | undefined {
    return this.carsList.find(c => c.plateNumber === plateNumber);
  }
}
