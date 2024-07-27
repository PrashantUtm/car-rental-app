import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarDetailsPageRoutingModule } from './car-details-routing.module';

import { CarDetailsPage } from './car-details.page';
import { UserDetailsModule } from 'src/app/components/user-details/user-details.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarDetailsPageRoutingModule,
    UserDetailsModule
  ],
  declarations: [CarDetailsPage]
})
export class CarDetailsPageModule {}
