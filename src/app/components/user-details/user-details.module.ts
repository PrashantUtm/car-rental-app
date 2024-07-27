import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [UserDetailsComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [UserDetailsComponent]
})
export class UserDetailsModule { }
