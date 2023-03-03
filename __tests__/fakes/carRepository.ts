import { Car } from "../../src/app/car/car";
import { CarFilter } from "../../src/app/car/carFilter";
import { ICarRepository } from "../../src/app/car/repository";

export class FakeCarRepository implements ICarRepository {
  cars: Car[];
  constructor() {
    this.cars = [];
  }

  public get(id: number): Car | undefined {
    return this.cars.find((x) => x.id == id);
  }

  public getMany(filter: CarFilter): Car[] {
    var cars = this.cars;
    if (filter.brand != undefined && filter.brand.trim() != "") {
      cars = cars.filter((x) => x.brand == filter.brand);
    }
    if (filter.color != undefined && filter.color.trim() != "") {
      cars = cars.filter((x) => x.color == filter.color);
    }

    return cars;
  }

  public create(car: Car): Car {
    const id = this.cars.length + 1;
    car.id = id;
    this.cars.push(car);

    return car;
  }

  public update(id: number, car: Car): Car {
    const index = this.cars.findIndex((x) => x.id == id);
    car.id = id;
    this.cars[index] = car;

    return car;
  }

  public delete(id: number) {
    const index = this.cars.findIndex((x) => x.id == id);
    this.cars.splice(index, 1);
  }
}
