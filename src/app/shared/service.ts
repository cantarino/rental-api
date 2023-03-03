import { CarService } from "../car/service";
import { DriverService } from "../driver/service";
import { RentalService } from "../rental/service";
import repository from "./repository";

export default {
  car: new CarService(repository.car),
  driver: new DriverService(repository.driver),
  rental: new RentalService(
    repository.rental,
    repository.driver,
    repository.car
  ),
};
