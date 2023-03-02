import { CarService } from "../car/service";
import { DriverService } from "../driver/service";
import repository from "./repository";

export default {
  car: new CarService(repository.car),
  driver: new DriverService(repository.driver),
};
