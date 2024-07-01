import { BookingStatus } from "../enums/booking-status";

export interface Booking {
    pickupDate: Date,
    dropOffDate: Date,
    ownerId: string,
    customerId: string,
    carPlateNumber: string,
    totalPrice: number,
    pickupLocation: string,
    dropOffLocation: string,
    status: BookingStatus
}
