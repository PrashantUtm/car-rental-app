import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookPageRoutingModule } from './book-routing.module';

import { BookPage } from './book.page';
import { UserDetailsModule } from 'src/app/components/user-details/user-details.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookPageRoutingModule,
    ReactiveFormsModule,
    UserDetailsModule
  ],
  declarations: [BookPage]
})
export class BookPageModule {}
