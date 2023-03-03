import "reflect-metadata";
import { Car } from "../../../src/app/car/car";
import { CarFilter } from "../../../src/app/car/carFilter";
import { CarService } from "../../../src/app/car/service";
import errors from "../../../src/app/shared/errors";
import { FakeCarRepository } from "../../fakes/carRepository";

let carRepository: FakeCarRepository;
let carService: CarService;

let car: Car;
const carId = 1;
const licensePlate = "test";
const brand = "test123";
const color = "test321";

beforeEach(() => {
  car = new Car(licensePlate, color, brand);
  car.id = carId;
  carRepository = new FakeCarRepository();
  carRepository.cars.push(car);
  carService = new CarService(carRepository);
});

describe("get car", () => {
  test("success", () => {
    const item = carService.get(carId);
    expect(item).toEqual(car);
  });

  test("not found", () => {
    const item = carService.get(carId + 1);
    expect(item).toEqual(undefined);
  });
});

describe("get many cars", () => {
  test("success", () => {
    const filter = new CarFilter(brand, color);
    const items = carService.getMany(filter);
    expect(items).toHaveLength(1);
    expect(items[0]).toEqual(car);
  });

  test("not found", () => {
    const filter = new CarFilter("fail", "fail");
    const items = carService.getMany(filter);
    expect(items).toHaveLength(0);
  });
});

describe("update car", () => {
  test("success", () => {
    let updatedCar = car;
    updatedCar.licensePlate = "testUpdate";
    updatedCar.color = "testUpdate123";
    updatedCar.brand = "testUpdate321";
    const item = carService.update(carId, updatedCar);
    expect(item).toEqual(updatedCar);
  });

  test("not found", () => {
    try {
      carService.update(carId + 1, car);
    } catch (e) {
      expect(e).toBe(errors.itemNotFound);
    }
  });
});

describe("delete car", () => {
  test("success", () => {
    carService.delete(carId);
    expect(carService.get(carId)).toBeUndefined();
  });

  test("not found", () => {
    try {
      carService.delete(carId + 1);
    } catch (e) {
      expect(e).toBe(errors.itemNotFound);
    }
  });
});

describe("create car", () => {
  test("success", () => {
    let newCar = new Car(`2${licensePlate}`, `2${color}`, `2${brand}`);
    newCar.id = carId + 1;
    const item = carService.create(newCar);
    expect(carService.getMany(new CarFilter("", ""))).toHaveLength(2);
    expect(item).toEqual(newCar);
  });
});
