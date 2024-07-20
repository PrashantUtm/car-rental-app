import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { CarType } from '../enums/car-type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private httpClient: HttpClient) { }

  public getAllCars() : Observable<Car[]> {
    return this.httpClient.get(`${environment.baseUrl}/mocks/cars`) as Observable<Car[]>;
  }

  public getCar(plateNumber: string) : Observable<Car> {
    return this.httpClient.get(`${environment.baseUrl}/mocks/cars/${plateNumber}`) as Observable<Car>;
  }
}
