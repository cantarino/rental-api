import { Driver } from "../../src/app/driver/driver";
import { DriverFilter } from "../../src/app/driver/driverFilter";

export interface IDriverRepository {
  get(id: number): Driver | undefined;
  getMany(filter: DriverFilter): Driver[];
  create(driver: Driver): Driver;
  update(id: number, driver: Driver): Driver;
  delete(id: number): void;
}
export class FakeDriverRepository implements IDriverRepository {
  drivers: Driver[];
  constructor() {
    this.drivers = [];
  }

  public get(id: number): Driver | undefined {
    return this.drivers.find((x) => x.id == id);
  }

  public getMany(filter: DriverFilter): Driver[] {
    var drivers = this.drivers;
    if (filter.name != undefined && filter.name.trim() != "") {
      drivers = drivers.filter((x) => x.name == filter.name);
    }

    return drivers;
  }

  public create(driver: Driver): Driver {
    const id = this.drivers.length + 1;
    driver.id = id;
    this.drivers.push(driver);

    return driver;
  }

  public update(id: number, driver: Driver): Driver {
    const index = this.drivers.findIndex((x) => x.id == id);
    driver.id = id;
    this.drivers[index] = driver;

    return driver;
  }

  public delete(id: number) {
    const index = this.drivers.findIndex((x) => x.id == id);
    this.drivers.splice(index, 1);
  }
}
