import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';
import { BookingStatus } from 'src/app/enums/booking-status';
import { Booking } from 'src/app/models/booking';

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.scss'],
})
export class BookingModalComponent {

  @Input() public booking!: Booking;
  @Output() public bookingUpdated!: EventEmitter<Booking>;

  constructor(private modalCtrl: ModalController) {}

  dismiss() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  public cancelBooking() : void {
    // alert to confirm
    this.booking.status = BookingStatus.Cancelled;
    this.bookingUpdated.emit(this.booking);
  }

  public async updatePickupState(): Promise<void> {
    if (!this.booking.pickupState) 
      this.booking.pickupState = [];

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });

    this.booking.status = BookingStatus.Active;
    this.booking.pickupState.push(`data:image/png;base64,${image.base64String}`);
    this.bookingUpdated.emit(this.booking);
  }

  public async updateDropOffState(): Promise<void> {
    if (!this.booking.dropOffState) 
      this.booking.dropOffState = [];

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });
    this.booking.status = BookingStatus.Past;
    this.booking.dropOffState.push(`data:image/png;base64,${image.base64String}`);
    this.bookingUpdated.emit(this.booking);
  }

  public getStatusName(status: BookingStatus) : string {
    switch(status) {
      case BookingStatus.Cancelled:
        return 'Cancelled'.toUpperCase();
      case BookingStatus.Past:
        return 'Past'.toUpperCase();
      case BookingStatus.Active:
        return 'Active'.toUpperCase();
      case BookingStatus.Pending:
        return 'Pending'.toUpperCase();
      default:
        return '';
    }
  }

}
