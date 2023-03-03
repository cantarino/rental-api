import "reflect-metadata";
import { Car } from "../../../src/app/car/car";
import { CarFilter } from "../../../src/app/car/carFilter";
import { CarRepository } from "../../../src/app/car/repository";

let carRepository: CarRepository;

let car: Car;
let carId: number;
const licensePlate = "test";
const brand = "test123";
const color = "test321";

beforeEach(() => {
  const newCar = new Car(licensePlate, color, brand);
  carRepository = new CarRepository();
  car = carRepository.create(newCar);
  carId = car.id;
});

describe("get car", () => {
  test("success", () => {
    const item = carRepository.get(carId);
    expect(item).toEqual(car);
  });

  test("not found", () => {
    const item = carRepository.get(carId + 1);
    expect(item).toEqual(undefined);
  });
});

describe("get many cars", () => {
  test("success", () => {
    const filter = new CarFilter(brand, color);
    const items = carRepository.getMany(filter);
    expect(items).toHaveLength(1);
    expect(items[0]).toEqual(car);
  });

  test("not found", () => {
    const filter = new CarFilter("fail", "fail");
    const items = carRepository.getMany(filter);
    expect(items).toHaveLength(0);
  });
});

describe("update car", () => {
  test("success", () => {
    let updatedCar = car;
    updatedCar.licensePlate = "testUpdate";
    updatedCar.color = "testUpdate123";
    updatedCar.brand = "testUpdate321";
    const item = carRepository.update(carId, updatedCar);
    expect(item).toEqual(updatedCar);
  });
});

describe("delete car", () => {
  test("success", () => {
    carRepository.delete(carId);
    expect(carRepository.get(carId)).toBeUndefined();
  });
});

describe("create car", () => {
  test("success", () => {
    let newCar = new Car(`2${licensePlate}`, `2${color}`, `2${brand}`);
    newCar.id = carId + 1;
    const item = carRepository.create(newCar);
    expect(carRepository.getMany(new CarFilter("", ""))).toHaveLength(2);
    expect(item).toEqual(newCar);
  });
});
