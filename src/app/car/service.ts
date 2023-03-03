import errors from "../shared/errors";
import { Car } from "./car";
import { CarFilter } from "./carFilter";
import { ICarRepository } from "./repository";

export class CarService {
  private repository: ICarRepository;
  constructor(repository: ICarRepository) {
    this.repository = repository;
  }

  public get(id: number): Car | undefined {
    return this.repository.get(id);
  }

  public getMany(filter: CarFilter): Car[] {
    return this.repository.getMany(filter);
  }

  public create(car: Car): Car {
    return this.repository.create(car);
  }

  public update(id: number, car: Car): Car | undefined {
    const item = this.repository.get(id);
    if (!item) throw errors.itemNotFound;

    return this.repository.update(id, car);
  }

  public delete(id: number): boolean {
    const item = this.repository.get(id);
    if (!item) throw errors.itemNotFound;

    this.repository.delete(id);
    return true;
  }
}
