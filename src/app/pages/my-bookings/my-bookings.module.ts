import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyBookingsPageRoutingModule } from './my-bookings-routing.module';

import { MyBookingsPage } from './my-bookings.page';
import { BookingModalComponent } from 'src/app/components/booking-modal/booking-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyBookingsPageRoutingModule
  ],
  declarations: [MyBookingsPage, BookingModalComponent]
})
export class MyBookingsPageModule {}
