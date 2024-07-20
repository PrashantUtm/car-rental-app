import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor(private httpClient: HttpClient) { }

  public getBookings(): Observable<Booking[]> {
    return this.httpClient.get<Booking[]>(`${environment.baseUrl}/bookings`);
  }

  public createBooking(booking: Booking) : Observable<Booking> {
    return this.httpClient.post<Booking>(`${environment.baseUrl}/bookings`, booking);
  }
}
