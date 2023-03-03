import "reflect-metadata";
import { Car } from "../../../src/app/car/car";
import { Driver } from "../../../src/app/driver/driver";
import { Rental } from "../../../src/app/rental/rental";
import { RentalService } from "../../../src/app/rental/service";
import errors from "../../../src/app/shared/errors";
import { FakeCarRepository } from "../../fakes/carRepository";
import { FakeDriverRepository } from "../../fakes/driverRepository";
import { FakeRentalRepository } from "../../fakes/rentalRepository";

let driverRepository: FakeDriverRepository;
let carRepository: FakeCarRepository;
let rentalRepository: FakeRentalRepository;
let rentalService: RentalService;

let rental: Rental;
let driver: Driver;
let car: Car;
const rentalId = 1;
const startDate = new Date();
const endDate = new Date();
const driverId = 12;
const carId = 34;
const reason = "test";
const name = "test";
const licensePlate = "test";
const brand = "test123";
const color = "test321";

beforeEach(() => {
  rental = new Rental(startDate, driverId, carId, reason);
  rental.id = rentalId;
  driver = new Driver(name);
  driver.id = driverId;
  car = new Car(licensePlate, color, brand);
  car.id = carId;

  rentalRepository = new FakeRentalRepository();
  driverRepository = new FakeDriverRepository();
  carRepository = new FakeCarRepository();

  carRepository.cars.push(car);
  driverRepository.drivers.push(driver);
  rentalRepository.rentals.push(rental);

  rentalService = new RentalService(
    rentalRepository,
    driverRepository,
    carRepository
  );
});

describe("get many rentals", () => {
  test("success", () => {
    const items = rentalService.getMany();
    expect(items).toHaveLength(1);
    expect(items[0]).toEqual(rental);
  });
});

describe("create rental", () => {
  test("success", () => {
    rentalRepository.rentals = [];
    const item = rentalService.createRental(rental);
    expect(item).toEqual(rental);
  });

  test("driver not found", () => {
    let newRental = new Rental(startDate, driverId + 1, carId, reason);
    try {
      rentalService.createRental(newRental);
    } catch (e) {
      expect(e).toBe(errors.driverNotFound);
    }
  });

  test("driver already assigned", () => {
    const newCarId = 12;
    let newCar = new Car(licensePlate, color, brand);
    newCar.id = newCarId;
    carRepository.cars.push(newCar);
    let newRental = new Rental(startDate, driverId, newCarId, reason);
    try {
      rentalService.createRental(newRental);
    } catch (e) {
      expect(e).toBe(errors.driverAlreadyAssigned);
    }
  });

  test("car not found", () => {
    let newRental = new Rental(startDate, driverId, carId + 1, reason);
    try {
      rentalService.createRental(newRental);
    } catch (e) {
      expect(e).toBe(errors.carNotFound);
    }
  });

  test("car already rented", () => {
    const newDriverId = 12;
    let newDriver = new Driver(name);
    newDriver.id = newDriverId;
    driverRepository.drivers.push(newDriver);
    let newRental = new Rental(startDate, newDriverId, carId, reason);
    try {
      rentalService.createRental(newRental);
    } catch (e) {
      expect(e).toBe(errors.carAlreadyRented);
    }
  });
});

describe("close rental", () => {
  test("success", () => {
    const item = rentalService.closeRental(rentalId, endDate);
    expect(item).toEqual(rental);
  });

  test("not found", () => {
    try {
      rentalService.closeRental(rentalId + 1, endDate);
    } catch (e) {
      expect(e).toBe(errors.rentalNotFound);
    }
  });

  test("already closed", () => {
    rental.endDate = endDate;
    rentalRepository.update(rentalId, rental);
    try {
      rentalService.closeRental(rentalId + 1, endDate);
    } catch (e) {
      expect(e).toBe(errors.rentalNotFound);
    }
  });
});
