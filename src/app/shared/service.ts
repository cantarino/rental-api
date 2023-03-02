import { CarService } from "../car/service";
import repository from "./repository";

export default {
  car: new CarService(repository.car),
};
