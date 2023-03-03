export class RentalFilter {
  constructor(driverId: number, carId: number) {
    this.driverId = driverId;
    this.carId = carId;
  }

  driverId: number;
  carId: number;
}
