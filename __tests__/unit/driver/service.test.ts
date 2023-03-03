import "reflect-metadata";
import { Driver } from "../../../src/app/driver/driver";
import { DriverFilter } from "../../../src/app/driver/driverFilter";
import { DriverService } from "../../../src/app/driver/service";
import errors from "../../../src/app/shared/errors";
import { FakeDriverRepository } from "../../fakes/driverRepository";

let driverRepository: FakeDriverRepository;
let driverService: DriverService;

let driver: Driver;
const driverId = 1;
const name = "test";

beforeEach(() => {
  driver = new Driver(name);
  driver.id = driverId;
  driverRepository = new FakeDriverRepository();
  driverRepository.drivers.push(driver);
  driverService = new DriverService(driverRepository);
});

describe("get driver", () => {
  test("success", () => {
    const item = driverService.get(driverId);
    expect(item).toEqual(driver);
  });

  test("not found", () => {
    const item = driverService.get(driverId + 1);
    expect(item).toEqual(undefined);
  });
});

describe("get many drivers", () => {
  test("success", () => {
    const filter = new DriverFilter(name);
    const items = driverService.getMany(filter);
    expect(items).toHaveLength(1);
    expect(items[0]).toEqual(driver);
  });

  test("not found", () => {
    const filter = new DriverFilter("fail");
    const items = driverService.getMany(filter);
    expect(items).toHaveLength(0);
  });
});

describe("update car", () => {
  test("success", () => {
    let updatedDriver = driver;
    updatedDriver.name = "testUpdate";
    const item = driverService.update(driverId, updatedDriver);
    expect(item).toEqual(updatedDriver);
  });

  test("not found", () => {
    try {
      driverService.update(driverId + 1, driver);
    } catch (e) {
      expect(e).toBe(errors.driverNotFound);
    }
  });
});

describe("delete driver", () => {
  test("success", () => {
    driverService.delete(driverId);
    expect(driverService.get(driverId)).toBeUndefined();
  });

  test("not found", () => {
    try {
      driverService.delete(driverId + 1);
    } catch (e) {
      expect(e).toBe(errors.driverNotFound);
    }
  });
});

describe("create driver", () => {
  test("success", () => {
    const newName = "testNew";
    let newDriver = new Driver(newName);
    newDriver.id = driverId + 1;
    const item = driverService.create(newDriver);
    expect(driverService.getMany(new DriverFilter(""))).toHaveLength(2);
    expect(item).toEqual(newDriver);
  });
});
