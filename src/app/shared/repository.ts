import { CarRepository } from "../car/repository";
import { DriverRepository } from "../driver/repository";
import { RentalRepository } from "../rental/repository";

export default {
  car: new CarRepository(),
  driver: new DriverRepository(),
  rental: new RentalRepository(),
};
