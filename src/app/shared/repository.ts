import { CarRepository } from "../car/repository";
import { DriverRepository } from "../driver/repository";

export default {
  car: new CarRepository(),
  driver: new DriverRepository(),
};
