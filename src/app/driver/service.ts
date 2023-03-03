import { AppError } from "../shared/errors";
import { Driver } from "./driver";
import { DriverFilter } from "./driverFilter";
import { DriverRepository } from "./repository";

export class DriverService {
  private repository: DriverRepository;
  constructor(repository: DriverRepository) {
    this.repository = repository;
  }

  public get(id: number): Driver | undefined {
    return this.repository.get(id);
  }

  public getMany(filter: DriverFilter): Driver[] {
    return this.repository.getMany(filter);
  }

  public create(driver: Driver): Driver {
    return this.repository.create(driver);
  }

  public update(id: number, driver: Driver): Driver | undefined {
    const item = this.repository.get(id);
    if (!item) throw new AppError("item not found");

    return this.repository.update(id, driver);
  }

  public delete(id: number): boolean {
    const item = this.repository.get(id);
    if (!item) throw new AppError("item not found");

    this.repository.delete(id);
    return true;
  }
}
