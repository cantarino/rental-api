import "reflect-metadata";
import { Driver } from "../../../src/app/driver/driver";
import { DriverFilter } from "../../../src/app/driver/driverFilter";
import { DriverRepository } from "../../../src/app/driver/repository";

let driverRepository: DriverRepository;

let driver: Driver;
let driverId: number;
const name = "test";

beforeEach(() => {
  const newDriver = new Driver(name);
  driverRepository = new DriverRepository();
  driver = driverRepository.create(newDriver);
  driverId = driver.id;
});

describe("get driver", () => {
  test("success", () => {
    const item = driverRepository.get(driverId);
    expect(item).toEqual(driver);
  });

  test("not found", () => {
    const item = driverRepository.get(driverId + 1);
    expect(item).toEqual(undefined);
  });
});

describe("get many drivers", () => {
  test("success", () => {
    const filter = new DriverFilter(name);
    const items = driverRepository.getMany(filter);
    expect(items).toHaveLength(1);
    expect(items[0]).toEqual(driver);
  });

  test("not found", () => {
    const filter = new DriverFilter("fail");
    const items = driverRepository.getMany(filter);
    expect(items).toHaveLength(0);
  });
});

describe("update driver", () => {
  test("success", () => {
    let updatedDriver = driver;
    updatedDriver.name = "testUpdate";
    const item = driverRepository.update(driverId, updatedDriver);
    expect(item).toEqual(updatedDriver);
  });
});

describe("delete driver", () => {
  test("success", () => {
    driverRepository.delete(driverId);
    expect(driverRepository.get(driverId)).toBeUndefined();
  });
});

describe("create driver", () => {
  test("success", () => {
    const newName = "testNew";
    let newDriver = new Driver(newName);
    newDriver.id = driverId + 1;
    const item = driverRepository.create(newDriver);
    expect(driverRepository.getMany(new DriverFilter(""))).toHaveLength(2);
    expect(item).toEqual(newDriver);
  });
});
