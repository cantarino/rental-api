import "reflect-metadata";
import { Rental } from "../../../src/app/rental/rental";
import { RentalFilter } from "../../../src/app/rental/rentalFilter";
import { RentalRepository } from "../../../src/app/rental/repository";

let rentalRepository: RentalRepository;

let rental: Rental;
let rentalId: number;
const startDate = new Date();
const driverId = 12;
const carId = 34;
const reason = "test";

beforeEach(() => {
  const newRental = new Rental(startDate, driverId, carId, reason);
  rentalRepository = new RentalRepository();
  rental = rentalRepository.create(newRental);
  rentalId = rental.id;
});

describe("get rental", () => {
  test("success", () => {
    const item = rentalRepository.get(rentalId);
    expect(item).toEqual(rental);
  });

  test("not found", () => {
    const item = rentalRepository.get(rentalId + 1);
    expect(item).toEqual(undefined);
  });
});

describe("get many rentals", () => {
  test("success", () => {
    const items = rentalRepository.getMany();
    expect(items).toHaveLength(1);
    expect(items[0]).toEqual(rental);
  });

  test("success - with filter", () => {
    const items = rentalRepository.getMany(new RentalFilter(driverId, carId));
    expect(items).toHaveLength(1);
    expect(items[0]).toEqual(rental);
  });
});

describe("update rental", () => {
  test("success", () => {
    let updatedRental = rental;
    updatedRental.driverId = 88;
    updatedRental.carId = 77;
    updatedRental.reason = "testUpdate";
    const item = rentalRepository.update(rentalId, updatedRental);
    expect(item).toEqual(updatedRental);
  });
});

describe("create rental", () => {
  test("success", () => {
    let driverId = 123;
    let carId = 321;
    let reason = "testCreate";
    let newRental = new Rental(startDate, driverId, carId, reason);
    newRental.id = rentalId + 1;
    const item = rentalRepository.create(newRental);
    expect(rentalRepository.getMany()).toHaveLength(2);
    expect(item).toEqual(newRental);
  });
});
