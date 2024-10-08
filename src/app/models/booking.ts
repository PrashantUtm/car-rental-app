import { BookingStatus } from "../enums/booking-status";

export interface Booking {
    id: string,
    pickupDate: Date,
    dropOffDate: Date,
    customerId: string,
    ownerId: string,
    carPlateNumber: string,
    totalPrice: number,
    pickupLocation: string,
    dropOffLocation: string,
    status: BookingStatus,
    pickupState?: string[],
    dropOffState?: string[]
}
