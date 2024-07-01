import { CarType } from "../enums/car-type";

export interface Car {
    plateNumber: string,
    make: string,
    model: string,
    photo: string,
    dailyRate: number,
    transmission: string,
    capacity: number,
    fuel: string,
    ownerId: string,
    type: CarType
}
